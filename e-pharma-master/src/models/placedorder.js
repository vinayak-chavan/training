module.exports = (sequelize, DataTypes) => {
  const PlacedOrder = sequelize.define(
    'PlacedOrder',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      addressId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Pending', 'On the way', 'Delivered'),
        allowNull: false,
      },
    },
  );

  PlacedOrder.associate = (models) => {
    PlacedOrder.belongsTo(models.Cart, {
      foreignKey: 'cartId',
    });
    PlacedOrder.belongsTo(models.Addresses, {
      foreignKey: 'addressId',
    });
  };
  return PlacedOrder;
};
