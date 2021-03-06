const createOpenApiMockClient = require('../../../openApiClient/utilities/createOpenApiMockClient')
const { create, dep } = require('./index')

describe('jsonApiClient/modify/create', () => {
  it('exports function create', () => {
    expect(typeof create).toEqual('function')
  })
  it('exports object dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if openApiClient not provided', () => {
    expect.assertions(1)
    return expect(
      create({
        item: {
          type: 'user',
        },
      })
    ).rejects.toThrow('provide openApiClient')
  })

  it('rejects if item not provided', () => {
    expect.assertions(1)
    return expect(
      create({
        openApiClient: {},
      })
    ).rejects.toThrow('item required')
  })

  it('rejects if type not provided in item', () => {
    expect.assertions(1)
    return expect(
      create({
        item: {},
        openApiClient: {},
      })
    ).rejects.toThrow('type is required')
  })

  it('rejects if item with id provided', () => {
    expect.assertions(1)
    return expect(
      create({
        item: {
          id: 2,
          type: 'user',
        },
        openApiClient: {},
      })
    ).rejects.toThrow('not allowed to create with id')
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    beforeEach(() => {
      depSpies = dep.createSpies({
        buildOperationId: () => {
          return 'operationId'
        },
      })
      openApiClient = createOpenApiMockClient({
        call: () => {
          return 'apiResponse'
        },
      })
    })

    it('call buildOperationId and openApiClient', () => {
      expect.assertions(6)
      const item = {
        attributes: {
          name: 'Alan',
        },
        type: 'user',
      }
      return create({
        item,
        openApiClient,
      }).then(res => {
        expect(depSpies.buildOperationId.mock.calls.length).toEqual(1)
        expect(depSpies.buildOperationId.mock.calls[0][0]).toEqual({
          operationType: 'create',
          resource: 'user',
        })
        expect(openApiClient.spies.call.mock.calls.length).toEqual(1)
        expect(openApiClient.spies.call.mock.calls[0][0]).toEqual('operationId')
        expect(openApiClient.spies.call.mock.calls[0][1]).toEqual({
          body: { data: item },
        })

        expect(res).toBe('apiResponse')
      })
    })
  })
})
