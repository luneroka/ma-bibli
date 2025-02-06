import { createAsyncThunk } from '@reduxjs/toolkit';

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
      return data.book;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromLibraryAsync = createAsyncThunk(
  'library/removeFromLibrary',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/books/delete-book/${bookId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove book from library');
      }

      return bookId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
