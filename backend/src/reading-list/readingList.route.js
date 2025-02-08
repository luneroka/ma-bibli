const express = require('express');
const ReadingListBook = require('./readingList.model');
const { addBook, deleteBook } = require('../book/book.controller');
const router = express.Router();

router.get('/', (req, res) => getAllBooks(ReadingListBook, req, res));
router.post('/add-book', (req, res) => addBook(ReadingListBook, req, res));
router.delete('/delete-book/:bookId', (req, res) =>
  deleteBook(ReadingListBook, req, res)
);

module.exports = router;
