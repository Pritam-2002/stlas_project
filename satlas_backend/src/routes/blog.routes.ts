import { Router } from "express";
import { createBlog,getAllBlogs } from "../controllers/blog.controller";
import { Authenticate } from "../middlewares/auth.middleware";

const router = Router();

// router.use(Authenticate);
router.post("/createblog",Authenticate, createBlog);
router.get("/getblogs",Authenticate, getAllBlogs);

export default router;
