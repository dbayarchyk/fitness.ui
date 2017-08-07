import React from 'react';
import Header from './components/Header/Header';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import requireAuth from './utils/requireAuth';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';

const App = ({ match }) => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app"/>} />
      <Route path="/app" component={requireAuth(HomePage)} />
      <Route exact path="/signin" component={LoginPage} />
      <Route exact path="/signup" component={SignUpPage} />
    </Switch>
  </div>
);

export default App;
