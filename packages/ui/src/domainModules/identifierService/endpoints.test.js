import * as endpoints from './endpoints'

const expectedKeys = [
  'CREATE_CATALOG_NUMBER',
  'GET_CATALOG_NUMBER',
  'GET_CATALOG_NUMBERS',
  'UPDATE_CATALOG_NUMBER',
]

describe('domainModules/identifierService/endpoints', () => {
  it('exports expected endpoints', () => {
    expect(Object.keys(endpoints).sort()).toEqual(expectedKeys.sort())
  })

  Object.keys(endpoints).forEach(endpointKey => {
    it('contains methodname, operationId and pathname', () => {
      const endpoint = endpoints[endpointKey]
      const keys = Object.keys(endpoint)
      expect(keys).toContain('methodName')
      expect(keys).toContain('operationId')
      expect(keys).toContain('pathname')
    })
  })
})
