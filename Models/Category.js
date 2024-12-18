const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true // Corrected from "require" to "required"
  },
  Description: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
