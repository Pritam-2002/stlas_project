import express from "express";
import authRouter from "./auth.routes";


const app1 = express();
app1.use("/auth", authRouter);


export default app1;
