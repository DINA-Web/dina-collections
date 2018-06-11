const createLog = require('../../../utilities/log')

const log = createLog('lib/jobs/scheduler')

module.exports = function execute({ job, serviceInteractor }) {
  return Promise.resolve().then(() => {
    const operationId = job && job.attributes && job.attributes.operationId
    if (!operationId) {
      throw new Error('Operation id is missing')
    }
    log.info(
      `Started execute job with id: :${job.id} and operationId: ${operationId}`
    )
    const jobId = job.id
    return serviceInteractor
      .call({
        operationId: 'jobStartJob',
        request: {
          pathParams: {
            id: jobId,
          },
        },
      })
      .then(() => {
        return serviceInteractor
          .call({ operationId })
          .then(() => {
            log.info(
              `Job with id: :${job.id} and operationId: ${
                operationId
              } finished successfully`
            )
            return serviceInteractor
              .call({
                operationId: 'jobSetJobSuccess',
                request: {
                  pathParams: {
                    id: jobId,
                  },
                },
              })
              .then(() => {
                log.info(
                  `Job with id: :${job.id} and operationId: ${
                    operationId
                  } marked as success`
                )
              })
          })
          .catch(err => {
            log.info(
              `Job with id: :${job.id} and operationId: ${operationId} failed`,
              err
            )
            return serviceInteractor
              .call({
                operationId: 'jobSetJobFailed',
                request: {
                  pathParams: {
                    id: jobId,
                  },
                },
              })
              .then(() => {
                log.info(
                  `Job with id: :${job.id} and operationId: ${
                    operationId
                  } marked as failed`
                )
              })
          })
      })
  })
}
