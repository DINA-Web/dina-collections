const mergeRelationships = require('../../../utilities/mergeRelationships')
const updateWrapper = require('../../../utilities/wrappers/methods/update')
const createLog = require('../../../../../utilities/log')

const log = createLog(
  'lib/elasticsearch/models/normalizedElasticModel/methods/updateFactory'
)

module.exports = function updateFactory({
  Model,
  elasticsearch,
  forceRefresh,
} = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return updateWrapper(({ item = {}, id }) => {
    const { attributes, internals = {}, relationships } = item
    if (!attributes) {
      return Promise.reject(new Error('attributes not provided'))
    }

    log.info(`Updating instance for model ${Model.name}`)

    return elasticsearch
      .get({
        id,
        index: Model.index,
        type: Model.name,
      })
      .then(res => {
        const oldItem = res && res._source // eslint-disable-line no-underscore-dangle
        const mergedRelationships = mergeRelationships(
          oldItem.relationships,
          relationships
        )

        const newItem = {
          attributes,
          id,
          internals,
          relationships: mergedRelationships,
        }

        return elasticsearch
          .index({
            body: newItem,
            id,
            index: Model.index,
            refresh: forceRefresh,
            type: Model.name,
          })
          .then(() => {
            log.info(`Update instance for model ${Model.name}. id: ${id}`)

            return {
              item: newItem,
            }
          })
          .catch(err => {
            log.err(`Error updating instance for model ${Model.name}`, err)
            throw err
          })
      })
  })
}
