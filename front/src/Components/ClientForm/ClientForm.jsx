import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './ClientForm.scss';
import { promptConfirmationMessage } from '../../helpers';

export default class ClientForm extends Component {
  state = {
    formid: 0,
    formName: '',
    formLocation: ''
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch('http://localhost:8080/clients', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.formid,
        name: this.state.formName,
        location: this.state.formLocation
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          promptConfirmationMessage('A new client have been added !');
        } else {
          console.log('failure');
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Form className='form'>
        <Form.Group controlId='formid'>
          <Form.Label>Id :</Form.Label>
          <Form.Control
            type='id'
            placeholder='Enter id'
            onChange={this.onChange}
          />
        </Form.Group>

        <Form.Group controlId='formName'>
          <Form.Label>Name :</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            onChange={this.onChange}
          />
        </Form.Group>

        <Form.Group controlId='formLocation'>
          <Form.Label>Location : </Form.Label>
          <Form.Control
            type='location'
            placeholder='location'
            onChange={this.onChange}
          />
        </Form.Group>

        <Button variant='primary' type='submit' onClick={this.submitFormAdd}>
          Submit
        </Button>
      </Form>
    );
  }
}
