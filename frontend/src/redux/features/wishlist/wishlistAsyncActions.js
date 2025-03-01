import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';
import { getApiPath } from '../../../utils/apiConfig';

export const getWishlistBooksAsync = createGetAllBooksAsync(
  'wishlist',
  getApiPath('/api/wishlist')
);

export const addToWishlistAsync = createAddBookAsync(
  'wishlist',
  getApiPath('/api/wishlist/add-book')
);

export const removeFromWishlistAsync = createRemoveBookAsync(
  'wishlist',
  getApiPath('/api/wishlist/delete-book')
);
