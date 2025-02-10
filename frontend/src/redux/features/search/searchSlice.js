import { createSlice } from '@reduxjs/toolkit';
import {
  createSearchBooksAsync,
  createSearchAuthorAsync,
} from '../../../utils/asyncActions';

const initialState = {
  searchResults: { items: [] },
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
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
      );
  },
});

export default searchSlice.reducer;
