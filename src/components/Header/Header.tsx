import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import './index.css';

function Header() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser()
      .then((userData) => {
        setUser(userData.name);
        setLoading(false);
      });
  }, []);

  return (
    <header data-testid="header-component" className="header-cont">
      <ul className="list">
        <li>
          <NavLink to="/search" data-testid="link-to-search">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" data-testid="link-to-favorites">
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" data-testid="link-to-profile">
            Profile
          </NavLink>
        </li>
      </ul>
      <h1>TrybeTunes!</h1>
      <p data-testid="header-user-name">
        {loading ? 'Carregando...' : `Bem-vindo, ${user}`}
      </p>
    </header>
  );
}

export default Header;
