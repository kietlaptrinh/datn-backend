import mongoose from "mongoose";
const ChatLogSchema = new mongoose.Schema({
  userId: String,
  sessionId: String,
  role: { type: String, enum: ["user", "assistant", "system"] },
  text: String,
  meta: Object,
}, { timestamps: true });

export default mongoose.model("ChatLog", ChatLogSchema);
