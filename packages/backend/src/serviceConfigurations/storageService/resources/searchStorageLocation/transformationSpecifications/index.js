const fieldsSpecification = require('../fieldsSpecification')
const extractTransformations = require('../../../../../lib/data/fields/utilities/extractTransformationFunctions')

const fieldTransformations = extractTransformations({
  fieldsSpecification,
  format: 'array',
})

const transformationFunctions = fieldTransformations

exports.updateView = {
  description: 'Transforming data from storageLocation',
  resolveRelations: {
    storageLocation: ['parent'],
  },
  srcResource: 'storageLocation',
  transformationFunctions,
}

exports.rebuildView = {
  cacheRequestsToResources: ['storageLocation'],
  description: 'Transforming data from storageLocation',
  numberOfEntriesEachBatch: 100,
  resolveRelations: {
    storageLocation: ['parent'],
  },
  srcResource: 'storageLocation',
  transformationFunctions,
}
