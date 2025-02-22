import { createSlice } from '@reduxjs/toolkit';
import {
  getWishlistBooksAsync,
  addToWishlistAsync,
  removeFromWishlistAsync,
} from './wishlistAsyncActions';

const initialState = {
  wishlistBooks: [],
  status: 'idle',
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET WISHLIST BOOKS
      .addCase(getWishlistBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWishlistBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlistBooks = action.payload;
      })
      .addCase(getWishlistBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ADD TO WISHLIST
      .addCase(addToWishlistAsync.pending, (state, action) => {
        state.status = 'loading';
        state.wishlistBooks.push(action.meta.arg.optimisticBook);
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlistBooks = state.wishlistBooks.map((book) =>
          book.isbn === action.payload.isbn ? action.payload : book
        );
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.wishlistBooks = state.wishlistBooks.filter(
          (book) => book.isbn !== action.meta.arg.optimisticBook.isbn
        );
      })

      // REMOVE FROM WISHLIST
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.wishlistBooks = state.wishlistBooks.filter(
          (book) => book.isbn !== action.payload
        );
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
