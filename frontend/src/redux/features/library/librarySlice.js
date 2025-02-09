import { createSlice } from '@reduxjs/toolkit';
import {
  getLibraryBooksAsync,
  addToLibraryAsync,
  removeFromLibraryAsync,
} from '../../../utils/libraryAsyncActions';

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
      .addCase(removeFromLibraryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromLibraryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.libraryBooks = state.libraryBooks.filter(
          (book) => book.id !== action.payload
        );
      })
      .addCase(removeFromLibraryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default librarySlice.reducer;
