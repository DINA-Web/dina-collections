import { utils } from 'redux-module-local-storage'
import { AUTH_TOKEN_KEY } from './constants'

export const getLocalState = state => {
  return state.user
}

export const getUserLoggedIn = state => {
  return !!state.user
}

export const getUser = state => {
  return state.user
}

export const getName = state => {
  const user = getUser(state)
  return (user && user.name) || null
}

export const getUsername = state => {
  const user = getUser(state)
  return (user && user.username) || null
}

export const getUserLoading = state => {
  return !!state.loading
}

export const getAuthToken = () => {
  const authObject = utils.getItem(AUTH_TOKEN_KEY)
  return authObject ? authObject.accessToken : null
}

export const getConfig = state => {
  return state.config
}

export const getGetUserUrl = state => {
  const config = getConfig(state)
  return (config && config.getUserUrl) || null
}

export const getLoginUrl = state => {
  const config = getConfig(state)
  return (config && config.loginUrl) || null
}

export const getUserPreferences = state => {
  return state.preferences
}

export const getUserPreferencesLanguage = state => {
  const preferences = getUserPreferences(state)
  return preferences && preferences.language
}

export const getUserPreferencesTableColumnsToShow = (state, { resource }) => {
  const preferences = getUserPreferences(state)
  return preferences && preferences[`${resource}TableColumnsToShow`]
}

export const getUserPreferencesTableColumnsToSort = (state, { resource }) => {
  const preferences = getUserPreferences(state)
  return preferences && preferences[`${resource}TableColumnsToSort`]
}
