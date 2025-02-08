import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchBooks } from './redux/features/books/booksSlice';
import { getLibraryBooksAsync } from './utils/libraryAsyncActions';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(getLibraryBooksAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
