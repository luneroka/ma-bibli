const fs = require('fs');
const path = require('path');

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
    const filePath = path.join(
      __dirname,
      '../../../frontend/public/books.json'
    );
    const booksData = fs.readFileSync(filePath, 'utf8');
    const books = JSON.parse(booksData).items;

    const book = books.find((book) => book.id === id);
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
    const {
      googleId,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      thumbnail,
    } = req.body;

    // Validate the incoming data
    if (
      !googleId ||
      !title ||
      !authors ||
      !publisher ||
      !publishedDate ||
      !description ||
      !pageCount ||
      !categories ||
      !thumbnail
    ) {
      return res.status(400).send({ message: 'Tous les champs sont requis.' });
    }

    // Create the new book instance and save it to the database
    const newBook = new Model({
      googleId,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      thumbnail,
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

    const deletedBook = await Model.findOneAndDelete({ googleId: bookId });

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
