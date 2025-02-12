const { fetchBookFromGoogle } = require('../utils/googleBooksApi');

const getAllBooks = async (Model, req, res) => {
  try {
    const books = await Model.find();
    res.status(200).send(books);
  } catch (error) {
    console.error('Failed to load books.');
    res.status(500).send({ message: 'Failed to load books' });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { isbn } = req.params;
    const bookData = await fetchBookFromGoogle(isbn);

    if (
      !bookData ||
      bookData.totalItems === 0 ||
      !bookData.items ||
      bookData.items.length === 0
    ) {
      return res.status(404).send({ message: 'Book not found' });
    }

    const book = bookData.items[0];
    res.status(200).send(book);
  } catch (error) {
    console.error('Could not find the requested book', error);
    res.status(500).send({ message: 'Could not find the requested book' });
  }
};

const addBook = async (Model, req, res) => {
  try {
    const { isbn } = req.body;

    // Validate the incoming data
    if (!isbn) {
      console.error('ISBN not provided.');
      return res.status(400).send({ message: 'ISBN not provided.' });
    }

    // Fetch book data
    const bookData = await fetchBookFromGoogle(isbn);

    if (
      !bookData ||
      bookData.totalItems === 0 ||
      !bookData.items ||
      bookData.items.length === 0
    ) {
      console.error('Book not found in Google Books API.');
      return res
        .status(404)
        .send({ message: 'Book not found in Google Books API' });
    }

    // Extract necessary fields from the fetched book data
    const {
      volumeInfo: {
        industryIdentifiers,
        title,
        authors,
        publisher,
        publishedDate,
        description,
        pageCount,
        categories,
        imageLinks,
      },
    } = bookData.items[0];

    // Extract ISBN-13, fallback to ISBN-10 if unavailable
    const isbn13 =
      industryIdentifiers?.find((id) => id.type === 'ISBN_13')?.identifier ||
      industryIdentifiers?.find((id) => id.type === 'ISBN_10')?.identifier ||
      null;

    const cover =
      imageLinks?.thumbnail ||
      imageLinks?.smallThumbnail ||
      Object.values(imageLinks || {})[0] ||
      '../../../../frontend/public/product-not-found.png';

    // Create the new book instance and save it to the database
    const newBook = new Model({
      isbn: isbn13,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      cover,
    });

    await newBook.save();

    res.status(200).send({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Failed to add book.', error);
    res.status(500).send({
      message: 'Failed to add book',
      error: error.message,
    });
  }
};

const deleteBook = async (Model, req, res) => {
  try {
    const { isbn } = req.params;

    const deletedBook = await Model.findOneAndDelete({ isbn });

    if (!deletedBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    res
      .status(200)
      .send({ message: 'Book removed successfully', book: deletedBook });
  } catch (error) {
    console.error('Failed to remove book.', error);
    res.status(500).send({ message: 'Failed to remove book' });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  deleteBook,
};
