import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './features/library/librarySlice';
import readingListReducer from './features/reading-list/readingListSlice';

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    readingList: readingListReducer,
  },
});
