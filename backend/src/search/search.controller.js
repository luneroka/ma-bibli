const {
  searchBooksFromGoogle,
  searchAuthorsFromGoogle,
  searchNewestFromGoogle,
} = require('../utils/googleBooksApi');

const searchBooks = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const searchResults = await searchBooksFromGoogle(searchTerm);
    if (!searchResults) {
      return res.status(404).send({ message: 'Books not found' });
    }
    res.status(200).send(searchResults);
  } catch (error) {
    console.error('Books not found in Google Books API', error);
    res.status(500).send({ message: 'Books not found in Google Books API' });
  }
};

const searchAuthor = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const searchResults = await searchAuthorsFromGoogle(searchTerm);
    if (!searchResults) {
      return res
        .status(404)
        .send({ message: 'Books from this author not found' });
    }
    res.status(200).send(searchResults);
  } catch (error) {
    console.error(
      'Books from this author not found in Google Books API',
      error
    );
    res.status(500).send({
      message: 'Books from this author not found in Google Books API',
    });
  }
};

const searchNewest = async (req, res) => {
  try {
    const searchResults = await searchNewestFromGoogle();
    if (
      !searchResults ||
      !Array.isArray(searchResults.items) ||
      searchResults.items.length === 0
    ) {
      return res.status(404).send({ message: 'No new books found' });
    }
    res.status(200).send(searchResults);
  } catch (error) {
    console.error('Error fetching newest books from Google Books API', error);
    res.status(500).send({
      message: 'Error fetching newest books from Google Books API',
    });
  }
};

module.exports = {
  searchBooks,
  searchAuthor,
  searchNewest,
};
