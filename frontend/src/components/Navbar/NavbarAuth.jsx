import { Link } from 'react-router-dom';
import MaBibliLogo from '../MaBibliLogo';

function NavbarAuth() {
  return (
    <header className='w-full sticky top-0 z-50 bg-main-blue h-[70px]'>
      <nav className='flex justify-between items-center px-[32px] sm:px-[64px] md:px-[128px] py-[17px]'>
        {/* left side */}
        <div className='flex items-center gap-4'>
          {/* Search Input */}
          <Link to='/'>
            {/* <IoHome className='cursor-pointer w-6 h-6 text-white hover:text-primary-btn' /> */}
            <MaBibliLogo width={28} height={28} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavbarAuth;
