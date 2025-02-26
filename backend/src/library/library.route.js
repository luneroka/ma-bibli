const express = require('express');
const LibraryBook = require('./library.model');
const upload = require('../utils/uploadMiddleware');
const {
  getAllBooks,
  addBook,
  createBook,
  getFavoriteBooks,
  toggleIsFavorite,
  deleteBook,
  getHaveReadBooks,
  toggleHaveRead,
  updateBookInfo,
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

// HAVE READ endpoints to get fave read and toggle have read state
router.get('/have-read', (req, res) => getHaveReadBooks(LibraryBook, req, res));
router.put('/have-read/:isbn', (req, res) =>
  toggleHaveRead(LibraryBook, req, res)
);

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

// UPDATE BOOK INFO
router.post('/update/:isbn', upload.single('cover'), (req, res) =>
  updateBookInfo(LibraryBook, req, res)
);

// POST endpoint to create a new book
router.post('/create', upload.single('cover'), (req, res) =>
  createBook(LibraryBook, req, res)
);

// GET a single book by ISBN for the authenticated user
router.get('/book/:isbn', async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await LibraryBook.findOne({
      isbn,
      userId: req.user.uid,
    }).lean();
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ book });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      message: 'Error fetching book',
      error: error.message,
    });
  }
});

module.exports = router;
