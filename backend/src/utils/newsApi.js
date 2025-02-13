const fetch = require('node-fetch');
require('dotenv').config();
const apiKey = process.env.NEWS_API_KEY;

// A small helper to fetch and parse JSON.
const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch error on ${url}: ${response.statusText}`);
  }
  return response.json();
};

const fetchNewsFromNewsApi = async () => {
  const pageSize = 10;
  const url = `https://newsapi.org/v2/everything?q=littérature&sources=le-monde,liberation,france24&sortBy=popularity&pageSize=${pageSize}&apiKey=${apiKey}`;

  const data = await fetchJson(url);

  return data.articles || [];
};

module.exports = { fetchNewsFromNewsApi };
