function filterBooksWithImagesAndPages(books) {
  return books.filter(
    (book) => book.volumeInfo?.imageLinks && book.volumeInfo?.pageCount > 0
  );
}

module.exports = filterBooksWithImagesAndPages;
