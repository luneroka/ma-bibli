import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const location = useLocation();
  const [message, setMessage] = useState();
  const { resetUserPassword } = useAuth();
  const defaultEmail = location.state?.email || '';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: defaultEmail } }); // pre-populate email field

  const onSubmit = async ({ email }) => {
    try {
      await resetUserPassword(email);
      setMessage('Instructions envoyées ! Veuillez vérifier vos e-mails.');
    } catch (error) {
      setMessage('Veuillez fournir un email valide.');
    }
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[300px] xs:min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center my-[16px] sm:my-[32px] md:my-[48px]'>
        <div className='bg-white-bg p-8 shadow-md w-full max-w-md'>
          <h2 className='text-h5 text-black-100 mb-8 font-merriweather'>
            Mot de passe oublié ?
          </h2>
          <p className='mb-4 text-black-85'>
            Saisissez votre addresse e-mail pour obtenir les instructions.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              {/* Email Input */}
              <label
                htmlFor='email'
                className='block text-small text-black-75 mb-1'
              >
                Addresse e-mail
              </label>
              <input
                {...register('email', { required: true })}
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                className='text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3 mb-4'
                autoComplete='email'
              />
              <button
                type='submit'
                className='cursor-pointer font-merriweather text-white-100 bg-primary-btn px-6 h-10 w-full text-small-body md:text-body hover:bg-secondary-btn active:bg-black-75'
              >
                Envoyer les instructions
              </button>
            </div>
          </form>

          {/* Error or Success Message */}
          {message && (
            <p className='text-primary-btn text-small italic mb-4'>{message}</p>
          )}

          {/* Login or Register */}
          <div className='text-black-85 text-small-body mt-8 text-center'>
            <span className='text-secondary-btn underline hover:text-primary-btn active:text-black-75'>
              <Link to='/login'>Se connecter</Link>
            </span>{' '}
            ou{' '}
            <span className='text-secondary-btn underline hover:text-primary-btn active:text-black-75'>
              <Link to='/register'>S'inscrire</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
