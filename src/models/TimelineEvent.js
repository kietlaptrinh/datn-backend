export default (sequelize, DataTypes) => {
  const TimelineEvent = sequelize.define("TimelineEvent", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    year: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    images: { 
      type: DataTypes.JSON, 
      defaultValue: [] 
    },
    
    order: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0, 
      unique: {
            msg: "Số thứ tự này đã tồn tại!"
        } }
  });

  return TimelineEvent;
};