import { Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <>
      <header>
        <h1>Trybetunes!</h1>
      </header>

      <Outlet />

      <footer>Developed by l7coutinho</footer>
    </>
  );
}

export default Layout;
