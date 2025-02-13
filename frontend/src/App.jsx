import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { getLibraryBooksAsync } from './redux/features/library/libraryAsyncActions';
import { getReadingListBooksAsync } from './redux/features/reading-list/readingListAsyncActions';
import './App.css';
import Navbar from './components/Navbar/Navbar';
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
