const express = require('express');
const ReadingListBook = require('./readingList.model');
const { getAllBooks, addBook, deleteBook } = require('../book/book.controller');
const router = express.Router();
const firebaseAuthMiddleware = require('../users/firebaseAuthMiddleware');
router.use(firebaseAuthMiddleware);

router.get('/', (req, res) => getAllBooks(ReadingListBook, req, res));
router.post('/add-book', (req, res) => addBook(ReadingListBook, req, res));
router.delete('/delete-book/:isbn', (req, res) =>
  deleteBook(ReadingListBook, req, res)
);

module.exports = router;
