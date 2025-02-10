import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './features/books/booksSlice';
import searchReducer from './features/search/searchSlice';
import newestReducer from './features/newest/newestSlice';
import bestSellersReducer from './features/best-sellers/bestSellersSlice';
import singleBookReducer from './features/single-book/singleBookSlice';
import libraryReducer from './features/library/librarySlice';
import readingListReducer from './features/reading-list/readingListSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    search: searchReducer,
    newest: newestReducer,
    bestSellers: bestSellersReducer,
    singleBook: singleBookReducer,
    library: libraryReducer,
    readingList: readingListReducer,
  },
});
