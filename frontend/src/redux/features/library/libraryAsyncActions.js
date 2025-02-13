import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';

export const getLibraryBooksAsync = createGetAllBooksAsync(
  'library',
  '/api/library'
);

export const addToLibraryAsync = createAddBookAsync(
  'library',
  '/api/library/add-book'
);
export const removeFromLibraryAsync = createRemoveBookAsync(
  'library',
  '/api/library/delete-book'
);
