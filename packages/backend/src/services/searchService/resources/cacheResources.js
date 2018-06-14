const createGetManyFilters = require('../../../lib/services/operationFactory/filters/createGetManyFilters')
const cacheResourcesSpecifications = require('../cacheResourcesSpecifications')

const filters = createGetManyFilters({
  include: ['group'],
})

module.exports = cacheResourcesSpecifications.reduce(
  (obj, { name, srcResource }) => {
    const spec = {
      basePath: '/api/search/v01',
      operations: [
        {
          exampleRequests: {
            primary: {
              data: {
                attributes: {
                  id: '123',
                  info: '123',
                },
                type: name,
              },
            },
          },
          type: 'create',
        },
        {
          type: 'getOne',
        },
        {
          type: 'getOneSync',
        },
        {
          filters,
          type: 'getMany',
        },
        {
          type: 'emptyView',
        },
        {
          type: 'update',
        },
        {
          type: 'del',
        },
        {
          srcResource,
          type: 'rebuildView',
        },
      ],
      resource: name,
    }
    return {
      ...obj,
      [name]: spec,
    }
  },
  {}
)
