import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

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
      setMessage('Nom d’utilisateur mis à jour avec succès.');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour du nom d’utilisateur.');
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center mt-[96px]'>
        <div className='bg-white p-8 shadow-md w-full max-w-md'>
          <form onSubmit={handleUpdateProfile}>
            <label>Nom d'utilisateur</label>
            <input
              type='text'
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className='border rounded p-2 w-full'
            />
            <button
              type='submit'
              className='mt-4 bg-primary-btn text-white p-2 rounded'
            >
              Modifier
            </button>
          </form>
          {message && <p className='mt-2 text-sm'>{message}</p>}

          {/* Update Password */}

          {/* Delete Account */}
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
