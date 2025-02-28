import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import ConfirmModal from '../../components/ConfirmModal';
import { useNavigate } from 'react-router';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { ReadingObjectiveContext } from '../../context/ReadingObjectiveContext';

function UserAccount() {
  const navigate = useNavigate();
  const {
    currentUser,
    updateUserProfile,
    updateUserPassword,
    deleteUserAccount,
  } = useAuth();

  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ''
  );
  const [personalizeMessage, setPersonalizeMessage] = useState({
    text: '',
    type: '',
  });
  const [accountMessage, setAccountMessage] = useState({ text: '', type: '' });
  const [confirmModalVisibility, setConfirmModalVisibility] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get both the current objective and the updater from context.
  const { readingObjective, setReadingObjective } = useContext(
    ReadingObjectiveContext
  );

  // Initialize localObjective(s)
  const [localObjective, setLocalObjective] = useState(
    readingObjective.objective ? readingObjective.objective.toString() : ''
  );
  const [localTimeframeObjective, setLocalTimeframeObjective] = useState(
    readingObjective.timeframe || ''
  );

  // Keep objectives in sync if the context changes
  useEffect(() => {
    setLocalObjective(
      readingObjective.objective ? readingObjective.objective.toString() : ''
    );
    setLocalTimeframeObjective(readingObjective.timeframe || '');
  }, [readingObjective]);

  const handleObjectiveSubmit = (e) => {
    e.preventDefault();
    const objectiveValue = Number(localObjective);
    setReadingObjective({
      objective: objectiveValue,
      timeframe: localTimeframeObjective,
    });
    setPersonalizeMessage({
      text: "L'objectif a été mis à jour avec succès !",
      type: 'success',
    });
    setLocalObjective(objectiveValue.toString());
  };

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
      setAccountMessage({
        text: 'Le nom d’utilisateur ne peut pas être vide.',
        type: 'failure',
      });
      return;
    }
    if (displayName === currentUser.displayName) {
      setAccountMessage({
        text: 'Le nouveau nom doit être différent du précédent.',
        type: 'failure',
      });
      return;
    }
    try {
      await updateUserProfile(displayName);
      setPersonalizeMessage({
        text: 'Nom d’utilisateur mis à jour avec succès !',
        type: 'success',
      });
    } catch (error) {
      setPersonalizeMessage({
        text: 'Erreur lors de la mise à jour du nom d’utilisateur.',
        type: 'failure',
      });
      console.error(error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordValues.new !== passwordValues.confirm) {
      setAccountMessage({
        text: 'Les nouveaux mots de passe ne correspondent pas.',
        type: 'failure',
      });
      return;
    }
    try {
      await updateUserPassword(passwordValues.current, passwordValues.new);
      setAccountMessage({
        text: 'Mot de passe mis à jour avec succès !',
        type: 'success',
      });
      // Clear the password fields
      setPasswordValues({ current: '', new: '', confirm: '' });
    } catch (error) {
      setAccountMessage({
        text: 'Erreur lors de la mise à jour du mot de passe',
        type: 'failure',
      });
      console.error(error);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteUserAccount();
      navigate('/confirmation', { state: { type: 'delete' } });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  // New function to trigger confirmation via the modal
  const triggerDeleteAccount = () => {
    setConfirmModalVisibility(true);
  };

  // The callback received when the ConfirmModal is answered
  const onConfirmDelete = async (confirmed) => {
    setConfirmModalVisibility(false);
    if (confirmed) {
      await handleDeleteAccount();
    }
  };

  if (isDeleting) {
    return (
      <div className='fixed inset-0 flex items-center mt-[64px] justify-center bg-white-100'>
        <FaSpinner className='animate-spin text-3xl text-black-50 py-16' />
      </div>
    );
  }

  return (
    <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 my-[16px] sm:my-[32px] md:my-[48px]'>
      <div className='flex flex-col flex-1 min-h-0  min-w-[300px] xs:min-w-[500px] max-w-full mx-auto font-lato'>
        <div className='flex-grow flex flex-col items-center justify-center'>
          <div className='font-merriweather mb-0 lg:mb-4 text-h6 text-black-100'>
            Personnaliser
          </div>
          <div className='bg-white-bg p-8 shadow-md w-full h-full max-w-md'>
            {personalizeMessage.text && (
              <p
                className={`text-small mb-4 p-2 ${
                  personalizeMessage.type === 'success'
                    ? 'text-alert-green-txt bg-alert-green-bg border-alert-green-border'
                    : personalizeMessage.type === 'failure'
                    ? 'text-alert-red-txt bg-alert-red-bg border-alert-red-border'
                    : 'text-alert-yellow-txt bg-alert-yellow-bg border-alert-yellow-border'
                }`}
              >
                {personalizeMessage.text}
              </p>
            )}

            {/* Update Profile Form */}
            <form onSubmit={handleUpdateProfile}>
              <label className='text-small-body font-bold text-black-75 mb-1'>
                Changer le nom d'utilisateur
              </label>
              <div className='flex flex-col mb-8'>
                <input
                  type='text'
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className='font-merriweather text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3 mb-4'
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

            {/* Change Theme */}
            <div className='mb-8'>
              <p className='text-small-body font-bold text-black-75 mb-1'>
                Changer le thème
              </p>
              <div className='text-small text-black-75 shadow border border-black-25 w-full py-2 px-3'>
                <ThemeSwitcher />
              </div>
            </div>

            {/* Set Reading Objective */}
            <form onSubmit={handleObjectiveSubmit}>
              <div className='flex gap-2 mb-4'>
                <div>
                  <label className='text-small-body font-bold text-black-75 mb-1'>
                    Objectif de lecture {new Date().getFullYear()}
                  </label>
                  <input
                    type='number'
                    value={localObjective}
                    onChange={(e) => setLocalObjective(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className='text-small-body font-bold text-black-75 mb-1'>
                    À partir du :
                  </label>
                  <input
                    type='date'
                    value={localTimeframeObjective}
                    onChange={(e) => setLocalTimeframeObjective(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className='flex justify-start'>
                <button
                  type='submit'
                  className='cursor-pointer bg-secondary-btn hover:bg-primary-btn active:bg-black-75 text-white p-2 w-40 text-small font-merriweather'
                >
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className='flex flex-col flex-1 min-h-0 min-w-[300px] xs:min-w-[500px] max-w-full mx-auto font-lato'>
        <div className='flex-grow flex flex-col items-center justify-center'>
          <div className='font-merriweather mb-0 xs:mb-4 text-h6 text-black-100'>
            Gérer mon compte
          </div>
          <div className='bg-white-bg p-8 shadow-md w-full h-full max-w-md'>
            {accountMessage.text && (
              <p
                className={`text-small mb-4 p-2 ${
                  accountMessage.type === 'success'
                    ? 'text-alert-green-txt bg-alert-green-bg border-alert-green-border'
                    : accountMessage.type === 'failure'
                    ? 'text-alert-red-txt bg-alert-red-bg border-alert-red-border'
                    : 'text-alert-yellow-txt bg-alert-yellow-bg border-alert-yellow-border'
                }`}
              >
                {accountMessage.text}
              </p>
            )}

            {/* Update Password Form */}
            <form onSubmit={handleUpdatePassword}>
              <label className='text-small-body font-bold text-black-75 mb-1'>
                Changer le mot de passe
              </label>
              <div className='flex flex-col gap-2 mb-8'>
                {[
                  {
                    key: 'current',
                    placeholder: 'Mot de passe actuel',
                    autocomplete: 'current-password',
                  },
                  {
                    key: 'new',
                    placeholder: 'Nouveau mot de passe',
                    autocomplete: 'new-password',
                  },
                  {
                    key: 'confirm',
                    placeholder: 'Confirmer nouveau mot de passe',
                    autocomplete: 'new-password',
                  },
                ].map(({ key, placeholder, autocomplete }) => (
                  <div key={key} className='relative w-full mb-4'>
                    <input
                      type={passwordVisibility[key] ? 'text' : 'password'}
                      required
                      placeholder={placeholder}
                      autoComplete={autocomplete}
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
            <form>
              <p className='text-small-body font-bold text-black-75 mb-2'>
                Supprimer mon compte
              </p>
              <p className='text-small text-black-75'>
                Vous perdrez l’accès à votre compte Ma Bibli une fois votre
                demande de suppression soumise.
              </p>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={triggerDeleteAccount}
                  className='cursor-pointer mt-4 w-40 bg-[#e51a1af7] hover:bg-red-500 text-white-100 p-2 text-small font-merriweather'
                >
                  Supprimer le compte
                </button>
              </div>
              <ConfirmModal
                visible={confirmModalVisibility}
                onConfirm={onConfirmDelete}
                message='Êtes-vous sûr de vouloir supprimer votre compte ?'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
