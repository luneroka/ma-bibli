import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';

// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getWishlistBooksAsync = createGetAllBooksAsync(
  'wishlist',
  `${API_URL}/api/wishlist`
);

export const addToWishlistAsync = createAddBookAsync(
  'wishlist',
  `${API_URL}/api/wishlist/add-book`
);
export const removeFromWishlistAsync = createRemoveBookAsync(
  'wishlist',
  `${API_URL}/api/wishlist/delete-book`
);
