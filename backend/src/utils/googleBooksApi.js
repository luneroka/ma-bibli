require('dotenv').config();
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
const { fetchJson } = require('./helper');
const NodeCache = require('node-cache');
// Increased cache time to 6 hours for better protection against rate limits
const cache = new NodeCache({ stdTTL: 21600 });

const searchBooksFromGoogle = async (searchTerm) => {
  // Create a unique cache key
  const cacheKey = `search_books_${searchTerm}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const maxResults = 40;
  const langRestrict = 'fr';
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchTerm
  )}&maxResults=${maxResults}&langRestrict=${langRestrict}&key=${apiKey}`;

  const data = await fetchJson(url);

  // Filter out books with missing images or pageCount ≤ 0
  if (data.items) {
    data.items = data.items.filter((book) => book.volumeInfo?.title);
  } else {
    data.items = [];
  }

  // Save to cache
  cache.set(cacheKey, data);
  return data;
};

const searchAuthorFromGoogle = async (searchTerm) => {
  // Create a unique cache key
  const cacheKey = `search_author_${searchTerm}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const maxResults = 40;
  const langRestrict = 'fr';
  const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
    searchTerm
  )}&maxResults=${maxResults}&langRestrict=${langRestrict}&key=${apiKey}`;

  const data = await fetchJson(url);
  if (data.items) {
    data.items = data.items.filter(
      (book) => book.volumeInfo?.title && book.volumeInfo?.pageCount > 0
    );
  } else {
    data.items = [];
  }

  // Save to cache
  cache.set(cacheKey, data);
  return data;
};

const searchNewestFromGoogle = async (params) => {
  // Use more specific cache key
  const cacheKey = `newest_books_${JSON.stringify(params)}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  const maxResults = 10;
  const langRestrict = 'fr';
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=${maxResults}&langRestrict=${langRestrict}&key=${apiKey}`;

  const data = await fetchJson(url);
  if (data.items) {
    data.items = data.items.filter(
      (book) =>
        book.volumeInfo?.title &&
        book.volumeInfo?.imageLinks &&
        book.volumeInfo?.authors &&
        book.volumeInfo?.pageCount > 0
    );
  } else {
    data.items = [];
  }
  cache.set(cacheKey, data);
  return data;
};

const fetchBookFromGoogle = async (isbn) => {
  // Create a unique cache key
  const cacheKey = `book_${isbn}`;
  const cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  // First, try a strict ISBN-based query.
  const primaryUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`;
  let data = await fetchJson(primaryUrl);

  // If no items are returned, try a fallback query (e.g. without the "isbn:" prefix).
  if (!data.items || data.items.length === 0) {
    const fallbackUrl = `https://www.googleapis.com/books/v1/volumes?q=${isbn}&key=${apiKey}`;
    data = await fetchJson(fallbackUrl);
  }

  // Save to cache
  cache.set(cacheKey, data);
  return data;
};

module.exports = {
  fetchBookFromGoogle,
  searchBooksFromGoogle,
  searchAuthorFromGoogle,
  searchNewestFromGoogle,
};
