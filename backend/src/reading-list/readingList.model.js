const mongoose = require('mongoose');
const bookSchema = require('../book/book.model');

const ReadingListBook = mongoose.model('ReadingListBook', bookSchema);

module.exports = ReadingListBook;
