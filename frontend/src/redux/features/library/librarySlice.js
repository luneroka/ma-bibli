import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  libraryBooks: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addToLibrary: (state, action) => {
      const existingBook = state.libraryBooks.find(
        (book) => book.id === action.payload.id
      );
      if (!existingBook) {
        state.libraryBooks.push(action.payload);
        alert('Book successfully added to your library!');
      } else {
        alert('This book is already in your library.');
      }
    },
  },
});
