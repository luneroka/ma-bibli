const fetch = require('node-fetch');

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch error on ${url}: ${response.statusText}`);
  }
  return response.json();
};

module.exports = { fetchJson };
