import { createSlice } from '@reduxjs/toolkit';
import { createSearchNewestAsync } from '../../../utils/asyncActions';

const initialState = {
  newest: { items: [] },
  loading: false,
  error: null,
};

const newestSlice = createSlice({
  name: 'newest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default searchSlice.reducer;
