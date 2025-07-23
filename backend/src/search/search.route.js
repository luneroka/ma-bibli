const express = require('express');
const {
  searchBooks,
  searchAuthor,
  searchPreferred,
} = require('./search.controller');
const router = express.Router();

router.get('/books/:searchTerm', searchBooks);
router.get('/author/:searchTerm', searchAuthor);
router.get('/preferred', searchPreferred);

module.exports = router;
