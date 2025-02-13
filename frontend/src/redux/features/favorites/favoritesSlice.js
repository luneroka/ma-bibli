import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'isFavorite',
  initialState: false,
  reducers: {
    addToFavorites(state) {
      state = true;
    },
    removeFromFavorites(state) {
      
      state = false;
    },
  },
});

export default favoritesSlice.reducer;
