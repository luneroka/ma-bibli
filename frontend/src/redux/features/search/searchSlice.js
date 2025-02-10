import { createSlice } from '@reduxjs/toolkit';
import {
  createSearchBooksAsync,
  createSearchAuthorAsync,
  createSearchNewestAsync,
} from '../../../utils/asyncActions';

const initialState = {
  searchResults: { items: [] },
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = { items: [] };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // SEARCH BOOKS
      .addCase(
        createSearchBooksAsync('searchBooks', '/api/search/books').pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchBooksAsync('searchBooks', '/api/search/books').fulfilled,
        (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
          console.log('Search results:', action.payload);
        }
      )
      .addCase(
        createSearchBooksAsync('searchBooks', '/api/search/books').rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // SEARCH AUTHOR
      .addCase(
        createSearchAuthorAsync('searchAuthor', '/api/search/author').pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchAuthorAsync('searchAuthor', '/api/search/author').fulfilled,
        (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
          console.log('Search results:', action.payload);
        }
      )
      .addCase(
        createSearchAuthorAsync('searchAuthor', '/api/search/author').rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // SEARCH NEWEST
      .addCase(
        createSearchNewestAsync('searchNewest', 'api/search/newest').pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchNewestAsync('searchNewest', 'api/search/newest').fulfilled,
        (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
          console.log('Search results:', action.payload);
        }
      )
      .addCase(
        createSearchNewestAsync('searchNewest', 'api/search/newest').rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
