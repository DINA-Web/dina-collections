/* eslint-disable sort-keys */

module.exports = {
  down: ({ queryInterface }) => {
    return queryInterface.dropTable('catalogNumbers')
  },
  up: ({ queryInterface, Sequelize }) => {
    return queryInterface
      .createTable('catalogNumbers', {
        createdAt: {
          type: Sequelize.DATE,
        },
        deactivatedAt: {
          type: Sequelize.DATE,
        },
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
        identifier: { type: Sequelize.STRING, unique: true },
        number: { type: Sequelize.INTEGER },
        year: { type: Sequelize.INTEGER },
      })
      .then(() => {
        return queryInterface.addIndex('catalogNumbers', {
          fields: ['identifier', 'year', 'number'],
        })
      })
  },
}
