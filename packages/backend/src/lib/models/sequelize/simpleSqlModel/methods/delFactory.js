const formatModelItemResponse = require('../../utilities/formatModelItemResponse')
const delWrapper = require('../../../utilities/wrappers/methods/del')
const backendError404 = require('common/src/error/errorFactories/backendError404')

module.exports = function delFactory({ Model }) {
  return delWrapper(({ id }) => {
    return Model.findOne({
      where: { id },
    }).then(existingModel => {
      if (!existingModel) {
        backendError404({
          code: 'RESOURCE_NOT_FOUND_ERROR',
          detail: `Not found for id ${id}`,
        })
      }
      return existingModel.destroy().then(() => {
        return formatModelItemResponse({ input: existingModel })
      })
    })
  })
}
