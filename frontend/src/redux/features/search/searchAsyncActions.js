import { createAsyncThunk } from '@reduxjs/toolkit';

// SEARCH BOOKS
export const createSearchBooksAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/searchBooksAsync`,
    async (searchTerm, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${apiEndpoint}/${encodeURIComponent(searchTerm)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
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
        const response = await fetch(
          `${apiEndpoint}/${encodeURIComponent(searchTerm)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
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
