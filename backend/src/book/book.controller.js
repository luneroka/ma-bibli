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
    const { id } = req.params;
    // console.log(`Fetching book with ID: ${id}`);
    const book = await fetchBookFromGoogle(id);
    // console.log(`Fetched book data: ${JSON.stringify(book)}`);

    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error('Could not find the requested book', error);
    res.status(500).send({ message: 'Could not find the requested book' });
  }
};

const addBook = async (Model, req, res) => {
  try {
    const { id } = req.body;

    // Validate the incoming data
    if (!id) {
      return res.status(400).send({ message: 'Book id not found.' });
    }

    // Fetch book data
    const bookData = await fetchBookFromGoogle(id);

    if (!bookData) {
      return res
        .status(404)
        .send({ message: 'Book not found in Google Books API' });
    }

    // Extract necessary fields from the fetched book data
    const {
      volumeInfo: {
        title,
        authors,
        publisher,
        publishedDate,
        description,
        pageCount,
        categories,
        imageLinks,
      },
    } = bookData;

    const cover =
      imageLinks?.thumbnail ||
      imageLinks?.smallThumbnail ||
      Object.values(imageLinks || {})[0] ||
      '../../../../frontend/public/product-not-found.png';

    // Create the new book instance and save it to the database
    const newBook = new Model({
      id,
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

    res
      .status(200)
      .send({ message: 'Livre ajouté avec succès', book: newBook });
  } catch (error) {
    console.error("Le livre n'a pas pu être ajouté.", error);
    res.status(500).send({
      message: "Echec lors de l'ajout du livre",
      error: error.message,
    });
  }
};

const deleteBook = async (Model, req, res) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Model.findOneAndDelete({ id: bookId });

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
