import React, { Component } from 'react';
import Header from './components/Header/Header';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { slide as SideBar } from 'react-burger-menu'

import requireAuth from './utils/requireAuth';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import ControllBar from './components/ControllBar/ControllBar';

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <SideBar burgerButtonClassName="side-bar-trigger-button">
          <ControllBar match={this.props.match}/>
        </SideBar>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/app"/>} />
            <Route path="/app" component={requireAuth(HomePage)} />
            <Route exact path="/signin" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
          </Switch>
      </div>
    );
  }
}

export default App;