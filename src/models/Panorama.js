export default (sequelize, DataTypes) => {
  const Panorama = sequelize.define("Panorama", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    roomId: { type: DataTypes.UUID, allowNull: false },
    title: DataTypes.STRING,
    // đường dẫn ảnh equirectangular (để Sphere map)
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    isStart: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false 
    },
    // vị trí camera 
    camX: { type: DataTypes.FLOAT, defaultValue: 0 },
    camY: { type: DataTypes.FLOAT, defaultValue: 0 },
    camZ: { type: DataTypes.FLOAT, defaultValue: 0 },
    // hướng nhìn mặc định
    targetX: { type: DataTypes.FLOAT, defaultValue: 0 },
    targetY: { type: DataTypes.FLOAT, defaultValue: 0 },
    targetZ: { type: DataTypes.FLOAT, defaultValue: -1 },
   
   
  });
  Panorama.associate = (models) => {
    Panorama.belongsTo(models.Room, { foreignKey: "roomId" });
    Panorama.hasMany(models.Hotspot, { foreignKey: "fromPanoramaId", as: "hotspots" });
  };
  return Panorama;
};
