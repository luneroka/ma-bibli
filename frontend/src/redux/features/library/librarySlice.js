import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to add a book to the library (both Redux state and database)
export const addToLibraryAsync = createAsyncThunk(
  'library/addToLibraryAsync',
  async (book, { rejectWithValue }) => {
    try {
      // Send a POST request to the backend to add the book to the database
      const response = await fetch('/api/books/add-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error('Failed to add book to the library');
      }

      const data = await response.json();
      return data.book; // Return the added book from the API response
    } catch (error) {
      return rejectWithValue(error.message); // Return error message
    }
  }
);

const initialState = {
  libraryBooks: [],
  status: 'idle', // track status for loading, success, or failure
  error: null, // track errors
};

// DO I STILL NEED THE ADD AND REMOVE FUNCTIONS ?? IF YES => REPLACE book.id BY book.googleId ?
const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    addToLibrary: (state, action) => {
      const existingBook = state.libraryBooks.find(
        (book) => book.id === action.payload.id
      );
      if (!existingBook) {
        state.libraryBooks.push(action.payload); // Directly add to the library if not present
      }
    },
    removeFromLibrary: (state, action) => {
      state.libraryBooks = state.libraryBooks.filter(
        (book) => book.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToLibraryAsync.pending, (state) => {
        state.status = 'loading'; // set status to loading when the request is in progress
      })
      .addCase(addToLibraryAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'; // set status to succeeded once the book is added
        state.libraryBooks.push(action.payload); // add the new book to libraryBooks
      })
      .addCase(addToLibraryAsync.rejected, (state, action) => {
        state.status = 'failed'; // set status to failed if the request fails
        state.error = action.payload; // capture the error message
      });
  },
});

export const { addToLibrary, removeFromLibrary } = librarySlice.actions;
export default librarySlice.reducer;
