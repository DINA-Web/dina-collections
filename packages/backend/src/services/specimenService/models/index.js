// const loadInitialData = require('./loadInitialData')
const createModel = require('../../../lib/sequelize/models/factories/versionedDocumentModel')

const normalizedColumnNames = [
  'determinations',
  'distinguishedUnits',
  'events',
  'featureObservations',
  'identifiers',
  'individualCircumstances',
  'individualGroup',
  'relationships',
  'taxonInformation',
]

const specimenFactory = function specimen({ sequelize }) {
  return createModel({
    name: 'Specimen',
    normalizedColumnNames,
    schemaModelName: 'specimen',
    schemaVersion: '1.0.1',
    sequelize,
  })
}

module.exports = [
  {
    factory: specimenFactory,
    name: 'specimen',
  },
  // {
  //   factory: loadInitialData,
  //   name: 'loadInitialData',
  // },
]
