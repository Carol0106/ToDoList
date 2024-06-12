
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Assets/css/ModalLogin.css';
import imgM from '../Assets/img/modal.png';
import api from '../Api';

const ModalLogin = ({ lgShow, handleClose }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [taskTitle, setTaskTitle] = useState('');

  const handleToggleModal = () => {
    setShowSignIn(!showSignIn);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!showSignIn) {
      try {
        const response = await api.post('/tasks', { title: taskTitle });
        console.log('Task created:', response.data);
        setTaskTitle('');
        handleToggleModal();
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  return (
    <Modal size="lg" show={lgShow} onHide={() => { handleClose(); window.location.reload(); }} animation={true}>
      <Modal.Header>
        <a className='closemodal' onClick={() => { handleClose(); window.location.reload(); }}>close</a>
      </Modal.Header>
      <Modal.Body>
        {showSignIn ? (
          <div className='row modallg'>
            <div className='col-sm-4'>
              <img src={imgM} alt='imagem' className="img-fluid" style={{paddingRight: '0!important'}}/>
            </div>
            <div className='col-sm-8'>
              <h1>Sign in</h1>
              <h2>to access your list</h2>
              <br/>
              <Form>
                <Form.Group className="mb-3 col-sm-9" controlId="exampleForm.ControlInput1">
                  <Form.Label>User:</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3 col-sm-9" controlId="exampleForm.ControlInput2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>
                <Button type="submit" className='btnModal' onClick={handleToggleModal}>Sign in</Button>
              </Form>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal "Add to To-do list" */}
            <h1>Add to To-do list</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Task:</Form.Label>
                <Form.Control 
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Button type="submit" className='btnModal'>Add</Button>
                <Button className='btnModalBack' onClick={handleToggleModal}>Back</Button>
              </div>
            </Form>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;