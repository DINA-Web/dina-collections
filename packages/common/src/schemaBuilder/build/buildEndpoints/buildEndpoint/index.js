const buildDescription = require('./buildDescription')
const buildResponse = require('./buildResponse')
const buildRequest = require('./buildRequest')

module.exports = function buildEndpoint({
  auth = true,
  description: descriptionInput,
  errors,
  inverseOperationId,
  method,
  operationId,
  path,
  pathParams: rawPathParams = [],
  queryParams,
  request: requestInput,
  resource,
  response: responseInput = {},
  summary,
  tags,
}) {
  const description = buildDescription({
    description: descriptionInput,
    inverseOperationId,
  })

  const pathParams = rawPathParams.reduce((obj, key) => {
    return {
      ...obj,
      [key]: {
        description: `${resource} ${key}`,
        example: '1',
        required: true,
        schema: {
          type: 'string',
        },
      },
    }
  }, {})

  const selfLink = path

  const response = buildResponse({
    resource,
    ...responseInput,
    operationId, // eslint-disable-line
    selfLink,
  })

  const request = requestInput
    ? buildRequest({
        resource,
        ...requestInput,
        operationId, // eslint-disable-line
      })
    : undefined

  return {
    description,
    errors,
    inverseOperationId,
    method,
    operationId,
    path,
    pathParams,
    queryParams,
    request,
    response,
    security: auth
      ? [
          {
            bearerAuth: [],
          },
        ]
      : undefined,
    summary,
    tags,
  }
}
