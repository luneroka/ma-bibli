const { fetchBookFromGoogle } = require('../utils/googleBooksApi');
const { transformGoogleBook } = require('../services/bookService');
const { generateRandomId } = require('../utils/helper');
const LibraryBook = require('../library/library.model');

const getAllBooks = async (Model, req, res) => {
  try {
    // Create a filter based on userId and category constraint if existing in req
    const filter = { userId: req.user.uid };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    // Use lean() to return plain JS objects
    const books = await Model.find(filter).lean();
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

    // Assign current user to the book objecct
    bookObj.userId = req.user.uid;

    // Optionally, check if the book already exists.
    const existing = await Model.findOne({
      isbn: bookObj.isbn,
      userId: req.user.uid,
    });
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
    const favoriteBooks = await Model.find({
      userId: req.user.uid,
      isFavorite: true,
    }).lean();
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

    // Verify book ownership
    if (book.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Toggle isFavorite status
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

const getHaveReadBooks = async (Model, req, res) => {
  try {
    const haveReadBooks = await Model.find({
      userId: req.user.uid,
      haveRead: true,
    }).lean();
    res.status(200).json(haveReadBooks);
  } catch (error) {
    console.error('Failed to load have read books.', error);
    res.status(500).json({
      message: 'Failed to load have read books',
      error: error.message,
    });
  }
};

const toggleHaveRead = async (Model, req, res) => {
  try {
    const { isbn } = req.params;
    const book = await Model.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Verify book ownership
    if (book.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Toggle haveRead status and update dateHaveRead
    book.haveRead = !book.haveRead;
    if (book.haveRead) {
      book.dateHaveRead = new Date();
    } else {
      book.dateHaveRead = null;
    }

    await book.save();
    res
      .status(200)
      .json({ message: 'Have read status toggled successfully', book });
  } catch (error) {
    console.error('Failed to toggle have read status', error);
    res.status(500).json({
      message: 'Failed to toggle have read status',
      error: error.message,
    });
  }
};

const deleteBook = async (Model, req, res) => {
  try {
    const { isbn } = req.params;
    // First, fetch the book without deleting it so we can verify ownership.
    const book = await Model.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Verify book ownership using the token's uid.
    if (book.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Now delete the book.
    await book.deleteOne();
    res.status(200).json({ message: 'Book removed successfully', book });
  } catch (error) {
    console.error('Failed to remove book.', error);
    res.status(500).json({ message: 'Failed to remove book' });
  }
};

const updateBookInfo = async (Model, req, res) => {
  try {
    const { isbn } = req.params;
    const { title, authors, publisher, publishedDate, category } = req.body;
    let updateFields = { title, publisher, publishedDate, category };

    // Convert authors from CSV string to array
    updateFields.authors = authors
      ? authors.split(',').map((a) => a.trim())
      : undefined;

    // If file is provided, update the cover URL
    if (req.file) {
      updateFields.cover = `/uploads/${req.file.filename}`;
    }

    // Remove undefined properties
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    const updatedBook = await Model.findOneAndUpdate(
      { isbn, userId: req.user.uid },
      updateFields,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found or forbidden.' });
    }
    res.status(200).json({ message: 'Book updated', book: updatedBook });
  } catch (error) {
    console.error('Error updating book info:', error);
    res
      .status(500)
      .json({ message: 'Error updating book info', error: error.message });
  }
};

const createBook = async (Model, req, res) => {
  try {
    const {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      category,
    } = req.body;
    const userId = req.user.uid;
    const isbn = generateRandomId() + Date.now();
    const cover = req.file
      ? `/uploads/${req.file.filename}`
      : '/product-not-found.png';

    const newBook = new Model({
      userId,
      isbn,
      title,
      authors: authors.split(',').map((a) => a.trim()),
      publisher,
      publishedDate,
      description,
      pageCount,
      category,
      cover,
      isFavorite: false,
      haveRead: false,
      dateHaveRead: null,
      createdAt: new Date(),
    });

    await newBook.save();
    res
      .status(200)
      .json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    console.error('Failed to create book.', error);
    res
      .status(500)
      .json({ message: 'Failed to create book', error: error.message });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  getFavoriteBooks,
  toggleIsFavorite,
  getHaveReadBooks,
  toggleHaveRead,
  deleteBook,
  updateBookInfo,
  createBook,
};
