export default (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    floor: DataTypes.INTEGER,
  },);
  Room.associate = (models) => {
    Room.hasMany(models.Panorama, { foreignKey: "roomId" });
  };
  return Room;
};
