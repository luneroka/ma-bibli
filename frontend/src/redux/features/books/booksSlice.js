import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapBookData } from '../../../utils/bookMapper';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetch('/books.json');
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  const data = await response.json();
  const mappedData = data.items.map(mapBookData);
  console.log('Mapped Book Data:', mappedData); // Log the mapped data

  return mappedData;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
