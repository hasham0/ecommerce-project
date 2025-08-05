import "dotenv/config";
import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";
const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: DB_NAME,
    });
    return connect;
  } catch (error) {
    console.error("🚀 ~ connectToDB ~ error:", error);
    process.exit(1);
  }
};

export default connectToDB;
