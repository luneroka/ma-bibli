import { createAsyncThunk } from '@reduxjs/toolkit';
import { createGetAllBooksAsync } from '../../../utils/asyncActions';

// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// GET HAVE READ
export const getHaveReadBooksAsync = createGetAllBooksAsync(
  'have-read',
  `${API_URL}/api/library/have-read`
);

// TOGGLE HAVE READ
const createToggleHaveReadAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/toggleHaveReadAsync`,
    async ({ token, isbn }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${apiEndpoint}/${isbn}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to modify ${type} books`);
        }
        const data = await response.json();
        return data.book;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const toggleHaveReadAsync = createToggleHaveReadAsync(
  'have-read',
  `${API_URL}/api/library/have-read`
);
