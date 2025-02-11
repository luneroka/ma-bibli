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

// ADD BOOK
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

// SEARCH BOOKS
export const createSearchBooksAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/searchBooksAsync`,
    async (searchTerm, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiEndpoint}/${searchTerm}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to search books in ${type}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// SEARCH AUTHORS
export const createSearchAuthorAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/searchAuthorAsync`,
    async (searchTerm, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiEndpoint}/${searchTerm}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to search authors in ${type}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

// SEARCH NEWEST
export const createSearchNewestAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/searchNewestAsync`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch newest books from ${type}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching newest books:', error);
        return rejectWithValue(error.message);
      }
    }
  );
