const addEmptyRelationships = require('./addEmptyRelationships')

describe('lib/controllers/relationshipsUtilities/extractRelationships/extractRelationships', () => {
  it('is a function', () => {
    expect(typeof addEmptyRelationships).toBe('function')
  })
  it('dont add relationships if no queryParamRelationships or relations', () => {
    const queryParamRelationships = []
    const relations = {}
    const relationshipsData = {}

    expect(
      addEmptyRelationships({
        queryParamRelationships,
        relations,
        relationshipsData,
      })
    ).toEqual({})
  })
  it('handle complex case', () => {
    const queryParamRelationships = ['children', 'parent']
    const relations = {
      children: {
        format: 'array',
        resource: 'curatedLocality',
      },
      parent: {
        format: 'object',
        resource: 'curatedLocality',
      },
    }
    const relationshipsData = {
      parent: {
        data: [1, 2, 3],
      },
    }

    expect(
      addEmptyRelationships({
        queryParamRelationships,
        relations,
        relationshipsData,
      })
    ).toEqual({
      children: {
        data: [],
      },
      parent: {
        data: [1, 2, 3],
      },
    })
  })
})
