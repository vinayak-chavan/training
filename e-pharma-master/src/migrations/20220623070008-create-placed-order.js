module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlacedOrders', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      cartId: {
        type: Sequelize.UUID,
        references: {
          model: { tableName: 'Carts' },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      addressId: {
        type: Sequelize.UUID,
        references: {
          model: { tableName: 'Addresses' },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('Pending', 'On the way', 'Delivered'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('PlacedOrders');
  },
};
