import { sequelize } from "../config/db.postgres.js";
import Sequelize from "sequelize";
import RoomModel from "./Room.js";
import PanoramaModel from "./Panorama.js";
import HotspotModel from "./Hotspot.js";
import QuestionModel from "./Question.js";
import UserModel from "./User.js";
import QuizResultModel from "./QuizResult.js";
import ArtifactModel from "./Artifact.js";
import TimelineEventModel from "./TimelineEvent.js"; 


const models = {};
const DataTypes = Sequelize.DataTypes;

models.Room = RoomModel(sequelize, DataTypes);
models.Panorama = PanoramaModel(sequelize, DataTypes);
models.Hotspot = HotspotModel(sequelize, DataTypes);
models.Question = QuestionModel(sequelize, DataTypes);
models.User = UserModel(sequelize, DataTypes);
models.QuizResult = QuizResultModel(sequelize, DataTypes);
models.Artifact = ArtifactModel(sequelize, DataTypes);
models.TimelineEvent = TimelineEventModel(sequelize, DataTypes);

models.User.hasMany(models.QuizResult, { foreignKey: 'userId', as: 'results' });
models.QuizResult.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

// associations
Object.values(models).forEach((m) => m.associate && m.associate(models));

export { sequelize };
export default models;
