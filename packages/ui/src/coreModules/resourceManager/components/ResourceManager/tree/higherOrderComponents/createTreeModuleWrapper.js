import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import isEqual from 'fast-deep-equal'
import objectPath from 'object-path'

import crudActionCreators from 'coreModules/crud/actionCreators'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import resourceManagerSelectors from 'coreModules/resourceManager/globalSelectors'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/resourceManager/keyObjectModule'
import {
  createFocusRow,
  injectResourceManagerConfig,
} from 'coreModules/resourceManager/higherOrderComponents'
import { buildList } from 'coreModules/resourceManager/utilities'

const { get } = keyObjectGlobalSelectors

const mapStateToProps = (state, { managerScope, resource }) => {
  return {
    currentRowNumber: resourceManagerSelectors.getCurrentTreeRowNumber(state, {
      managerScope,
    }),
    focusedItemId: get[':managerScope.focusedItemId'](state, {
      managerScope,
    }),
    itemsObject: crudSelectors[resource].getItemsObject(state),
    treeBaseItems: get[':managerScope.treeBaseItems'](state, {
      managerScope,
    }),
    treeExpandedIds: get[':managerScope.treeExpandedIds'](state, {
      managerScope,
    }),
    treeListItems: get[':managerScope.treeListItems'](state, {
      managerScope,
    }),
  }
}

const mapDispatchToProps = (dispatch, { resource }) => ({
  getMany: (...args) => dispatch(crudActionCreators[resource].getMany(...args)),
  setFocusedItemId: (...args) =>
    dispatch(
      keyObjectActionCreators.set[':managerScope.focusedItemId'](...args)
    ),
  setTreeBaseItems: (...args) =>
    dispatch(
      keyObjectActionCreators.set[':managerScope.treeBaseItems'](...args)
    ),
  setTreeExpandedIds: (...args) =>
    dispatch(
      keyObjectActionCreators.set[':managerScope.treeExpandedIds'](...args)
    ),
  setTreeListItems: (...args) =>
    dispatch(
      keyObjectActionCreators.set[':managerScope.treeListItems'](...args)
    ),
})

const propTypes = {
  baseTreeFilter: PropTypes.object,
  currentRowNumber: PropTypes.number.isRequired,
  fetchItemById: PropTypes.func.isRequired,
  focusedItemId: PropTypes.string,
  getMany: PropTypes.func.isRequired,
  itemFetchOptions: PropTypes.object,
  itemsObject: PropTypes.object.isRequired,
  ItemTitle: PropTypes.func,
  managerScope: PropTypes.string.isRequired,
  onClickRow: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  setFocusedItemId: PropTypes.func.isRequired,
  setTreeBaseItems: PropTypes.func.isRequired,
  setTreeExpandedIds: PropTypes.func.isRequired,
  setTreeListItems: PropTypes.func.isRequired,
  sortOrder: PropTypes.array,
  treeBaseItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  treeExpandedIds: PropTypes.objectOf(PropTypes.bool.isRequired),
  treeListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      isExpandable: PropTypes.bool.isRequired,
      level: PropTypes.number.isRequired,
    }).isRequired
  ),
}
const defaultProps = {
  baseTreeFilter: {},
  focusedItemId: undefined,
  initialItemId: undefined,
  itemFetchOptions: { include: [], relationships: ['children', 'parent'] },
  ItemTitle: undefined,
  sortOrder: [],
  treeBaseItems: [],
  treeExpandedIds: {},
  treeListItems: [],
}

