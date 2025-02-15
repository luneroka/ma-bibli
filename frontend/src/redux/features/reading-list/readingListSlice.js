import { createSlice } from '@reduxjs/toolkit';
import {
  getReadingListBooksAsync,
  addToReadingListAsync,
  removeFromReadingListAsync,
} from './readingListAsyncActions';

const initialState = {
  readingListBooks: [],
  status: 'idle',
  error: null,
};

const readingListSlice = createSlice({
  name: 'reading-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET READING-LIST BOOKS
      .addCase(getReadingListBooksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReadingListBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.readingListBooks = action.payload;
      })
      .addCase(getReadingListBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ADD TO READING-LIST
      .addCase(addToReadingListAsync.pending, (state, action) => {
        state.status = 'loading';
        state.readingListBooks.push(action.meta.arg.optimisticBook);
      })
      .addCase(addToReadingListAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.readingListBooks = state.readingListBooks.map((book) =>
          book.isbn === action.payload.isbn ? action.payload : book
        );
      })
      .addCase(addToReadingListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.readingListBooks = state.readingListBooks.filter(
          (book) => book.isbn !== action.meta.arg.optimisticBook.isbn
        );
      })

      // REMOVE FROM READING-LIST
      .addCase(removeFromReadingListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromReadingListAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.readingListBooks = state.readingListBooks.filter(
          (book) => book.isbn !== action.payload
        );
      })
      .addCase(removeFromReadingListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default readingListSlice.reducer;
