module.exports = function createEqualFilter({
  filterParameter,
  filterParameterType = 'string',
  path,
}) {
  return {
    jsFilterFunction: () => {},
    key: filterParameter,
    queryParams: {
      description: `Filter by ${filterParameter}`,
      required: false,
      schema: {
        type: filterParameterType,
      },
    },
    sequelizeFilterFunction: ({ value }) => {
      if (value === undefined) {
        return null
      }

      return {
        [path]: value,
      }
    },
  }
}
