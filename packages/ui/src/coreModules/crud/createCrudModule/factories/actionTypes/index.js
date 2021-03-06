import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import { apiActionTypes, ACTION_KEY_SET_INCLUDED } from '../../../constants'
import createActionType from './createActionType'
import createSetIncludedActionType from './createSetIncludedActionType'

export const dep = new Dependor({
  createActionType,
})

const log = createLog('coreModules:crud:actionTypes')

export default function createActionTypes({ resourceSpecification = {} } = {}) {
  const { resource, operations } = resourceSpecification

  if (!resource) {
    return {}
  }

  const includedActionTypes = {
    [ACTION_KEY_SET_INCLUDED]: createSetIncludedActionType({ resource }),
  }

  if (!(operations && operations.length)) {
    return includedActionTypes
  }

  const operationsActionTypes = operations.reduce((actionTypes, operation) => {
    const { type: operationType } = operation
    if (!operationType) {
      return actionTypes
    }

    const operationActionTypes = Object.keys(apiActionTypes)
      .sort()
      .reduce((obj, apiActionTypeKey) => {
        const apiActionType = apiActionTypes[apiActionTypeKey]
        return {
          ...obj,
          [apiActionType]: dep.createActionType({
            apiActionType,
            operationType,
            resource,
          }),
        }
      }, {})
    log.info(
      `Adding actionTypes for ${resource}.${operationType}: ${JSON.stringify(
        operationActionTypes
      )}`
    )

    return {
      ...actionTypes,
      [operationType]: operationActionTypes,
    }
  }, {})
  return {
    ...includedActionTypes,
    ...operationsActionTypes,
  }
}
