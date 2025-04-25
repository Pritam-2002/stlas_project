import { Router } from "express";
import { createBlog,getAllBlogs } from "../controllers/blog.controller";
import { Authenticate } from "../middlewares/auth.middleware";
import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

// router.use(Authenticate);
router.post("/createblog",Authenticate,upload.single('file'), createBlog);
router.get("/getblogs",Authenticate, getAllBlogs);

export default router;
