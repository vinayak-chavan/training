module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
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
      diseaseId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Categorie, {
      foreignKey: 'categoryId',
    });
    Product.belongsTo(models.Disease, {
      foreignKey: 'diseaseId',
    });
    Product.hasMany(
      models.CartProduct,
      {
        foreignKey: 'productId',
      },
    );
  };
  return Product;
};
