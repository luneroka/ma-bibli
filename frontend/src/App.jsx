import { Outlet } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main className='min-h-screen max-w-screen-2x1 mx-auto font-lato'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
