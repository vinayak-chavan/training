module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Diseases', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: { tableName: 'Categories' },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      diseaseName: {
        type: Sequelize.STRING,
      },
      diseaseDescription: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Diseases');
  },
};
