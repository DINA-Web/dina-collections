const createWrapper = require('../../utilities/wrappers/methods/create')
const formatModelItemResponse = require('../utilities/formatModelItemResponse')
const createLog = require('../../../../utilities/log')

const log = createLog('lib/models/documentModel/methods/createFactory')

module.exports = function createFactory({ Model, validate } = {}) {
  if (!Model) {
    throw new Error('Have to provide model')
  }

  return createWrapper(({ item = {} }) => {
    const { attributes, id, internals, relationships } = item

    const newItem = {
      attributes,
      id,
      relationships,
    }
    if (validate) {
      const error = validate(newItem)
      if (error) {
        log.err('schema validation failed')
      }
    }

    let data = {
      document: attributes,
      relationships,
    }

    if (internals) {
      data = {
        ...data,
        ...internals,
      }
    }

    if (id !== undefined) {
      data = {
        ...data,
        id,
      }
    }
    log.info(`Creating instance for model ${Model.tableName}`)
    return Model.create(data).then(res => {
      log.info(
        `Created instance for model ${Model.tableName}. id: ${
          res.dataValues.id
        }`
      )

      return formatModelItemResponse({ input: res })
    })
  })
}
