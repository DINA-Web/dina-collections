const getOneWhereWrapper = require('../../../utilities/wrappers/methods/getOneWhere')

module.exports = function getOneWhereFactory({ Model, getWhere }) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return getOneWhereWrapper(
    ({
      excludeFieldsInput = [],
      filterInput,
      filterSpecification,
      includeFieldsInput = [],
      selectableFields = [],
    }) => {
      return getWhere({
        excludeFieldsInput,
        filterInput,
        filterSpecification,
        includeFieldsInput,
        limit: 1,
        selectableFields,
      }).then(({ items }) => {
        if (!items && items.length > 0) {
          return {
            item: null,
          }
        }
        return {
          item: items[0],
        }
      })
    }
  )
}
