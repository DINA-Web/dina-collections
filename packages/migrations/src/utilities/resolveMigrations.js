const services = require('backend/src/serviceConfigurations')

module.exports = function resolveMigrations({ migrations }) {
  return migrations.map(({ migrationName, resourceName, serviceName }) => {
    const service = services[serviceName]
    const resource =
      service && service.resources && service.resources[resourceName]
    const resolvedMigration =
      resource &&
      resource.model &&
      resource.model.migrations &&
      resource.model.migrations[migrationName]
    if (!resolvedMigration) {
      throw new Error(
        `Cant find migration. serviceName: ${serviceName}, resourceName: ${resourceName}, migrationName: ${migrationName}`
      )
    }

    return {
      ...resolvedMigration,
      migrationName,
      resourceName,
      serviceName,
    }
  })
}
