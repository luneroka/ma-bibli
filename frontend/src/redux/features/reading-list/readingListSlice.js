import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
  readingListBooks: [],
};

const readingListSlice = createSlice({
  name: 'reading-list',
  initialState,
  reducers: {
    addToReadingList: (state, action) => {
      const existingBook = state.readingListBooks.find(
        (book) => book.id === action.payload.id
      );
      if (!existingBook) {
        state.readingListBooks.push(action.payload);
      }
    },
    removeFromReadingList: (state, action) => {
      state.readingListBooks = state.readingListBooks.filter(
        (book) => book.id !== action.payload.id
      );
    },
  },
});

export const { addToReadingList, removeFromReadingList } =
  readingListSlice.actions;
export default readingListSlice.reducer;
