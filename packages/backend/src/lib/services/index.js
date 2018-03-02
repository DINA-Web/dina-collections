const createLog = require('../../utilities/log')
const createService = require('./serviceFactory')

const log = createLog('lib/services')

module.exports = function createServices({ config = {}, serviceDefinitions }) {
  log.info('Create services')
  return Object.keys(serviceDefinitions).reduce((services, serviceName) => {
    if (config && config.services && !config.services[serviceName]) {
      return services
    }

    const service = createService({
      log: log.scope(),
      serviceDefinition: serviceDefinitions[serviceName],
    })

    return {
      ...services,
      [serviceName]: service,
    }
  }, {})
}
