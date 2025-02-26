import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookInLibrary from '../../components/Book/BookInLibrary';
import { useAuth } from '../../context/AuthContext';
import { getLibraryBooksAsync } from '../../redux/features/library/libraryAsyncActions';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import { IoCreateOutline } from 'react-icons/io5';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

function LibraryList() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const libraryBooks = useSelector((state) => state.library.libraryBooks) || [];
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeFilter, setActiveFilter] = useState("J'ai");

  // Create filteredBooks array based on haveRead attribute
  const filteredBooks = () => {
    if (activeFilter === "J'ai") {
      return libraryBooks.filter((book) => book.haveRead === false);
    }

    if (activeFilter === "J'ai lu") {
      return libraryBooks.filter((book) => book.haveRead === true);
    }

    return libraryBooks;
  };

  // Fetch distinct categories
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
    if (currentUser) {
      fetchCategories();
    }
  }, [currentUser]);

  // Fetch books filtered by category when a category is selected
  useEffect(() => {
    if (currentUser) {
      currentUser.getIdToken().then((token) => {
        dispatch(getLibraryBooksAsync({ token, category: selectedCategory }));
      });
    }
  }, [selectedCategory, currentUser, dispatch]);

  // Reset the category filter (load all data) on unmount
  useEffect(() => {
    return () => {
      if (currentUser) {
        currentUser.getIdToken().then((token) => {
          dispatch(getLibraryBooksAsync({ token }));
        });
      }
    };
  }, [dispatch, currentUser]);

  // Helper: group all retrieved books by category
  const groupByGenre = (books) => {
    const map = {};
    books.forEach((book) => {
      const genre = book.category || 'Autres';
      if (!map[genre]) {
        map[genre] = [];
      }
      map[genre].push(book);
    });
    return map;
  };

  // Group books into an object like { "Science-Fiction": [book, ...], "Littérature": [book, ...] }
  const grouped = groupByGenre(filteredBooks());

  // Filter have and have read
  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue);
  };

  return (
    <div className='mx-[64px] md:mx-[128px]'>
      {/* Page header */}
      <div className='flex flex-col justify-start items-start [@media(min-width:970px)]:flex-row [@media(min-width:970px)]:justify-between [@media(min-width:970px)]:items-center gap-2 mt-[48px] mb-5'>
        {/* Page Title */}
        <div className='flex gap-6 items-center'>
          <h3 className='text-h3 text-black font-merriweather'>Ma Bibli</h3>
          <Link to='/livres/créer'>
            <button className='cursor-pointer text-small py-1 px-2 bg-secondary-btn hover:bg-primary-btn active:bg-black-75 text-white-bg focus:outline-none text-left flex gap-1 items-center'>
              <IoCreateOutline className='size-4' />
              Créer un livre
            </button>
          </Link>
        </div>

        {/* Filter Have Read */}
        <div className='flex gap-4 text-small-body md:text-body text-black-75 font-light my-2 md:my-0 leading-'>
          <span
            onClick={() => handleFilterClick("J'ai")}
            className={
              activeFilter === "J'ai"
                ? 'cursor-pointer border-b-[1.5px] border-secondary-btn'
                : 'cursor-pointer'
            }
          >
            J'ai
          </span>
          <p>|</p>
          <span
            onClick={() => handleFilterClick("J'ai lu")}
            className={
              activeFilter === "J'ai lu"
                ? 'cursor-pointer border-b-[1.5px] border-secondary-btn'
                : 'cursor-pointer'
            }
          >
            J'ai lu
          </span>
        </div>

        {/* Filter By Genre */}
        <Listbox
          value={selectedCategory}
          onChange={setSelectedCategory}
          className='z-10'
        >
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
              <Listbox.Options className='absolute mt-1 w-[250px] bg-white shadow-lg'>
                {/* "All" option */}
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

                {/* Category options */}
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

      {/* Render "Shelves" */}
      {Object.entries(grouped).map(([genre, books]) => {
        // If user selected a specific category, skip rendering shelves of other genres.
        if (selectedCategory && selectedCategory !== genre) {
          return null;
        }

        return (
          <div key={genre} className='mb-10'>
            {/* Shelf heading */}
            <h4 className='text-h5 text-black font-merriweather mb-2'>
              {genre}
            </h4>

            <Swiper
              slidesPerView={2}
              spaceBetween={0}
              navigation={true}
              breakpoints={{
                700: {
                  slidesPerView: 3,
                },
                970: {
                  slidesPerView: 5,
                },
                1350: {
                  slidesPerView: 8,
                },
              }}
              modules={[Pagination, Navigation]}
              className='mySwiper'
            >
              {books.map((bookItem) => (
                <SwiperSlide key={bookItem.isbn}>
                  <BookInLibrary book={bookItem} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
}

export default LibraryList;
