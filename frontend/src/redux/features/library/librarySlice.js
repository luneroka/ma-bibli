import { createSlice } from '@reduxjs/toolkit';
import {
  getLibraryBooksAsync,
  addToLibraryAsync,
  removeFromLibraryAsync,
} from './libraryAsyncActions';

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
      .addCase(addToLibraryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToLibraryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.libraryBooks.push(action.payload);
      })
      .addCase(addToLibraryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
      });
  },
});

export default librarySlice.reducer;
