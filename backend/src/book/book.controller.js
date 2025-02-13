const { fetchBookFromGoogle } = require('../utils/googleBooksApi');
const { transformGoogleBook } = require('../services/bookService');

const getAllBooks = async (Model, req, res) => {
  try {
    // Use lean() to return plain JS objects
    const books = await Model.find().lean();
    res.status(200).json(books);
  } catch (error) {
    console.error('Failed to load books.', error);
    res.status(500).json({ message: 'Failed to load books' });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { isbn } = req.params;
    const bookData = await fetchBookFromGoogle(isbn);
    if (!bookData?.items || bookData.items.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    const book = transformGoogleBook(bookData.items[0]);
    res.status(200).json(book);
  } catch (error) {
    console.error('Could not find the requested book', error);
    res.status(500).json({ message: 'Could not find the requested book' });
  }
};

const addBook = async (Model, req, res) => {
  try {
    const { isbn } = req.body;
    if (!isbn) {
      console.error('ISBN not provided.');
      return res.status(400).json({ message: 'ISBN not provided.' });
    }
    // Fetch and normalize book data.
    const bookData = await fetchBookFromGoogle(isbn);
    if (!bookData?.items || bookData.items.length === 0) {
      console.error('Book not found in Google Books API.');
      return res
        .status(404)
        .json({ message: 'Book not found in Google Books API' });
    }
    const bookObj = transformGoogleBook(bookData.items[0]);
    if (!bookObj || !bookObj.isbn) {
      return res.status(400).json({ message: 'Invalid book data returned.' });
    }
    // Optionally, check if the book already exists.
    const existing = await Model.findOne({ isbn: bookObj.isbn });
    if (existing) {
      return res
        .status(200)
        .json({ message: 'Book already exists', book: existing });
    }
    const newBook = new Model(bookObj);
    await newBook.save();
    res.status(200).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Failed to add book.', error);
    res
      .status(500)
      .json({ message: 'Failed to add book', error: error.message });
  }
};

const getFavoriteBooks = async (Model, req, res) => {
  try {
    const favoriteBooks = await Model.find({ isFavorite: true }).lean();
    res.status(200).json(favoriteBooks);
  } catch (error) {
    console.error('Failed to load favorite books.', error);
    res
      .status(500)
      .json({ message: 'Failed to load favorite books', error: error.message });
  }
};

const toggleIsFavorite = async (Model, req, res) => {
  try {
    const { isbn } = req.params;
    const book = await Model.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.isFavorite = !book.isFavorite;
    await book.save();
    res
      .status(200)
      .json({ message: 'Favorite status toggled successfully', book });
  } catch (error) {
    console.error('Failed to toggle favorite status', error);
    res.status(500).json({
      message: 'Failed to toggle favorite status',
      error: error.message,
    });
  }
};

const deleteBook = async (Model, req, res) => {
  try {
    const { isbn } = req.params;
    const deletedBook = await Model.findOneAndDelete({ isbn });
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res
      .status(200)
      .json({ message: 'Book removed successfully', book: deletedBook });
  } catch (error) {
    console.error('Failed to remove book.', error);
    res.status(500).json({ message: 'Failed to remove book' });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  getFavoriteBooks,
  toggleIsFavorite,
  deleteBook,
};
