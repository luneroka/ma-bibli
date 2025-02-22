require('dotenv').config();
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
const { fetchJson } = require('./helper');

const searchBooksFromGoogle = async (searchTerm) => {
  const maxResults = 20;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    searchTerm
  )}&maxResults=${maxResults}&key=${apiKey}`;

  const data = await fetchJson(url);

  // Filter out books with missing images or pageCount ≤ 0
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
  return data;
};

const searchAuthorFromGoogle = async (searchTerm) => {
  const maxResults = 40;
  const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(
    searchTerm
  )}&maxResults=${maxResults}&key=${apiKey}`;

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
  return data;
};

const searchNewestFromGoogle = async () => {
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
  return data;
};

const fetchBookFromGoogle = async (isbn) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}`;
  const data = await fetchJson(url);
  return data;
};

module.exports = {
  fetchBookFromGoogle,
  searchBooksFromGoogle,
  searchAuthorFromGoogle,
  searchNewestFromGoogle,
};
