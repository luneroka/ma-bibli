import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSingleBookAsync = createAsyncThunk(
  'singleBook/getSingleBookAsync',
  async (isbn, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/books/${isbn}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the book');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
