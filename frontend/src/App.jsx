import { Outlet } from 'react-router';
import './App.css';

function App() {
  return (
    <>
      <nav>Navbar</nav>
      <main className='bg-mint-500 font-lato'>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
