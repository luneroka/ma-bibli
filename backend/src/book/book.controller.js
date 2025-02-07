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
  addBook,
  deleteBook,
};
