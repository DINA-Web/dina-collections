module.exports = {
  additionalProperties: false,
  properties: {
    columns: {
      description:
        'Column definition used for the model type: sequelizeSimpleSqlModel',
      type: 'object',
    },
    indexes: {
      description: 'Index definitions for models with postgres as datastore',
      type: 'array',
    },
    mappingSpecification: {
      description:
        'Elasticsearch mappings used for models with elasticsearch as datastore',
      type: 'object',
    },
    migrations: {
      description: 'Migrations for postgres models',
      type: 'object',
    },
    name: {
      description: 'Name of the model used in the datastore',
      type: 'string',
    },
    rebuildStrategy: {
      description: 'Optional for models with elasticsearch as datastore. ',
      enum: ['swap', 'replace'],
      type: 'string',
    },
    relations: {
      type: 'array',
    },
    type: {
      description: 'Model type',
      enum: [
        'sequelizeSimpleSqlModel',
        'sequelizeDocumentModel',
        'elasticsearchDocumentModel',
        'inMemoryDocumentModel',
        'inMemoryViewDocumentModel',
      ],
      type: 'string',
    },
  },
  required: [],
}