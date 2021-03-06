import * as app from './app'
import * as dataViewer from './dataViewer'
import * as docs from './docs'
import * as home from './home'
import * as login from './login'
import * as manageAgents from './manageAgents'
import * as manageLocalities from './manageLocalities'
import * as manageSpecimens from './manageSpecimens'
import * as manageStorageLocations from './manageStorageLocations'
import * as manageTaxonomy from './manageTaxonomy'
import * as manageTaxonNames from './manageTaxonNames'
import * as sourceData from './sourceData'

import * as pageNotFound from './pageNotFound'
import * as publicModule from './public'
import * as settings from './settings'
import * as start from './start'

const modules = [
  publicModule,
  start,
  app,
  dataViewer,
  home,
  manageAgents,
  manageLocalities,
  manageSpecimens,
  manageStorageLocations,
  manageTaxonomy,
  manageTaxonNames,
  sourceData,
  login,
  settings,
  docs,
  pageNotFound,
]

export default modules
