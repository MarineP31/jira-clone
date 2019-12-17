import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './Components/DashBoard/DashBoard';
import Form from './Components/Forms/Form';
import NavBar from './Components/Navbar/NavBar';
import ClientList from './Components/ClientList/ClientList';
import ClientForm from './Components/ClientForm/ClientForm'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/create' component={Form} />
          <Route exact path='/edit/:id' component={Form} />
          <Route exact path='/clients' component={ClientList} />
          <Route exact path='/client/create' component={ClientForm} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
