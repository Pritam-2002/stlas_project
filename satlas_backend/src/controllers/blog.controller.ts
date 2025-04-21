import { Blog } from '../models/blog.model.js';

// POST /api/blogs
export const createBlog = async (req:any,res:any) => {
  const { blogTitle, blogPostContent } = req.body;

  if (!blogTitle || !blogPostContent) {
    return res.status(400).json({ error: 'Both blogTitle and blogPostContent are required.' });
  }

  try {
    const blog = await Blog.create({ blogTitle, blogPostContent });
    res.status(201).json({ message: 'Blog post created successfully.', blog });
  } catch (error:any) {
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
