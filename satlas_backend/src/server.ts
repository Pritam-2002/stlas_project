import express from "express";
import { ConnectDb } from "./config/db";
import app1 from "./routes/index.route";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
ConnectDb();
app.use("/api", app1);

const httpServer = app.listen(8000, () =>
  console.log(" Server Started on Port 8000")
);
