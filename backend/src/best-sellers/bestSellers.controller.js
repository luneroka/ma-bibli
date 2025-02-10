const { fetchBestSellersFromNYT } = require('../utils/nytBooksApi');

const fetchBestSellers = async (req, res) => {
  try {
    const bestSellers = await fetchBestSellersFromNYT();
    res.status(200).json(bestSellers);
  } catch (error) {
    console.error('Failed to fetch best sellers from NYT API', error);
    res
      .status(500)
      .json({ message: 'Failed to fetch best sellers from NYT API' });
  }
};

module.exports = {
  fetchBestSellers,
};
