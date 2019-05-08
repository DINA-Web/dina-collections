/* eslint-disable sort-keys */
module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('resourceActivities')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface
      .createTable('resourceActivities', {
        createdAt: {
          type: Sequelize.DATE,
        },
        deactivatedAt: {
          type: Sequelize.DATE,
        },
        diff: {
          type: Sequelize.JSONB,
        },
        document: {
          type: Sequelize.JSONB,
        },
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        relationships: {
          type: Sequelize.JSONB,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        action: { type: Sequelize.STRING },
        hasSourceData: { type: Sequelize.BOOLEAN },
        requestId: { type: Sequelize.STRING },
        resource: { type: Sequelize.STRING },
        resourceId: { type: Sequelize.STRING },
        service: { type: Sequelize.STRING },
        snapshot: { type: Sequelize.JSONB },
        sourceData: { type: Sequelize.JSONB },
        srcCreatedAt: { type: Sequelize.DATE },
        srcDeactivatedAt: { type: Sequelize.DATE },
        srcSchemaVersion: { type: Sequelize.STRING },
        srcUpdatedAt: { type: Sequelize.DATE },
        userId: { type: Sequelize.STRING },
        username: { type: Sequelize.STRING },
      })
      .then(() => {
        const indexes = [
          {
            fields: ['resource'],
          },
          {
            fields: ['userId'],
          },
          {
            fields: ['resourceId'],
          },
        ]

        return Promise.all(
          indexes.map(indexOptions => {
            return queryInterface.addIndex('resourceActivities', indexOptions)
          })
        )
      })
  },
}
