module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: { tableName: 'Users' },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      totalPrice: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('pending', 'on the way', 'delivered'),
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
    await queryInterface.dropTable('Orders');
  },
};
