import React, { useState, useEffect } from 'react';
import '../Assets/css/OrganizeJobs.css';
import img1 from '../Assets/img/02.jpg';
import seta from '../Assets/img/icon-scroll.png';
import ModalLogin from './ModalLogin';
import ModalTask from './ModalTask';
import { isAuthenticated, setAuthToken } from '../Utils/auth';

const OrganizeJobs = () => {
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);


  const handleCloseModalLogin = () => setShowModalLogin(false);
  const handleCloseModalTask = () => {
    setShowModalTask(false);
    window.location.reload();
  };

  const handleShowModal = () => {
    if (isLoggedIn) {
      setShowModalTask(true);
    } else {
      setShowModalLogin(true);
    }
  };

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    if (token) {
      setAuthToken(token);
    }
    setShowModalLogin(false);
    setShowModalTask(true); 
  };

  return (
    <div className="OrganizeJobs">
      <div className="row">
        <div className="col-12 col-md-6 OJtext">
          <h1>Organize</h1>
          <h2>your daily jobs</h2>
          <p>The only way to get things done</p>
          <button className="cta-button" onClick={handleShowModal}>Go to To-do list</button>
        </div>
        <div className="col-12 col-md-6">
          <img src={img1} alt='imagem' className="img-fluid ognzImg" />
        </div>
      </div>
      <img src={seta} alt='imagem' className="img-fluid seta" />
      <ModalLogin 
        lgShow={showModalLogin} 
        handleClose={handleCloseModalLogin} 
        handleLogin={handleLogin} 
      />
      <ModalTask 
        show={showModalTask} 
        handleClose={handleCloseModalTask} 
      />
    </div>
  );
};

export default OrganizeJobs;
