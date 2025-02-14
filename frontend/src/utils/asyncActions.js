import { createAsyncThunk } from '@reduxjs/toolkit';

// GET ALL BOOKS
export const createGetAllBooksAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/getAllBooksAsync`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to load ${type} books`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// ADD BOOK (now reading normalized data)
export const createAddBookAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/addBookAsync`,
    async ({ optimisticBook }, { rejectWithValue }) => {
      try {
        const isbn = optimisticBook.isbn;
        if (!isbn) {
          throw new Error('ISBN not found in book data');
        }
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isbn }),
        });
        if (!response.ok) {
          throw new Error(`Failed to add book to the ${type}`);
        }
        const data = await response.json();
        return data.book;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// REMOVE BOOK
export const createRemoveBookAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/removeBookAsync`,
    async (bookId, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiEndpoint}/${bookId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to remove book from ${type}`);
        }

        return bookId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
