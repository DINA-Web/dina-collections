const createLog = require('../../../../../utilities/log')

const log = createLog('lib/controllers/views/updateView/getRequiredAction')

const getSrcItem = ({ serviceInteractor, id, srcResource }) => {
  return serviceInteractor
    .getOne({
      request: {
        pathParams: {
          id,
        },
      },

      resource: srcResource,
    })
    .then(response => {
      if (response && response.data) {
        return response.data
      }
      return null
    })
    .catch(err => {
      if (err.status === 404) {
        return null
      }
      throw err
    })
}

const getTargetItem = ({ model, id }) => {
  return model
    .getById({ allowDeactivated: true, id })
    .then(response => {
      if (response) {
        return !!(response && response.item)
      }
      return null
    })
    .catch(err => {
      if (err.status === 404) {
        return null
      }
      throw err
    })
}

module.exports = function getRequiredAction({
  id,
  model,
  serviceInteractor,
  srcResource,
}) {
  log.info(`Getting src item ${srcResource} -> ${id}`)
  return getSrcItem({
    id,
    serviceInteractor,
    srcResource,
  }).then(srcItem => {
    log.info(`Getting targetItem with id -> ${id}`)
    return getTargetItem({
      id,
      model,
    }).then(targetItem => {
      const srcStatus = srcItem ? 'exist' : 'dont-exist'
      const targetStatus = targetItem ? 'exist' : 'dont-exist'

      log.info(`srcStatus: ${srcStatus}`)
      log.info(`targetStatus: ${targetStatus}`)

      if (srcStatus === 'exist' && targetStatus === 'dont-exist') {
        return 'create'
      }

      if (srcStatus === 'exist' && targetStatus === 'exist') {
        return 'update'
      }

      if (srcStatus === 'dont-exist' && targetStatus === 'dont-exist') {
        return 'bail'
      }

      if (srcStatus === 'dont-exist' && targetStatus === 'exist') {
        return 'del'
      }
      return 'bail'
    })
  })
}
