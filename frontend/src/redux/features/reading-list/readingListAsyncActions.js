import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';

export const getReadingListBooksAsync = createGetAllBooksAsync(
  'reading-list',
  'api/reading-list'
);

export const addToReadingListAsync = createAddBookAsync(
  'reading-list',
  '/api/reading-list/add-book'
);
export const removeFromReadingListAsync = createRemoveBookAsync(
  'reading-list',
  '/api/reading-list/delete-book'
);
