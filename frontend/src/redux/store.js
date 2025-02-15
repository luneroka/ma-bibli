import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import newestReducer from './features/newest/newestSlice';
import newsReducer from './features/news/newsSlice';
import singleBookReducer from './features/single-book/singleBookSlice';
import libraryReducer from './features/library/librarySlice';
import readingListReducer from './features/reading-list/readingListSlice';
import favoritesReducer from './features/favorites/favoritesSlice';

const appReducer = combineReducers({
  search: searchReducer,
  newest: newestReducer,
  news: newsReducer,
  singleBook: singleBookReducer,
  library: libraryReducer,
  readingList: readingListReducer,
  favorites: favoritesReducer,
});

// Global root reducer resets library, readingList, and favorites when logout is dispatched.
const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = {
      ...state,
      library: undefined,
      readingList: undefined,
      favorites: undefined,
    };
  }
  return appReducer(state, action);
};

export const store = configureStore({ reducer: rootReducer });
