const formatModelItemsResponse = require('../utilities/formatModelItemsResponse')
const bulkCreateWrapper = require('../../utilities/wrappers/methods/bulkCreate')
const createLog = require('../../../../utilities/log')

const log = createLog('lib/models/documentModel/methods/bulkCreateFactory')

module.exports = function bulkCreateFactory({
  Model,
  updatePrimaryKey,
  validate: validateFunction,
} = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  // This should only be used to create test initialData
  return bulkCreateWrapper(({ items = [], validate = true }) => {
    log.info(`Start create ${items.length} items for: ${Model.tableName}`)
    if (items.length === 0) {
      return Promise.resolve({ items: [], meta: { count: 0 } })
    }

    return Model.bulkCreate(
      items.map(item => {
        if (validateFunction && validate) {
          const errors = validateFunction(item.attributes)
          if (errors) {
            throw errors
          }
        }
        const { attributes, id, internals = {}, relationships } = item
        return {
          document: attributes,
          id,
          relationships,
          schemaCompliant: true,
          ...internals,
        }
      }),
      { returning: true }
    ).then(res => {
      const resultItems = formatModelItemsResponse({ input: res })

      log.info(`Successfully created ${resultItems.length} items`)
      const lastId = Number(resultItems[resultItems.length - 1].id)
      const newId = lastId + 1
      return updatePrimaryKey(newId).then(() => {
        return {
          items: resultItems,
          meta: { count: resultItems && resultItems.length },
        }
      })
    })
  })
}
