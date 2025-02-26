import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { categoryOptions } from '../../utils/categories';

const BookEditForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const book = state?.book;

  // Use an effect to redirect if no book is passed
  useEffect(() => {
    if (!book) {
      navigate('/');
    }
  }, [book, navigate]);

  // If book is not available yet, render nothing (or a spinner)
  if (!book) return null;

  const inputClass =
    'text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3';

  const formatDate = (date) => {
    if (!date) return '';
    // Convert to YYYY-MM-DD format
    return new Date(date).toISOString().slice(0, 10);
  };

  const [title, setTitle] = useState(book.title);
  const [authors, setAuthors] = useState(book.authors.join(', '));
  const [publisher, setPublisher] = useState(book.publisher || '');
  const [publishedDate, setPublishedDate] = useState(
    book.publishedDate ? formatDate(book.publishedDate) : ''
  );
  const [category, setCategory] = useState(book.category);
  const [coverFile, setCoverFile] = useState(null);
  const [coverFileName, setCoverFileName] = useState('Aucun fichier choisi');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    setCoverFileName(file ? file.name : 'Aucun fichier choisi');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('authors', authors);
    formData.append('publisher', publisher);
    formData.append('publishedDate', publishedDate);
    formData.append('category', category);
    if (coverFile) {
      formData.append('cover', coverFile);
    }
    try {
      const token = await currentUser.getIdToken();
      const response = await fetch(
        `http://localhost:3000/api/library/update/${book.isbn}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate('/bibli');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center mt-[64px]'>
        <div className='bg-white p-8 shadow-md w-full max-w-md'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
            <label className='block text-small text-black-75 mb-1'>
              Titre
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Auteurs (séparateur : virgule)
              <input
                type='text'
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                required
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Éditeur
              <input
                type='text'
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Date de publication
              <input
                type='date'
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Genre
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {categoryOptions.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Importer une image de couverture
              <div className='relative'>
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                />
                <div className='flex items-center justify-between bg-white border border-black-25 p-2 cursor-pointer'>
                  <span>{coverFileName}</span>
                  <span className='bg-black-10 text-black-75 p-1 text-xs'>
                    Choisir un fichier
                  </span>
                </div>
              </div>
            </label>
            <button
              type='submit'
              className='cursor-pointer bg-secondary-btn hover:bg-primary-btn active:bg-black-75 text-white p-2 w-40 text-small font-merriweather'
            >
              Mettre à jour
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookEditForm;
