module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verifytoken: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
  );
  User.associate = (models) => {
    User.hasOne(models.OtpUser, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Addresses, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
