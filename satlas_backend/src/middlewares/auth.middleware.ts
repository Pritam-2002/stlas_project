import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();

export const Authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split("")[1];

  if (!token) {
    return res.status(401).json({ message: "No Token Detected" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_Secret environment variable is not set!");
      return res.status(500).json({ message: "Internal Server Error" });
    }
    const decoded = jwt.verify(token, secret);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ mesage: "Invalid Token" });
  }

  next();
};
