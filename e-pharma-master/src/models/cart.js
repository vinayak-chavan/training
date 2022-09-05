module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPlaced: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
  );

  Cart.associate = (models) => {
    Cart.hasMany(
      models.CartProduct,
      {
        foreignKey: 'cartId',
      },
    );
    Cart.hasOne(models.PlacedOrder, {
      foreignKey: 'cartId',
      onDelete: 'CASCADE',
    });
  };
  return Cart;
};
