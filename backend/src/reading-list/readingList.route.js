const express = require('express');
const ReadingListBook = require('./readingList.model');
const { getAllBooks, addBook, deleteBook } = require('../book/book.controller');
const router = express.Router();

// Protect all routes by requiring valid Firebase ID tokens
const firebaseAuthMiddleware = require('../users/firebaseAuthMiddleware');
router.use(firebaseAuthMiddleware);

// GET all books
router.get('/', (req, res) => getAllBooks(ReadingListBook, req, res));

// POST endpoint to add a book
router.post('/add-book', (req, res) => addBook(ReadingListBook, req, res));

// DELETE endpoint to delete book by ISBN
router.delete('/delete-book/:isbn', (req, res) =>
  deleteBook(ReadingListBook, req, res)
);

module.exports = router;
