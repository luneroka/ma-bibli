import { createSlice } from '@reduxjs/toolkit';
import { createSearchNewestAsync } from './newestAsyncActions';

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
        createSearchNewestAsync('newest', '/api/search/newest').pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchNewestAsync('newest', '/api/search/newest').fulfilled,
        (state, action) => {
          state.loading = false;
          state.newest = action.payload;
        }
      )
      .addCase(
        createSearchNewestAsync('newest', '/api/search/newest').rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default newestSlice.reducer;
