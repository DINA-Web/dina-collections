const extractFieldsFromItem = require('../../../data/fields/utilities/extractFieldsFromItem')
const extractFieldsFromUserInput = require('../../../data/fields/utilities/extractFieldsFromUserInput')
const getOneWhereWrapper = require('../../utilities/wrappers/methods/getOneWhere')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')

module.exports = function getOneWhereFactory({ buildWhereFilter, Model }) {
  return getOneWhereWrapper(
    ({
      excludeFieldsInput = [],
      filterInput,
      filterSpecification,
      include = undefined,
      includeDeactivated = false,
      includeFieldsInput = [],
      raw = true,
      selectableFields = [],
      where: customWhere,
    }) => {
      return buildWhereFilter({
        filterInput,
        filterSpecification,
        where: customWhere,
      }).then(where => {
        return Model.findOne({
          include,
          order: [['id', 'DESC']],
          paranoid: !includeDeactivated,
          where,
        }).then(res => {
          if (!raw) {
            return { item: res }
          }

          const { item } = formatModelItemResponse({ input: res })
          const fields = extractFieldsFromUserInput({
            includeFieldsInput,
            selectableFields,
          })

          if (fields.length || excludeFieldsInput.length) {
            return {
              item: extractFieldsFromItem({
                excludeFieldsInput,
                fields,
                item,
              }),
            }
          }

          return {
            item,
          }
        })
      })
    }
  )
}
