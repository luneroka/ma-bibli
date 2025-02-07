import { createAddBookAsync, createRemoveBookAsync } from './asyncActions';

export const addToLibraryAsync = createAddBookAsync(
  'library',
  '/api/library/add-book'
);
export const removeFromLibraryAsync = createRemoveBookAsync(
  'library',
  '/api/library/delete-book'
);
