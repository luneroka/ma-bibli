const express = require('express');
const LibraryBook = require('./library.model');
const {
  getAllBooks,
  addBook,
  toggleIsFavorite,
  deleteBook,
} = require('../book/book.controller');
const router = express.Router();

router.get('/', (req, res) => getAllBooks(LibraryBook, req, res));
router.post('/add-book', (req, res) => addBook(LibraryBook, req, res));
router.put('/favorite/:isbn', (req, res) =>
  toggleIsFavorite(LibraryBook, req, res)
);
router.delete('/delete-book/:isbn', (req, res) =>
  deleteBook(LibraryBook, req, res)
);

module.exports = router;
