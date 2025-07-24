const mongoose = require('mongoose');
const { bookSchema } = require('../book/book.model');

const WishlistBook = mongoose.model('WishlistBook', bookSchema);

module.exports = WishlistBook;
