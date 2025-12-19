export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING, // Lưu link ảnh avatar từ Google
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    }
  }, {
    timestamps: true,
    paranoid: true
  });
  
  return User;
};