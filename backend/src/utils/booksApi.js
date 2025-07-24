require('dotenv').config();
const apiKey = process.env.ISBN_DB_API_KEY;
const { fetchJson } = require('./helper');
const NodeCache = require('node-cache');
// Increased cache time to 6 hours for better protection against rate limits
const cache = new NodeCache({ stdTTL: 21600 });

const searchBooksFromIsbndb = async (searchTerm) => {
  // Create a unique cache key
  const cacheKey = `search_books_${searchTerm}`;
  const cachedResult = cache.get(cacheKey);
  if (cachedResult) return cachedResult;

  const pageSize = 40;
  const language = 'fr';
  const url = `https://api2.isbndb.com/books/${encodeURIComponent(
    searchTerm
  )}?&pageSize=${pageSize}&language=${language}`;

  const data = await fetchJson(url, {
    headers: { 'Authorization': apiKey }
  });

  // Save to cache
  cache.set(cacheKey, data);
  return data;
};

const searchAuthorFromIsbndb = async (searchTerm) => {
  // Create a unique cache key
  const cacheKey = `search_author_${searchTerm}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const pageSize = 40;
  const language = 'fr';
  const url = `https://api2.isbndb.com/author/${encodeURIComponent(
    searchTerm
  )}?&pageSize=${pageSize}&language=${language}`;

  const data = await fetchJson(url, {
    headers: { 'Authorization': apiKey }
  });
  
  // Save to cache
  cache.set(cacheKey, data);
  return data;
};

const searchPreferredFromIsbndb = async (params = {}) => {
  // Use the provided category or default to 'Fiction'
  const category = params.category || 'Fiction';
  const cacheKey = `preferred_books_${category}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  // ISBNdb index search endpoint for subject/category
  const categorySlug = encodeURIComponent(category.replace(/\s+/g, '_'));
  const page = 10;
  const pageSize = 1000
  const url = `https://api2.isbndb.com/search/books?subject=${categorySlug}&page=${page}&pageSize=${pageSize}`;

  const data = await fetchJson(url, {
    headers: { 'Authorization': apiKey }
  });

  // Filter books by language === 'fr'
  const filteredBooks = Array.isArray(data.data)
    ? data.data.filter(book => book.language && book.language.toLowerCase() === 'fr')
    : [];

  // Return the same structure, but with filtered books (no limit)
  const filteredData = { ...data, books: filteredBooks };

  // Remove the unfiltered data property if it exists
  if (filteredData.data) {
    delete filteredData.data;
  }

  cache.set(cacheKey, filteredData);
  return filteredData;
};

const fetchBookFromIsbndb = async (isbn) => {
  // Create a unique cache key
  const cacheKey = `book_${isbn}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const url = `https://api2.isbndb.com/book/${isbn}`;
  const data = await fetchJson(url, {
    headers: { 'Authorization': apiKey }
  });

  // Save to cache
  cache.set(cacheKey, data);
  return data;
};

module.exports = {
  fetchBookFromIsbndb,
  searchBooksFromIsbndb,
  searchAuthorFromIsbndb,
  searchPreferredFromIsbndb,
};
