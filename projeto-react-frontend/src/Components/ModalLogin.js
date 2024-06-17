import React, { useState, useEffect } from 'react';
import { setAuthToken, isAuthenticated } from '../Utils/auth'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Assets/css/ModalLogin.css';
import imgM from '../Assets/img/modal.png';
import api from '../Utils/api';
import ModalTask from './ModalTask';

const ModalLogin = ({ lgShow, handleClose, handleLogin }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/signup', { username, password });
      console.log('User signed up:', response.data);
      setIsSignUp(false);
      setUsername('');
      setPassword('');
      handleToggleSignUp();
    } catch (error) {
      alert('Error signing up');
      console.error('Error signing up:', error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/signin', { username, password });
      console.log('User signed in:', response.data);
      setUsername('');
      setPassword('');
      setAuthToken(response.data.token); 
      setIsLoggedIn(true);
      handleLogin(response.data.token);
      handleClose();
      window.location.reload();
    } catch (error) {
      alert('Error signing in');
      console.error('Error signing in:', error);
    }
  };

  const handleCloseModalTask = () => {
    console.log('Closing Task Modal');
    setShowTaskModal(false);
  };

  return (
    <>
      <Modal size="lg" show={lgShow} onHide={() => { handleClose(); window.location.reload(); }} animation={true}>
        <Modal.Header>
          <a className='closemodal' onClick={() => { handleClose(); window.location.reload(); }}>close</a>
        </Modal.Header>
        <Modal.Body>
          <div className='row modallg'>
            <div className='col-sm-4'>
              <img src={imgM} alt='imagem' className="img-fluid" style={{paddingRight: '0!important'}}/>
            </div>
            <div className='col-sm-8'>
              <h1>{isSignUp ? 'Sign up' : 'Sign in'}</h1>
              <h2>{isSignUp ? 'create a new account' : 'to access your list'}</h2>
              <br/>
              <Form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                <Form.Group className="mb-3 col-sm-9" controlId="username">
                  <Form.Label>User:</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3 col-sm-9" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" className='btnModal'>{isSignUp ? 'Sign up' : 'Sign in'}</Button><br/>
                <a href="#" className="mb-3 col-sm-9 link" onClick={handleToggleSignUp}>
                  {isSignUp ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
                </a>
              </Form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ModalTask show={showTaskModal} handleClose={handleCloseModalTask} />
    </>
  );
};

export default ModalLogin;
