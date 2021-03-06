const parseResponse = require('./parseResponse')
const buildRawBody = require('./buildRawBody')
const buildBody = require('./buildBody')

/**
 * Create a request builder
 * @param {string} aggregationFunction - The name of the aggregationFunction used by backend, when queryType is dina, to aggregate result
 * @param {string} aggregationType - The type of aggregation used when queryType is raw. One of [tagTypes, tagValues]
 * @param {string} filterFunction - The name of the filterFunction used by backend, when queryType is dina, to filter result
 * @param {string} resource - The name of the aggregated resource returned in the response.
 * @param {string} fieldPath - The path to the tag. Used when queryType is raw. Ex attributes.tags.identifierTags

 * @returns {Object} requestBuilder
 *
 */
module.exports = function createRequestBuilder({
  aggregationFunction,
  aggregationType,
  fieldPath,
  filterFunction,
  resource,
}) {
  const buildRequest = testCase => {
    return {
      body: testCase.raw
        ? buildRawBody({
            aggregationType,
            fieldPath,
            resource,
            testCase,
          })
        : buildBody({
            aggregationFunction,
            filterFunction,
            testCase,
          }),
      operationId: 'searchSpecimenQuery',
      validateOutput: false,
    }
  }
  return {
    buildRequest,
    parseResponse: ({ res, testCase }) => {
      return parseResponse({
        aggregationType,
        res,
        resource,
        testCase,
      })
    },
  }
}
