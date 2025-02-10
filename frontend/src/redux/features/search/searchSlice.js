import { createSlice } from '@reduxjs/toolkit';
import { createSearchBooksAsync } from '../../../utils/asyncActions';

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
      .addCase(
        createSearchBooksAsync('search', '/api/search').pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchBooksAsync('search', '/api/search').fulfilled,
        (state, action) => {
          state.loading = false;
          state.searchResults = action.payload;
          console.log('Search results:', action.payload); // Add this line
        }
      )
      .addCase(
        createSearchBooksAsync('search', '/api/search').rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default searchSlice.reducer;
