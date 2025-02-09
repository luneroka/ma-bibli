const express = require('express');
const { searchBooks } = require('../book/book.controller');
const router = express.Router();

router.get('/:searchTerm', (req, res) => searchBooks(req, res));

module.exports = router;
