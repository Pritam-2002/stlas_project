import { Blog } from '../models/blog.model.js';
import { Readable } from 'stream';
import cloudinary from 'cloudinary';

// POST /api/blogs
export const createBlog = async (req: any, res: any) => {
  const { blogTitle, blogPostContent, faq } = req.body;
  console.log(req.body);
  console.log(req.file);

  if (!blogTitle || !blogPostContent || !req.file) {
    return res.status(400).json({ error: 'blogTitle, blogPostContent, image, and faq are required.' });
  }

  try {
    const fileBuffer = req.file.buffer;

    // Upload image to Cloudinary
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: 'blogsImage' },
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

    const resultImage: any = await streamUpload();

    // Parse FAQ if sent as a stringified array
    let parsedFaq = [];
    if (faq) {
      parsedFaq = typeof faq === 'string' ? JSON.parse(faq) : faq;
    }

    // Save blog with all fields
    const blog = await Blog.create({
      blogTitle,
      blogPostContent,
      blogimage: resultImage.secure_url,
      faq: parsedFaq
    });

    res.status(201).json({ message: 'Blog post created successfully.', blog });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// GET /api/blogs
export const getAllBlogs = async (req:any,res:any) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
