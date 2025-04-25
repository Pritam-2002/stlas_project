import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
}, { _id: false });

const blogSchema = new mongoose.Schema({
  blogimage: {
    type: String,
    required: true,
  },
  blogTitle: {
    type: String,
    required: true,
  },
  blogPostContent: {
    type: String,
    required: true,
  },
  faq: {
    type: [faqSchema], // Array of question-answer objects
    default: []
  }
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);
