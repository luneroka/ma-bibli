const {
  searchBooksFromIsbndb,
  searchAuthorFromIsbndb,
  searchPreferredFromIsbndb,
} = require('../utils/booksApi');
const { transformIsbndbBook } = require('../services/bookService');

// Helper to transform an array of items for ISBNdb books
const transformIsbndbSearchResults = (data) => {
  // Support for different ISBNdb response structures:
  // - { books: [...] } or { authors: [...] } (search, author)
  // - { data: [...] } (preferred/index search)
  const items =
    data.books ||
    data.authors ||
    data.data || // for index search (preferred)
    [];
  return {
    ...data,
    items: items.map(transformIsbndbBook).filter((book) => book !== null),
  };
};

const searchBooks = async (req, res) => {
  try {
    const { searchTerm } = req.params;

    // Check if searchTerm is empty or just whitespace
    if (!searchTerm || searchTerm.trim() === '') {
      return res.status(200).json({ items: [] });
    }

    const results = await searchBooksFromIsbndb(searchTerm);
    res.status(200).json(transformIsbndbSearchResults(results));
  } catch (error) {
    console.error('Search error for books:', error);
    res.status(500).json({
      message: 'Books not found in ISBNdB API',
      error: error.message,
    });
  }
};

const searchAuthor = async (req, res) => {
  try {
    const { searchTerm } = req.params;

    // Check if searchTerm is empty or just whitespace
    if (!searchTerm || searchTerm.trim() === '') {
      return res.status(200).json({ items: [] });
    }

    const results = await searchAuthorFromIsbndb(searchTerm);
    res.status(200).json(transformIsbndbSearchResults(results));
  } catch (error) {
    console.error('Search error for author:', error);
    res.status(500).json({
      message: 'Books from this author not found in ISBNdB API',
      error: error.message,
    });
  }
};

const searchPreferred = async (req, res) => {
  try {
    const results = await searchPreferredFromIsbndb();
    res.status(200).json(transformIsbndbSearchResults(results));
  } catch (error) {
    console.error('Error fetching preferred books:', error);
    res.status(500).json({
      message: 'Error fetching preferred books from ISBNdB API',
      error: error.message,
    });
  }
};

module.exports = { searchBooks, searchAuthor, searchPreferred };
