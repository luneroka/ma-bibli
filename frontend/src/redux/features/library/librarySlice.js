import { createSlice } from '@reduxjs/toolkit';
import {
  getLibraryBooksAsync,
  addToLibraryAsync,
  removeFromLibraryAsync,
} from './libraryAsyncActions';
import { toggleFavoriteAsync } from '../favorites/favoritesAsyncActions';

const initialState = {
  libraryBooks: [],
  status: 'idle',
  error: null,
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET LIBRARY BOOKS
      .addCase(getLibraryBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLibraryBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.libraryBooks = action.payload;
      })
      .addCase(getLibraryBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ADD TO LIBRARY
      .addCase(addToLibraryAsync.pending, (state, action) => {
        state.status = 'loading';
        state.libraryBooks.push(action.meta.arg.optimisticBook);
      })
      .addCase(addToLibraryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.libraryBooks = state.libraryBooks.map((book) =>
          book.isbn === action.payload.isbn ? action.payload : book
        );
      })
      .addCase(addToLibraryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.libraryBooks = state.libraryBooks.filter(
          (book) => book.isbn !== action.meta.arg.optimisticBook.isbn
        );
      })

      // REMOVE FROM LIBRARY
      .addCase(removeFromLibraryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromLibraryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.libraryBooks = state.libraryBooks.filter(
          (book) => book.isbn !== action.payload
        );
      })
      .addCase(removeFromLibraryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update libraryBooks when toggling favorite
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        state.libraryBooks = state.libraryBooks.map((book) =>
          book.isbn === updatedBook.isbn ? updatedBook : book
        );
      });
  },
});

export default librarySlice.reducer;
