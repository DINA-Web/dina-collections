import React, { Component } from 'react'

import extractNameWithFirstLevelParent from 'common/src/storage/extractNameWithFirstLevelParent'
import { DropdownSearch } from 'coreModules/form/components'

const include = ['parent.parent.parent.parent.parent']
const relationships = [
  'parent',
  'parent.parent',
  'parent.parent.parent',
  'parent.parent.parent.parent',
  'parent.parent.parent.parent.parent',
]
const resolveRelationships = ['storageLocation']

class StorageLocationDropdownSearch extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        deleteIfEmpty
        extractText={extractNameWithFirstLevelParent}
        include={include}
        nestItems
        relationships={relationships}
        resolveRelationships={resolveRelationships}
        resource="storageLocation"
        type="dropdown-search-resource"
      />
    )
  }
}

export default StorageLocationDropdownSearch
