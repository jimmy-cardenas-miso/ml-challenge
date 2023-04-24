import './header.sass';

import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logoIcon from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';

export const Header: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const redirectHome = () => {
    navigate('/');
    setSearch('');
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const queryString = 'search=' + search;
    navigate(`/items?${queryString}`);
    e.preventDefault();
  };

  return (
    <header role="banner" className="header">
      <nav className="nav">
        <button id="nav-brand" className="nav__brand" onClick={redirectHome}>
          <img src={logoIcon} alt="Logo" />
        </button>

        <form
          id="nav-search"
          className="nav__search"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            id="nav-search-input"
            className="nav__input"
            placeholder="Nunca dejes de buscar"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search"
          />
          <button
            id="nav-search-button"
            className="nav__search-btn"
            type="submit"
          >
            <img src={searchIcon} alt="buscar" />
          </button>
        </form>
      </nav>
    </header>
  );
};
