const express = require('express');
const {
  searchBooks,
  searchAuthor,
  searchNewest,
} = require('./search.controller');
const router = express.Router();

router.get('/books/:searchTerm', (req, res) => searchBooks(req, res));
router.get('/author/:searchTerm', (req, res) => searchAuthor(req, res));
router.get('/newest', (req, res) => searchNewest(req, res));

module.exports = router;
