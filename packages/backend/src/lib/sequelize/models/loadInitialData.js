const createLog = require('../../../utilities/log')

const log = createLog('lib/sequelize', 1)

const extractLoadInitialDataFromServies = services => {
  return Object.keys(services)
    .reduce((modelFactories, serviceName) => {
      const service = services[serviceName]
      const { models } = service
      if (!models) {
        return modelFactories
      }
      let endpointSetupRelations

      if (Array.isArray(models)) {
        endpointSetupRelations = models.map(model => {
          const { name, factory } = model
          if (name !== 'loadInitialData') {
            return null
          }
          return {
            loadInitialData: factory,
            serviceName,
          }
        })
      } else {
        endpointSetupRelations = Object.keys(models).map(name => {
          if (name !== 'loadInitialData') {
            return null
          }
          const loadInitialData = models[name]
          return {
            loadInitialData,
            serviceName,
          }
        })
      }

      return [...modelFactories, ...endpointSetupRelations]
    }, [])
    .filter(loadInitialData => !!loadInitialData)
}

module.exports = function loadInitialData({ config, services, models }) {
  if (!config.db.flushOnRestart) {
    log.debug('Dont load initial data: flushOnRestart = false')
    return Promise.resolve(true)
  }
  log.debug('Load initial data:')
  const loadInitialDataFunctions = extractLoadInitialDataFromServies(services)
  return Promise.all(
    loadInitialDataFunctions.map(
      ({ serviceName, loadInitialData: loadInitialDataFunction }) => {
        log.scope().debug(`${serviceName}`)
        return Promise.resolve(
          loadInitialDataFunction({
            models,
          })
        )
      }
    )
  )
}
