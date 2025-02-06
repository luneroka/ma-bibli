const Book = require('./book.model');

const addBook = async (req, res) => {
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
    const newBook = new Book({
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

module.exports = {
  addBook,
};
