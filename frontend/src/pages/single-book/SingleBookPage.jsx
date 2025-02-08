import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleBook from '../books/SingleBook';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBookAsync } from '../../utils/singleBookAsyncActions';

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

  return <div>{book && <SingleBook book={book} />}</div>;
}

export default SingleBookPage;
