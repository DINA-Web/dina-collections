const createLog = require('../../../utilities/log')

const log = createLog('lib/postgres/models/bootstrapModels')

const extractModelsFromApis = apis => {
  return Object.keys(apis)
    .reduce((modelFactories, apiName) => {
      const api = apis[apiName]
      const { models } = api
      if (!models) {
        return modelFactories
      }
      let endpointModels

      if (Array.isArray(models)) {
        endpointModels = models.map(model => {
          const { name, factory } = model
          if (name === 'setupRelations') {
            return {}
          }
          return {
            modelFactory: factory,
            name,
          }
        })
      } else {
        endpointModels = Object.keys(models).map(name => {
          if (name === 'setupRelations') {
            return {}
          }
          const modelFactory = models[name]
          return {
            modelFactory,
            name,
          }
        })
      }

      return [...modelFactories, ...endpointModels]
    }, [])
    .filter(({ modelFactory }) => !!modelFactory)
}

module.exports = function bootstrapModels({ apis, config, sequelize }) {
  log.info('Bootstrap models started')
  const rawModels = extractModelsFromApis(apis)
  return Promise.all(
    rawModels.map(({ name, modelFactory }) => {
      log.info(`Bootstrap model: ${name}`)
      const model = modelFactory({
        config,
        sequelize,
      })
      return {
        model,
        name,
      }
    })
  ).then(models => {
    const modelObject = models.reduce((obj, { model, name }) => {
      return {
        ...obj,
        [name]: model,
      }
    }, {})
    log.info('Bootstrap models done')
    return {
      modelArray: models,
      modelObject,
    }
  })
}
