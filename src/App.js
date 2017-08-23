import React, { Component } from 'react';
import Header from './components/Header/Header';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Sidebar from 'react-sidebar';

import requireAuth from './utils/requireAuth';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import ControllBar from './components/ControllBar/ControllBar';

const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  state = {
    sidebarOpen: false
  };

  toggleSidebarOpen = () => this.setState(oldState => ({ sidebarOpen: !oldState.sidebarOpen }));

  onSetSidebarOpen = open => this.setState({sidebarOpen: open});

  componentWillMount = () => {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }
 
  componentWillUnmount = () => {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  mediaQueryChanged= () => this.setState({sidebarDocked: this.state.mql.matches});

  render() {
    return (
      <div className="App">
        <Header toggleMenu={this.toggleSidebarOpen}/>
        <Sidebar sidebar={<ControllBar match={this.props.match}/>}
                 open={this.state.sidebarOpen}
                 docked={this.state.sidebarDocked}
                 onSetOpen={this.onSetSidebarOpen}
                 touchHandleWidth={200}
                 styles={{
                  root: { top: 55 },
                  sidebar: { minWidth: 280, backgroundColor: '#42a5f5', padding: '15px 20px' }
                 }}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/app"/>} />
            <Route path="/app" component={requireAuth(HomePage)} />
            <Route exact path="/signin" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
          </Switch>
        </Sidebar>
      </div>
    );
  }
}

export default App;