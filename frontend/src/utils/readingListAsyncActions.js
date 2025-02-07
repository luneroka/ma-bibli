import { createAddBookAsync, createRemoveBookAsync } from './asyncActions';

export const addToReadingListAsync = createAddBookAsync(
  'reading-list',
  '/api/reading-list/add-book'
);
export const removeFromReadingListAsync = createRemoveBookAsync(
  'reading-list',
  '/api/reading-list/delete-book'
);
