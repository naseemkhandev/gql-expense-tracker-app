import mongoose from "mongoose";

import { config } from "./config.js";

const connectToDB = async () => {
  try {
    await mongoose
      .connect(config.MONGO_URI)
      .then(() => console.log("Successfully Connected to MongoDB".bgMagenta))
      .catch((err) =>
        console.log("Error in connecting to Database: ".bgRed, err)
      );
  } catch (error) {
    console.log("Failed to connect to Database: ".bgRed, error);
    process.exit(1);
  }
};

export default connectToDB;
