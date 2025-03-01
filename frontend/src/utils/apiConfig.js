export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const isProduction = () => {
  return (
    window.location.hostname === 'ma-bibli.com' ||
    window.location.hostname === 'www.ma-bibli.com'
  );
};

export const getApiPath = (endpoint) => {
  if (isProduction()) {
    const path = endpoint.startsWith('/api')
      ? endpoint
      : `/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    return path;
  }
  return `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
