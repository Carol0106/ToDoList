import React, { useState }  from 'react';
import '../Assets/css/Header.css';
import logo from '../Assets/img/Logo.png';
import ModalLogin from './ModalLogin';
import { isAuthenticated, removeAuthToken, setAuthToken } from '../Utils/auth';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setAuthToken(token);
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeAuthToken();
  };

  return (
    <header className="header">
      <a href='/' className="logo">
        <img src={logo} alt='Coopers Logo'></img>
      </a>
      {isLoggedIn ? (
        <button className="cta-button" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="cta-button" onClick={handleShowModal}>entrar</button>
      )}
      <ModalLogin lgShow={showModal} handleClose={handleCloseModal} handleLogin={handleLogin} />
    </header>
  );
};

export default Header;