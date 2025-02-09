const fetch = require('node-fetch');
require('dotenv').config();

const fetchBookFromGoogleBooks = async (bookId) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch book from Google API');
  }
  const book = await response.json();
  return book;
};

module.exports = { fetchBookFromGoogleBooks };
