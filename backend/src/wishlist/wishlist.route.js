const express = require('express');
const Wishlist = require('./wishlist.model');
const { getAllBooks, addBook, deleteBook } = require('../book/book.controller');
const router = express.Router();

// Protect all routes by requiring valid Firebase ID tokens
const firebaseAuthMiddleware = require('../users/firebaseAuthMiddleware');
router.use(firebaseAuthMiddleware);

// GET all books
router.get('/', (req, res) => getAllBooks(Wishlist, req, res));

// POST endpoint to add a book
router.post('/add-book', (req, res) => addBook(Wishlist, req, res));

// DELETE endpoint to delete book by ISBN
router.delete('/delete-book/:isbn', (req, res) =>
  deleteBook(Wishlist, req, res)
);

module.exports = router;
