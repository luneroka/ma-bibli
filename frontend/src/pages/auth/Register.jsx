import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

function Register() {
  const [message, setMessage] = useState('');
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Local state for password visibility and values
  const [passwordVisibility, setPasswordVisibility] = useState({
    new: false,
    confirm: false,
  });
  const [passwordValues, setPasswordValues] = useState({
    new: '',
    confirm: '',
  });

  // Common input classes
  const inputClass =
    'text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3';

  // Toggle password view
  const toggleVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data) => {
    if (passwordValues.new !== passwordValues.confirm) {
      setMessage({
        text: 'Les nouveaux mots de passe ne correspondent pas.',
        type: 'failure',
      });
      setPasswordValues({ new: '', confirm: '' });
      return;
    }
    try {
      await registerUser(data.email, passwordValues.new);
      alert('Votre compte a été créé avec succès!');
      navigate('/login');
    } catch (error) {
      setMessage({
        text: 'Veuillez fournir un email et un mot de passe valides.',
        type: 'failure',
      });
      setPasswordValues({ new: '', confirm: '' });
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
    <div className='flex flex-col flex-1 min-h-0 min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center mt-[64px]'>
        <div className='bg-white p-8 shadow-md w-full max-w-md'>
          <h2 className='text-h5 text-black mb-8 font-merriweather'>
            Créer mon coin lecture
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                {[
                  { key: 'new', placeholder: 'Mot de passe' },
                  { key: 'confirm', placeholder: 'Confirmer le mot de passe' },
                ].map(({ key, placeholder }) => (
                  <div key={key} className='relative w-full'>
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
              </div>
            </div>

            {/* Register Button */}
            <button className='cursor-pointer font-merriweather text-white-bg bg-primary-btn px-6 h-10 w-full text-small-body md:text-body hover:bg-secondary-btn active:bg-black-75'>
              Créer mon compte
            </button>
          </form>

          <hr className='text-black-10 mt-6 mb-6' />

          {/* Redirect To Login */}
          <p className='text-black text-small'>
            Déjà inscrit ?{' '}
            <span className='text-secondary-btn underline hover:text-primary-btn active:text-black-75'>
              <Link to='/login'>Se connecter.</Link>
            </span>
          </p>

          {/* Google Signin Button */}
          <div className='mt-6'>
            <button
              onClick={handleGoogleSignIn}
              className='cursor-pointer font-merriweather w-full flex gap-2 items-center justify-center text-white-bg bg-main-blue px-6 h-10 text-small-body md:text-body hover:bg-secondary-btn active:bg-black-75'
            >
              <FaGoogle />
              Se connecter avec Google
            </button>
          </div>

          {/* Copyrights */}
          <p className='text-xs text-center mt-6 text-black-50'>
            &copy;2025 Ma Bibli. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
