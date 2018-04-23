const exportedFunctions = require('./index')

const expectedFunctions = ['capitalizeFirstLetter', 'camelCaseToUpperSnakeCase']

describe('stringFormatters', () => {
  it('exports expected functions', () => {
    expect(Object.keys(exportedFunctions).sort()).toEqual(
      expectedFunctions.sort()
    )
  })
})
