import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApiPath } from '../../../utils/apiConfig';

// SEARCH BOOKS
export const createSearchBooksAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/searchBooksAsync`,
    async (searchTerm, { rejectWithValue }) => {
      try {
        // Validate searchTerm before sending the request
        if (!searchTerm || !searchTerm.trim()) {
          return { items: [] };
        }

        const response = await fetch(
          `${apiEndpoint}/${encodeURIComponent(searchTerm.trim())}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) {
          if (response.status === 500) {
            console.warn(
              `Search error: Server returned 500 for term "${searchTerm}"`
            );
            return { items: [] };
          }
          throw new Error(`Failed to search books in ${type}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Search error:', error);
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
        if (!searchTerm || !searchTerm.trim()) {
          return { items: [] };
        }

        const response = await fetch(
          `${apiEndpoint}/${encodeURIComponent(searchTerm.trim())}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) {
          // For 500 errors, return empty results instead of throwing
          if (response.status === 500) {
            console.warn(
              `Search error: Server returned 500 for term "${searchTerm}"`
            );
            return { items: [] };
          }
          throw new Error(`Failed to search authors in ${type}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Search error:', error);
        return rejectWithValue(error.message);
      }
    }
  );
