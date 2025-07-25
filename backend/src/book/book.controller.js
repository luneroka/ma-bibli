const { fetchBookFromIsbndb } = require('../utils/booksApi');
const { transformIsbndbBook } = require('../services/bookService');
const { generateRandomId } = require('../utils/helper');
const cloudinary = require('cloudinary').v2;

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
    // Try to find the book in the LibraryBook collection
    const LibraryBook = require('../library/library.model');
    const WishlistBook = require('../wishlist/wishlist.model');
    let foundBook = await LibraryBook.findOne({ isbn }).lean();
    if (foundBook) {
      return res.status(200).json(foundBook);
    }
    // If not found in LibraryBook, check WishlistBook
    foundBook = await WishlistBook.findOne({ isbn }).lean();
    if (foundBook) {
      return res.status(200).json(foundBook);
    }
    // If not found locally, try to fetch from ISBNdb
    try {
      const bookData = await fetchBookFromIsbndb(isbn);
      if (!bookData?.book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      const book = transformIsbndbBook(bookData.book);
      return res.status(200).json(book);
    } catch (apiError) {
      // If ISBNdb fails (e.g., invalid ISBN), return 404 instead of 500
      return res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Could not find the requested book', error: error.message });
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
    const bookData = await fetchBookFromIsbndb(isbn);
    // ISBNdb returns { book: { ... } } for single book endpoint
    if (!bookData?.book) {
      console.error('Book not found in ISBNdb API.');
      return res
        .status(404)
        .json({ message: 'Book not found in ISBNdb API' });
    }

    const bookObj = transformIsbndbBook(bookData.book);
    if (!bookObj || !bookObj.isbn) {
      return res.status(400).json({ message: 'Invalid book data returned.' });
    }

    // Assign current user to the book object
    bookObj.userId = req.user.uid;

    // Check if the book already exists for the current user.
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
    if (error.code === 11000) {
      // Handle duplicate key error
      return res
        .status(400)
        .json({ message: 'Book already exists for this user' });
    }
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
    const book = await Model.findOne({
      isbn,
      userId: req.user.uid,
    });
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
    const book = await Model.findOne({
      isbn,
      userId: req.user.uid,
    });
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
    const book = await Model.findOne({
      isbn,
      userId: req.user.uid,
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Verify book ownership using the token's uid.
    if (book.userId !== req.user.uid) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Check if the book has a Cloudinary image that needs to be deleted
    if (book.cover && book.cover.includes('cloudinary.com')) {
      try {
        // Extract the public_id from the URL
        // URL format : https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/public_id.ext
        const urlParts = book.cover.split('/');
        const filenameWithExtension = urlParts[urlParts.length - 1];
        const publicId =
          'ma_bibli/covers/' + filenameWithExtension.split('.')[0];

        // Delete the image from Cloudinary
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted Cloudinary resource: ${publicId}`);
      } catch (cloudinaryError) {
        console.error('Failed to delete Cloudinary resource:', cloudinaryError);
        // We continue with deletion even if Cloudinary deletion fails
      }
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
    const {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      category,
    } = req.body;
    let updateFields = {
      title,
      publisher,
      publishedDate,
      description,
      pageCount,
      category,
    };

    // Convert authors from CSV string to array
    updateFields.authors = authors
      ? authors.split(',').map((a) => a.trim())
      : undefined;

    // If file is provided, update the cover URL
    if (req.file) {
      console.log('File uploaded to Cloudinary:', req.file);
      // The URL is provided in path for multer-storage-cloudinary
      updateFields.cover = req.file.path;
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

    // Use Cloudinary URL if file was uploaded, else default image
    const cover = req.file ? req.file.path : '/product-not-found.png';

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
