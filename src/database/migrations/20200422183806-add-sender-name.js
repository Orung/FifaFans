module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'RoomChats',
    'sendername',
    {
      type: Sequelize.TEXT,
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'RoomChats',
    'sendername',
    {
      type: Sequelize.TEXT,
    },
  ),
};