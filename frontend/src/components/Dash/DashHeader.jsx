import React from 'react';
import { FaPen } from 'react-icons/fa';

function DashHeader() {
  return (
    <div className='flex justify-between items-center mx-[128px] mt-[64px] mb-[32px]'>
      {/* Title */}
      <h3 className='text-h3 text-black font-merriweather'>Dashboard</h3>

      {/* Filters */}
      <div className='flex gap-4 text-black-50'>
        <p>Total</p>
        <p>|</p>
        <p>6 derniers mois</p>
        <p>|</p>
        <p>30 derniers jours</p>
      </div>

      {/* Library Button */}
      <a
        href='/bibli'
        className='font-merriweather text-h6 flex gap-2 py-2 px-4 bg-primary-btn items-center text-dash-bg hover:bg-secondary-btn active:bg-black-75'
      >
        <FaPen />
        Gérer mes livres
      </a>
    </div>
  );
}

export default DashHeader;
