const base = require('../../schemas/operationConfigurations/baseSchema')

const filterSpecification = require('../../../data/filters/schemas/filterSpecification')
const selectableFields = require('../../../data/fields/schemas/selectableFields')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    defaultFields: selectableFields,
    filterSpecification,
    includeRelations: {
      type: 'boolean',
    },
    queryParams: {
      type: 'object',
    },
    selectableFields,
  },
  required: [...base.required],
}
