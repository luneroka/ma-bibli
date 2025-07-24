import { FaPen } from 'react-icons/fa';
import PropTypes from 'prop-types';

function DashHeader({ activeFilter, setActiveFilter }) {
  const handleFilterClick = (filterValue) => {
    setActiveFilter(filterValue);
  };

  return (
    <div className='flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center mx-[32px] sm:mx-[64px] lg:mx-[128px] mt-4 md:mt-[32px] md:mb-[24px]'>
      {/* Title */}
      <h3 className='text-h4 md:text-h3 text-black-100 font-merriweather'>
        Dashboard
      </h3>

      {/* Filters */}
      <div className='flex gap-4 text-small-body md:text-body text-black-75 font-light my-2 md:my-0 leading-'>
        <span
          onClick={() => handleFilterClick('Total')}
          className={
            activeFilter === 'Total'
              ? 'cursor-pointer border-b-[1.5px] border-secondary-btn'
              : 'cursor-pointer'
          }
        >
          Total
        </span>
        <p>|</p>
        <span
          onClick={() => handleFilterClick('30 jours')}
          className={
            activeFilter === '30 jours'
              ? 'cursor-pointer border-b-[1.5px] border-secondary-btn'
              : 'cursor-pointer'
          }
        >
          30 derniers jours
        </span>
        <p>|</p>
        <span
          onClick={() => handleFilterClick('7 jours')}
          className={
            activeFilter === '7 jours'
              ? 'cursor-pointer border-b-[1.5px] border-secondary-btn'
              : 'cursor-pointer '
          }
        >
          7 derniers jours
        </span>
      </div>

      {/* Library Button */}
      <a
        href='/bibli'
        className='font-merriweather text-body md:text-body font-light flex gap-1 mb-4 md:mb-0 md:gap-2 py-1 md:py-2 px-2 md:px-4 bg-primary-btn items-center text-black-75 hover:bg-secondary-btn active:bg-black-75 active:text-white-75'
      >
        <FaPen className='text-xs md:text-base' />
        Gérer mes livres
      </a>
    </div>
  );
}

DashHeader.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
};

export default DashHeader;
