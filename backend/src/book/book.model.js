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
    categories: {
      type: [String],
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = bookSchema;
