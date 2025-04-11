import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      unique: true,
      required: true,
      minlength: 6,
    },

    currentGrade: {
      type: String,
      required: false, // set to true if necessary
      trim: true,
    },

    country: {
      type: String,
      required: false, // set to true if necessary
      trim: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
