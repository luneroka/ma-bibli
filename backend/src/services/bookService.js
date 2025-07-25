const { mapBookCategory } = require('../utils/helper');

const transformIsbndbBook = (isbndbBook) => {
  if (!isbndbBook) return null;

  // ISBNdb returns a "book" object, sometimes nested under "book" or "books"
  const book = isbndbBook.book || isbndbBook;

  // Pick ISBN-13; fall back to ISBN-10 if needed.
  const isbn =
    book.isbn13 ||
    book.isbn ||
    book.isbn10 ||
    null;

  // Use cover URL if available, otherwise fallback
  let coverUrl = book.image || '/product-not-found.png';

  // Map book category
  let category = 'Autres';
  if (book.subjects && book.subjects.length > 0) {
    for (const subject of book.subjects) {
      const mapped = mapBookCategory(subject);
      if (mapped && mapped !== 'Autres') {
        category = mapped;
        break;
      }
    }
  }

  return {
    isbn,
    title: book.title || '',
    authors: book.authors || [],
    publisher: book.publisher || 'Non renseigné',
    publishedDate: book.date_published || book.publish_date || 'N/A',
    description: book.overview || book.synopsis || 'Pas de description.',
    pageCount: book.pages || 0,
    category: category || 'Autres',
    cover: coverUrl,
  };
};

module.exports = { transformIsbndbBook };
