import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // Get the redirection target from location.state or default to '/'
  const redirectTo = location.state?.from || '/';

  // Common input classes
  const inputClass =
    'text-small text-black-75 shadow border border-black-25 focus:outline-secondary-btn w-full py-2 px-3';

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      navigate(redirectTo);
    } catch (error) {
      setMessage({
        text: 'Veuillez fournir un email et un mot de passe valides.',
        type: 'failure',
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(redirectTo);
    } catch (error) {
      alert('La connexion avec Google a échoué.');
    }
  };

  // Toggle password view
  const handleTogglePasswordView = (e) => {
    e.preventDefault();
    setIsVisible((prev) => !prev);
  };

  return (
    <div className='flex flex-col flex-1 min-h-0 min-w-[300px] xs:min-w-[500px] max-w-full mx-auto font-lato'>
      <div className='flex-grow flex items-center justify-center my-[16px] sm:my-[32px] md:my-[48px]'>
        <div className='bg-white-bg p-8 shadow-md w-full max-w-md'>
          <h2 className='text-h5 text-black-100 mb-8 font-merriweather'>
            Mon coin lecture
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
                name='email'
                id='email'
                placeholder='Email'
                className={`${inputClass} mb-4`}
                autoComplete='username email'
              />

              {/* Password Input */}
              <label
                htmlFor='password'
                className='block text-small text-black-75 mb-1'
              >
                Mot de passe
              </label>
              <div className='relative w-[100%] mb-1'>
                <input
                  {...register('password', { required: true })}
                  type={isVisible ? 'text' : 'password'}
                  name='password'
                  id='password'
                  placeholder='Mot de passe'
                  className={inputClass}
                  autoComplete='current-password'
                />

                {isVisible ? (
                  <button
                    type='button'
                    onClick={handleTogglePasswordView}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    <FaEyeSlash />
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={handleTogglePasswordView}
                    className='cursor-pointer absolute right-3 inset-y-0 my-auto text-black-50'
                  >
                    <FaEye />
                  </button>
                )}
              </div>

              {/* Reset Password */}
              <div className='flex justify-end text-small text-secondary-btn underline hover:text-primary-btn active:text-black-75 mb-4'>
                <Link
                  to='/forgot-password'
                  state={{ email: getValues('email') }}
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            {/* Connect Button */}
            <button
              type='submit'
              className='cursor-pointer font-merriweather text-white-100 bg-primary-btn px-6 h-10 w-full text-small-body md:text-body hover:bg-secondary-btn active:bg-black-75'
            >
              Me connecter
            </button>
          </form>

          <hr className='text-black-10 mt-6 mb-6' />

          {/* Redirect To Register */}
          <p className='text-black-100 text-small'>
            Pas encore inscrit ?{' '}
            <span className='text-secondary-btn underline hover:text-primary-btn active:text-black-75'>
              <Link to='/register'>Inscrivez-vous ici.</Link>
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

export default Login;
