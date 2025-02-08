const mongoose = require('mongoose');
const bookSchema = require('../book/book.model');

const SingleBook = mongoose.model('SingleBook', bookSchema);

module.exports = SingleBook;
