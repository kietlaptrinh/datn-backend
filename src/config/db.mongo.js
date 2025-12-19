import mongoose from "mongoose";
import "dotenv/config";

export const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "vmuseum" });
  console.log("Mongo connected");
};
