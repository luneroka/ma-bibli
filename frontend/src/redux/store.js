import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './features/books/booksSlice';
import singleBookReducer from './features/single-book/singleBookSlice';
import libraryReducer from './features/library/librarySlice';
import readingListReducer from './features/reading-list/readingListSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    singleBook: singleBookReducer,
    library: libraryReducer,
    readingList: readingListReducer,
  },
});
