const fetch = require('node-fetch');
require('dotenv').config();
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

const searchBooks = async (searchTerm) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;

  const response = await fetch(url);

  if (!response) {
    console.error(
      `Failed to search books from Google API: ${response.statusText}`
    );
    throw new Error('Failed to search books from Google API');
  }
  const searchResults = await response.json();
  return searchResults;
};

const fetchBookFromGoogleBooks = async (bookId) => {
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

  console.log(`Fetching book from Google API: ${url}`);

  const response = await fetch(url);
  // console.log(`Response status: ${response.status}`);
  if (!response.ok) {
    console.error(
      `Failed to fetch book from Google API: ${response.statusText}`
    );
    throw new Error('Failed to fetch book from Google API');
  }
  const book = await response.json();
  // console.log(`Fetched book data: ${JSON.stringify(book)}`);
  return book;
};

module.exports = { fetchBookFromGoogleBooks, searchBooks };
