/* eslint-disable sort-keys */

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('jobs')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface.createTable('jobs', {
      createdAt: {
        type: Sequelize.DATE,
      },
      deactivatedAt: {
        type: Sequelize.DATE,
      },
      diff: {
        type: Sequelize.JSONB,
      },
      group: { type: Sequelize.STRING },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      error: { type: Sequelize.TEXT },
      failedAt: { type: Sequelize.DATE },
      operationId: { type: Sequelize.STRING },
      operationRequest: { type: Sequelize.JSONB },
      priority: { defaultValue: 0, type: Sequelize.INTEGER },
      startedAt: { type: Sequelize.DATE },
      succeededAt: { type: Sequelize.DATE },
    })
  },
}
