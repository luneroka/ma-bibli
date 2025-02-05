import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

function Register() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const handleGoogleSignIn = () => {};

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[600px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center mt-[96px]'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
          <h2 className='text-h5 text-black mb-8'>Créer mon coin lecture</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='email'
                className='block text-small text-black-75 mb-1'
              >
                Email
              </label>
              <input
                {...register('email', { required: true })}
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                className='text-black-75 shadow border border-black-25 focus:outline-secondary-btn rounded-lg w-full py-2 px-3 mb-4'
              />
              <label
                htmlFor='passord'
                className='block text-small text-black-75 mb-1'
              >
                Mot de Passe
              </label>
              <input
                {...register('password', { required: true })}
                type='password'
                name='password'
                id='password'
                placeholder='Mot de Passe'
                className='text-black-75 shadow border border-black-25 focus:outline-secondary-btn
                 rounded-lg w-full py-2 px-3 mb-6'
              />
            </div>

            {message && (
              <p className='text-red-500 text-xs italic mb-3'>{message}</p>
            )}

            <div>
              <button className='cursor-pointer font-merriweather text-white-bg bg-primary-btn px-6 h-10 rounded-lg w-full text-body md:text-h6 hover:bg-secondary-btn active:bg-black-75'>
                Créer mon compte
              </button>
            </div>
          </form>
          <hr className='text-black-10 mt-6 mb-6' />
          <p className='text-black text-small'>
            Déjà inscrit ?{' '}
            <span className='text-secondary-btn underline hover:text-primary-btn active:text-black-75'>
              <Link to='/login'>Se connecter.</Link>
            </span>
          </p>

          {/* Google Signin */}
          <div className='mt-6'>
            <button
              onClick={handleGoogleSignIn}
              className='cursor-pointer font-merriweather w-full flex gap-2 items-center justify-center text-white-bg bg-main-blue px-6 h-10 rounded-lg text-body hover:bg-secondary-btn active:bg-black-75'
            >
              <FaGoogle />
              Se connecter avec Google
            </button>
          </div>
          <p className='text-xs text-center mt-6 text-black-50'>
            &copy;2025 Ma Bibli. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
