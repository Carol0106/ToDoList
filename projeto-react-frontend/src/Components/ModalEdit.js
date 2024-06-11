import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ModalEdit = ({ show, onHide, onUpdate, newTitle, setNewTitle }) => {
  const handleUpdate = () => {
    onUpdate();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formTask">
            <Form.Label>New Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </Form.Group><br/>
          <Button className='btnModal' type="submit" style={{with:'100%'}}>
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEdit;