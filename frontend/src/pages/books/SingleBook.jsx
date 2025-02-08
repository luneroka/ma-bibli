import React from 'react';

function SingleBook({ book }) {
  return <div>{book.volumeInfo.title}</div>;
}

export default SingleBook;
