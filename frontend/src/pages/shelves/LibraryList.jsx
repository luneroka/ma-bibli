import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookInLibrary from '../../components/Book/BookInLibrary';
import { useAuth } from '../../context/AuthContext';
import { getLibraryBooksAsync } from '../../redux/features/library/libraryAsyncActions';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';

function LibraryList() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const libraryBooks = useSelector((state) => state.library.libraryBooks) || [];
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

  return (
    <>
      <div className='flex justify-between items-center gap-8 mt-[64px] mb-[32px]'>
        <h3 className='text-h3 text-black font-merriweather'>Ma Bibli</h3>
        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
          <div className='relative'>
            <Listbox.Button className='text-small py-1 px-4 bg-secondary-btn text-white-bg w-[250px] focus:outline-none text-left'>
              {selectedCategory || 'Tous genres'}
              <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-white-bg'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute mt-1 w-[250px] bg-white shadow-lg z-10'>
                {/* Option for all genres */}
                <Listbox.Option
                  value=''
                  className={({ active }) =>
                    `text-small cursor-default select-none relative py-2 pl-3 pr-9 ${
                      active ? 'bg-primary-btn text-white-bg' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        Tous genres
                      </span>
                      {selected && (
                        <span className='absolute inset-y-0 right-0 flex items-center pr-4'>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
                {categories.map((cat) => (
                  <Listbox.Option
                    key={cat}
                    value={cat}
                    className={({ active }) =>
                      `text-small cursor-default select-none relative py-2 pl-3 pr-9 ${
                        active
                          ? 'bg-primary-btn text-white-bg'
                          : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {cat}
                        </span>
                        {selected && (
                          <span className='absolute inset-y-0 right-0 flex items-center pr-4'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
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
