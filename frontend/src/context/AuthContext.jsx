import { createContext, useContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = () => {
  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
