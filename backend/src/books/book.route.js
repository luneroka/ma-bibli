const express = require('express');
const Book = require('./book.model');
const { addBook } = require('./book.controller');
const router = express.Router();

router.post('/add-book', addBook);

module.exports = router;
