import * as actionTypes from './actionTypes'

const expectedActionTypeValues = [
  'STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_FAIL',
  'STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST',
  'STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS',
  'STORAGE_SERVICE_CREATE_STORAGE_LOCATION_FAIL',
  'STORAGE_SERVICE_CREATE_STORAGE_LOCATION_REQUEST',
  'STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS',
  'STORAGE_SERVICE_GET_PHYSICAL_UNIT_FAIL',
  'STORAGE_SERVICE_GET_PHYSICAL_UNIT_REQUEST',
  'STORAGE_SERVICE_GET_PHYSICAL_UNIT_SUCCESS',
  'STORAGE_SERVICE_GET_PHYSICAL_UNITS_FAIL',
  'STORAGE_SERVICE_GET_PHYSICAL_UNITS_REQUEST',
  'STORAGE_SERVICE_GET_PHYSICAL_UNITS_SUCCESS',
  'STORAGE_SERVICE_GET_STORAGE_LOCATION_FAIL',
  'STORAGE_SERVICE_GET_STORAGE_LOCATION_REQUEST',
  'STORAGE_SERVICE_GET_STORAGE_LOCATION_SUCCESS',
  'STORAGE_SERVICE_GET_STORAGE_LOCATIONS_FAIL',
  'STORAGE_SERVICE_GET_STORAGE_LOCATIONS_REQUEST',
  'STORAGE_SERVICE_GET_STORAGE_LOCATIONS_SUCCESS',
  'STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_FAIL',
  'STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_REQUEST',
  'STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_SUCCESS',
  'STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_FAIL',
  'STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_REQUEST',
  'STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS',
]

describe('domainModules/storageService/actionTypes', () => {
  it('exports expected types', () => {
    expect(Object.values(actionTypes).sort()).toEqual(
      expectedActionTypeValues.sort()
    )
  })
})
