const { fetchNewsFromNewsApi } = require('../utils/newsApi');
const { transformNewsArticle } = require('../services/newsService');

const fetchNews = async (req, res) => {
  try {
    const results = await fetchNewsFromNewsApi();
    // Transform each article so that its image URL goes via the proxy
    const transformedArticles = results.map(transformNewsArticle);
    res.status(200).json(transformedArticles);
  } catch (error) {
    console.error('News could not be fetched');
    res
      .status(500)
      .json({ message: 'News could not be fetched', error: error.message });
  }
};

module.exports = { fetchNews };
