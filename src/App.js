import React from 'react';
import Header from './components/Header/Header';
import { Route } from 'react-router-dom';

import requireAuth from './utils/requireAuth';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';

const App = () => (
  <div className="App">
    <Header />
    <Route exact path="/" component={requireAuth(HomePage)} />
    <Route path="/signin" component={LoginPage} />
    <Route path="/signup" component={SignUpPage} />
  </div>
);

export default App;
