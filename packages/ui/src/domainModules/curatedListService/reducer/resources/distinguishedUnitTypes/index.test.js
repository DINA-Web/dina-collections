import deepFreeze from 'deep-freeze'

import UNKNOWN_ACTION from 'utilities/test/unknownActionType'

import {
  CURATED_LIST_SERVICE_CREATE_DISTINGUISHED_UNIT_TYPE_SUCCESS,
  CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_SUCCESS,
  CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_SUCCESS,
  CURATED_LIST_SERVICE_UPDATE_DISTINGUISHED_UNIT_TYPE_SUCCESS,
} from '../../../actionTypes'

import reducer, { getInitialState } from './index'

const tryImport = () => {
  return import('./index')
}

const getPayload = () => {
  return {
    id: 'a73jhdc62sdgs5x4dsh2',
    name: 'Alan',
    type: 'type',
  }
}

describe('domainModules/curatedListService/reducer/resources/featureObservationTypes', () => {
  describe('getInitialState', () => {
    it('returns empty object', () => {
      const testValue = getInitialState()
      const expectedResult = {}

      expect(testValue).toEqual(expectedResult)
    })

    it('returns new empty object every time', () => {
      const testValue1 = getInitialState()
      const testValue2 = getInitialState()

      expect(testValue1).not.toBe(testValue2)
    })
  })

  describe('reducer', () => {
    it('imports without error', () => {
      expect.assertions(1)
      return expect(tryImport()).resolves.toBeTruthy()
    })

    it('returns initial state', () => {
      const testValue = reducer(undefined, { type: UNKNOWN_ACTION })
      const expectedResult = getInitialState()

      expect(testValue).toEqual(expectedResult)
    })

    const createAndGetOneSuccesses = [
      CURATED_LIST_SERVICE_CREATE_DISTINGUISHED_UNIT_TYPE_SUCCESS,
      CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_SUCCESS,
    ]

    createAndGetOneSuccesses.forEach(actionType => {
      it(`sets new resource in state from initial empty state on ${
        actionType
      }`, () => {
        const payload = getPayload()
        const { id, ...rest } = payload
        const action = {
          payload,
          type: actionType,
        }

        const testValue = reducer(undefined, action)
        const expectedResult = {
          [id]: {
            ...rest,
            id,
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
    })

    createAndGetOneSuccesses.forEach(actionType => {
      it(`sets new resource when keeping other resources on ${
        actionType
      }`, () => {
        const state = {
          goog: {
            id: 'goog',
            name: 'Google Inc.',
            type: 'type',
          },
        }
        deepFreeze(state)

        const payload = getPayload()
        const { id, ...rest } = payload
        const action = {
          payload,
          type: actionType,
        }

        const testValue = reducer(state, action)
        const expectedResult = {
          ...state,
          [id]: {
            ...rest,
            id,
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
    })

    it(`merges previous state with new data on ${
      CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_SUCCESS
    }`, () => {
      const state = {
        1: {
          id: '1',
          name: 'Alan',
          type: 'type',
        },
      }
      deepFreeze(state)

      const action = {
        payload: [
          {
            id: '2',
            name: 'Beau',
            type: 'type',
          },
          {
            id: '3',
            name: 'Celine',
            type: 'type',
          },
        ],
        type: CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_SUCCESS,
      }

      const testValue = reducer(state, action)
      const expectedResult = {
        1: {
          id: '1',
          name: 'Alan',
          type: 'type',
        },
        2: {
          id: '2',
          name: 'Beau',
          type: 'type',
        },
        3: {
          id: '3',
          name: 'Celine',
          type: 'type',
        },
      }

      expect(testValue).toEqual(expectedResult)
    })

    it(`updates existing resource when keeping other resources on ${
      CURATED_LIST_SERVICE_UPDATE_DISTINGUISHED_UNIT_TYPE_SUCCESS
    }`, () => {
      const state = {
        appl: {
          id: 'appl',
          name: 'Apple Inc.',
          type: 'type',
        },
        goog: {
          id: 'goog',
          name: 'Google Inc.',
          type: 'type',
        },
      }
      deepFreeze(state)

      // changed name
      const action = {
        payload: {
          id: 'goog',
          name: 'Alphabet Inc.',
          type: 'type',
        },
        type: CURATED_LIST_SERVICE_UPDATE_DISTINGUISHED_UNIT_TYPE_SUCCESS,
      }
      const { id, ...rest } = action.payload

      const testValue = reducer(state, action)
      const expectedResult = {
        ...state,
        [id]: {
          ...rest,
          id,
        },
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
})
