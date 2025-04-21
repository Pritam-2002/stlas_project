import express from "express";
import authRouter from "./auth.routes";
import bannerRouter from "./banner.route"


const app1 = express();
app1.use("/auth", authRouter);
app1.use("/banner",bannerRouter );


export default app1;
