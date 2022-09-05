module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
      },
      totalPrice: {
        type: DataTypes.STRING,
      },
      // addressId: {
      //   type: DataTypes.UUID,
      // },
    },
  );
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    // Order.hasMany(models.ProductOrder, {
    //   foreignKey: 'productId',
    //   onDelete: 'CASCADE',
    // });
    // Order.belongsTo(models.Addresses, {
    //   foreignKey: 'addressId',
    // });
  };
  return Order;
};
