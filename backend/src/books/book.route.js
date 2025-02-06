const express = require('express');
const Book = require('./book.model');
const { addBook, deleteBook } = require('./book.controller');
const router = express.Router();

router.post('/add-book', addBook);

router.delete('/delete-book/:bookId', deleteBook);

module.exports = router;
