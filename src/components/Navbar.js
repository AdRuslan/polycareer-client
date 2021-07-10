import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import './Navbar.scss';

export default function Navbar() {
  const { logout, isLogin } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper navbar blue-grey darken-3">
        <NavLink to="/" className="brand-logo">
          PolyCareer
        </NavLink>
        {isLogin ? (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/">Мои вакансии</NavLink>
            </li>
            <li>
              <NavLink to="/vacancies">Все вакансии</NavLink>
            </li>
            <li>
              <NavLink to="/about">О проекте</NavLink>
            </li>
            <li>
              <NavLink to="/foreigners">Трудоустройство иностранных граждан</NavLink>
            </li>
            <li>
              <NavLink to="/reviews">Отзывы</NavLink>
            </li>
            <li>
              <NavLink to="/login" onClick={logout}>
                Выйти
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li>
              <a href="/">Войти</a>
            </li> */}
          </ul>
        )}
      </div>
    </nav>
  );
}
