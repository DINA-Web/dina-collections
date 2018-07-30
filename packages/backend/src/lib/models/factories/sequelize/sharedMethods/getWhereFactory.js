const getWhereWrapper = require('../../wrappers/methods/getWhere')
const formatModelItemsResponse = require('../utilities/formatModelItemsResponse')

const Sequelize = require('sequelize')

const { Op } = Sequelize

const hasDeactivatedAtFilter = where => {
  if (where.deactivatedAt !== undefined) {
    return true
  }

  if (!where[Op.and]) {
    return false
  }
  return where[Op.and].find(filter => {
    return filter.deactivatedAt !== undefined
  })
}

module.exports = function getWhereFactory({ buildWhereFilter, Model }) {
  return getWhereWrapper(
    ({
      filterInput,
      filterSpecification,
      include = [],
      limit,
      offset,
      where: customWhere,
    }) => {
      return buildWhereFilter({
        filterInput,
        filterSpecification,
        where: customWhere,
      }).then(whereInput => {
        // This is not great
        const where = hasDeactivatedAtFilter(whereInput)
          ? whereInput
          : {
              ...whereInput,
              deactivatedAt: null,
            }

        const options = {
          include,
          order: [['id', 'DESC']],
          where,
        }
        if (limit) {
          options.limit = limit
        }

        if (offset) {
          options.offset = offset
        }

        return Model.findAll(options).then(res => {
          return {
            items: formatModelItemsResponse({ input: res }),
          }
        })
      })
    }
  )
}
