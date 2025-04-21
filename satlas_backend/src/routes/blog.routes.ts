import { Router } from "express";
import { createBlog,getAllBlogs } from "../controllers/blog.controller";

const router = Router();

// router.use(Authenticate);
router.post("/createblog", createBlog);
router.get("/getblogs", getAllBlogs);

export default router;
