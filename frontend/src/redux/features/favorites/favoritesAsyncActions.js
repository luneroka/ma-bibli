import { createAsyncThunk } from '@reduxjs/toolkit';
import { createGetAllBooksAsync } from '../../../utils/asyncActions';

// GET FAVORITES
export const getFavoriteBooksAsync = createGetAllBooksAsync(
  'favorites',
  'http://localhost:3000/api/library/favorites'
);

// TOGGLE FAVORITE
const createToggleFavoriteAsync = (type, apiEndpoint) =>
  createAsyncThunk(
    `${type}/toggleFavoriteAsync`,
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

export const toggleFavoriteAsync = createToggleFavoriteAsync(
  'favorites',
  'http://localhost:3000/api/library/favorites'
);
