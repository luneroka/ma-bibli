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

// Protect all routes by requiring valid Firebase ID tokens
const firebaseAuthMiddleware = require('../users/firebaseAuthMiddleware');
router.use(firebaseAuthMiddleware);

// GET all books
router.get('/', (req, res) => getAllBooks(LibraryBook, req, res));

// POST endpoint to add a book
router.post('/add-book', (req, res) => addBook(LibraryBook, req, res));

// DELETE endpoint to delete book by ISBN
router.delete('/delete-book/:isbn', (req, res) =>
  deleteBook(LibraryBook, req, res)
);

// FAVORITE endpoints to get favorites and toggle favorite state
router.get('/favorites', (req, res) => getFavoriteBooks(LibraryBook, req, res));
router.put('/favorites/:isbn', (req, res) =>
  toggleIsFavorite(LibraryBook, req, res)
);

// HAVE READ endpoints
router.get('/have-read', (req))

// GET a list of distinct categories a user has in library
router.get('/categories', async (req, res) => {
  try {
    const categories = await LibraryBook.distinct('category', {
      userId: req.user.uid,
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Failed to fetch categories', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

module.exports = router;
