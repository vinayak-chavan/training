module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define(
    'CartProduct',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      cartId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
  );

  CartProduct.associate = (models) => {
    CartProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
    });
    CartProduct.belongsTo(models.Cart, {
      foreignKey: 'cartId',
    });
  };
  return CartProduct;
};
