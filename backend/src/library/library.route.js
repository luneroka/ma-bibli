const express = require('express');
const LibraryBook = require('./library.model');
const {
  getAllBooks,
  addBook,
  getFavoriteBooks,
  toggleIsFavorite,
  deleteBook,
} = require('../book/book.controller');
const router = express.Router();
const firebaseAuthMiddleware = require('../users/firebaseAuthMiddleware');
router.use(firebaseAuthMiddleware);

router.get('/', (req, res) => getAllBooks(LibraryBook, req, res));
router.post('/add-book', (req, res) => addBook(LibraryBook, req, res));
router.delete('/delete-book/:isbn', (req, res) =>
  deleteBook(LibraryBook, req, res)
);
router.get('/favorites', (req, res) => getFavoriteBooks(LibraryBook, req, res));
router.put('/favorites/:isbn', (req, res) =>
  toggleIsFavorite(LibraryBook, req, res)
);

module.exports = router;
