import { createSlice } from '@reduxjs/toolkit';
import { getSingleBookAsync } from '../../../utils/singleBookAsyncActions';

const initialState = {
  book: null,
  status: 'idle',
  error: null,
};

const singleBookSlice = createSlice({
  name: 'singleBook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleBookAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleBookAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.book = action.payload;
      })
      .addCase(getSingleBookAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default singleBookSlice.reducer;
