import { Outlet } from 'react-router';
import './App.css';

function App() {
  return (
    <>
      <nav>Navbar</nav>
      <Outlet />
      <footer>Footer</footer>
    </>
  );
}

export default App;
