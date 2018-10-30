const objectPath = require('object-path')
const Ajv = require('ajv')

module.exports = function createValidatorFactory({ models }) {
  const rawModels = JSON.parse(JSON.stringify(models))

  const defaultOptions = {
    // errorDataPath: 'property',
    allErrors: true,
    format: 'full',
    jsonPointers: true, // -> /members/0
    logger: false,
    useDefaults: true, // e.g.to may have default empty array
    verbose: false, // to have information about the error.parentSchema
  }

  const createAjv = options => {
    const ajv = new Ajv({ ...options, format: 'full' })
    Object.keys(models).forEach(key => {
      ajv.addSchema(models[key], key)
    })

    return ajv
  }

  const defaultAjv = createAjv(defaultOptions)

  // TODO: rename model to modelName
  return function createModelSchemaValidator({
    dataPath,
    schema: customSchema,
    model,
    errorHandler,
    throwError,
    options,
  }) {
    const ajv = options ? createAjv(options) : defaultAjv
    if (model && !models[model]) {
      throw new Error(`Unknown model: ${model}`)
    }

    if (!models[model] && !customSchema) {
      throw new Error(
        'If model not provided have to provide customSchema (key schema)'
      )
    }

    const schema = rawModels[model] || customSchema
    return obj => {
      const objToTest = dataPath && obj ? objectPath.get(obj, dataPath) : obj
      const validate = ajv.compile(schema)
      const valid = validate(objToTest)
      if (valid) {
        return null
      }

      const error = errorHandler
        ? errorHandler(validate.errors)
        : validate.errors

      if (throwError) {
        throw error
      }

      return error
    }
  }
}
