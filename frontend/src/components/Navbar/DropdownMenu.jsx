import React from 'react';
import { Link } from 'react-router-dom';

const defaultNavigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Mon compte', href: '/mon-compte' },
  { name: 'Se déconnecter', href: '/logout' },
];

const DropdownMenu = ({
  navigation = defaultNavigation,
  onSelect,
  closeDropdown,
}) => {
  const handleItemClick = (item) => {
    closeDropdown();
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className='absolute right-0 mt-50 w-40 bg-white shadow-lg rounded-sm z-50'>
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
                className='text-black-75 block px-4 py-3 text-sm hover:text-primary-btn hover:font-extrabold'
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

export default DropdownMenu;
