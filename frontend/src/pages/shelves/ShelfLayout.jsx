import { Outlet } from 'react-router-dom';
import NavbarSearch from '../../components//Navbar/NavbarSearch';

function ShelfLayout() {
  return (
    <>
      <NavbarSearch />
      <main className='flex-1 min-h-0 max-w-full font-lato'>
        <Outlet />
      </main>
    </>
  );
}

export default ShelfLayout;
