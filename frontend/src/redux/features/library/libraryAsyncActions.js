import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';

import { getApiPath } from '../../../utils/apiConfig';

export const getLibraryBooksAsync = createGetAllBooksAsync(
  'library',
  getApiPath('/api/library')
);

export const addToLibraryAsync = createAddBookAsync(
  'library',
  getApiPath('/api/library/add-book')
);

export const removeFromLibraryAsync = createRemoveBookAsync(
  'library',
  getApiPath('/api/library/delete-book')
);
