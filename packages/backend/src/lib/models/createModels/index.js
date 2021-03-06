const createLog = require('../../../utilities/log')
const internalCreateModels = require('./createModels')
const createRelations = require('./createRelations')
const synchronizeModels = require('./synchronizeModels')

const defaultLog = createLog('lib/models')

module.exports = function createModels({
  config,
  elasticsearch,
  inMemoryDb,
  log = defaultLog,
  modelSpecifications,
  sequelize,
}) {
  log.info('creating models from modelSpecifications')
  return Promise.resolve().then(() => {
    return internalCreateModels({
      config,
      elasticsearch,
      inMemoryDb,
      modelSpecifications,
      sequelize,
    }).then(({ modelArray, modelObject: models }) => {
      log.scope().info('setting up relations')
      return createRelations({ modelArray, models }).then(() => {
        const syncModels = config.env.isTest && config.test.syncModels
        if (!syncModels) {
          return models
        }
        log.scope().info('synchronizing models')
        return synchronizeModels({ config, modelArray }).then(() => {
          return models
        })
      })
    })
  })
}
