export default (sequelize, DataTypes) => {
  const Artifact = sequelize.define("Artifact", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    roomId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT, // Lời cho AI đọc
    imageUrl: DataTypes.STRING,
  });

  Artifact.associate = (models) => {
    Artifact.belongsTo(models.Room, { foreignKey: "roomId" });
    Artifact.hasMany(models.Hotspot, { foreignKey: "artifactId", as: "hotspots" });
  };

  return Artifact;
};