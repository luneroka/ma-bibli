import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { categoryOptions } from '../../utils/categories';
import { getApiPath } from '../../utils/apiConfig';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

const BookCreateForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Form fields
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [category, setCategory] = useState(categoryOptions[0]);
  const [coverFile, setCoverFile] = useState(null);
  const [coverFileName, setCoverFileName] = useState('Aucun fichier choisi');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);

  const inputClass =
    'text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3';

  const validateFileType = (file) => {
    if (!file) return true;
    return ALLOWED_FILE_TYPES.includes(file.type);
  };

  const validateFileSize = (file) => {
    if (!file) return true;
    return file.size <= MAX_FILE_SIZE;
  };

  const sanitizeText = (text) => {
    // Basic sanitization - remove script tags
    return text.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ''
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError(null);

    if (!file) {
      setCoverFile(null);
      setCoverFileName('Aucun fichier choisi');
      return;
    }

    // Validate file type
    if (!validateFileType(file)) {
      setFileError(
        'Type de fichier non supporté. Formats acceptés: JPG, PNG, GIF, WEBP'
      );
      setCoverFile(null);
      setCoverFileName('Aucun fichier choisi');
      return;
    }

    // Validate file size
    if (!validateFileSize(file)) {
      setFileError(
        `La taille du fichier ne doit pas dépasser ${
          MAX_FILE_SIZE / 1024 / 1024
        }MB`
      );
      setCoverFile(null);
      setCoverFileName('Aucun fichier choisi');
      return;
    }

    setCoverFile(file);
    setCoverFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate page count
      if (parseInt(pageCount) <= 0) {
        throw new Error('Le nombre de pages doit être supérieur à 0');
      }

      // Validate and sanitize inputs
      const sanitizedTitle = sanitizeText(title.trim());
      const sanitizedAuthors = sanitizeText(authors.trim());
      const sanitizedPublisher = sanitizeText(publisher.trim());
      const sanitizedDescription = sanitizeText(description.trim());

      if (!sanitizedTitle || !sanitizedAuthors || !sanitizedDescription) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      const formData = new FormData();
      formData.append('title', sanitizedTitle);
      formData.append('authors', sanitizedAuthors);
      formData.append('publisher', sanitizedPublisher);
      formData.append('publishedDate', publishedDate);
      formData.append('description', sanitizedDescription);
      formData.append('pageCount', pageCount);
      formData.append('category', category);

      if (coverFile) {
        formData.append('cover', coverFile);
      }

      const token = await currentUser.getIdToken();
      const response = await fetch(getApiPath('/api/library/create'), {
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
        throw new Error(data.message || 'Erreur lors de la création du livre');
      }
    } catch (error) {
      console.error('Error creating book:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[300px] xs:min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center my-[16px] sm:my-[32px] md:my-[48px]'>
        <div className='bg-white-bg p-8 shadow-md w-full max-w-md'>
          <h2 className='text-h4 mb-0 xs:mb-2 sm:mb-4 text-black-100 font-merriweather'>
            Créer un livre
          </h2>

          {error && (
            <div className='mb-4 p-2 text-small text-alert-red-txt bg-alert-red-bg border border-alert-red-border'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4'>
            <label className='block text-small text-black-75 mb-1'>
              Titre *
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={200}
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Auteurs (séparateur : virgule) *
              <input
                type='text'
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                required
                maxLength={300}
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Éditeur
              <input
                type='text'
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                maxLength={100}
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Date de publication
              <input
                type='date'
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                // max={new Date().toISOString().split('T')[0]} // Prevents future dates
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Description *
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={2000}
                className={`${inputClass} h-24`}
                required
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Nombre de pages *
              <input
                type='number'
                min='1'
                max='10000' // Reasonable upper limit
                value={pageCount}
                onChange={(e) => setPageCount(e.target.value)}
                required
                className={inputClass}
              />
            </label>
            <label className='block text-small text-black-75 mb-1'>
              Genre *
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
                required
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
                  accept={ALLOWED_FILE_TYPES.join(',')}
                  className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                />
                <div className='flex items-center justify-between bg-white-bg border border-black-25 p-2 cursor-pointer'>
                  <span className='truncate flex-1'>{coverFileName}</span>
                  <span className='bg-black-10 text-black-75 p-1 text-xs'>
                    Choisir un fichier
                  </span>
                </div>
              </div>
              {fileError && (
                <p className='text-xs text-alert-red-txt mt-1'>{fileError}</p>
              )}
              <p className='text-xs text-black-50 mt-1'>
                Formats acceptés : JPG, PNG, GIF, WEBP. Taille max : 5MB
              </p>
            </label>
            <button
              type='submit'
              disabled={isSubmitting || fileError}
              className={`cursor-pointer ${
                isSubmitting || fileError
                  ? 'bg-black-25 text-black-50'
                  : 'bg-secondary-btn hover:bg-primary-btn active:bg-black-75'
              } text-white p-2 w-40 text-small font-merriweather`}
            >
              {isSubmitting ? 'Chargement...' : 'Ajouter le livre'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookCreateForm;
