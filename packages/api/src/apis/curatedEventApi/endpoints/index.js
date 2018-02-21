const createResource = require('../../../lib/resourceFactory')
const { create, getOne, update, getMany } = require('../../../operations')

const createRequestSuccess = require('./createExpedition/examples/requestSuccess.json')

module.exports = createResource({
  basePath: '/curatedEventApi/v01',
  endpoints: [
    {
      connect: true,
      exampleRequests: { primary: createRequestSuccess },
      operation: create,
    },
    {
      connect: true,
      operation: getOne,
    },
    {
      connect: true,
      operation: update,
    },
    {
      connect: true,
      operation: getMany,
    },
  ],
  resource: 'expedition',
})
