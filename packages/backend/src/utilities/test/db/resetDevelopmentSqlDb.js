const execCmd = require('common/src/execCmd')
const ensureNodeEnv = require('common/src/env/ensureNodeEnv')

function resetDevelopmentSqlDb() {
  ensureNodeEnv('development')
  return execCmd({
    cmd:
      './packages/scripts/src/bash/docker-import-data-from-sql.sh -f ./data/sample.dump.sql -d dina_dev',
  })
}

module.exports = resetDevelopmentSqlDb
