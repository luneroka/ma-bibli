const {
  searchBooksFromGoogle,
  searchAuthorFromGoogle,
  searchNewestFromGoogle,
} = require('../utils/googleBooksApi');
const { transformGoogleBook } = require('../services/bookService');

// helper to transform an array of items
const transformSearchResults = (data) => {
  if (!data.items || !Array.isArray(data.items)) {
    return { items: [] };
  }
  return {
    ...data,
    items: data.items.map(transformGoogleBook).filter((book) => book !== null),
  };
};

const searchBooks = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const results = await searchBooksFromGoogle(searchTerm);
    res.status(200).json(transformSearchResults(results));
  } catch (error) {
    console.error('Search error for books:', error);
    res.status(500).json({
      message: 'Books not found in Google Books API',
      error: error.message,
    });
  }
};

const searchAuthor = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    const results = await searchAuthorFromGoogle(searchTerm);
    res.status(200).json(transformSearchResults(results));
  } catch (error) {
    console.error('Search error for author:', error);
    res.status(500).json({
      message: 'Books from this author not found in Google Books API',
      error: error.message,
    });
  }
};

const searchNewest = async (req, res) => {
  try {
    const results = await searchNewestFromGoogle();
    if (!results.items || results.items.length === 0) {
      return res.status(404).json({ message: 'No new books found' });
    }
    res.status(200).json(transformSearchResults(results));
  } catch (error) {
    console.error('Error fetching newest books:', error);
    res.status(500).json({
      message: 'Error fetching newest books from Google Books API',
      error: error.message,
    });
  }
};

module.exports = { searchBooks, searchAuthor, searchNewest };
