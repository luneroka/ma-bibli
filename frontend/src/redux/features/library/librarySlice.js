import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Ajouté à votre bibliothèque !',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Déjà dans votre bibliothèque.',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    removeFromLibrary: (state, action) => {
      state.libraryBooks = state.libraryBooks.filter(
        (book) => book.id !== action.payload.id
      );
    },
  },
});

export const { addToLibrary, removeFromLibrary } = librarySlice.actions;
export default librarySlice.reducer;
