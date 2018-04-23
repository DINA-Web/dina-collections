const apiDescribe = require('../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../utilities/test/testApiClient')
const waitForApiRestart = require('../../utilities/test/waitForApiRestart')
const expectSingleResourceResponse = require('../../utilities/test/expectSingleResourceResponse')

const physicalObjectExample = {
  data: {
    attributes: {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    },
    type: 'physicalObject',
  },
}

const storageLocationExample = {
  data: {
    attributes: {
      name: 'some location',
    },
    type: 'storageLocation',
  },
}

apiDescribe('storage', () => {
  let authToken
  beforeAll(() => {
    return waitForApiRestart().then(() => {
      authToken = 1234
    })
  })

  it('Runs storage tests', () => {
    expect(!!authToken).toBeTruthy()
    expect(1).toBe(1)
  })

  describe('createPhysicalObject', () => {
    it('Succeed with simple example', () => {
      return makeTestCall({
        authToken,
        body: physicalObjectExample,
        operationId: 'createPhysicalObject',
        validateOutput: true,
      }).then(response => {
        expectSingleResourceResponse({
          expectedType: 'physicalObject',
          response,
        })
      })
    })
  })
  describe('createStorageLocation', () => {
    it('Succeed with simple example', () => {
      return makeTestCall({
        authToken,
        body: storageLocationExample,
        operationId: 'createStorageLocation',
        validateOutput: true,
      }).then(res => {
        expect(res).toBeTruthy()
        expect(res.data).toBeTruthy()
        expect(res.data.type).toBe('storageLocation')
        expect(res.data.attributes).toBeTruthy()
      })
    })
  })
  describe('Tmp', () => {
    it('Succeed with complex relation example', () => {
      let storageLocationId
      let physicalObjectId
      return makeTestCall({
        authToken,
        body: storageLocationExample,
        operationId: 'createStorageLocation',
        validateOutput: true,
      })
        .then(storageLocationRes => {
          expect(storageLocationRes).toBeTruthy()
          expect(storageLocationRes.data).toBeTruthy()
          expect(storageLocationRes.data.type).toBe('storageLocation')
          expect(storageLocationRes.data.attributes).toBeTruthy()
          storageLocationId = storageLocationRes.data.id
          return storageLocationId
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: physicalObjectExample,
            operationId: 'createPhysicalObject',
            validateOutput: true,
          }).then(physicalObjectRes => {
            expect(physicalObjectRes).toBeTruthy()
            expect(physicalObjectRes.data).toBeTruthy()
            expect(physicalObjectRes.data.type).toBe('physicalObject')
            physicalObjectId = physicalObjectRes.data.id
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: {
              data: {
                id: storageLocationId,
                type: 'storageLocation',
              },
            },
            operationId: 'updatePhysicalObjectStorageLocation',
            pathParams: {
              id: physicalObjectId,
            },
            validateOutput: true,
          }).then(createRelationRes => {
            expect(createRelationRes).toBeTruthy()
            expect(createRelationRes.data).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getPhysicalObjectStorageLocation',
            pathParams: {
              id: physicalObjectId,
            },
            validateOutput: true,
          }).then(getRelationRes => {
            expect(getRelationRes).toBeTruthy()
            expect(getRelationRes.data).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getStorageLocationPhysicalObjects',
            pathParams: {
              id: storageLocationId,
            },
            validateOutput: true,
          }).then(getStorageRelationRes => {
            expect(getStorageRelationRes).toBeTruthy()
            expect(getStorageRelationRes.data).toBeTruthy()
            expect(getStorageRelationRes.data.length > 0).toBeTruthy()
          })
        })
    })
  })
  describe('Tmp2', () => {
    it('Succeed with relation example', () => {
      let storageLocationId
      let physicalObjectId
      return makeTestCall({
        authToken,
        body: storageLocationExample,
        operationId: 'createStorageLocation',
        validateOutput: true,
      })
        .then(storageLocationRes => {
          expect(storageLocationRes).toBeTruthy()
          expect(storageLocationRes.data).toBeTruthy()
          expect(storageLocationRes.data.type).toBe('storageLocation')
          expect(storageLocationRes.data.attributes).toBeTruthy()
          storageLocationId = storageLocationRes.data.id
          return storageLocationId
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: physicalObjectExample,
            operationId: 'createPhysicalObject',
            validateOutput: true,
          }).then(physicalObjectRes => {
            expect(physicalObjectRes).toBeTruthy()
            expect(physicalObjectRes.data).toBeTruthy()
            expect(physicalObjectRes.data.type).toBe('physicalObject')
            physicalObjectId = physicalObjectRes.data.id
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: {
              data: {
                id: storageLocationId,
                type: 'storageLocation',
              },
            },
            operationId: 'updatePhysicalObjectStorageLocation',
            pathParams: {
              id: physicalObjectId,
            },
            validateOutput: true,
          }).then(createRelationRes => {
            expect(createRelationRes).toBeTruthy()
            expect(createRelationRes.data).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getPhysicalObject',
            pathParams: {
              id: physicalObjectId,
            },
            queryParams: {
              relationships: ['all'],
            },
            validateOutput: true,
          }).then(physicalObject => {
            expect(physicalObject).toBeTruthy()
            expect(physicalObject.data).toBeTruthy()
            expect(physicalObject.data.relationships).toBeTruthy()
            expect(
              physicalObject.data.relationships.storageLocation
            ).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getStorageLocation',
            pathParams: {
              id: storageLocationId,
            },
            queryParams: {
              relationships: ['all'],
            },
            validateOutput: true,
          }).then(storageLocation => {
            expect(storageLocation).toBeTruthy()
            expect(
              storageLocation.data.relationships.physicalObjects
            ).toBeTruthy()
            expect(
              storageLocation.data.relationships.physicalObjects.data[0]
            ).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getPhysicalObjects',
            queryParams: {
              relationships: ['all'],
            },
            validateOutput: true,
          }).then(physicalObjects => {
            expect(physicalObjects).toBeTruthy()
            const { data } = physicalObjects
            expect(data[0].relationships.storageLocation.data.id).toBe(
              storageLocationId
            )
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getStorageLocations',
            queryParams: {
              relationships: ['all'],
            },
            validateOutput: true,
          }).then(storageLocations => {
            expect(storageLocations).toBeTruthy()
            const { data } = storageLocations
            expect(data[0].relationships.physicalObjects.data[0].id).toBe(
              physicalObjectId
            )
          })
        })
    })
  })
})
