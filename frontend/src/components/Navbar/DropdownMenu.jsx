import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const defaultNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Mon compte', href: '/mon-compte' },
  { name: 'Se déconnecter', href: '/logout' },
];

const DropdownMenu = ({ navigation = defaultNavigation, closeDropdown }) => {
  const menuRef = useRef(null);
  const { logout } = useAuth();

  const handleItemClick = (item) => {
    closeDropdown();
    if (item.name === 'Se déconnecter') {
      logout();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeDropdown]);

  return (
    <div
      ref={menuRef}
      className='absolute right-0 mt-50 w-40 bg-white-100 shadow-lg rounded-sm z-[9999]'
    >
      <ul className='py-2'>
        {navigation.map((item) => (
          <li key={item.name} onClick={() => handleItemClick(item)}>
            {item.name === 'Se déconnecter' ? (
              <div>
                <hr className='text-black-10 w-[90%] justify-self-center' />
                <span className='text-black-75 block px-4 py-3 text-sm cursor-pointer hover:text-primary-btn hover:font-extrabold'>
                  {item.name}
                </span>
              </div>
            ) : (
              <Link
                to={item.href}
                className='text-black-75 block px-4 py-2 text-sm hover:text-primary-btn hover:font-extrabold'
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

DropdownMenu.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  closeDropdown: PropTypes.func.isRequired,
};

export default DropdownMenu;
