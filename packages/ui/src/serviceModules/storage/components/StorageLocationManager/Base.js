import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import capitalizeFirstLetter from 'common/src/stringFormatters/capitalizeFirstLetter'
import { ResourceManager } from 'coreModules/resourceManager/components'
import crudActionCreators from 'coreModules/crud/actionCreators'
import CreateForm from './item/CreateForm'
import EditForm from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'
import ItemTitle from './ItemTitle'

const resource = 'storageLocation'
const include = ['parent', 'resourceActivities']
const createGetNestedItemHocInput = {
  include,
  refresh: true,
  relationships: include,
  resolveRelationships: [
    'storageLocation',
    'parent',
    'preparationType',
    'resourceActivity',
    'taxon',
  ],
  resource,
}

const relationshipsToCheckBeforeDelete = ['children', 'physicalObjects']

const buildEditItemHeaders = nestedItem => {
  if (!nestedItem) {
    return {}
  }

  return {
    itemHeader: nestedItem.name,
    itemSubHeader: capitalizeFirstLetter(nestedItem.group),
  }
}

const treeItemFetchOptions = {
  include: ['parent'],
  relationships: ['parent', 'children'],
  resolveRelationships: ['storageLocation'],
}

const baseTreeFilter = {
  name: 'NRM',
}

const sortOrder = ['attributes.name:asc']

const tableBatchFetchOptions = {
  include: ['parent.parent.parent.parent.parent'],
  relationships: [
    'parent',
    'parent.parent',
    'parent.parent.parent',
    'parent.parent.parent.parent',
    'parent.parent.parent.parent.parent',
  ],
  resolveRelationships: ['storageLocation'],
}

const mapDispatchToProps = {
  getManyPhysicalObject: crudActionCreators.physicalObject.getMany,
  getManySpecimen: crudActionCreators.specimen.getMany,
  getManyStorageLocation: crudActionCreators.storageLocation.getMany,
}

const propTypes = {
  getManyPhysicalObject: PropTypes.func.isRequired,
  getManySpecimen: PropTypes.func.isRequired,
  getManyStorageLocation: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

class StorageLocationManager extends Component {
  constructor(props) {
    super(props)
    this.getChildren = this.getChildren.bind(this)
    this.getSpecimens = this.getSpecimens.bind(this)
    this.fetchRelationshipsBeforeDelete = this.fetchRelationshipsBeforeDelete.bind(
      this
    )
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderFilterForm = this.renderFilterForm.bind(this)
  }

  getChildren() {
    const { getManyStorageLocation, itemId } = this.props

    return getManyStorageLocation({
      limit: 30,
      queryParams: { filter: { parentId: itemId } },
    }).then(children => {
      return children
    })
  }

  getSpecimens() {
    const { getManyPhysicalObject, getManySpecimen, itemId } = this.props

    return getManyPhysicalObject({
      limit: 100, // something big enough to likely return >=30 specimens if available
      queryParams: { filter: { storageLocationId: itemId } },
    }).then(physicalObjects => {
      if (!physicalObjects.length) {
        return []
      }

      const physicalObjectIds = physicalObjects.map(({ id }) => id)

      return getManySpecimen({
        limit: 30,
        queryParams: { filter: { physicalObjectIds } },
      }).then(specimens => {
        return specimens
      })
    })
  }

  fetchRelationshipsBeforeDelete() {
    return Promise.all([this.getChildren(), this.getSpecimens()]).then(
      ([children, specimens]) => {
        return Promise.resolve({
          children: { data: children },
          specimens: { data: specimens },
        })
      }
    )
  }

  renderEditForm(props = {}) {
    const { itemId } = this.props
    return <EditForm {...props} itemId={itemId} />
  }
  renderCreateForm(props = {}) {
    return <CreateForm {...props} onInteraction={this.handleInteraction} />
  }

  renderFilterForm(props = {}) {
    return <FilterForm {...props} onInteraction={this.handleInteraction} />
  }

  render() {
    return (
      <ResourceManager
        {...this.props}
        baseTreeFilter={baseTreeFilter}
        buildEditItemHeaders={buildEditItemHeaders}
        buildFilterQuery={buildFilterQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        fetchRelationshipsBeforeDelete={this.fetchRelationshipsBeforeDelete}
        ItemTitle={ItemTitle}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource={resource}
        sortOrder={sortOrder}
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled
        treeItemFetchOptions={treeItemFetchOptions}
      />
    )
  }
}

StorageLocationManager.propTypes = propTypes
StorageLocationManager.defaultProps = defaultProps

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  )
)(StorageLocationManager)
