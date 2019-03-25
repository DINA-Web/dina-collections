import createEnvReader from 'common/es5/env/createEnvReader'
import envDefinitions from './envDefinitions'

const { readKey, readBoolKey } = createEnvReader({
  envDefinitions,
  processEnv: process.env,
})

const env = readKey('NODE_ENV')
const isDevelopment = env === 'development'
const isProduction = env === 'production'
const isTest = env === 'test'

const config = {
  auth: {
    active: !readBoolKey('REACT_APP_DISABLE_AUTH'),
  },
  env,
  externalUrls: {
    api: readKey('REACT_APP_EXTERNAL_URL_API', 'https://dina-api.nrm.se'),
    docs: readKey('REACT_APP_EXTERNAL_URL_DOCS', 'https://dina-docs.nrm.se'),
    githubDina: readKey(
      'REACT_APP_EXTERNAL_URL_GITHUB_DINA',
      'https://github.com/DINA-Web'
    ),
    githubRepo: readKey(
      'REACT_APP_EXTERNAL_URL_GITHUB_REPO',
      'https://github.com/DINA-Web/dina-collections'
    ),

    style: readKey('REACT_APP_EXTERNAL_URL_STYLE', 'https://dina-style.nrm.se'),
    wiki: readKey(
      'REACT_APP_EXTERNAL_URL_DINA_WIKI',
      'https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!'
    ),
  },
  isDevelopment,
  isProduction,
  isTest,
  reduxLogger: {
    enabled: isDevelopment && readBoolKey('REACT_APP_ENABLE_REDUX_LOGGER'),
    showDiff: readBoolKey('REACT_APP_ENABLE_REDUX_LOGGER_DIFF'),
  },
  testUi: readBoolKey('REACT_APP_TEST_UI'),
}

export default config
