import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ClientList.scss';

export default class ClientList extends Component {
  state = {
    clients: []
  };

  getClients() {
    fetch('http://localhost:8080/clients')
      .then(response => response.json())
      .then(clients => this.setState({ clients }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getClients();
  }
  render() {
    return (
      <>
        <div className='list_group'>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {this.state.clients.map(client => (
                <tr>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className='client_list_create_button'>
          <Link to='/client/create'>
            <Button variant='info' size='lg' block>
              Create a new Client
            </Button>
          </Link>
        </div>
      </>
    );
  }
}
