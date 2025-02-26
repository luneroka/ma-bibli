export const formatNumber = (number) => {
  if (number >= 1000) {
    return Intl.NumberFormat('fr-FR').format(number);
  }
  return number;
};

export function extractYear(dateString) {
  return new Date(dateString).getFullYear();
}

export function extractMonthAndYear(dateString) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1 and pad with '0'
  const year = date.getFullYear();
  return `${month}/${year}`;
}

export function extractFullDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // getDate() returns 1-31, so pad with '0'
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1 and pad with '0'
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Simple function to generate a random ID.
export function generateRandomId(length = 8) {
  return Math.random().toString(36).substr(2, length);
}

export function getMostRepeatedValue(arr, key) {
  const counts = {};

  arr.forEach((item) => {
    const value = item[key];
    if (typeof value === 'string') {
      counts[value] = (counts[value] || 0) + 1;
    }
  });

  let mostRepeated = '';
  let maxCount = 0;

  Object.entries(counts).forEach(([value, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostRepeated = value;
    }
  });

  return mostRepeated;
}

export function getMostRepeatedAuthor(books) {
  const counts = {};
  books.forEach((book) => {
    const authors = book.authors;
    if (Array.isArray(authors)) {
      authors.forEach((author) => {
        if (typeof author === 'string') {
          counts[author] = (counts[author] || 0) + 1;
        }
      });
    }
  });

  let mostRepeated = '';
  let maxCount = 0;

  Object.entries(counts).forEach(([author, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostRepeated = author;
    }
  });

  return mostRepeated;
}

// Helper: Get correct cover URL
export const getCoverUrl = (cover) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  if (!cover) {
    return '/product-not-found.png';
  }

  // If it's a Cloudinary URL, use it as-is
  if (cover.includes('cloudinary.com')) {
    return cover;
  }

  // If it's a relative path from local server (older books)
  if (cover.startsWith('/uploads/')) {
    return `${API_URL}${cover}?t=${Date.now()}`;
  }

  // If coming from our proxy, prepend backend host.
  if (cover.startsWith('/api/proxy-image')) {
    return `${API_URL}${cover}`;
  }

  // Fallback for any other type.
  return cover;
};
