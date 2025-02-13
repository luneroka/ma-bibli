import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import newestReducer from './features/newest/newestSlice';
import newsReducer from './features/news/newsSlice';
import singleBookReducer from './features/single-book/singleBookSlice';
import libraryReducer from './features/library/librarySlice';
import readingListReducer from './features/reading-list/readingListSlice';
import favoritesReducer from './features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    newest: newestReducer,
    news: newsReducer,
    singleBook: singleBookReducer,
    library: libraryReducer,
    readingList: readingListReducer,
    favorites: favoritesReducer,
  },
});
