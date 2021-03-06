const createLogMock = require('../../log/createLogMock')
const { recursiveUpdate, dep } = require('./recursiveUpdate')
const clone = require('../utilities/clone')

describe('jsonApiClient/modify/recursiveUpdate', () => {
  it('exports function recursiveUpdate', () => {
    expect(typeof recursiveUpdate).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if openApiClient not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveUpdate({
        item: {
          type: 'user',
        },
        resourceType: 'user',
      })
    ).rejects.toThrow('provide openApiClient')
  })

  it('rejects if item not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveUpdate({
        openApiClient: {},
        resourceType: 'user',
      })
    ).rejects.toThrow('item is required')
  })

  it('rejects if item type not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveUpdate({
        item: {
          id: 2,
        },
        openApiClient: {},
        resourceType: 'user',
      })
    ).rejects.toThrow('item type is required')
  })

  it('rejects if resourceType not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveUpdate({
        item: {
          id: 2,
          type: 'user',
        },
        openApiClient: {},
      })
    ).rejects.toThrow('resourceType is required')
  })

  it('rejects if item.id not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveUpdate({
        item: {
          type: 'user',
        },
        openApiClient: {},
      })
    ).rejects.toThrow('id is required')
  })

  it('rejects if resourceType !== item.type', () => {
    expect.assertions(1)
    return expect(
      recursiveUpdate({
        item: {
          id: 2,
          type: 'user',
        },
        openApiClient: {},
        resourceType: 'specimen',
      })
    ).rejects.toThrow('wrong item type: user for resourceType: specimen')
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    let updatedItem
    let updatedRelationships
    let testLog
    beforeEach(() => {
      testLog = createLogMock('test')
      updatedItem = {
        attributes: {
          name: 'Alan',
        },
        id: '123',
        type: 'user',
      }
      depSpies = dep.createSpies({
        modifyIncludes: ({ relationships }) => {
          if (!relationships) {
            return Promise.resolve({})
          }
          updatedRelationships = {
            projects: {
              data: [
                {
                  id: 1,
                  type: 'project',
                },
              ],
            },
          }
          return Promise.resolve(updatedRelationships)
        },
        updateWithRelationships: () => {
          return Promise.resolve({ data: updatedItem })
        },
      })
      openApiClient = {}
    })
    describe('when relationhips provided', () => {
      let item
      let result
      beforeEach(() => {
        item = {
          attributes: {
            name: 'Eva',
          },
          id: 2,
          relationships: {
            projects: {
              data: [
                {
                  id: 1,
                  type: 'project',
                },
              ],
            },
          },
          type: 'user',
        }
        return recursiveUpdate({
          item,
          log: testLog,
          openApiClient: {},
          resourceType: 'user',
        }).then(res => {
          result = res
        })
      })

      it('call modifyIncludes', () => {
        expect(depSpies.modifyIncludes.mock.calls.length).toEqual(1)
        expect(clone(depSpies.modifyIncludes.mock.calls[0][0])).toEqual(
          clone({
            log: testLog.scope(),
            openApiClient,
            relationships: item.relationships,
            resourcePath: 'user',
          })
        )
      })

      it('call updateWithRelationships', () => {
        expect(depSpies.updateWithRelationships.mock.calls.length).toEqual(1)
        expect(
          clone(depSpies.updateWithRelationships.mock.calls[0][0])
        ).toEqual(
          clone({
            item: {
              attributes: item.attributes,
              id: item.id,
              relationships: {
                projects: { data: [{ id: 1, type: 'project' }] },
              },
              type: item.type,
            },
            log: testLog.scope(),
            openApiClient,
            resourcePath: 'user',
          })
        )
      })

      it('return created item', () => {
        expect(result).toEqual({ data: updatedItem })
      })
    })

    describe('when relationhips not provided', () => {
      let item
      let result
      beforeEach(() => {
        item = {
          attributes: {
            name: 'Eva',
          },
          id: 1,
          type: 'user',
        }
        return recursiveUpdate({
          item,
          log: testLog,
          openApiClient: {},
          resourceType: 'user',
        }).then(res => {
          result = res
        })
      })

      it('call modifyIncludes', () => {
        expect(depSpies.modifyIncludes.mock.calls.length).toEqual(1)
        expect(clone(depSpies.modifyIncludes.mock.calls[0][0])).toEqual(
          clone({
            log: testLog.scope(),
            openApiClient,
            resourcePath: 'user',
          })
        )
      })

      it('call updateWithRelationships', () => {
        expect(depSpies.updateWithRelationships.mock.calls.length).toEqual(1)
        expect(
          clone(depSpies.updateWithRelationships.mock.calls[0][0])
        ).toEqual(
          clone({
            item: {
              attributes: item.attributes,
              id: item.id,
              relationships: {},
              type: item.type,
            },
            log: testLog.scope(),
            openApiClient,
            resourcePath: 'user',
          })
        )
      })

      it('return created item', () => {
        expect(result).toEqual({ data: updatedItem })
      })
    })
  })
})
