import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ModalComponent({
  show,
  handleClose,
  card,
  handleDelete
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{card.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{card.description}</Modal.Body>
      <Modal.Footer>
        <Link to={`/edit/${card.id}`}>
          <Button variant='primary'>Edit</Button>
        </Link>
        <Button variant='danger' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
