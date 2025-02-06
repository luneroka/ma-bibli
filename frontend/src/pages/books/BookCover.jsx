import React from 'react'

function BookCover({ book }) {
  return (
    <div>
      <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>
    </div>
  )
}

export default BookCover