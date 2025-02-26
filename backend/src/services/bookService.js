const { mapBookCategory } = require('../utils/helper');

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
    '/product-not-found.png'; // use an absolute URL so the file can be found

  // If the cover is an absolute URL, wrap it with the proxy endpoint.
  // Otherwise (fallback image), leave it as is.
  if (coverUrl.startsWith('http')) {
    coverUrl = `/api/proxy-image?url=${encodeURIComponent(coverUrl)}`;
  }

  // Map book category
  const category =
    volume.categories && volume.categories.length > 0
      ? mapBookCategory(volume.categories[0])
      : 'Autres';

  return {
    isbn,
    title: volume.title || '',
    authors: volume.authors || [],
    publisher: volume.publisher || 'Non renseigné',
    publishedDate: volume.publishedDate || 'N/A',
    description: volume.description || 'Pas de description.',
    pageCount: volume.pageCount || 0,
    category: category || 'Autres',
    cover: coverUrl,
  };
};

module.exports = { transformGoogleBook };
