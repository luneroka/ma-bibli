import { createAsyncThunk } from '@reduxjs/toolkit';

export const createGetNewsAsync = (type, apiEndpoint) =>
  createAsyncThunk(`${type}/getNewsAsync`, async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to load ${type} news`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
