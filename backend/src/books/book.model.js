const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: [String], // Better to be explicit with the type
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
      type: Number, // Using Number is better for numeric values
      required: true,
    },
    categories: {
      type: [String], // Explicit array type
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
