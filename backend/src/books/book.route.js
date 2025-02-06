const express = require('express');
const Book = require('./book.model');
const router = express.Router();

router.post('/add-book', async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res
      .status(200)
      .send({ message: 'Livre ajouté avec succès', book: newBook });
  } catch (error) {
    console.error("Le livre n'a pas pu être ajouté.", error);
    res.status(500).send({ message: "Echec lors de l'ajout du livre" });
  }
});

module.exports = router;