const createTreeModuleWrapper = () => ComposedComponent => {
  class TreeModuleWrapper extends Component {
    constructor(props) {
      super(props)
      this.fetchTreeBase = this.fetchTreeBase.bind(this)
      this.expandAncestorsForItemId = this.expandAncestorsForItemId.bind(this)
      this.handleToggleRow = this.handleToggleRow.bind(this)
      this.handleCollapseCurrentRow = this.handleCollapseCurrentRow.bind(this)
      this.handleExpandCurrentRow = this.handleExpandCurrentRow.bind(this)
      this.setCurrentRowIsExpanded = this.setCurrentRowIsExpanded.bind(this)

      this.shortcuts = [
        {
          command: 'left',
          description: 'Collapse tree node',
          onPress: this.handleCollapseCurrentRow,
        },
        {
          command: 'right',
          description: 'Expand tree node',
          onPress: this.handleExpandCurrentRow,
        },
      ]
    }

    setCurrentRowIsExpanded(isExpanded) {
      const {
        focusedItemId,
        treeExpandedIds,
        managerScope,
        setTreeExpandedIds,
      } = this.props

      const updatedExpandedIds = {
        ...treeExpandedIds,
        [focusedItemId]: isExpanded,
      }

      setTreeExpandedIds(updatedExpandedIds, { managerScope })
    }

    expandAncestorsForItemId(itemId) {
      const {
        getMany,
        itemFetchOptions,
        managerScope,
        setTreeExpandedIds,
        sortOrder,
        treeExpandedIds,
      } = this.props

      return getMany({
        queryParams: {
          filter: {
            ancestorsToId: itemId,
          },
          sort: sortOrder,
        },
        storeInState: false,
      }).then((items = []) => {
        if (!items.length) {
          return null
        }

        const ids = items.map(item => {
          return item.id
        })

        return getMany({
          queryParams: {
            filter: {
              ids,
            },
            include: itemFetchOptions.include,
            relationships: itemFetchOptions.relationships,
            sort: sortOrder,
          },
        }).then(() => {
          const updatedExpandedIds = items.reduce((obj, item) => {
            return {
              ...obj,
              [item.id]: true,
            }
          }, treeExpandedIds)

          setTreeExpandedIds(updatedExpandedIds, { managerScope })
        })
      })
    }

    fetchTreeBase() {
      const {
        baseTreeFilter,
        focusedItemId,
        getMany,
        itemFetchOptions,
        managerScope,
        sortOrder,
        treeBaseItems,
        setFocusedItemId,
        setTreeBaseItems,
      } = this.props

      return getMany({
        queryParams: {
          filter: baseTreeFilter,
          include: itemFetchOptions.include,
          relationships: itemFetchOptions.relationships,
          sort: sortOrder,
        },
      }).then(items => {
        const cleanedItems = items.map(({ attributes, ...rest }) => rest)

        if (!isEqual(cleanedItems, treeBaseItems)) {
          setTreeBaseItems(cleanedItems, { managerScope })
        }

        const firstItemId = objectPath.get(cleanedItems, '0.id')

        if (!focusedItemId && firstItemId) {
          setFocusedItemId(firstItemId, { managerScope })
        }
      })
    }

    handleToggleRow(itemId) {
      const { treeExpandedIds, managerScope, setTreeExpandedIds } = this.props

      const updatedExpandedIds = {
        ...treeExpandedIds,
        [itemId]: !treeExpandedIds[itemId],
      }

      setTreeExpandedIds(updatedExpandedIds, { managerScope })
    }

    handleCollapseCurrentRow() {
      this.setCurrentRowIsExpanded(false)
    }

    handleExpandCurrentRow() {
      this.setCurrentRowIsExpanded(true)
    }

    render() {
      const {
        currentRowNumber,
        fetchItemById,
        focusedItemId,
        itemFetchOptions,
        ItemTitle,
        managerScope,
        onClickRow,
        resource,
        treeExpandedIds,
        treeListItems,
        itemsObject,
        setTreeListItems,
        treeBaseItems,
      } = this.props

      return (
        <React.Fragment>
          <KeyboardShortcuts
            activeInLayer={managerScope}
            shortcuts={this.shortcuts}
          />
          <ComposedComponent
            buildList={buildList}
            currentRowNumber={currentRowNumber}
            expandAncestorsForItemId={this.expandAncestorsForItemId}
            fetchItemById={fetchItemById}
            fetchTreeBase={this.fetchTreeBase}
            focusedItemId={focusedItemId}
            itemFetchOptions={itemFetchOptions}
            itemsObject={itemsObject}
            ItemTitle={ItemTitle}
            managerScope={managerScope}
            onClickRow={onClickRow}
            onShowAllRecords={this.handleShowAllRecords}
            onToggleRow={this.handleToggleRow}
            resource={resource}
            setTreeListItems={setTreeListItems}
            treeBaseItems={treeBaseItems}
            treeExpandedIds={treeExpandedIds}
            treeListItems={treeListItems}
          />
        </React.Fragment>
      )
    }
  }

  TreeModuleWrapper.propTypes = propTypes
  TreeModuleWrapper.defaultProps = defaultProps

  return compose(
    injectResourceManagerConfig,
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    createFocusRow({
      itemsSelector: get[':managerScope.treeListItems'],
      rowSelector: resourceManagerSelectors.getCurrentTreeRowNumber,
    }),
    createBatchFetchItems({
      relationships: ['parent', 'children'],
    })
  )(TreeModuleWrapper)
}

export default createTreeModuleWrapper
