// Always return a relative /api/... path so Vite proxy handles routing in all environments
export const getApiPath = (endpoint) => {
  return endpoint.startsWith('/api')
    ? endpoint
    : `/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
