const extractRelationships = require('../../../operationFactories/utilities/relationships/extractRelationships')
const buildIncludeArray = require('../../../operationFactories/utilities/relationships/buildIncludeArray')

module.exports = function ancestorsToId({ model, models, operation, request }) {
  const { includeRelations, relations } = operation
  const id =
    request &&
    request.queryParams &&
    request.queryParams.filter &&
    request.queryParams.filter.ancestorsToId

  if (!id) {
    return Promise.resolve({
      request,
    })
  }

  let include
  if (relations && includeRelations) {
    include = buildIncludeArray({
      models,
      queryParamRelationships: 'parent',
      relations,
    })
  }

  const fetchedIds = {}

  const ancestors = []

  const fetchAncestors = ancestorId => {
    return model
      .getById({
        id: ancestorId,
        include,
      })
      .then(({ item }) => {
        if (!item) {
          return null
        }
        const relationships =
          includeRelations &&
          extractRelationships({
            item,
            queryParamRelationships: 'parent',
            relations,
          })

        const parent =
          relationships && relationships.parent && relationships.parent.data
        if (parent && parent.id) {
          if (fetchedIds[parent.id]) {
            throw new Error(`Recursion for id: ${parent.id}`)
          }

          fetchedIds[parent.id] = true
          ancestors.push(parent)
          return fetchAncestors(parent.id)
        }
        return null
      })
  }

  return fetchAncestors(id)
    .then(() => {
      const updatedRequest = {
        ...request,
        queryParams: {
          ...request.queryParams,
          filter: {
            ids: ancestors.map(ancestor => {
              return ancestor.id
            }),
          },
        },
      }
      return {
        request: updatedRequest,
      }
    })
    .catch(() => {
      return {
        items: [],
        meta: {},
      }
    })
}
