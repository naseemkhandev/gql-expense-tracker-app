import "dotenv/config";

const _config = {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI,
};

export const config = Object.freeze(_config);
