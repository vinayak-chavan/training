module.exports = (sequelize, DataTypes) => {
  const Addresses = sequelize.define(
    'Addresses',
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
  );
  Addresses.associate = (models) => {
    Addresses.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Addresses.hasMany(models.Order, {
      foreignKey: 'addressId',
      onDelete: 'CASCADE',
    });
    Addresses.hasMany(models.PlacedOrder, {
      foreignKey: 'addressId',
      onDelete: 'CASCADE',
    });
  };
  return Addresses;
};
