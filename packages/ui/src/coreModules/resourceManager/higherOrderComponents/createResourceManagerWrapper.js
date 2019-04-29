/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reset as resetActionCreator } from 'redux-form'
import createLog from 'utilities/log'

import crudActionCreators from 'coreModules/crud/actionCreators'
import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import userSelectors from 'coreModules/user/globalSelectors'

import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/resourceManager/keyObjectModule'

import * as actionCreators from 'coreModules/resourceManager/actionCreators'
import { createShortcutLayer } from 'coreModules/keyboardShortcuts/higherOrderComponents'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'

import {
  CLOSE_ITEM_VIEW,
  CREATE_SUCCESS,
  DEL_SUCCESS,
  ITEM_SELECT,
  NAVIGATE_CREATE,
  NAVIGATE_FILTER,
  NAVIGATE_LIST,
  PICKER_CLOSE,
  PICKER_PICK_ITEM,
} from 'coreModules/resourceManager/constants'

const log = createLog('resourceManager:resourceManagerWrapper')

const createResourceManagerWrapper = () => ComposedComponent => {
  const mapStateToProps = (state, { isPicker, resource, resourceCount }) => {
    const totalNumberOfRecords = resourceCount

    const managerScope = isPicker ? `${resource}Picker` : resource
    const { get } = keyObjectGlobalSelectors
    const baseItems = get[':managerScope.baseItems'](state, { managerScope })
    const listItems = get[':managerScope.listItems'](state, { managerScope })
    const numberOfListItems = (listItems || []).length

    const showAll = get[':managerScope.showAll'](state, { managerScope })
    const expandedIds = get[':managerScope.expandedIds'](state, {
      managerScope,
    })

    const currentTableRowNumber =
      get[':managerScope.currentTableRowNumber'](state, { managerScope }) || 1
    const focusedIndex = currentTableRowNumber - 1
    const nextRowAvailable = currentTableRowNumber < numberOfListItems
    const prevRowAvailable = currentTableRowNumber > 1
    const filterValues = get[':managerScope.listFilterValues'](state, {
      managerScope,
    })
    const focusedItemId =
      listItems && listItems[focusedIndex] && listItems[focusedIndex].id
    const focusIdWhenLoaded = get[':managerScope.focusIdWhenLoaded'](state, {
      managerScope,
    })

    const userPreferences = userSelectors.getUserPreferences(state)
    const tableColumnsToSort =
      (userPreferences && userPreferences[`${resource}TableColumnsSorting`]) ||
      undefined

    return {
      baseItems,
      currentTableRowNumber,
      expandedIds,
      filterValues,
      focusedIndex,
      focusedItemId,
      focusIdWhenLoaded,
      layer: managerScope,
      listItems,
      managerScope,
      nextRowAvailable,
      numberOfListItems,
      prevRowAvailable,
      showAll,
      tableColumnsToSort,
      totalNumberOfRecords,
    }
  }

  const mapDispatchToProps = {
    clearNestedCache: crudActionCreators.clearNestedCache,
    clearResourceState: keyObjectActionCreators.del[':managerScope'],
    close: actionCreators.close,
    delFocusIdWhenLoaded:
      keyObjectActionCreators.del[':managerScope.focusIdWhenLoaded'],
    open: actionCreators.open,
    resetForm: resetActionCreator,
    setBaseItems: keyObjectActionCreators.set[':managerScope.baseItems'],
    setCurrentTableRowNumber:
      keyObjectActionCreators.set[':managerScope.currentTableRowNumber'],
    setExpandedIds: keyObjectActionCreators.set[':managerScope.expandedIds'],
    setFilterValues:
      keyObjectActionCreators.set[':managerScope.listFilterValues'],
    setFocusIdWhenLoaded:
      keyObjectActionCreators.set[':managerScope.focusIdWhenLoaded'],
    setListItems: keyObjectActionCreators.set[':managerScope.listItems'],
    setShowAll: keyObjectActionCreators.set[':managerScope.showAll'],
  }

  const propTypes = {
    baseItems: PropTypes.array,
    baseTreeFilter: PropTypes.object,
    buildFilterQuery: PropTypes.func.isRequired,
    clearNestedCache: PropTypes.func.isRequired,
    clearResourceState: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    currentTableRowNumber: PropTypes.number.isRequired,
    delFocusIdWhenLoaded: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    editItemActive: PropTypes.bool.isRequired,
    excludeRootNode: PropTypes.bool,
    expandedIds: PropTypes.object,
    filterActive: PropTypes.bool.isRequired,
    filterValues: PropTypes.object,
    focusedIndex: PropTypes.number.isRequired,
    focusedItemId: PropTypes.string,
    focusIdWhenLoaded: PropTypes.string,
    initialFilterValues: PropTypes.object,
    initialItemId: PropTypes.string,
    isPicker: PropTypes.bool,
    itemFetchOptions: PropTypes.object,
    itemId: PropTypes.string,
    listItems: PropTypes.array,
    managerScope: PropTypes.string.isRequired,
    nestedCacheNamespaces: PropTypes.arrayOf(PropTypes.string),
    nextRowAvailable: PropTypes.bool.isRequired,
    numberOfListItems: PropTypes.number.isRequired,
    onInteraction: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    prevRowAvailable: PropTypes.bool.isRequired,
    recordNavigationHeight: PropTypes.number,
    recordOptionsHeight: PropTypes.number,
    resetForm: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired,
    setBaseItems: PropTypes.func.isRequired,
    setCurrentTableRowNumber: PropTypes.func.isRequired,
    setExpandedIds: PropTypes.func.isRequired,
    setFilterValues: PropTypes.func.isRequired,
    setFocusIdWhenLoaded: PropTypes.func.isRequired,
    setListItems: PropTypes.func.isRequired,
    setShowAll: PropTypes.func.isRequired,
    showAll: PropTypes.bool,
    sortOrder: PropTypes.array,
    tableActive: PropTypes.bool.isRequired,
    tableColumnSpecifications: PropTypes.array.isRequired,
    tableColumnsToSort: PropTypes.array,
    tableSearch: PropTypes.func,
    totalNumberOfRecords: PropTypes.number,
    treeActive: PropTypes.bool.isRequired,
  }

  const defaultProps = {
    baseItems: [],
    baseTreeFilter: {},
    excludeRootNode: false,
    expandedIds: {},
    filterValues: undefined,
    focusedItemId: undefined,
    focusIdWhenLoaded: undefined,
    initialFilterValues: undefined,
    initialItemId: undefined,
    isPicker: false,
    itemFetchOptions: { include: [], relationships: ['children', 'parent'] },
    itemId: undefined,
    listItems: [],
    nestedCacheNamespaces: undefined,
    recordNavigationHeight: emToPixels(4.25),
    recordOptionsHeight: emToPixels(3.5625),
    showAll: false,
    sortOrder: [],
    tableColumnsToSort: undefined,
    tableSearch: undefined,
    totalNumberOfRecords: 0,
  }

  class ResourceManagerWrapper extends Component {
    constructor(props) {
      super(props)

      this.expandAncestorsForItemId = this.expandAncestorsForItemId.bind(this)
      this.fetchTreeBase = this.fetchTreeBase.bind(this)
      this.findRowNumberById = this.findRowNumberById.bind(this)
      this.focusRowWithId = this.focusRowWithId.bind(this)
      this.getNestedCacheNamespaces = this.getNestedCacheNamespaces.bind(this)
      this.handleClickRow = this.handleClickRow.bind(this)
      this.handleClosePicker = this.handleClosePicker.bind(this)
      this.handleFormTabClick = this.handleFormTabClick.bind(this)
      this.handleInteraction = this.handleInteraction.bind(this)
      this.handleOpenNewRecordForm = this.handleOpenNewRecordForm.bind(this)
      this.handlePickItem = this.handlePickItem.bind(this)
      this.handleSelectNextRecord = this.handleSelectNextRecord.bind(this)
      this.handleSelectPrev = this.handleSelectPrev.bind(this)
      this.handleSetCurrentTableRow = this.handleSetCurrentTableRow.bind(this)
      this.handleShowAllRecords = this.handleShowAllRecords.bind(this)
      this.handleToggleCurrentRow = this.handleToggleCurrentRow.bind(this)
      this.handleToggleFilters = this.handleToggleFilters.bind(this)
      this.handleToggleRow = this.handleToggleRow.bind(this)
      this.handleUpdateFilterValues = this.handleUpdateFilterValues.bind(this)
      this.selectCurrentRow = this.selectCurrentRow.bind(this)
      this.tableSearch = this.tableSearch.bind(this)
      this.resetFilters = this.resetFilters.bind(this)

      this.mountTableView = this.mountTableView.bind(this)
      this.updateTableView = this.updateTableView.bind(this)
      this.transitionToTableView = this.transitionToTableView.bind(this)
      this.transitionFromTableView = this.transitionFromTableView.bind(this)

      this.mountTreeView = this.mountTreeView.bind(this)
      this.updateTreeView = this.updateTreeView.bind(this)
      this.transitionToTreeView = this.transitionToTreeView.bind(this)
      this.transitionFromTreeView = this.transitionFromTreeView.bind(this)

      this.mountEditItemView = this.mountEditItemView.bind(this)
      this.updateEditItemView = this.updateEditItemView.bind(this)
      this.transitionToEditItemView = this.transitionToEditItemView.bind(this)
      this.transitionFromEditItemView = this.transitionFromEditItemView.bind(
        this
      )

      this.shortcuts = [
        {
          command: 'down',
          description: 'Move focus to next record',
          onPress: this.handleSelectNextRecord,
        },
        {
          command: 'up',
          description: 'Move focus to previous record',
          onPress: this.handleSelectPrev,
        },
        {
          command: 'left',
          description: 'Collapse tree node',
          onPress: () => {
            this.handleToggleCurrentRow('collapse')
          },
        },
        {
          command: 'right',
          description: 'Expand tree node',
          onPress: () => {
            this.handleToggleCurrentRow('expand')
          },
        },
        {
          command: 'n t',
          description: 'Open table view',
          onPress: event => {
            event.preventDefault()
            this.props.onInteraction(NAVIGATE_LIST)
          },
        },
      ]
      if (!props.isPicker) {
        // picker case is handled in picker action bar
        this.shortcuts.push({
          command: 'space',
          description: 'Select current item',
          onPress: event => {
            event.preventDefault()
            this.selectCurrentRow()
          },
        })
        this.shortcuts.push({
          command: 'n n',
          description: 'Open new record form',
          onPress: event => {
            event.preventDefault()
            this.props.onInteraction(NAVIGATE_CREATE)
          },
        })
      }
    }

    componentDidMount() {
      this.props.open()
      const {
        initialFilterValues,
        managerScope,
        treeActive,
        tableActive,
      } = this.props

      if (initialFilterValues) {
        this.props.setFilterValues(initialFilterValues, { managerScope })
        this.handleInteraction(NAVIGATE_FILTER)
      }

      if (tableActive) {
        this.mountTableView()
      } else if (treeActive) {
        this.mountTreeView()
      } else {
        this.mountEditItemView()
        this.tableSearch(initialFilterValues)
      }

      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })
    }

    componentDidUpdate(prevProps) {
      const {
        currentTableRowNumber,
        managerScope,
        numberOfListItems,
      } = this.props

      const activeViews = this.getActiveViews()

      activeViews.forEach(activeView => {
        switch (activeView) {
          case 'table': {
            this.updateTableView(prevProps)
            break
          }
          case 'tree': {
            this.updateTreeView(prevProps)
            break
          }
          case 'edit-item': {
            this.updateEditItemView(prevProps)
            break
          }

          default: {
            throw new Error(`Unknown active view: ${activeView}`)
          }
        }
      })

      const transitions = this.getTransitions(prevProps)

      transitions.forEach(transition => {
        switch (transition) {
          case 'to-table': {
            this.transitionToTableView(prevProps)
            break
          }
          case 'from-table': {
            this.transitionFromTableView(prevProps)
            break
          }
          case 'to-tree': {
            this.transitionToTreeView(prevProps)
            break
          }
          case 'from-tree': {
            this.transitionFromTreeView(prevProps, {
              skipTableSearch: transitions.length === 1, // if going to new record
            })
            break
          }
          case 'to-edit-item': {
            this.transitionToEditItemView(prevProps)
            break
          }
          case 'from-edit-item': {
            this.transitionFromEditItemView(prevProps)
            break
          }
          default: {
            throw new Error(`Unknown transition: ${transition}`)
          }
        }
      })

      if (numberOfListItems < currentTableRowNumber) {
        this.props.setCurrentTableRowNumber(numberOfListItems, {
          managerScope,
        })
      }
    }

    componentWillUnmount() {
      const { managerScope } = this.props
      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })

      this.props.clearResourceState({ managerScope })
      this.props.close()
    }

    getNestedCacheNamespaces() {
      const { managerScope } = this.props
      return [managerScope, `${managerScope}Title`]
    }

    getActiveViews() {
      const keys = ['treeActive', 'tableActive', 'editItemActive']
      const keyNameMap = {
        editItemActive: 'edit-item',
        tableActive: 'table',
        treeActive: 'tree',
      }

      const activeViews = []
      keys.forEach(key => {
        if (this.props[key]) {
          activeViews.push(`${keyNameMap[key]}`)
        }
      })
      return activeViews
    }
    getTransitions(prevProps) {
      const keys = ['treeActive', 'tableActive', 'editItemActive']
      const keyNameMap = {
        editItemActive: 'edit-item',
        tableActive: 'table',
        treeActive: 'tree',
      }
      const transitions = []

      keys.forEach(key => {
        if (!this.props[key] && prevProps[key]) {
          transitions.push(`from-${keyNameMap[key]}`)
        }
      })
      keys.forEach(key => {
        if (this.props[key] && !prevProps[key]) {
          transitions.push(`to-${keyNameMap[key]}`)
        }
      })

      return transitions
    }
    resetFilters() {
      const { managerScope, resource } = this.props
      const formName = `${resource}Filter`
      this.props.resetForm(formName, { resource })
      this.props.setFilterValues({}, { managerScope })
    }

    expandAncestorsForItemId(itemId) {
      const {
        dispatch,
        itemFetchOptions,
        managerScope,
        resource,
        sortOrder,
      } = this.props
      const getManyActionCreator =
        crudActionCreators[resource] && crudActionCreators[resource].getMany

      return dispatch(
        getManyActionCreator({
          queryParams: {
            filter: {
              ancestorsToId: itemId,
            },
            sort: sortOrder,
          },
          storeInState: false,
        })
      ).then((items = []) => {
        if (!items.length) {
          return null
        }

        const ids = items.map(item => {
          return item.id
        })

        return dispatch(
          getManyActionCreator({
            queryParams: {
              filter: {
                ids,
              },
              include: itemFetchOptions.include,
              relationships: itemFetchOptions.relationships,
              sort: sortOrder,
            },
          })
        ).then(() => {
          const { expandedIds } = this.props
          const updatedExpandedIds = items.reduce((obj, item) => {
            return {
              ...obj,
              [item.id]: true,
            }
          }, expandedIds)

          this.props.setExpandedIds(updatedExpandedIds, { managerScope })
        })
      })
    }

    fetchTreeBase() {
      const {
        baseTreeFilter,
        dispatch,
        itemFetchOptions,
        managerScope,
        resource,
        sortOrder,
      } = this.props
      const getManyActionCreator =
        crudActionCreators[resource] && crudActionCreators[resource].getMany

      this.props.setBaseItems([], { managerScope })
      return dispatch(
        getManyActionCreator({
          queryParams: {
            filter: baseTreeFilter,
            include: itemFetchOptions.include,
            relationships: itemFetchOptions.relationships,
            sort: sortOrder,
          },
        })
      ).then(items => {
        this.props.setBaseItems(items, { managerScope })
      })
    }

    findRowNumberById(itemId) {
      const { focusedItemId, listItems } = this.props

      if (focusedItemId === itemId) {
        return null
      }

      let matchingIndex
      listItems.forEach((listItem, index) => {
        if (listItem.id === itemId) {
          matchingIndex = index
        }
      })
      if (matchingIndex !== undefined) {
        return matchingIndex + 1
      }
      return null
    }

    focusRowWithId(itemId) {
      const { managerScope } = this.props
      const rowNumber = this.findRowNumberById(itemId)
      if (rowNumber) {
        this.props.setCurrentTableRowNumber(rowNumber, { managerScope })
        return rowNumber
      }
      return null
    }

    handleUpdateFilterValues(filterValues = {}) {
      const { managerScope, tableActive } = this.props
      if (!tableActive) {
        this.props.onInteraction(NAVIGATE_LIST)
      }
      this.props.setFilterValues(filterValues, { managerScope })
      this.tableSearch(filterValues)
    }

    handleClosePicker() {
      this.handleInteraction(PICKER_CLOSE)
    }

    handlePickItem(itemId, nestedItem) {
      this.handleInteraction(PICKER_PICK_ITEM, { itemId, nestedItem })
    }

    handleOpenNewRecordForm() {
      this.handleInteraction(NAVIGATE_CREATE)
    }
    handleSelectNextRecord() {
      const {
        currentTableRowNumber,
        managerScope,
        nextRowAvailable,
      } = this.props
      if (nextRowAvailable) {
        this.props.setCurrentTableRowNumber(currentTableRowNumber + 1, {
          managerScope,
        })
      }
    }
    handleSelectPrev() {
      const {
        currentTableRowNumber,
        managerScope,
        prevRowAvailable,
      } = this.props
      if (prevRowAvailable) {
        this.props.setCurrentTableRowNumber(currentTableRowNumber - 1, {
          managerScope,
        })
      }
    }
    handleShowAllRecords({ isPicker }) {
      const { managerScope, showAll, treeActive } = this.props

      if (treeActive) {
        this.props.setShowAll(!showAll, { managerScope })
      } else {
        if (!isPicker) {
          this.resetFilters()
        }
        this.tableSearch()
      }
    }

    handleToggleRow(itemId) {
      const { expandedIds, managerScope } = this.props
      const updatedExpandedIds = {
        ...expandedIds,
        [itemId]: !expandedIds[itemId],
      }
      this.props.setExpandedIds(updatedExpandedIds, { managerScope })
    }

    handleToggleCurrentRow(mode) {
      const {
        focusedIndex,
        expandedIds,
        listItems,
        managerScope,
        treeActive,
      } = this.props

      if (treeActive) {
        const listItem = listItems[focusedIndex]
        const id = listItem && listItem.id

        const updatedExpandedIds = {
          ...expandedIds,
          [id]: mode === 'expand',
        }
        this.props.setExpandedIds(updatedExpandedIds, { managerScope })
      }
    }

    handleClickRow(_, itemId) {
      this.focusRowWithId(itemId)
    }

    handleFormTabClick() {
      this.selectCurrentRow()
    }

    handleSetCurrentTableRow(event, number) {
      const { managerScope } = this.props
      this.props.setCurrentTableRowNumber(number, { managerScope })
    }

    handleToggleFilters() {
      const { filterActive } = this.props
      if (filterActive) {
        this.handleInteraction(CLOSE_ITEM_VIEW)
      } else {
        this.handleInteraction(NAVIGATE_FILTER)
      }
    }

    handleInteraction(type, data) {
      log.debug(`Got interaction: ${type}`, data)
      switch (type) {
        case CREATE_SUCCESS: {
          this.tableSearch()
          break
        }
        case DEL_SUCCESS: {
          this.tableSearch()
          break
        }
        default: {
          break
        }
      }
      this.props.onInteraction(type, data)
    }

    selectCurrentRow(newFocusedIndex) {
      const { listItems, focusedIndex: currentFocusedIndex } = this.props

      const focusedIndex =
        newFocusedIndex !== undefined ? newFocusedIndex : currentFocusedIndex
      const listItem = listItems[focusedIndex]
      const itemId = listItem && listItem.id
      if (itemId !== undefined) {
        return this.handleInteraction(ITEM_SELECT, { itemId })
      }
      return null
    }

    tableSearch(filterValues) {
      const {
        excludeRootNode,
        managerScope,
        search,
        sortOrder,
        tableColumnsToSort,
        tableSearch,
      } = this.props

      const query = this.props.buildFilterQuery({
        excludeRootNode,
        values: filterValues || {},
      })

      return (tableSearch || search)({
        query,
        sort:
          (tableColumnsToSort &&
            tableColumnsToSort.map(({ fieldPath, sort: order }) => {
              return `attributes.${fieldPath}:${order}`
            })) ||
          sortOrder,
        useScroll: false,
      }).then(items => {
        this.props.setListItems(items, { managerScope })

        return null
      })
    }

    mountTableView() {
      log.debug('initial mount view: Table')
      const {
        initialFilterValues,
        initialItemId,
        itemId,
        managerScope,
      } = this.props

      if (
        itemId === undefined &&
        initialItemId !== undefined &&
        initialItemId !== ''
      ) {
        this.props.setFocusIdWhenLoaded(initialItemId, { managerScope })
      }

      this.tableSearch(initialFilterValues)
    }

    updateTableView(prevProps) {
      const { focusIdWhenLoaded, itemId, listItems, managerScope } = this.props

      const { listItems: prevListItems } = prevProps
      if (itemId && listItems !== prevListItems) {
        this.focusRowWithId(itemId)
      }
      if (
        focusIdWhenLoaded &&
        prevListItems !== listItems &&
        listItems.length
      ) {
        const rowFocused = this.focusRowWithId(focusIdWhenLoaded)
        if (rowFocused) {
          this.props.delFocusIdWhenLoaded({ managerScope })
        }
      }
    }

    transitionToTableView() {
      log.debug('transition to view: Table')

      const { focusedItemId, managerScope } = this.props
      if (focusedItemId) {
        this.props.setFocusIdWhenLoaded(focusedItemId, { managerScope })
      }
    }

    transitionFromTableView() {
      log.debug('transition from view: Table')

      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })
    }

    mountTreeView() {
      log.debug('initial mount view: Tree')
      const { initialItemId, itemId, managerScope } = this.props

      if (
        itemId === undefined &&
        initialItemId !== undefined &&
        initialItemId !== ''
      ) {
        this.props.setFocusIdWhenLoaded(initialItemId, { managerScope })
        this.expandAncestorsForItemId(initialItemId)
      }

      this.transitionToTreeView()
    }

    updateTreeView(prevProps) {
      const {
        focusIdWhenLoaded,
        listItems,
        managerScope,
        treeActive,
      } = this.props

      if (!treeActive) {
        return
      }

      const { listItems: prevListItems } = prevProps
      if (
        focusIdWhenLoaded &&
        prevListItems !== listItems &&
        listItems.length
      ) {
        const rowFocused = this.focusRowWithId(focusIdWhenLoaded)
        if (rowFocused) {
          this.props.delFocusIdWhenLoaded({ managerScope })
        }
      }
    }

    transitionToTreeView() {
      log.debug('transition to view: Tree')
      const { focusedItemId, managerScope } = this.props

      if (focusedItemId) {
        this.props.setFocusIdWhenLoaded(focusedItemId, { managerScope })
        this.expandAncestorsForItemId(focusedItemId)
      }

      this.fetchTreeBase()
    }

    transitionFromTreeView(_, { skipTableSearch }) {
      log.debug('transition from view: Tree')
      const { managerScope } = this.props

      if (!skipTableSearch) {
        this.tableSearch()
      }

      this.props.setExpandedIds({}, { managerScope })
    }

    mountEditItemView() {
      log.debug('initial mount view: EditItem')
      this.tableSearch()
      this.transitionToEditItemView()
    }

    updateEditItemView(prevProps) {
      const { editItemActive, focusedIndex, listItems, itemId } = this.props

      if (!editItemActive) {
        return
      }

      const {
        focusedIndex: prevFocusedIndex,
        listItems: prevListItems,
      } = prevProps

      if (itemId && listItems !== prevListItems) {
        this.focusRowWithId(itemId)
      }
      if (editItemActive && focusedIndex !== prevFocusedIndex) {
        this.selectCurrentRow(focusedIndex)
      }
    }
    transitionToEditItemView() {
      log.debug('transition to view: EditItem')
    }
    transitionFromEditItemView() {
      log.debug('transition from view: EditItem')
      this.props.clearNestedCache({
        namespaces: this.getNestedCacheNamespaces(),
      })
    }

    render() {
      const { managerScope, nextRowAvailable, prevRowAvailable } = this.props
      return (
        <React.Fragment>
          <KeyboardShortcuts
            activeInLayer={managerScope}
            shortcuts={this.shortcuts}
          />
          <ComposedComponent
            {...this.props}
            fetchTreeBase={this.fetchTreeBase}
            managerScope={managerScope}
            onClickRow={this.handleClickRow}
            onClosePicker={this.handleClosePicker}
            onFormTabClick={this.handleFormTabClick}
            onInteraction={this.handleInteraction}
            onOpenNewRecordForm={this.handleOpenNewRecordForm}
            onPickItem={this.handlePickItem}
            onSelectNextRecord={nextRowAvailable && this.handleSelectNextRecord}
            onSelectPreviousRecord={prevRowAvailable && this.handleSelectPrev}
            onSetCurrentTableRowNumber={this.handleSetCurrentTableRow}
            onShowAllRecords={this.handleShowAllRecords}
            onToggleCurrentRow={this.handleToggleCurrentRow}
            onToggleFilters={this.handleToggleFilters}
            onToggleRow={this.handleToggleRow}
            onUpdateFilterValues={this.handleUpdateFilterValues}
            tableSearch={this.tableSearch}
          />
        </React.Fragment>
      )
    }
  }

  ResourceManagerWrapper.propTypes = propTypes
  ResourceManagerWrapper.defaultProps = defaultProps

  return compose(
    createGetResourceCount(),
    createInjectSearch({
      includeFields: ['id'],
      storeSearchResult: false,
    }),
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    connect(),
    createShortcutLayer({ layer: 'resourceManager' })
  )(ResourceManagerWrapper)
}

export default createResourceManagerWrapper
