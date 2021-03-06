const base = require('../../schemas/operationConfigurations/baseSchema')

module.exports = {
  additionalProperties: false,
  properties: {
    ...base.properties,
    inverseOperationId: {
      type: 'string',
    },
    relationKey: {
      type: 'string',
    },
  },
  required: [...base.required],
}
