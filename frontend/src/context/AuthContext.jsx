import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { createContext, useContext, useState } from 'react';
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // REGISTER
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // LOGIN
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const value = { currentUser, registerUser, loginUser, signInWithGoogle };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
