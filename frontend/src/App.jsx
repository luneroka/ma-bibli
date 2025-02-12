import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { getLibraryBooksAsync } from './utils/libraryAsyncActions';
import { getReadingListBooksAsync } from './utils/readingListAsyncActions';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLibraryBooksAsync());
    dispatch(getReadingListBooksAsync());
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
