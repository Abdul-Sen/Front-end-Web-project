import React, { Component } from 'react';
import Overview from './Overview';
import Projects from './Projects';
import Teams from './Teams';
import NotFound from './NotFound';
import Employees from './Employees';
import { Route, Switch } from 'react-router-dom';
// import temp from './'
class App extends Component {
  render() {
    return (
      <Switch>
      <Route exact path='/' render={() => (
          <Overview></Overview>
      )} />
      <Route exact path='/projects' render={() => (
          <Projects></Projects>
      )} />
      <Route exact path='/teams' render={() => (
          <Teams></Teams>
      )} />
      <Route exact path='/employees' render={() => (
          <Employees></Employees>
      )} />
      <Route render={() => (
          <NotFound></NotFound>
      )} />
  </Switch>
    );
  }
}

export default App;