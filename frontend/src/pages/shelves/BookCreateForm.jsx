import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const categoryOptions = [
  'Art & Design',
  'Littérature',
  'Biographie & Mémoires',
  'Affaires & Finance',
  'Divertissement',
  'Éducation & Référence',
  'Sciences Sociales & Culturelles',
  'Jeunesse & Young Adult',
  'Science & Technologie',
  'Développement Personnel & Bien-être',
  'Mode de Vie',
  'Bêta Lecture',
];

const BookCreateForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [category, setCategory] = useState(categoryOptions[0]);
  const [coverFile, setCoverFile] = useState(null);
  const [coverFileName, setCoverFileName] = useState('Aucun fichier choisi');

  const inputClass =
    'text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3';

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
    formData.append('description', description);
    formData.append('pageCount', pageCount);
    formData.append('category', category);
    if (coverFile) {
      formData.append('cover', coverFile);
    }
    try {
      const token = await currentUser.getIdToken();
      const response = await fetch(`http://localhost:3000/api/library/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/bibli');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center mt-[64px]'>
        <div className='bg-white p-8 shadow-md w-full max-w-md'>
          <h2 className='text-h4 mb-4 text-black font-merriweather'>
            Créer un livre
          </h2>
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
              Auteurs (séparateur: virgule)
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
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className={`${inputClass} h-24`}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Nombre de pages
              <input
                type='number'
                min='1'
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
                required
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Catégorie
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
              Ajouter le livre
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookCreateForm;
