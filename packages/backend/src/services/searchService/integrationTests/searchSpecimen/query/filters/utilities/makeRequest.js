/* eslint-disable no-console */
const {
  makeTestCall,
} = require('../../../../../../../utilities/test/testApiClient')

module.exports = function makeRequest({
  requestBuilder,
  raw,
  testCase,
  logResponse,
}) {
  const { title, printResponse, printRequest } = testCase
  const request = requestBuilder.buildRequest({
    ...testCase,
    raw,
  })

  if (printRequest) {
    console.log(`${title} - request`, JSON.stringify(request, null, 2))
  }

  return makeTestCall(request)
    .then(res => {
      const parsedRes = requestBuilder.parseResponse({
        res,
        testCase: {
          ...testCase,
          raw,
        },
      })
      if (printResponse) {
        logResponse(parsedRes)
      }
      return {
        err: null,
        res: parsedRes,
      }
    })
    .catch(err => {
      return {
        err,
        res: null,
      }
    })
}
