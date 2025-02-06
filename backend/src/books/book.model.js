const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: Array,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pageCount: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
