import { createSlice } from '@reduxjs/toolkit';
import { createGetNewsAsync } from '../../../utils/newsAsyncActions';

const initialState = {
  news: [],
  loading: false,
  error: null,
};

const getNewsAsync = createGetNewsAsync('news', '/api/news');

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(getNewsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
