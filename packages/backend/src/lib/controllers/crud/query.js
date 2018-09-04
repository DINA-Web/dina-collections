const createArrayResponse = require('../utilities/transformations/createArrayResponse')

module.exports = function queryController({
  operation,
  models,
  serviceInteractor,
}) {
  const {
    aggregationSpecification,
    filterSpecification,
    resource,
    selectableFields,
    sortableFields,
  } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  if (!model.buildWhereQuery) {
    throw new Error(`Model for ${resource} dont support query`)
  }

  if (!model.getWhere) {
    throw new Error(`Model missing required method: getWhere for ${resource}`)
  }

  return ({ request }) => {
    const {
      body: {
        data: {
          attributes: {
            aggregations,
            excludeFields: excludeFieldsInput,
            filter: filterInput,
            includeFields: includeFieldsInput,
            limit,
            offset,
            query,
            scroll,
            scrollId,
          },
        },
      },
    } = request

    return model
      .getWhere({
        aggregations,
        aggregationSpecification,
        excludeFieldsInput,
        filterInput,
        filterSpecification,
        includeFieldsInput,
        limit,
        offset,
        query,
        scroll,
        scrollId,
        selectableFields,
        serviceInteractor,
        sortableFields,
      })
      .then(({ items, meta }) => {
        return createArrayResponse({
          items,
          meta,
          type: resource,
        })
      })
  }
}
