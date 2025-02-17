import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookInLibrary from '../../components/Book/BookInLibrary';
import { useAuth } from '../../context/AuthContext';
import { getLibraryBooksAsync } from '../../redux/features/library/libraryAsyncActions';

function LibraryList() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  // Import libraryBooks state
  const libraryBooks = useSelector((state) => state.library.libraryBooks) || [];

  // Local states for category filter
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch distinct categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch(
          'http://localhost:3000/api/library/categories',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [currentUser]);

  // Use an effect to refresh the book list whenever selectedCategory changes
  useEffect(() => {
    const fetchBooks = async () => {
      const token = await currentUser.getIdToken();
      dispatch(getLibraryBooksAsync({ token, category: selectedCategory }));
    };
    fetchBooks();
  }, [selectedCategory, currentUser, dispatch]);

  // Update selected category when user selects an option
  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
  };

  return (
    <>
      <div className='flex justify-between items-center gap-8 mt-[64px] mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>Ma Bibli</h3>
        <select
          className='py-1 px-4 bg-secondary-btn text-white-bg w-[200px] focus:outline-none'
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {/* Option to reset filter */}
          <option value=''>Tous genres</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              <span className='block px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer'>
                {cat}
              </span>
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-wrap gap-7 mt-[32px]'>
        {libraryBooks.length > 0 &&
          libraryBooks.map((book) => (
            <BookInLibrary key={book.isbn} book={book} />
          ))}
      </div>
    </>
  );
}

export default LibraryList;
