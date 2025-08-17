import NavbarUser from '../../components/Navbar/NavbarUser';
import UserAccount from './UserAccount';

function UserPage() {
  return (
    <>
      <NavbarUser />
      <main className='flex-1 min-h-0 max-w-full mx-auto font-lato'>
        <UserAccount />
      </main>
    </>
  );
}

export default UserPage;
