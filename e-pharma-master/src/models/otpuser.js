module.exports = (sequelize, DataTypes) => {
  const OtpUser = sequelize.define(
    'OtpUser',
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
      otp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
  );

  OtpUser.addHook('afterCreate', async (ele) => {
    setTimeout(async () => {
      await ele.destroy();
    }, 10000 * 60);
  });

  OtpUser.associate = (models) => {
    OtpUser.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return OtpUser;
};
