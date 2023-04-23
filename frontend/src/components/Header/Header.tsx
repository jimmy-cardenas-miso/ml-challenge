import { FC, FormEvent, useState } from 'react';

import './header.sass';

import logoIcon from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';
import { useNavigate } from 'react-router-dom';

export const Header: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const redirectHome = () => {
    navigate('/');
    setSearch('');
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    let queryString = 'search=' + search;
    navigate(`/items?${queryString}`);
    e.preventDefault();
  };

  return (
    <header role="banner" className="header">
      <nav className="nav">
        <a id="nav-brand" className="nav__brand" onClick={redirectHome}>
          <img src={logoIcon} alt="Logo" />
        </a>

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
