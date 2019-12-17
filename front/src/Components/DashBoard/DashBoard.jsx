import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import CardComponent from '../CardComponent/CardComponent';
import './DashBoard.scss';

export default class DashBoard extends Component {
  state = {
    items: []
  };

  getItems() {
    fetch('http://localhost:8080/jira-clone')
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <div>
        <Container className='dashBoard_container'>
          <Row>
            <Col>
              <div className='dashBoard_col_title'>TODO</div>
              <div className='dashBoard_col'>
                {this.state.items.map(item =>
                  item.statut === 'Todo' ? (
                    <CardComponent card={item} key={item.id} />
                  ) : null
                )}
              </div>
            </Col>

            <Col>
              <div className='dashBoard_col_title'>DOING</div>
              <div className='dashBoard_col'>
                {this.state.items.map(item =>
                  item.statut === 'Doing' ? (
                    <CardComponent card={item} key={item.id} />
                  ) : null
                )}
              </div>
            </Col>

            <Col>
              <div className='dashBoard_col_title'>DONE</div>
              <div className='dashBoard_col'>
                {this.state.items.map(item =>
                  item.statut === 'Done' ? (
                    <CardComponent card={item} key={item.id} />
                  ) : null
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
