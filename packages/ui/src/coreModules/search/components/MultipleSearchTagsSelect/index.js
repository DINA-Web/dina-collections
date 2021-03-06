/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'
import { debounce } from 'lodash'

import { MultipleSearchSelectionDropdown } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import TagTypeDropdown from '../TagTypeDropdown'
import RefineTagSelection from './RefineTagSelection'
import RefineTagSelectionButton from './RefineTagSelectionButton'
import * as selectors from './selectors'
import { ANY } from '../../constants'

import {
  createMatchingTagsFromItems,
  createOptions,
  createReduxFormValues,
  filterReduxFormValuesByExistingQueryStrings,
  getLastSearchOption,
  getOptionWasAdded,
} from './utilities'

const propTypes = {
  addTagTypeToText: PropTypes.bool,
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  capitalize: PropTypes.bool,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  inlineRefine: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.objectOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          matchingTags: PropTypes.array.isRequired,
          searchOption: PropTypes.object.isRequired,
        }).isRequired
      ).isRequired,
      PropTypes.string.isRequired,
    ]).isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  tagTypeFilterEnabled: PropTypes.bool,
  tagTypeInitialOptionValue: PropTypes.string,
  tagTypeInlineDescription: PropTypes.string,
  tagTypeMatchAllOptionText: PropTypes.string,
  translationScope: PropTypes.string,
}
const defaultProps = {
  addTagTypeToText: true,
  capitalize: undefined,
  inlineRefine: false,
  tagTypeFilterEnabled: false,
  tagTypeInitialOptionValue: undefined,
  tagTypeInlineDescription: undefined,
  tagTypeMatchAllOptionText: undefined,
  translationScope: undefined,
}

class RawMultipleSearchTagsSelect extends PureComponent {
  constructor(props) {
    super(props)
    this.getItemsForSearchQuery = this.getItemsForSearchQuery.bind(this)
    this.getOptions = this.getOptions.bind(this)
    this.getSelectedOptions = this.getSelectedOptions.bind(this)
    this.setSearchQueryResultsSelected = this.setSearchQueryResultsSelected.bind(
      this
    )

    this.handleGetSearchQuery = this.handleGetSearchQuery.bind(this)
    this.handleCloseRefine = this.handleCloseRefine.bind(this)
    this.handleOpenRefine = this.handleOpenRefine.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSelectOption = this.handleSelectOption.bind(this)
    this.handleSelectAllForSearchQuery = this.handleSelectAllForSearchQuery.bind(
      this
    )
    this.handleDeselectAllForSearchQuery = this.handleDeselectAllForSearchQuery.bind(
      this
    )
    this.getMatchingTagsFromSearchOption = this.getMatchingTagsFromSearchOption.bind(
      this
    )
    this.fetchFreeTextTags = this.fetchFreeTextTags.bind(this)
    this.handleToggleTagSelected = this.handleToggleTagSelected.bind(this)
    this.handleUpdateTagFilterValue = this.handleUpdateTagFilterValue.bind(this)
    this.translateTagType = this.translateTagType.bind(this)
    this.state = {
      options: [],
      refineOpen: false,
      searchQuery: '',
      tagTypeFilterValue: '',
    }

    this.updateOptions = debounce(
      searchQuery => {
        const { tagTypeFilterValue } = this.state
        return this.getItemsForSearchQuery({
          tagType:
            tagTypeFilterValue && tagTypeFilterValue !== ANY
              ? tagTypeFilterValue
              : undefined,
          tagValue: searchQuery,
        }).then(items => {
          const { addTagTypeToText } = props
          const options = createOptions({
            addTagTypeToText,
            items,
            searchQuery,
            translateTagType: this.translateTagType,
          })

          // for unknown reason this is needed, because otherwise the dropdown
          // occasionally shows old options that matched a previous query on top
          // in the options list, so that the new options show below
          this.setState({ options: [] })
          this.setState({
            options,
          })
        })
      },
      400,
      {
        maxWait: 800,
      }
    )
  }

  componentWillUnmount() {
    this.updateOptions.cancel()
  }

  getItemsForSearchQuery({
    aggregationFunctionType = 'value',
    exact,
    limit = 10,
    tagType,
    tagValue,
  }) {
    const query = this.props.buildLocalAggregationQuery({
      input: {
        aggregationFunctionType,
        exact,
        limit,
        tagType,
        tagValue,
      },
    })
    query.limit = limit
    return this.props.search(query).then(items => {
      return items
    })
  }

