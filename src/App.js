import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { slide as SideBar } from 'react-burger-menu';
import ReduxToastr from 'react-redux-toastr';

import requireAuth from './utils/requireAuth';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';

import ControllBar from './containers/ControllBar';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  closeSideBar = () => this.sidebar.setState({ isOpen: false });

  render() {
    return (
      <div className="App">
        <Header />
        <SideBar burgerButtonClassName="side-bar-trigger-button" ref={(sidebar) => { this.sidebar = sidebar; }}>
          <ControllBar match={this.props.match} close={this.closeSideBar} />
        </SideBar>
        <main className="main">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/app" />} />
            <Route strict path="/app" component={requireAuth(HomePage)} />
            <Route exact path="/signin" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
          </Switch>
        </main>

        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </div>
    );
  }
}

export default App;
