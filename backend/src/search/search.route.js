const express = require('express');
const {
  searchBooks,
  searchAuthor,
  searchNewest,
} = require('./search.controller');
const router = express.Router();

router.get('/books/:searchTerm', searchBooks);
router.get('/author/:searchTerm', searchAuthor);
router.get('/newest', searchNewest);

module.exports = router;
