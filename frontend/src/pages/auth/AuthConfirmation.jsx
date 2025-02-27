import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function AuthConfirmation() {
  const { state } = useLocation();
  const { type } = state || {};

  return (
    <div>
      <div className='flex flex-col flex-1 min-h-0 min-w-[500px] max-w-full mx-auto font-lato'>
        <div className='flex-grow flex items-center justify-center mt-[64px]'>
          <div className='bg-white-bg p-8 shadow-md w-full max-w-md'>
            {type === 'register' ? (
              <div>
                <p className='text-black-100'>
                  Votre compte a été créé avec succès !
                </p>
                <div className='mt-4 text-black-75 text-small'>
                  <span className='text-secondary-btn underline hover:text-primary-btn active:text-black-75'>
                    <Link to='/login'>Se connecter</Link>
                  </span>{' '}
                </div>
              </div>
            ) : type === 'delete' ? (
              <div>
                <p>Votre compte a bien été supprimé.</p>
                <div className='mt-4 text-black-75 text-small'>
                  Vous pouvez-vous réinscrire en cliquant{' '}
                  <span className='text-secondary-btn underline hover:text-primary-btn active:text-black-75'>
                    <Link to='/register'>ici</Link>
                  </span>
                </div>
              </div>
            ) : (
              <div className='text-black-100'>Action confirmée.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthConfirmation;
