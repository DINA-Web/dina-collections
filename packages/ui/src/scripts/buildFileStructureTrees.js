const path = require('path')
const buildFileTrees = require('common/es5/buildFileTrees')

const trees = [
  {
    levels: 2,
    name: 'root',
    rootRelativePath: '',
  },
  {
    levels: 2,
    name: 'src',
    rootRelativePath: './src',
  },
  {
    levels: 4,
    name: 'apps',
    rootRelativePath: './src/apps',
  },
  {
    levels: 4,
    name: 'coreModules',
    rootRelativePath: './src/coreModules',
  },
  {
    levels: 4,
    name: 'serviceModules',
    rootRelativePath: './src/serviceModules',
  },
  {
    levels: 4,
    name: 'collectionsUi viewModules',
    rootRelativePath: './src/apps/collectionsUi/viewModules',
  },
]

const rootPath = path.join(__dirname, '../../')

buildFileTrees({
  rootPath,
  trees,
})
