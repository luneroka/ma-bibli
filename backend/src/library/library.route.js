const express = require('express');
const LibraryBook = require('./library.model');
const { addBook, deleteBook } = require('../book/book.controller');
const router = express.Router();

router.post('/add-book', (req, res) => addBook(LibraryBook, req, res));
router.delete('/delete-book/:bookId', (req, res) =>
  deleteBook(LibraryBook, req, res)
);

module.exports = router;
