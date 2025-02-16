import React from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import Dashboard from './Dashboard';
import Footer from '../../components/Footer';

function DashboardPage() {
  return (
    <>
      <NavbarUser />
      <main className='flex-1 min-h-0 max-w-full font-lato bg-dash-bg'>
        <Dashboard />
      </main>
      <Footer />
    </>
  );
}

export default DashboardPage;
