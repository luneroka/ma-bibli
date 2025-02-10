const { fetchBestSellersFromNYT } = require('../utils/nytBooksApi');
const { fetchIsbnFromGoogle } = require('../utils/googleBooksApi');

const fetchBestSellers = async (req, res) => {
  try {
    const nytBestSellers = await fetchBestSellersFromNYT();
    const bestSellersWithGoogleData = await Promise.all(
      nytBestSellers.results.books.map(async (book) => {
        const isbn = book.isbns[0]?.isbn13 || book.isbns[0]?.isbn10;
        if (isbn) {
          const googleBookData = await fetchIsbnFromGoogle(isbn);
          if (googleBookData) {
            return {
              ...book,
              id: googleBookData.id,
              volumeInfo: googleBookData.volumeInfo,
            };
          }
        }
        return book;
      })
    );

    res.status(200).json(bestSellersWithGoogleData);
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
