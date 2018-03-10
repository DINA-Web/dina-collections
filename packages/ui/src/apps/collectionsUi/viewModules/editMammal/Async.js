import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { MODULE_NAME } from './constants'

export default createAsyncView({
  modules: () => {
    return [
      import('coreModules/form'),
      import('domainModules/curatedListService'),
      import('domainModules/identifierService'),
      import('domainModules/localityService'),
      import('domainModules/storageService'),
      import('domainModules/taxonomy'),
      import('domainModules/collectionMammals'),
    ]
  },
  name: MODULE_NAME,
  view: () => {
    return import('./index.js')
  },
})
