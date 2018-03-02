const createLog = require('../../../utilities/log')
const createOperationSpecification = require('./createOperationSpecification')
const typeFactories = require('./typeFactories')

const log = createLog('lib/services', 3)

module.exports = function createOperationObject({
  operationSpecification: operationSpecificationInput,
  resourceSpecification,
}) {
  if (operationSpecificationInput.raw) {
    return operationSpecificationInput
  }
  const operationSpecification = createOperationSpecification({
    operationSpecificationInput,
    resourceSpecification,
  })

  const { type, factory } = operationSpecification

  log.info(`${type}`)

  const typeFactory = factory || typeFactories[type]

  if (!typeFactory) {
    throw new Error(`Type: ${type} unknown for...`)
  }

  return typeFactory(operationSpecification)
}
