import React from 'react';

const Navbar = () => {
  return (
    <header className='max-w-screen-2x1 mx-auto px-4 py-6'>
      <nav className='flex justify-between items-center'>
        {/* left side */}
        <div>Search Bar and Search Btn</div>

        {/* right side */}
        <div>Nav Logos</div>
      </nav>
    </header>
  );
};

export default Navbar;
