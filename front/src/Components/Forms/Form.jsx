import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Form.scss';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { promptConfirmationMessage } from '../../helpers';

export default class FormComponent extends Component {
  state = {
    formid: 0,
    formCreator: '',
    formName: '',
    formDescription: '',
    formStatus: '',
    formComment: '',
    formReminder: new Date()
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch('http://localhost:8080/jira-clone', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.formid,
        name: this.state.formName,
        description: this.state.formDescription,
        statut: this.state.formStatus,
        comment: this.state.comment,
        reminder_date: this.state.formReminder
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          promptConfirmationMessage('Jira issue have been added !');
        } else {
          console.log('failure');
        }
      })
      .catch(err => console.log(err));
  };

  submitFormEdit = e => {
    e.preventDefault();
    fetch('http://localhost:8080/jira-clone', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.formid,
        name: this.state.formName,
        description: this.state.formDescription,
        statut: this.state.formStatus,
        comment: this.state.formComment,
        creator: this.state.formCreator,
        reminder_date: this.state.formReminder
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          promptConfirmationMessage('Jira issue have been updated !');
        } else {
          console.log('failure');
        }
      })
      .catch(err => console.log(err));
  };

  getItemFromId(id) {
    fetch(`http://localhost:8080/jira-clone/${id}`)
      .then(response => response.json())
      .then(item => {
        const { id, name, description, statut, creator, comment } = item[0];
        this.setState({
          formid: id,
          formName: name,
          formCreator: creator,
          formDescription: description,
          formStatus: statut,
          formComment: comment
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    // if item exists, populate the state with proper data
    const { id } = this.props.match.params;

    if (id) {
      this.getItemFromId(id);
    }
  }

  render() {
    const {
      formid,
      formCreator,
      formName,
      formDescription,
      formStatus,
      formComment,
      formReminder
    } = this.state;

    return (
      <Form className='form'>
        <Form.Group controlId='formid'>
          <Form.Label>Id :</Form.Label>
          <Form.Control
            type='id'
            placeholder='Enter id'
            onChange={this.onChange}
            value={formid}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group controlId='formName' style={{ width: 60 + '%' }}>
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              onChange={this.onChange}
              value={formName}
            />
          </Form.Group>

          <Form.Group controlId='formCreator' style={{ width: 40 + '%' }}>
            <Form.Label>Creator :</Form.Label>
            <Form.Control
              as='select'
              onChange={this.onChange}
              value={formCreator}
            >
              <option>Antoine M.</option>
              <option>Pierre G.</option>
              <option>Marine P.</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId='formDescription'>
          <Form.Label>Description : </Form.Label>
          <Form.Control
            type='description'
            placeholder='Description'
            onChange={this.onChange}
            value={formDescription}
            style={{ height: 100 }}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group controlId='formStatus' style={{ width: 50 + '%' }}>
            <Form.Label>Status :</Form.Label>
            <Form.Control
              as='select'
              onChange={this.onChange}
              value={formStatus}
            >
              <option>Todo</option>
              <option>Doing</option>
              <option>Done</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='formReminder' style={{ width: 40 + '%' }}>
            <Form.Label>Reminder : </Form.Label>
            <DatePicker
              selected={formReminder}
              onChange={date => this.setState({ formReminder: date })}
            />
          </Form.Group>
        </Form.Row>
        {formStatus !== 'Done' && (
          <Form.Group controlId='formComment'>
            <Form.Label>Comment :</Form.Label>
            <Form.Control
              type='comment'
              placeholder='comment'
              onChange={this.onChange}
              value={formComment}
              style={{ height: 100 }}
            />
          </Form.Group>
        )}

        <Button
          variant='primary'
          type='submit'
          onClick={
            this.props.match.params.id
              ? this.submitFormEdit
              : this.submitFormAdd
          }
        >
          Submit
        </Button>
      </Form>
    );
  }
}
