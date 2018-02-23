const createArrayResponse = require('../lib/api/utilities/createArrayResponse')
const transformOutput = require('./transformations/outputArray')

module.exports = function getRelationsHasMany({ connectorOptions, models }) {
  const {
    resource,
    relation: { key: relationKey, resource: relationResource },
  } = connectorOptions

  const model = models[resource]
  const relationModel = models[relationResource]
  if (!model) {
    throw new Error(`Root not provided for ${resource}`)
  }

  if (!relationModel) {
    throw new Error(`Root not provided for ${relationModel}`)
  }

  return ({ request }) => {
    const { pathParams: { id } } = request
    return model
      .getOneWhere({
        include: [
          {
            as: relationKey,
            model: relationModel.Model,
          },
        ],
        raw: false,
        where: { id },
      })
      .then(result => {
        if (!(result && result[relationKey])) {
          const error = new Error(
            `Cant find relation ${relationKey} for ${resource} id ${id} `
          )
          error.status = 404
          throw error
        }

        return result[relationKey].map(physicalUnit => {
          return physicalUnit.dataValues
        })
      })
      .then(transformOutput)
      .then(items => {
        return createArrayResponse({
          items,
          type: resource,
        })
      })
  }
}
