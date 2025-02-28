import { createAsyncThunk } from '@reduxjs/toolkit';

export const getSingleBookAsync = createAsyncThunk(
  'singleBook/getSingleBookAsync',
  async (isbn, { rejectWithValue }) => {
    try {
      // Get current user and token
      const currentUser = firebase.auth().currentUser;
      let headers = {
        'Content-Type': 'application/json',
      };

      // Add authentication token if user is logged in
      if (currentUser) {
        const token = await currentUser.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`/api/books/${isbn}`, {
        method: 'GET',
        headers: headers,
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
