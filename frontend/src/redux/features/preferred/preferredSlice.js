import { createSlice } from '@reduxjs/toolkit';
import { createSearchPreferredAsync } from './preferredAsyncActions';
import { getApiPath } from '../../../utils/apiConfig';

const initialState = {
  preferred: {
    items: [],
  },
  loading: false,
  error: null,
};

const preferredSlice = createSlice({
  name: 'preferred',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SEARCH PREFERRED
      .addCase(
        createSearchPreferredAsync('preferred', getApiPath('/api/search/preferred'))
          .pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        createSearchPreferredAsync('preferred', getApiPath('/api/search/preferred'))
          .fulfilled,
        (state, action) => {
          state.loading = false;
          // Store the items array directly, matching the API response
          if (Array.isArray(action.payload?.items)) {
            state.preferred.items = action.payload.items;
          } else {
            state.preferred.items = [];
          }
        }
      )
      .addCase(
        createSearchPreferredAsync('preferred', getApiPath('/api/search/preferred'))
          .rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default preferredSlice.reducer;
