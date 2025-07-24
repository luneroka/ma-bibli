const { fetchNewsFromNewsApi } = require('../utils/newsApi');

const fetchNews = async (req, res) => {
  try {
    const results = await fetchNewsFromNewsApi();
    res.status(200).json(results);
  } catch (error) {
    console.error('News could not be fetched');
    res
      .status(500)
      .json({ message: 'News could not be fetched', error: error.message });
  }
};

module.exports = { fetchNews };
