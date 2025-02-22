import { createSlice } from '@reduxjs/toolkit';
import {
  getLibraryBooksAsync,
  addToLibraryAsync,
  removeFromLibraryAsync,
  // If you have a toggleHaveReadAsync for library, you might use that too.
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
  reducers: {
    // Add an optimistic toggle reducer
    toggleHaveReadOptimistic: (state, action) => {
      const { isbn } = action.payload;
      const index = state.libraryBooks.findIndex((book) => book.isbn === isbn);
      if (index !== -1) {
        // Toggle the haveRead property immediately
        state.libraryBooks[index].haveRead =
          !state.libraryBooks[index].haveRead;
      }
    },
  },
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

export const { toggleHaveReadOptimistic } = librarySlice.actions;
export default librarySlice.reducer;
