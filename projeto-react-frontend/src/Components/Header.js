import React from 'react';
import '../Assets/css/Header.css';
import logo from '../Assets/img/Logo.png';

const Header = () => {
  return (
    <header className="header">
      <a href='/' className="logo">
        <img src={logo} alt='Coopers Logo'></img>
      </a>
      <button className="cta-button">entrar</button>
    </header>
  );
};

export default Header;