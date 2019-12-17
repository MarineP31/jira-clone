import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import ModalComponent from '../Modal/Modal';
import './CardComponent.scss';
import { format } from 'date-fns';

export default function CardComponent({ card }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const JiraDate = format(new Date(card.creation_date), 'eeee-MM-yyyy');

  const handleDelete = () => {
    const confirmDelete = window.confirm('Delete item forever?');
    if (confirmDelete) {
      fetch('http://localhost:8080/jira-clone', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: card.id
        })
      })
        .then(response => {
          handleClose();
          return response.json();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <>
      <Card onClick={handleShow} className='card'>
        <Card.Body>
          <Card.Title>{card.name}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            <Badge variant='info'>Jira #{card.id}</Badge>
          </Card.Subtitle>
          <Card.Text>{card.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className='text-muted'>Created at : {JiraDate}</small>
        </Card.Footer>
      </Card>

      <ModalComponent
        show={show}
        handleClose={handleClose}
        card={card}
        handleDelete={handleDelete}
      />
    </>
  );
}
