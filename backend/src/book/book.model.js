const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    authors: {
      type: [String],
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
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    haveRead: {
      type: Boolean,
      default: false,
    },
    dateHaveRead: {
      type: Date,
      default: null,
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

// Create a compound index on isbn and userId
bookSchema.index({ isbn: 1, userId: 1 }, { unique: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
module.exports.bookSchema = bookSchema;
