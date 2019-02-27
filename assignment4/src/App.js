/*********************************************************************************
* WEB422 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Abdul Rehman Student ID: 149019176 Date: 27-2-19
*
********************************************************************************/
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