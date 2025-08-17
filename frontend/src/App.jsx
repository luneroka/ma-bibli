import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { getLibraryBooksAsync } from './redux/features/library/libraryAsyncActions';
import { getWishlistBooksAsync } from './redux/features/wishlist/wishlistAsyncActions';
import './styles/App.css';
import Navbar from './components/Navbar/Navbar';
import themes from './assets/themes';

const applyTheme = (themeKey) => {
  const themeProperties = themes[themeKey];
  if (!themeProperties) return;
  Object.entries(themeProperties).forEach(([varName, value]) => {
    document.documentElement.style.setProperty(varName, value);
  });
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLibraryBooksAsync());
    dispatch(getWishlistBooksAsync());
  }, [dispatch]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('appTheme') || 'default';
    applyTheme(storedTheme);
  }, []);

  return (
    <>
      <Navbar />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <Outlet />
      </main>
    </>
  );
}

export default App;
