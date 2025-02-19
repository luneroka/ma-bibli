import React from 'react';
import { FaPen } from 'react-icons/fa';

function DashHeader() {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center mx-4 md:mx-[128px] mt-4 md:mt-[64px] mb-4 md:mb-[32px]'>
      {/* Title */}
      <h3 className='text-h4 md:text-h3 text-black font-merriweather'>
        Dashboard
      </h3>

      {/* Filters */}
      <div className='flex gap-4 text-sm md:text-base text-black-50 my-2 md:my-0'>
        <p>Total</p>
        <p>|</p>
        <p>30 derniers jours</p>
        <p>|</p>
        <p>7 derniers jours</p>
      </div>

      {/* Library Button */}
      <a
        href='/bibli'
        className='font-merriweather text-body md:text-body font-light flex gap-1 md:gap-2 py-1 md:py-2 px-2 md:px-4 bg-primary-btn items-center text-black-75 hover:bg-secondary-btn active:bg-black-75 active:text-white-bg'
      >
        <FaPen className='text-xs md:text-base' />
        Gérer mes livres
      </a>
    </div>
  );
}

export default DashHeader;
