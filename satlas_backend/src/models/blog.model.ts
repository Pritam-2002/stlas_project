import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogPostContent: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);