  getOptions() {
    return this.state.options
  }

  setSearchQueryResultsSelected(searchQuery, selected = true) {
    const reduxFormValues = this.props.input.value
    const reduxFormValue = objectPath.get(reduxFormValues, searchQuery)
    if (reduxFormValue) {
      const { matchingTags, searchOption } = reduxFormValue

      const updatedReduxFormValues = createReduxFormValues({
        matchingTags,
        prevReduxFormValues: reduxFormValues,
        searchOption,
        selected,
      })

      this.props.input.onChange(updatedReduxFormValues)
    }
  }

  getSelectedOptions(_, queryStrings) {
    const selectedOptions = queryStrings.map(key => {
      return this.props.input.value[key].searchOption
    })
    return selectedOptions
  }

  getMatchingTagsFromSearchOption(searchOption) {
    const { key } = searchOption
    const { tagValue, optionType } = searchOption.other
    return Promise.resolve().then(() => {
      if (optionType !== 'freeText') {
        const matchingTags = createMatchingTagsFromItems([
          {
            attributes: searchOption.other,
            id: key,
          },
        ])
        return {
          hasMatchingTags: true,
          matchingTags,
        }
      }
      return this.getItemsForSearchQuery({
        limit: 1,
        tagValue,
      }).then(items => {
        return {
          hasMatchingTags: !!items.length,
          matchingTags: [],
        }
      })
    })
  }

  handleGetSearchQuery() {
    return this.state.searchQuery
  }

  handleCloseRefine() {
    this.setState({
      refineOpen: false,
    })
  }

  handleOpenRefine() {
    this.setState({
      refineOpen: true,
    })
  }

  handleSearchChange(input) {
    const { searchQuery } = input
    this.setState({
      searchQuery,
    })

    if (!searchQuery) {
      return this.setState({
        options: [],
        searchQuery,
      })
    }

    return this.updateOptions(searchQuery)
  }

  fetchFreeTextTags(searchOption) {
    const limit = 50
    const { tagValue } = searchOption.other
    return this.getItemsForSearchQuery({
      exact: false,
      limit,
      tagValue,
    }).then(items => {
      const { value: prevReduxFormValues } = this.props.input
      const matchingTags = createMatchingTagsFromItems(items)

      const updatedReduxFormValues = createReduxFormValues({
        hasMatchingTags: !!matchingTags.length,
        matchingTags,
        matchingTagsReachedLimit: items.length === limit,
        prevReduxFormValues,
        searchOption,
        selected: false,
      })

      return this.props.input.onChange(updatedReduxFormValues)
    })
  }

  handleSelectOption(queryStrings) {
    if (!queryStrings.length) {
      this.props.input.onChange({})
    }

    const { value: prevReduxFormValues } = this.props.input
    const newOptionWasAdded = getOptionWasAdded({
      queryStrings,
      reduxFormValues: prevReduxFormValues,
    })
    if (newOptionWasAdded) {
      const searchOption = getLastSearchOption({
        options: this.state.options,
        queryStrings,
      })

      if (!searchOption) {
        return null
      }

      return this.getMatchingTagsFromSearchOption(searchOption).then(
        ({ hasMatchingTags, matchingTags }) => {
          const updatedReduxFormValues = createReduxFormValues({
            hasMatchingTags,
            matchingTags,
            prevReduxFormValues,
            searchOption,
            selected: true,
          })

          return this.props.input.onChange(updatedReduxFormValues)
        }
      )
    }
    const updatedReduxFormValues = filterReduxFormValuesByExistingQueryStrings({
      queryStrings,
      reduxFormValues: prevReduxFormValues,
    })

    return this.props.input.onChange(updatedReduxFormValues)
  }

  handleSelectAllForSearchQuery(searchQuery) {
    this.setSearchQueryResultsSelected(searchQuery, true)
  }

  handleDeselectAllForSearchQuery(searchQuery) {
    this.setSearchQueryResultsSelected(searchQuery, false)
  }

