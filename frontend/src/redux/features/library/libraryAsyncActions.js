import {
  createGetAllBooksAsync,
  createAddBookAsync,
  createRemoveBookAsync,
} from '../../../utils/asyncActions';

// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getLibraryBooksAsync = createGetAllBooksAsync(
  'library',
  `${API_URL}/api/library`
);

export const addToLibraryAsync = createAddBookAsync(
  'library',
  `${API_URL}/api/library/add-book`
);
export const removeFromLibraryAsync = createRemoveBookAsync(
  'library',
  `${API_URL}/api/library/delete-book`
);
