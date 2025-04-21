import { Router } from "express";
import { getAllBanners, uploadBanner } from "../controllers/banner.controller";
import multer from "multer";
import { Authenticate } from "../middlewares/auth.middleware";

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();
// router.use(Authenticate);
// Use `upload.single('file')` to match Postman field
router.post("/uploadbanner", upload.single('file'), uploadBanner);
router.get("/getbanner", getAllBanners); // changed POST to GET since it's fetching

export default router;
