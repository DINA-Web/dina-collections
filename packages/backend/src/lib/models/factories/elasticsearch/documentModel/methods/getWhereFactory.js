const getWhereWrapper = require('../../../wrappers/methods/getWhere')
const extractMetaFromResult = require('../../utilities/extractMetaFromResult')
const extractItemsFromResult = require('../../utilities/extractItemsFromResult')
const extractItemsFromAggregations = require('../../utilities/extractItemsFromAggregations')
const extractFieldsFromUserInput = require('../../../../../data/fields/utilities/extractFieldsFromUserInput')
const extractSortObjectsFromUserInput = require('../../../../../data/sort/utilities/extractSortObjectsFromUserInput')

const buildWhere = ({
  aggregations,
  aggregationSpecification,
  buildWhereFilter,
  buildWhereQuery,
  filterInput,
  filterSpecification,
  query,
}) => {
  if (query || aggregations) {
    return buildWhereQuery({
      aggregations,
      aggregationSpecification,
      filterSpecification,
      query,
    })
  }
  if (filterInput) {
    return buildWhereFilter({
      filterInput,
      filterSpecification,
    })
  }

  throw new Error('Provide either query or filterInput')
}

module.exports = function getWhereFactory({
  buildWhereFilter,
  buildWhereQuery,
  elasticsearch,
  Model,
}) {
  return getWhereWrapper(
    ({
      aggregations,
      aggregationSpecification,
      excludeFieldsInput = [],
      filterInput = {},
      filterSpecification = {},
      idsInMeta,
      includeFieldsInput,
      limit = 10,
      offset = 0,
      query,
      raw,
      scroll,
      scrollId,
      selectableFields,
      sortableFields,
      sortInput,
    }) => {
      return buildWhere({
        aggregations,
        aggregationSpecification,
        buildWhereFilter,
        buildWhereQuery,
        filterInput,
        filterSpecification,
        query,
      }).then(where => {
        let options = {
          scroll: scroll ? '30s' : undefined,
        }
        let methodName
        if (scrollId) {
          methodName = 'scroll'
          options = {
            ...options,
            scrollId,
          }
        } else {
          const sortObjects = extractSortObjectsFromUserInput({
            sortableFields,
            sortInput,
          })
          let sort = '_id:desc'

          if (
            sortObjects &&
            sortObjects.length === 1 &&
            sortObjects[0].order === 'relevance'
          ) {
            sort = undefined
          } else if (sortObjects && sortObjects.length) {
            sort = sortObjects
              .filter(({ order: sortOrder }) => {
                return sortOrder !== 'relevance'
              })
              .map(sortObject => {
                return `${sortObject.path}:${sortObject.order}`
              })
          }

          const fields =
            extractFieldsFromUserInput({
              includeFieldsInput,
              selectableFields,
            }) || []

          let sourceOptions = {}

          if (fields.length === 1 && fields[0] === 'id') {
            sourceOptions = {
              _source: false,
            }
          } else
            sourceOptions = {
              _sourceExclude: excludeFieldsInput.length
                ? excludeFieldsInput
                : undefined,
              _sourceInclude: fields.length ? fields : undefined,
            }

          if (aggregations && aggregations.length) {
            let includeSource = false

            aggregations.forEach(({ aggregationFunction }) => {
              const spec =
                aggregationSpecification.aggregations[aggregationFunction]
              if (spec && spec.includeSource) {
                includeSource = true
              }
            })
            if (includeSource === false) {
              sourceOptions._source = false // eslint-disable-line
            }
          }

          const body = raw || where
          methodName = 'search'
          options = {
            ...options,
            ...sourceOptions,
            body,
            from: offset,
            index: Model.index,
            size: limit,
            sort,
            type: Model.name,
          }
        }

        return elasticsearch[methodName](options).then(res => {
          if (raw) {
            return { items: [], meta: res }
          }
          const meta = extractMetaFromResult({ idsInMeta, result: res })
          let items = []
          if (aggregations && aggregations.length) {
            items = extractItemsFromAggregations({
              aggregations,
              aggregationSpecification,
              result: res,
            })
          } else {
            items = extractItemsFromResult({
              idsInMeta,
              result: res,
            })
          }

          return { items, meta }
        })
      })
    }
  )
}
