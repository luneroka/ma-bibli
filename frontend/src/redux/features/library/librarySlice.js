import { createSlice } from '@reduxjs/toolkit';
import {
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
      .addCase(addToLibraryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToLibraryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.libraryBooks.push(action.payload);
      })
      .addCase(addToLibraryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeFromLibraryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeFromLibraryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.libraryBooks = state.libraryBooks.filter(
          (book) => book.googleId !== action.payload
        );
      })
      .addCase(removeFromLibraryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default librarySlice.reducer;
