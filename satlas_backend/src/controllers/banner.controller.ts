import { Banner } from '../models/banner.model';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { Readable } from 'stream';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image
export const uploadBanner = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    const fileBuffer = req.file.buffer;

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: 'banners' },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        const readable = new Readable();
        readable._read = () => {};
        readable.push(fileBuffer);
        readable.push(null);
        readable.pipe(stream);
      });
    };

    const result: any = await streamUpload();
    const newBanner = await Banner.create({ url: result.secure_url });

    res.status(201).json({ message: 'Image uploaded successfully', banner: newBanner });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all images
export const getAllBanners = async (req: Request, res: Response) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
