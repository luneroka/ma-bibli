import { createSlice } from '@reduxjs/toolkit';
import {
  getHaveReadBooksAsync,
  toggleHaveReadAsync,
} from './haveReadAsyncActions';

const initialState = {
  haveRead: [],
  status: 'idle',
  error: null,
};

const haveReadSlice = createSlice({
  name: 'have-read',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET HAVE READ BOOKS
      .addCase(getHaveReadBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHaveReadBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.haveRead = action.payload;
      })
      .addCase(getHaveReadBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // TOGGLE HAVE READ
      .addCase(toggleHaveReadAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(toggleHaveReadAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedBook = action.payload;
        state.haveRead = state.haveRead.filter(
          (book) => book.isbn !== updatedBook.isbn
        );
        if (updatedBook.haveRead) {
          state.haveRead.push(updatedBook);
        }
      })
      .addCase(toggleHaveReadAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default haveReadSlice.reducer;
