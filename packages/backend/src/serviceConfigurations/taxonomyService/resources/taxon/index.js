const migrations = require('./migrations')
const {
  importDataFromFile: importDataFromFileTransformationSpecification,
} = require('./transformationSpecifications')

const buildOperationId = require('common/src/buildOperationId')
const createRequestSuccess = require('./exampleRequests/createSuccess.json')

const {
  create: createPostHooks,
  del: delPostHooks,
  update: updatePostHooks,
  updateInternalRelationship: updateInternalRelationshipPostHooks,
  updateExternalRelationship: updateExternalRelationshipPostHooks,
} = require('./postHooks')

const {
  getMany: getManyFilterSpecification,
  query: queryFilterSpecification,
} = require('./filterSpecifications')

const {
  updateRelationshipParent: updateRelationshipParentPreHooks,
} = require('./preHooks')

module.exports = {
  migrations,
  model: {
    name: 'taxon',
    relations: ['taxonName'],
    type: 'sequelizeDocumentModel',
  },
  operations: [
    {
      exampleRequests: { primary: createRequestSuccess },
      postHooks: createPostHooks,
      type: 'create',
    },
    {
      includeRelations: true,
      type: 'getOne',
    },
    {
      filterSpecification: getManyFilterSpecification,
      includeRelations: true,
      type: 'getMany',
    },
    {
      filterSpecification: getManyFilterSpecification,
      type: 'count',
    },
    {
      filterSpecification: queryFilterSpecification,
      selectableFields: ['id'],
      type: 'query',
    },
    {
      postHooks: updatePostHooks,
      type: 'update',
    },
    {
      postHooks: delPostHooks,
      type: 'del',
    },
    {
      relationKey: 'parent',
      type: 'getRelationship',
    },
    {
      postHooks: updateInternalRelationshipPostHooks,
      preHooks: updateRelationshipParentPreHooks,
      relationKey: 'parent',
      type: 'updateRelationship',
    },
    {
      transformationSpecification: importDataFromFileTransformationSpecification,
      type: 'importDataFromFile',
    },
    {
      relationKey: 'children',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'parent',
        resource: 'taxon',
      }),
      relationKey: 'children',
      type: 'updateRelationship',
    },
    {
      relationKey: 'acceptedTaxonName',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'acceptedToTaxon',
        resource: 'taxonName',
      }),
      relationKey: 'acceptedTaxonName',
      type: 'updateRelationship',
    },
    {
      relationKey: 'specimens',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'taxa',
        resource: 'specimen',
      }),
      relationKey: 'specimens',
      type: 'updateRelationship',
    },
    {
      relationKey: 'storageLocations',
      type: 'getRelationship',
    },
    {
      relationKey: 'synonyms',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'synonymToTaxon',
        resource: 'taxonName',
      }),
      postHooks: updateExternalRelationshipPostHooks,
      relationKey: 'synonyms',
      type: 'updateRelationship',
    },
    {
      relationKey: 'vernacularNames',
      type: 'getRelationship',
    },
    {
      connect: false,
      inverseOperationId: buildOperationId({
        operationType: 'updateRelationship',
        relationKey: 'vernacularToTaxon',
        resource: 'taxonName',
      }),
      postHooks: updateExternalRelationshipPostHooks,
      relationKey: 'vernacularNames',
      type: 'updateRelationship',
    },
  ],
  resource: 'taxon',
  resourcePath: 'taxa',
}
