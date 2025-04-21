const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Banner= mongoose.model('Image', imageSchema);
