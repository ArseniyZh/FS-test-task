import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/login">Войти</Link>
        </li>
        <li>
          <Link to="/registration">Регистрация</Link>
        </li>
        <li>
            <Link to="/logout">Выйти</Link>
        </li>
        <li>
            <Link to="/chat">Чат</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
