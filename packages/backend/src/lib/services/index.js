const createLog = require('../../utilities/log')
const createService = require('./serviceFactory')

const log = createLog('lib/services')

module.exports = function createServices({
  config = {},
  resourceRelationshipParamsMap = {},
  serviceDefinitions,
}) {
  log.info('Adding services')
  const createdServiceNames = []
  const createdServices = Object.keys(serviceDefinitions).reduce(
    (services, serviceName) => {
      if (config && config.services && !config.services[serviceName]) {
        return services
      }

      const service = createService({
        resourceRelationshipParamsMap,
        serviceDefinition: serviceDefinitions[serviceName],
        serviceName,
      })

      createdServiceNames.push(serviceName)

      return {
        ...services,
        [serviceName]: service,
      }
    },
    {}
  )
  log.scope().debug(`Added: ${createdServiceNames.join(', ')}`)
  return createdServices
}
