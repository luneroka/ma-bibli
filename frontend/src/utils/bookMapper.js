export const mapBookData = (book) => ({
  googleId: book.id || 'N/A',
  title: book.volumeInfo.title || 'N/A',
  authors: book.volumeInfo.authors || ['Unknown'],
  publisher: book.volumeInfo.publisher || 'Unknown',
  publishedDate: book.volumeInfo.publishedDate || 'Unknown',
  description: book.volumeInfo.description || 'No description available',
  pageCount: book.volumeInfo.pageCount || 0,
  categories: book.volumeInfo.categories || ['Uncategorized'],
  thumbnail: book.volumeInfo.imageLinks?.thumbnail || '/default-thumbnail.jpg',
});
