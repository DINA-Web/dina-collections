module.exports = function addSortingToQueryParams({
  queryParams,
  sortSpecification = {},
}) {
  const fields = sortSpecification.fields || []
  const sortEnum = []

  fields.forEach(field => {
    sortEnum.push(`${field}:asc`)
    sortEnum.push(`${field}:desc`)
  })

  if (!sortEnum.length) {
    return queryParams
  }

  return {
    ...queryParams,
    sort: {
      description: 'Sort by one or more of available fields',
      required: false,
      schema: {
        items: {
          enum: sortEnum,
          type: 'string',
        },
        type: 'array',
      },
    },
  }
}
