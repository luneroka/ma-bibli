import { createSlice } from '@reduxjs/toolkit';
import { createSearchBooksAsync } from '../../../utils/asyncActions';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        createSearchBooksAsync('books', '/api/search').pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchBooksAsync('books', '/api/search').fulfilled,
        (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
        }
      )
      .addCase(
        createSearchBooksAsync('books', '/api/search').rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default searchSlice.reducer;
