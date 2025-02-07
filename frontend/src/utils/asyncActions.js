import { createAsyncThunk } from '@reduxjs/toolkit';

// Async action to add a book to the library (both Redux state and database)
export const createAddBookAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/addBookAsync`,
    async (book, { rejectWithValue }) => {
      try {
        // Send a POST request to the backend to add the book to the database
        const response = await fetch(apiEndpoint, {
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

export const createRemoveBookAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/removeBookAsync`,
    async (bookId, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiEndpoint}/${bookId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to remove book from library');
        }

        return bookId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
