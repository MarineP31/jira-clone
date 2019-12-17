import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar expand='lg' variant='light' bg='light'>
      <Container>
        <Navbar.Brand href='/'>Jira Clone</Navbar.Brand>
        <Link to='/clients'>
          <Navbar.Text>Clients</Navbar.Text>
        </Link>
        <Link to='/create'>
          <Button variant='outline-info'>New Jira</Button>
        </Link>
      </Container>
    </Navbar>
  );
}
