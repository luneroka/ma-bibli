const transformNewsArticle = (article) => {
  if (article.urlToImage) {
    article.urlToImage = `/api/proxy-image?url=${encodeURIComponent(
      article.urlToImage
    )}`;
  }
  return article;
};

module.exports = { transformNewsArticle };
