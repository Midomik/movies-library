import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './SharedLayout.module.css';
import Filter from 'components/Filter/Filter';

const SharedLayout = ({ children }) => {
  return (
    <div className={css.global_container}>
      <header>
        <div className={css.movies_favorites_container}>
          <NavLink className="nav_link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav_link" to="/favorites">
            Favorites
          </NavLink>
        </div>
        <Filter />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default SharedLayout;
