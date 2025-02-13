const { fetchJson } = require('./helper');
require('dotenv').config();
const apiKey = process.env.NEWS_API_KEY;

const fetchNewsFromNewsApi = async () => {
  const pageSize = 10;
  const sortBy = 'publishedAt';
  const url = `https://newsapi.org/v2/everything?q=littérature&sources=le-monde,liberation,france24&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`;

  const data = await fetchJson(url);

  return data.articles || [];
};

module.exports = { fetchNewsFromNewsApi };
