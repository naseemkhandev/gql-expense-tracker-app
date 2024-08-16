import dotenv from "dotenv";
dotenv.config();

const _config = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
};

export const config = Object.freeze(_config);
