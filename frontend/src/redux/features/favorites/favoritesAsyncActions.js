import { createAsyncThunk } from '@reduxjs/toolkit';

export const toggleFavoriteAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/toggleFavoriteAsync`,
    async (isbn, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiEndpoint}/${isbn}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(errorData.message);
        }
        const data = await response.json();
        return data.book;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const getFavoriteBooksAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/getFavoriteBooks`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          return rejectWithValue(
            errorData.message || `Failed to load ${type} books`
          );
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
