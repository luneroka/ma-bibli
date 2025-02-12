import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import newestReducer from './features/newest/newestSlice';
import singleBookReducer from './features/single-book/singleBookSlice';
import libraryReducer from './features/library/librarySlice';
import readingListReducer from './features/reading-list/readingListSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    newest: newestReducer,
    singleBook: singleBookReducer,
    library: libraryReducer,
    readingList: readingListReducer,
  },
});
