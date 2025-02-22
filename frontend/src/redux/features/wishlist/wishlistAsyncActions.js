import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';

export const getWishlistBooksAsync = createGetAllBooksAsync(
  'wishlist',
  'http://localhost:3000/api/wishlist'
);

export const addToWishlistAsync = createAddBookAsync(
  'wishlist',
  'http://localhost:3000/api/wishlist/add-book'
);
export const removeFromWishlistAsync = createRemoveBookAsync(
  'wishlist',
  'http://localhost:3000/api/wishlist/delete-book'
);
