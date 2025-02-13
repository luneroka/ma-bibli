import { createAsyncThunk } from '@reduxjs/toolkit';

// SEARCH NEWEST
export const createSearchNewestAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/searchNewestAsync`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
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
