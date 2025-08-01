import { Outlet } from 'react-router-dom';
import NavbarAuth from '../../components/Navbar/NavbarAuth';
import Footer from '../../components/Footer';

function AuthLayout() {
  return (
    <>
      <NavbarAuth />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AuthLayout;
