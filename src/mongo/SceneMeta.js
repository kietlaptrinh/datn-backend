import mongoose from "mongoose";
const SceneMetaSchema = new mongoose.Schema({
  panoramaId: String,
  metadata: Object,
}, { timestamps: true });

export default mongoose.model("SceneMeta", SceneMetaSchema);
