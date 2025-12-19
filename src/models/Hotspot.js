export default (sequelize, DataTypes) => {
  const Hotspot = sequelize.define("Hotspot", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fromPanoramaId: { type: DataTypes.UUID, allowNull: false },
    toPanoramaId: { type: DataTypes.UUID, allowNull: true },
    artifactId: { type: DataTypes.UUID, allowNull: true },
    
    type: { type: DataTypes.STRING, defaultValue: 'nav' },
    // vị trí hotspot trên "sàn"
    x: { type: DataTypes.FLOAT, allowNull: false },
    y: { type: DataTypes.FLOAT, allowNull: false, defaultValue: -1.499 },
    z: { type: DataTypes.FLOAT, allowNull: false },

    lookAtX: { type: DataTypes.FLOAT, defaultValue: 0 },
    lookAtY: { type: DataTypes.FLOAT, defaultValue: 0 },
    lookAtZ: { type: DataTypes.FLOAT, defaultValue: -1 },
    label: DataTypes.STRING,
    radius: { type: DataTypes.FLOAT, defaultValue: 0.12 }, // kích thước vòng tròn

    instruction: { 
        type: DataTypes.TEXT, 
        allowNull: true, 
        comment: "Vai trò/Tính cách của AI tại điểm này" 
    },
    knowledge: { 
        type: DataTypes.TEXT, 
        allowNull: true, 
        comment: "Kiến thức ngữ cảnh cụ thể tại điểm này" 
    }

  });
  Hotspot.associate = (models) => {
    Hotspot.belongsTo(models.Panorama, { foreignKey: "fromPanoramaId", as: "from" });
    Hotspot.belongsTo(models.Panorama, { foreignKey: "toPanoramaId", as: "to" });
    Hotspot.belongsTo(models.Artifact, { foreignKey: "artifactId", as: "artifact" });
  };
  return Hotspot;
};
