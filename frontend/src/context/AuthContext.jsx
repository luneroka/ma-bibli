import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createContext, useContext, useState } from 'react';
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const value = { currentUser, registerUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
