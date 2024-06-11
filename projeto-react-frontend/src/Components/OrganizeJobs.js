import React, { useState } from 'react';
import '../Assets/css/OrganizeJobs.css';
import img1 from '../Assets/img/02.jpg';
import seta from '../Assets/img/icon-scroll.png';
import ModalLogin from './ModalLogin';

const OrganizeJobs = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
      <ModalLogin lgShow={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default OrganizeJobs;
