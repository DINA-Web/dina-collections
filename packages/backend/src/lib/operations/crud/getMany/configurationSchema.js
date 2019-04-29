const base = require('../../schemas/operationConfigurations/baseSchema')

const filterSpecification = require('../../../data/filters/schemas/filterSpecification')
const selectableFields = require('../../../data/fields/schemas/selectableFields')
const sortableFields = require('../../../data/sort/schemas/sortableFields')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    defaultFields: selectableFields,
    disableWrapperLog: {
      type: 'boolean',
    },
    filterSpecification,
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
    selectableFields,
    sortableFields,
  },
  required: [...base.required],
}
