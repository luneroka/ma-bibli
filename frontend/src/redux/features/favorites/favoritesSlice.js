import { toggleFavoriteAsync } from './favoritesAsyncActions';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can keep manual reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBook = action.payload;
        state.favorites = state.favorites.filter(
          (book) => book.isbn !== updatedBook.isbn
        );
        if (updatedBook.isFavorite) {
          state.favorites.push(updatedBook);
        }
      })
      .addCase(toggleFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default favoritesSlice.reducer;
