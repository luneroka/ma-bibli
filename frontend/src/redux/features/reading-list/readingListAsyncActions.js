import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';

export const getReadingListBooksAsync = createGetAllBooksAsync(
  'reading-list',
  'http://localhost:3000/api/reading-list'
);

export const addToReadingListAsync = createAddBookAsync(
  'reading-list',
  'http://localhost:3000/api/reading-list/add-book'
);
export const removeFromReadingListAsync = createRemoveBookAsync(
  'reading-list',
  'http://localhost:3000/api/reading-list/delete-book'
);
