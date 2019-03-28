const express = require('express')
const createLog = require('../../utilities/log')
const errorMiddlewareFactory = require('./middlewares/error')
const authorizeMiddlewareFactory = require('./middlewares/authorize')
const decorateLocalsUserInputMiddlewareFactory = require('./middlewares/decorateLocalsUserInput')
const requestHandlerMiddlewareFactory = require('./middlewares/requestHandler')
const ensureMediaTypeMiddlewareFactory = require('./middlewares/ensureMediaType')
const expressifyPath = require('./utilities/expressifyPath')
const shouldMountOperation = require('./utilities/shouldMountOperation')

const log = createLog('lib/serviceRouter')

module.exports = function serviceRouterFactory({ auth, config, connectors }) {
  const errorMiddleware = errorMiddlewareFactory({ config })
  const authorizeMiddleware = authorizeMiddlewareFactory({ auth, config })
  const decorateLocalsUserInputMiddleware = decorateLocalsUserInputMiddlewareFactory(
    {
      config,
    }
  )

  const ensureMediaTypeMiddleware = ensureMediaTypeMiddlewareFactory()

  const serviceRouter = express.Router({ mergeParams: true })

  serviceRouter.use(ensureMediaTypeMiddleware)
  serviceRouter.use(authorizeMiddleware)
  log.info('Registering service routes')
  const scopedLog = log.scope()
  Object.keys(connectors).forEach(operationId => {
    const { serviceName } = connectors[operationId]
    const mountOperation = shouldMountOperation({
      config,
      operationId,
      serviceName,
    })
    if (mountOperation) {
      const { method, path, requestHandler } = connectors[operationId]

      const requestHandlerMiddleware = requestHandlerMiddlewareFactory({
        config,
        operationId,
        requestHandler,
      })

      const expressifiedPath = expressifyPath(path)
      serviceRouter[method](expressifiedPath, decorateLocalsUserInputMiddleware)
      scopedLog.debug(
        `${method.toUpperCase()} - ${expressifiedPath} as ${operationId}`
      )
      serviceRouter[method](expressifiedPath, requestHandlerMiddleware)
    } else {
      scopedLog.info(`Not mounting operation: ${operationId}`)
    }
  })
  log.info('Mounting service done')

  serviceRouter.use(errorMiddleware)

  return serviceRouter
}
