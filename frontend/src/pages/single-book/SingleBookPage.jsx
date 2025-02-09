import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleBook from '../books/SingleBook';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBookAsync } from '../../utils/singleBookAsyncActions';
import NavbarLibrary from '../../components/NavbarLibrary';
import Footer from '../../components/Footer';

function SingleBookPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { book, status, error } = useSelector((state) => state.singleBook);

  useEffect(() => {
    dispatch(getSingleBookAsync(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <NavbarLibrary />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] mt-[96px] font-lato'>
        {book && <SingleBook book={book} />}
      </main>
      <Footer />
    </>
  );
}

export default SingleBookPage;
