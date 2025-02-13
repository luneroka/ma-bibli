import { createSlice } from '@reduxjs/toolkit';
import {
  getFavoriteBooksAsync,
  toggleFavoriteAsync,
} from './favoritesAsyncActions';

const initialState = {
  favorites: [],
  status: 'idle',
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET FAVORITE BOOKS
      .addCase(getFavoriteBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFavoriteBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.favorites = action.payload;
      })
      .addCase(getFavoriteBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // TOGGLE FAVORITE
      .addCase(toggleFavoriteAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedBook = action.payload;
        state.favorites = state.favorites.filter(
          (book) => book.isbn !== updatedBook.isbn
        );
        if (updatedBook.isFavorite) {
          state.favorites.push(updatedBook);
        }
      })
      .addCase(toggleFavoriteAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
