import React from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import UserAccount from './UserAccount';
import Footer from '../../components/Footer';

function UserPage() {
  return (
    <>
      <NavbarUser />
      <main className='flex-1 min-h-0 max-w-full mx-[128px] font-lato'>
        <UserAccount />
      </main>
      <Footer />
    </>
  );
}

export default UserPage;
