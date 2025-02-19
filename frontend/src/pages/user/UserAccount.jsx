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
  const [message, setMessage] = useState({ text: '', type: '' });

  // Common input classes
  const inputClass =
    'text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3';

  // State for password field visibility
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // State for password values
  const [passwordValues, setPasswordValues] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const toggleVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!displayName) {
      setMessage({
        text: 'Le nom d’utilisateur ne peut pas être vide.',
        type: 'failure',
      });
      return;
    }
    if (displayName === currentUser.displayName) {
      setMessage({
        text: 'Le nouveau nom doit être différent du précédent.',
        type: 'failure',
      });
      return;
    }
    try {
      await updateUserProfile(displayName);
      setMessage({
        text: 'Nom d’utilisateur mis à jour avec succès !',
        type: 'success',
      });
    } catch (error) {
      setMessage({
        text: 'Erreur lors de la mise à jour du nom d’utilisateur.',
        type: 'failure',
      });
      console.error(error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordValues.new !== passwordValues.confirm) {
      setMessage({
        text: 'Les nouveaux mots de passe ne correspondent pas.',
        type: 'failure',
      });
      return;
    }
    try {
      await updateUserPassword(passwordValues.current, passwordValues.new);
      setMessage({
        text: 'Mot de passe mis à jour avec succès !',
        type: 'success',
      });
      // Clear the password fields
      setPasswordValues({ current: '', new: '', confirm: '' });
    } catch (error) {
      setMessage({
        text: 'Erreur lors de la mise à jour du mot de passe',
        type: 'failure',
      });
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir supprimer votre compte ?'
    );
    if (confirmed) {
      try {
        await deleteUserAccount();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center mt-[64px]'>
        <div className='bg-white p-8 shadow-md w-full max-w-md'>
          {message.text && (
            <p
              className={`text-small mb-4 p-2 ${
                message.type === 'success'
                  ? 'text-alert-green-txt bg-alert-green-bg border-alert-green-border'
                  : (message.type = 'failure'
                      ? 'text-alert-red-txt bg-alert-red-bg border-alert-red-border'
                      : 'text-alert-yellow-txt bg-alert-yellow-bg border-alert-yellow-border')
              }`}
            >
              {message.text}
            </p>
          )}
          {/* Update Profile Form */}
          <form onSubmit={handleUpdateProfile}>
            <label className='text-small-body font-bold text-black-75 mb-1'>
              Nom d'utilisateur
            </label>
            <div className='flex flex-col gap-2 mb-8'>
              <input
                type='text'
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className='font-merriweather text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3'
              />
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='cursor-pointer bg-secondary-btn hover:bg-primary-btn active:bg-black-75 text-white p-2 w-40 text-small font-merriweather'
                >
                  Modifier
                </button>
              </div>
            </div>
          </form>

          {/* Update Password Form */}
          <form onSubmit={handleUpdatePassword}>
            <label className='text-small-body font-bold text-black-75 mb-1'>
              Mot de passe
            </label>
            <div className='flex flex-col gap-2 mb-8'>
              {[
                { key: 'current', placeholder: 'Mot de passe actuel' },
                { key: 'new', placeholder: 'Nouveau mot de passe' },
                {
                  key: 'confirm',
                  placeholder: 'Confirmer nouveau mot de passe',
                },
              ].map(({ key, placeholder }) => (
                <div key={key} className='relative w-[100%] mb-4'>
                  <input
                    type={passwordVisibility[key] ? 'text' : 'password'}
                    required
                    placeholder={placeholder}
                    value={passwordValues[key]}
                    onChange={(e) =>
                      setPasswordValues((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                  <button
                    type='button'
                    onClick={() => toggleVisibility(key)}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    {passwordVisibility[key] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              ))}
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='cursor-pointer bg-secondary-btn hover:bg-primary-btn active:bg-black-75 text-white p-2 w-40 text-small font-merriweather'
                >
                  Modifier
                </button>
              </div>
            </div>
          </form>

          {/* Delete Account Button */}
          <div>
            <p className='text-small-body font-bold text-black-75 mb-2'>
              Supprimer mon compte
            </p>
            <p className='text-small text-black-75'>
              Vous perdrez l’accès à votre compte Ma Bibli une fois votre
              demande de suppression soumise.
            </p>
            <div className='flex justify-end'>
              <button
                onClick={handleDeleteAccount}
                className='cursor-pointer mt-4 w-40 bg-[#e51a1af7] hover:bg-red-500 text-white-bg p-2 text-small font-merriweather'
              >
                Supprimer le compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
