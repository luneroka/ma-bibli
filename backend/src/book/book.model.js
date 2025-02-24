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
      unique: true,
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

module.exports = bookSchema;
