import mongoose from "mongoose";
import { errorHandler } from "../utils/eroorHandler";

export const ConnectDb = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      "MongoDB URI is missing. Please set MONGODB_URI in your environment variables."
    );
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log("Mongodb connected");
  } catch (error) {
    // console.log(error);
    errorHandler(error);
    process.exit(1);
  }
};
