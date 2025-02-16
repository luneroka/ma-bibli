import React from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import Footer from '../../components/Footer';
import DashHeader from './DashHeader';
import DashBody from './DashBody';

function DashboardPage() {
  return (
    <>
      <NavbarUser />
      <main className='flex-1 min-h-0 max-w-full font-lato bg-dash-bg'>
        <DashHeader />
        <DashBody />
      </main>
      <Footer />
    </>
  );
}

export default DashboardPage;
