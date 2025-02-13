const transformGoogleBook = (googleBook) => {
  if (!googleBook?.volumeInfo) return null;
  const volume = googleBook.volumeInfo;

  // Pick ISBN-13; fall back to ISBN-10 if needed.
  const isbn =
    volume.industryIdentifiers?.find((id) => id.type === 'ISBN_13')
      ?.identifier ||
    volume.industryIdentifiers?.find((id) => id.type === 'ISBN_10')
      ?.identifier ||
    null;

  // Use a proper cover URL (or a fallback if desired)
  let coverUrl =
    volume.imageLinks?.thumbnail ||
    volume.imageLinks?.smallThumbnail ||
    '../../../../frontend/public/product-not-found.png';

  // If it's from Google, use the proxy endpoint
  if (coverUrl) {
    coverUrl = `/api/proxy-image?url=${encodeURIComponent(coverUrl)}`;
  }

  return {
    isbn,
    title: volume.title || '',
    authors: volume.authors || [],
    publisher: volume.publisher || '',
    publishedDate: volume.publishedDate || '',
    description: volume.description || '',
    pageCount: volume.pageCount || 0,
    categories: volume.categories || [],
    cover: coverUrl,
  };
};

module.exports = { transformGoogleBook };
