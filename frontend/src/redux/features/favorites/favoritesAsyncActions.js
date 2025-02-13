import { createAsyncThunk } from '@reduxjs/toolkit';

export const toggleFavoriteAsync = createAsyncThunk(
  'favorites/toggleFavoriteAsync',
  async (isbn, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/library/favorite/${isbn}`, {
        method: 'PUT',
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
