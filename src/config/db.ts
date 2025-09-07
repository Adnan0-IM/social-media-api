import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI as string);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
