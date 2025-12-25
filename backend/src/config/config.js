import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
  REfresh_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

export default config;
