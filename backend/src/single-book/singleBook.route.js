const express = require('express');
const SingleBook = require('./singleBook.model');
const { getSingleBook } = require('../book/book.controller');
const router = express.Router();

router.get('/:id', getSingleBook);

module.exports = router;
