import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import PasswordChecklist from 'react-password-checklist';

function Register() {
  const [message, setMessage] = useState('');
  const { registerUser, signInWithGoogle } = useAuth();
  const { state } = useLocation();
  const { type } = state || {};
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Local state for password visibility and values
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmationPasswordVisibility, setConfirmationPasswordVisibility] =
    useState(false);
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');

  // Common input classes
  const inputClass =
    'text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3';

  // Toggle password view
  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const toggleConfirmationPasswordVisibility = () => {
    setConfirmationPasswordVisibility((prev) => !prev);
  };

  const onSubmit = async (data) => {
    if (password !== confirmationPassword) {
      setMessage({
        text: 'Les nouveaux mots de passe ne correspondent pas.',
        type: 'failure',
      });
      return;
    }
    try {
      await registerUser(data.email, password);
      navigate('/confirmation', { state: { type: 'register' } });
    } catch (error) {
      setMessage({
        text: 'Veuillez fournir un email et un mot de passe valides.',
        type: 'failure',
      });
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert('Connexion réussie!');
      navigate('/');
    } catch (error) {
      alert('La connexion avec Google a échoué.');
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[300px] xs:min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center my-[16px] sm:my-[32px] md:my-[48px]'>
        <div className='bg-white-bg p-8 shadow-md w-full max-w-md'>
          <h2 className='text-h5 text-black-100 mb-8 font-merriweather'>
            Créer mon coin lecture
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete='on'>
            <div className='mb-4'>
              {/* Error Message */}
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

              {/* Email Input */}
              <label
                htmlFor='email'
                className='block text-small text-black-75 mb-1'
              >
                Email
              </label>
              <input
                {...register('email', { required: true })}
                type='email'
                id='email'
                placeholder='Email'
                autoComplete='email'
                required
                className={`${inputClass} mb-4`}
              />

              {/* Password Inputs */}
              <label className='block text-small text-black-75 mb-1'>
                Mot de passe
              </label>
              <div className='flex flex-col gap-4'>
                <div className='relative w-full'>
                  <input
                    type={passwordVisibility ? 'text' : 'password'}
                    required
                    placeholder='Mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    autoComplete='new-password'
                  />
                  <button
                    type='button'
                    onClick={() => togglePasswordVisibility()}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    {passwordVisibility ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className='relative w-full'>
                  <input
                    type={confirmationPasswordVisibility ? 'text' : 'password'}
                    required
                    placeholder='Confirmer le mot de passe'
                    value={confirmationPassword}
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                    className={inputClass}
                    autoComplete='new-password'
                  />
                  <button
                    type='button'
                    onClick={() => toggleConfirmationPasswordVisibility()}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    {passwordVisibility ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className='password-checklist-container'>
                <PasswordChecklist
                  rules={[
                    'capital',
                    'lowercase',
                    'number',
                    'specialChar',
                    'minLength',
                  ]}
                  minLength={8}
                  value={password}
                  valueAgain={confirmationPassword}
                  messages={{
                    capital: 'Doit contenir au moins 1 lettre majuscule.',
                    lowercase: 'Doit contenir au moins 1 lettre minuscule.',
                    number: 'Doit contenir au moins 1 caractère numérique.',
                    specialChar: 'Doit contenir au moins 1 caractère spécial.',
                    minLength: 'Doit contenir au moins 8 caractères.',
                  }}
                />
              </div>
            </div>

            {/* Register Button */}
            <button className='cursor-pointer font-merriweather text-white-100 bg-primary-btn px-6 h-10 w-full text-small-body md:text-body hover:bg-secondary-btn active:bg-black-75'>
              Créer mon compte
            </button>
          </form>

          <hr className='text-black-10 mt-6 mb-6' />

          {/* Redirect To Login */}
          <p className='text-black-100 text-small'>
            Déjà inscrit ?{' '}
            <span className='text-secondary-btn underline hover:text-primary-btn active:text-black-75'>
              <Link to='/login'>Se connecter.</Link>
            </span>
          </p>

          {/* Google Signin Button */}
          <div className='mt-6'>
            <button
              onClick={handleGoogleSignIn}
              className='cursor-pointer font-merriweather w-full flex gap-2 items-center justify-center text-white-100 bg-secondary-btn px-6 h-10 text-small-body md:text-body hover:bg-primary-btn active:bg-black-75'
            >
              <FaGoogle />
              Se connecter avec Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
