import { createSlice } from '@reduxjs/toolkit';
import {
  getReadingListBooksAsync,
  addToReadingListAsync,
  removeFromReadingListAsync,
} from '../../../utils/readingListAsyncActions';

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
        state.libraryBooks = action.payload;
      })
      .addCase(getReadingListBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ADD TO READING-LIST
      .addCase(addToReadingListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToReadingListAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.readingListBooks.push(action.payload);
      })
      .addCase(addToReadingListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // REMOVE FROM READING-LIST
      .addCase(removeFromReadingListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromReadingListAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.readingListBooks = state.readingListBooks.filter(
          (book) => book.id !== action.payload
        );
      })
      .addCase(removeFromReadingListAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default readingListSlice.reducer;
