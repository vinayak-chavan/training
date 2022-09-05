module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define(
    'Disease',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      diseaseName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diseaseDescription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

  Disease.associate = (models) => {
    Disease.belongsTo(models.Categorie, {
      foreignKey: 'categoryId',
    });
    Disease.hasMany(models.Product, {
      foreignKey: 'diseaseId',
      onDelete: 'CASCADE',
    });
  };
  return Disease;
};
