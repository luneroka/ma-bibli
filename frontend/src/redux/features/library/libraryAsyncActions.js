import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';

export const getLibraryBooksAsync = createGetAllBooksAsync(
  'library',
  'http://localhost:3000/api/library'
);

export const addToLibraryAsync = createAddBookAsync(
  'library',
  'http://localhost:3000/api/library/add-book'
);
export const removeFromLibraryAsync = createRemoveBookAsync(
  'library',
  'http://localhost:3000/api/library/delete-book'
);
