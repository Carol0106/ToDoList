import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../Utils/api';

const ModalTask = ({ show, handleClose, task, onUpdate }) => {
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title);
    } else {
      setTaskTitle('');
    }
  }, [task]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', { title: taskTitle });
      console.log('Task created:', response.data);
      setTaskTitle('');
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(task._id, taskTitle);
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      handleEditTask(e);
    } else {
      handleCreateTask(e);
    }
  };

  return (
    <Modal size="lg" show={show} onHide={() => { handleClose(); window.location.reload(); }} animation={true}>
      <Modal.Header>
        <a className='closemodal' onClick={handleClose}>close</a>
      </Modal.Header>
      <Modal.Body>
        <h1>{task ? 'Edit Task' : 'Add to To-do list'}</h1>
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
            <Button type="submit" className='btnModal'>
              {task ? 'Update' : 'Add'}
            </Button>
            <Button className='btnModalBack' onClick={handleClose}>Back</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalTask;
