import { createSlice } from '@reduxjs/toolkit';
import { createFetchBestSellersAsync } from '../../../utils/asyncActions';

const initialState = {
  bestSellers: { items: [] },
  loading: false,
  error: null,
};

const bestSellersSlice = createSlice({
  name: 'bestSellers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH BEST SELLERS
      .addCase(
        createFetchBestSellersAsync('bestSellers', 'api/best-sellers').pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createFetchBestSellersAsync('bestSellers', 'api/best-sellers')
          .fulfilled,
        (state, action) => {
          state.loading = false;
          state.bestSellers = action.payload;
          console.log('Search results:', action.payload);
        }
      )
      .addCase(
        createFetchBestSellersAsync('bestSellers', 'api/best-sellers').rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default bestSellersSlice.reducer;
