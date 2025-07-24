const mongoose = require('mongoose');
const { bookSchema } = require('../book/book.model');

const LibraryBook = mongoose.model('LibraryBook', bookSchema);

module.exports = LibraryBook;
