const path = require('path')
const findRootPath = require('./findRootPath')
const { REPO_ROOT_NAME } = require('../constants/repo')

const getIsRootPath = rootPath => {
  const rootPackagePath = path.join(rootPath, 'package.json')
  /* eslint-disable import/no-dynamic-require, global-require */
  const packageJson = require(rootPackagePath)
  /* eslint-enable import/no-dynamic-require, global-require */
  return REPO_ROOT_NAME === packageJson.name
}

describe('fs/findRootPath', () => {
  it('Finds root path when no args provided', () => {
    const rootPath = findRootPath()

    expect(getIsRootPath(rootPath)).toBe(true)
  })
  it('Finds root path when path in node_modules provided', () => {
    const rootPath = findRootPath({
      startPath: path.join(__dirname, '../../node_modules/lodash'),
    })

    expect(getIsRootPath(rootPath)).toBe(true)
  })
})