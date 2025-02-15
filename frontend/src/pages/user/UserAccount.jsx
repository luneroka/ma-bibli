import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function UserAccount() {
  const {
    currentUser,
    updateUserProfile,
    updateUserPassword,
    deleteUserAccount,
  } = useAuth();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ''
  );
  const [message, setMessage] = useState('');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmationPasswordVisible, setisConfirmationPasswordVisible] =
    useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!displayName) {
      setMessage('Le nom d’utilisateur ne peut pas être vide.');
      return;
    }
    if (displayName === currentUser.displayName) {
      setMessage('Le nouveau nom doit être différent du précédent.');
      return;
    }
    try {
      await updateUserProfile(displayName);
      setMessage('Nom d’utilisateur mis à jour avec succès !');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du nom d’utilisateur.');
      console.error(error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
  };

  // Toggle current password view
  const handleToggleCurrentPasswordView = (e) => {
    e.preventDefault();
    setIsCurrentPasswordVisible((prev) => !prev);
  };
  // Toggle new password view
  const handleToggleNewCurrentPasswordView = (e) => {
    e.preventDefault();
    setIsNewPasswordVisible((prev) => !prev);
  };
  // Toggle confirmation password view
  const handleToggleConfirmationCurrentPasswordView = (e) => {
    e.preventDefault();
    setisConfirmationPasswordVisible((prev) => !prev);
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center mt-[96px]'>
        <div className='bg-white p-8 shadow-md w-full max-w-md'>
          <form onSubmit={handleUpdateProfile}>
            <label className='text-small text-black-75 mb-1'>
              Nom d'utilisateur
            </label>
            <div className='flex gap-2 mb-4'>
              <input
                type='text'
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className='font-merriweather text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3'
              />
              <button
                type='submit'
                className='cursor-pointer bg-primary-btn hover:bg-secondary-btn active:bg-black-75 text-white p-2'
              >
                Modifier
              </button>
            </div>
          </form>
          {message && (
            <p className='text-small text-black-75 italic mb-4'>{message}</p>
          )}

          {/* Update Password */}
          <form onSubmit={handleUpdatePassword}>
            <label className='text-small text-black-75 mb-1'>
              Mot de passe
            </label>
            <div className='flex flex-col gap-2 mb-2'>
              <div className='relative w-[100%] mb-4'>
                <input
                  type={isCurrentPasswordVisible ? 'text' : 'password'}
                  required
                  placeholder='Mot de passe actuel'
                  className='font-merriweather text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3'
                />

                {isCurrentPasswordVisible ? (
                  <button
                    type='button'
                    onClick={handleToggleCurrentPasswordView}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    <FaEyeSlash />
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleToggleCurrentPasswordView}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    <FaEye />
                  </button>
                )}
              </div>
              <div className='relative w-[100%] mb-4'>
                <input
                  type={isNewPasswordVisible ? 'text' : 'password'}
                  required
                  placeholder='Nouveau mot de passe'
                  className='font-merriweather text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3'
                />
                {isNewPasswordVisible ? (
                  <button
                    type='button'
                    onClick={handleToggleNewCurrentPasswordView}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    <FaEyeSlash />
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleToggleNewCurrentPasswordView}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    <FaEye />
                  </button>
                )}
              </div>
              <div className='relative w-[100%] mb-4'>
                <input
                  type={isConfirmationPasswordVisible ? 'text' : 'password'}
                  required
                  placeholder='Confirmer nouveau mot de passe'
                  className='font-merriweather text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3'
                />
                {isConfirmationPasswordVisible ? (
                  <button
                    type='button'
                    onClick={handleToggleConfirmationCurrentPasswordView}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    <FaEyeSlash />
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleToggleConfirmationCurrentPasswordView}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    <FaEye />
                  </button>
                )}
              </div>
              <button
                type='submit'
                className='cursor-pointer bg-primary-btn hover:bg-secondary-btn active:bg-black-75 text-white p-2 w-33'
              >
                Modifier
              </button>
            </div>
          </form>
          {/* Delete Account */}
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
