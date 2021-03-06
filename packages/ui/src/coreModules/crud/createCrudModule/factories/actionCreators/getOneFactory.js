import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from './utilities/getActionActionTypes'
import dispatchIncludedActions from './dispatchIncludedActions'

export const dep = new Dependor({
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:getOne')

export default function getOneAcFactory({
  actionTypes,
  operationId,
  operationType,
  resource,
  resourceActionTypes,
} = {}) {
  const operationActionTypes = dep.getActionActionTypes({
    operationType,
    resource,
    resourceActionTypes,
  })

  if (!resource) {
    throw new Error('resource is required')
  }

  if (!operationId) {
    throw new Error('operationId is required')
  }

  return function getOneAc({
    id,
    include,
    relationships = ['all'],
    throwError = true,
    storeInState = true,
    queryParams: queryParamInput = {},
  } = {}) {
    log.debug(`${resource}.getOne called`, {
      id,
      relationships,
      throwError,
    })

    return (dispatch, getState, { apiClient }) => {
      if (!id) {
        throw new Error('Id is required')
      }

      const pathParams = { id }
      let queryParams = queryParamInput

      if (relationships && relationships.length) {
        queryParams = {
          ...queryParams,
          relationships,
        }
      }

      if (include) {
        queryParams = {
          ...queryParams,
          include,
        }
      }

      const callParams = {
        pathParams,
        queryParams,
      }

      const meta = {
        storeInState,
        ...callParams,
      }

      dispatch({
        meta,
        type: operationActionTypes.request,
      })

      return apiClient.getOne(resource, callParams).then(
        response => {
          if (response.included) {
            dispatchIncludedActions({
              actionTypes,
              dispatch,
              included: response.included,
            })
          }
          dispatch({
            meta,
            payload: response.data,
            type: operationActionTypes.success,
          })
          return response.data
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: operationActionTypes.fail,
          })

          if (throwError) {
            throw error
          }
          return error
        }
      )
    }
  }
}
