import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebase.config';
import { getLibraryBooksAsync } from '../redux/features/library/libraryAsyncActions';
import { getReadingListBooksAsync } from '../redux/features/reading-list/readingListAsyncActions';
import { getFavoriteBooksAsync } from '../redux/features/favorites/favoritesAsyncActions';
import { useNavigate } from 'react-router';

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // REGISTER
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // SEND VERIFICATION EMAIL
  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      return await sendEmailVerification(auth.currentUser);
    }
    throw new Error('No current user is logged in');
  };

  // UPDATE PASSWORD
  const updateUserPassword = async (newPassword) => {
    if (auth.currentUser) {
      return await updatePassword(auth.currentUser, newPassword);
    }
    throw new Error('No current user is logged in');
  };

  // RESET PASSWORD
  const resetUserPassword = async (email) => {
    if (!email) {
      throw new Error('Email must be provided to reset password.');
    }
    return await sendPasswordResetEmail(auth, email);
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
    navigate('/');
  };

  // UPDATE PROFILE
  const updateUserProfile = async (displayName) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      await auth.currentUser.reload();
      // create a new reference to trigger re-render
      setCurrentUser({ ...auth.currentUser });
      return auth.currentUser;
    }
    throw new Error('No current user is logged in.');
  };

  // DELETE USER
  const deleteUserAccount = async () => {
    if (auth.currentUser) {
      return await deleteUser(auth.currentUser);
    }
    throw new Error('No current user is logged in.');
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
    sendVerificationEmail,
    updateUserPassword,
    resetUserPassword,
    updateUserProfile,
    deleteUserAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
