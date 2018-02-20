const createLog = require('../../../utilities/log')
const chainPromises = require('common/src/chainPromises')

const log = createLog('lib/postgres/models/syncModels')

module.exports = function syncModels({ config, modelArray }) {
  log.info(`Syncing models: flushOnRestart = ${config.db.flushOnRestart}`)
  return chainPromises(
    modelArray.map(({ model, name }) => {
      return () => {
        log.info(`Syncing model: ${name}`)
        return model.Model.sync({ force: config.db.flushOnRestart })
      }
    })
  ).then(() => {
    log.info('Syncing models done')
  })
}
