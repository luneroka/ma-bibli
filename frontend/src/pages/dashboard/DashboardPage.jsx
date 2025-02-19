import React, { useState } from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser';
import Footer from '../../components/Footer';
import DashHeader from './DashHeader';
import DashBody from './DashBody';

function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('Total');

  return (
    <>
      <NavbarUser />
      <main className='flex-1 min-h-0 max-w-full font-lato bg-dash-bg'>
        <DashHeader
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        <DashBody activeFilter={activeFilter} />
      </main>
      <Footer />
    </>
  );
}

export default DashboardPage;
