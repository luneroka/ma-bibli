const fetch = require('node-fetch');
require('dotenv').config();
const apiKey = process.env.NYT_BOOKS_API_KEY;

const fetchBestSellersFromNYT = async () => {
  const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.error(
      `Failed to search books from NYT API: ${response.statusText}`
    );
    throw new Error('Failed to search books from NYT API');
  }

  let searchResults;
  try {
    searchResults = await response.json();
  } catch (error) {
    console.error('Failed to parse search results from NYT API', error);
    throw new Error('Failed to parse search results from NYT API');
  }

  return searchResults;
};

module.exports = { fetchBestSellersFromNYT };
