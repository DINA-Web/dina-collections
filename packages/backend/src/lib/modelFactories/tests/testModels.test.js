const {
  describe: dbDescribe,
} = require('common/src/testUtilities/envBackendDb')
const config = require('../../../lib/config/testConfig')
const setupTestModels = require('./setupTestModels')
const createModelTests = require('./createModelTests')
const methodTests = require('./methodTests')

const availableTypes = Object.keys(setupTestModels)

const coreMethods = [
  'buildWhereFilter',
  'bulkCreate',
  'create',
  'del',
  'getById',
  'getOneWhere',
  'getWhere',
  'synchronize',
  'update',
]

const availableMethods = [
  'buildWhereFilter',
  'buildWhereQuery',
  'bulkCreate',
  'create',
  'del',
  'empty',
  'getById',
  'getCount',
  'getOneWhere',
  'getViewMeta',
  'getWhere',
  'Model',
  'setupRelations',
  'swap',
  'synchronize',
  'update',
]

dbDescribe('lib/models/factories/test/modelFactories', () => {
  it('Core methods included in availableMethods', () => {
    coreMethods.forEach(coreMethod => {
      expect(availableMethods.includes(coreMethod)).toBeTruthy()
    })
  })

  const modelsToTest = Object.keys(setupTestModels)
  const methodsToTest = availableMethods // ['getById']

  modelsToTest.forEach(key => {
    const setupFunction = setupTestModels[key]
    createModelTests({
      availableMethods,
      availableTypes,
      config,
      coreMethods,
      methodsToTest,
      methodTests,
      modelType: key,
      setupModel: setupFunction,
    })
  })
})
