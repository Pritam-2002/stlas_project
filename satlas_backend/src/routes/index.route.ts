import express from "express";
import authRouter from "./auth.routes";
import bannerRouter from "./banner.route"
import blogrouter from "./blog.routes"


const app1 = express();
app1.use("/auth", authRouter);
app1.use("/banner",bannerRouter );
app1.use("/blog",blogrouter );


export default app1;
