import { createSlice } from '@reduxjs/toolkit';
import { addToLibraryAsync } from '../../../utils/libraryAsyncActions';

const initialState = {
  libraryBooks: [],
  status: 'idle', // track status for loading, success, or failure
  error: null, // track errors
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    removeFromLibrary: (state, action) => {
      state.libraryBooks = state.libraryBooks.filter(
        (book) => book.id !== action.payload.id
      );
    },
  },
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
      });
  },
});

export const { removeFromLibrary } = librarySlice.actions;
export default librarySlice.reducer;
