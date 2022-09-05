module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define(
    'Categorie',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

  Categorie.associate = (models) => {
    Categorie.hasMany(models.Disease, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
    Categorie.hasMany(models.Product, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };

  return Categorie;
};
