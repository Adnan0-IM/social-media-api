import dotenv from "dotenv";
dotenv.config();

const local = "mongodb://127.0.0.1:27017/social-media";
export default {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || local,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
