import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase.config';
import { getLibraryBooksAsync } from '../redux/features/library/libraryAsyncActions';
import { getReadingListBooksAsync } from '../redux/features/reading-list/readingListAsyncActions';
import { getFavoriteBooksAsync } from '../redux/features/favorites/favoritesAsyncActions';

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  // LOGOUT
  const logout = async () => {
    await signOut(auth); // Dispatch an action to reset the Redux store
    dispatch({ type: 'auth/logout' });
  };

  // MANAGE USER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const token = await user.getIdToken();
        // Dispatch async actions to reload user-specific state.
        dispatch(getLibraryBooksAsync({ token }));
        dispatch(getReadingListBooksAsync({ token }));
        dispatch(getFavoriteBooksAsync({ token }));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const value = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
