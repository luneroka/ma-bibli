import { createAsyncThunk } from '@reduxjs/toolkit';

// SEARCH NEWEST
export const createSearchPreferredAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/searchPreferredAsync`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch preferred books from ${type}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching preferred books:', error);
        return rejectWithValue(error.message);
      }
    }
  );
