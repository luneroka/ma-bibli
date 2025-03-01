import { createSlice } from '@reduxjs/toolkit';
import {
  createSearchBooksAsync,
  createSearchAuthorAsync,
} from './searchAsyncActions';
import { getApiPath } from '../../../utils/apiConfig';

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
        createSearchBooksAsync('searchBooks', getApiPath('/api/search/books'))
          .pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchBooksAsync('searchBooks', getApiPath('/api/search/books'))
          .fulfilled,
        (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
        }
      )
      .addCase(
        createSearchBooksAsync('searchBooks', getApiPath('/api/search/books'))
          .rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // SEARCH AUTHOR
      .addCase(
        createSearchAuthorAsync(
          'searchAuthor',
          getApiPath('/api/search/author')
        ).pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchAuthorAsync(
          'searchAuthor',
          getApiPath('/api/search/author')
        ).fulfilled,
        (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
        }
      )
      .addCase(
        createSearchAuthorAsync(
          'searchAuthor',
          getApiPath('/api/search/author')
        ).rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