  handleToggleTagSelected({ searchQuery, id }) {
    const reduxFormValues = this.props.input.value
    const reduxFormValue = objectPath.get(reduxFormValues, searchQuery)
    if (reduxFormValue) {
      const { matchingTags, searchOption } = reduxFormValue

      const updatedReduxFormValues = createReduxFormValues({
        matchingTags: matchingTags.map(tag => {
          if (tag.id !== id) {
            return tag
          }

          return {
            ...tag,
            selected: !tag.selected,
          }
        }),
        prevReduxFormValues: reduxFormValues,
        searchOption,
      })

      this.props.input.onChange(updatedReduxFormValues)
    }
  }

  handleUpdateTagFilterValue(value) {
    this.setState({
      tagTypeFilterValue: value,
    })
  }

  translateTagType(tagType) {
    const {
      i18n: { moduleTranslate },
      module,
      translationScope,
    } = this.props
    return moduleTranslate({
      capitalize: false,
      fallback: tagType,
      module,
      scope: translationScope,
      textKey: tagType,
    })
  }

  render() {
    const {
      addTagTypeToText,
      buildLocalAggregationQuery,
      capitalize,
      i18n: { moduleTranslate },
      inlineRefine,
      input,
      module,
      resource,
      tagTypeFilterEnabled,
      tagTypeInlineDescription,
      tagTypeInitialOptionValue,
      tagTypeMatchAllOptionText,
      translationScope,
      ...rest
    } = this.props

    const { refineOpen, tagTypeFilterValue } = this.state
    const { value: reduxFormValues } = input

    const patchedInput = {
      ...input,
      onBlur: this.handleSelectOption,
      value: Object.keys(reduxFormValues || {}),
    }

    const numberOfSearchResults = selectors.getNumberOfFreeTextSearchResults(
      reduxFormValues
    )
    const numberOfSelectedResults = selectors.getNumberOfSelectedFreeTextResults(
      reduxFormValues
    )

    return (
      <React.Fragment>
        {tagTypeFilterEnabled && (
          <TagTypeDropdown
            buildLocalAggregationQuery={buildLocalAggregationQuery}
            capitalize={capitalize}
            inline
            inlineDescription={tagTypeInlineDescription}
            module={module}
            onChange={this.handleUpdateTagFilterValue}
            resource={resource}
            tagTypeInitialOptionValue={tagTypeInitialOptionValue}
            tagTypeMatchAllOptionText={tagTypeMatchAllOptionText}
            translationScope={translationScope}
            value={tagTypeFilterValue}
          />
        )}
        <MultipleSearchSelectionDropdown
          {...rest}
          enableHelpNotifications={false}
          getOptions={this.getOptions}
          getSearchQuery={this.handleGetSearchQuery}
          getSelectedOptions={this.getSelectedOptions}
          icon="search"
          input={patchedInput}
          label={false}
          noResultsMessage={moduleTranslate({
            textKey: 'typeQueryAndPressEnter',
          })}
          onSearchChange={this.handleSearchChange}
          resource={resource}
          rightButton={
            <RefineTagSelectionButton
              onCloseRefine={this.handleCloseRefine}
              onOpenRefine={this.handleOpenRefine}
              reduxFormValues={reduxFormValues || undefined}
              refineOpen={refineOpen}
            />
          }
          type="multiple-search-selection-dropdown-connect"
        />
        {refineOpen && (
          <RefineTagSelection
            addTagTypeToText={addTagTypeToText}
            fetchFreeTextTags={this.fetchFreeTextTags}
            inline={inlineRefine}
            numberOfSearchResults={numberOfSearchResults}
            numberOfSelectedResults={numberOfSelectedResults}
            onClose={this.handleCloseRefine}
            onDeselectAllForSearchQuery={this.handleDeselectAllForSearchQuery}
            onSelectAllForSearchQuery={this.handleSelectAllForSearchQuery}
            onToggleTagSelected={this.handleToggleTagSelected}
            open
            reduxFormValues={{ ...(reduxFormValues || {}) }}
            translateTagType={this.translateTagType}
          />
        )}
      </React.Fragment>
    )
  }
}

RawMultipleSearchTagsSelect.propTypes = propTypes
RawMultipleSearchTagsSelect.defaultProps = defaultProps

export const MultipleSearchTagsSelect = withI18n({ module: 'search' })(
  RawMultipleSearchTagsSelect
)

export default createInjectSearch({
  storeSearchResult: false,
})(MultipleSearchTagsSelect)
