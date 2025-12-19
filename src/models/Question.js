export default (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Lưu mảng ["Đáp án A", "Đáp án B", ...]
    options: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    // Lưu chữ cái 'A', 'B', 'C', hoặc 'D'
    correctAnswer: {
      type: DataTypes.STRING(1),
      allowNull: false,
    }
  }, {
    timestamps: true 
  });



  return Question;
};