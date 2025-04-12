import mongoose from "mongoose";

export const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    console.error("❌ Error:", error.message);
  } else {
    console.error("❌ An unknown error occurred");
  }
};
