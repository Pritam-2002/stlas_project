import { User } from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_Secret;

if (!JWT_SECRET) {
  throw new Error(
    "JWT secret is missing. Set the JWT_SECRET environment variable."
  );
}

export const userSignup = async (req: Request, res: Response) => {
  try {
   
    const { name, email, password, currentGrade, country } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const NewUSer = new User({
      name,
      email,
      password: hashedPassword,
      currentGrade,
      country,
    });

    const saveUser = await NewUSer.save();
    if (!JWT_SECRET) {
      res.status(500).json({ error: "JWT secret is missing" });
    }

    const token = jwt.sign(
      { userId: NewUSer._id, email: NewUSer.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(201)
      .json({ message: "New user Created", user: saveUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Eroor" });
  }
};

export const userSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({ message: "Logged In Succesfull", user, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
