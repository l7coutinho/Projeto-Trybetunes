import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.css';

function Layout() {
  return (
    <>
      <Header />

      <Outlet />

      <footer>Developed by l7coutinho</footer>
    </>
  );
}

export default Layout;
