const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function updateRelation({
  basePath,
  errors: errorsInput = {},
  exampleRequests = {},
  exampleResponses = {},
  queryParams,
  relationKey,
  relations,
  resource,
  resourcePlural,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_BODY_VALIDATION_ERROR', 'REQUEST_ERROR'],
    '404': ['RESOURCE_NOT_FOUND_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }
  const relation = relations[relationKey]
  const { format: relationFormat, resource: relationResource } = relation

  const operationId = `update${capitalizeFirstLetter(
    resource
  )}${capitalizeFirstLetter(relationKey)}`

  return {
    ...rest,
    errors,
    method: 'patch',
    operationId,
    operationType: 'updateRelationHasOne',
    path: `${basePath}/${resourcePlural}/{id}/relationships/${relationKey}`,
    pathParams: ['id'],
    queryParams,
    relation: {
      ...relation,
      key: relationKey,
    },
    request: {
      exampleRequests,
      format: relationFormat,
      modelReference: true,
      resource: relationResource,
    },
    resource,
    response: {
      examples: exampleResponses,
      format: relationFormat,
      resource,
    },
    summary: `Update ${resource} -> ${relationKey}`,
  }
}
