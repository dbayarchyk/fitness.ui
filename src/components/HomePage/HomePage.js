import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

import './HomePage.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import FoodPage from '../FoodPage/FoodPage';

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Container className="home__container" fluid={true}>
          <Switch>
            <Route exact path={`${this.props.match.url}/`} render={() => <Redirect to={`${this.props.match.url}/profile`} />} />
            <Route path={`${this.props.match.url}/profile/:tab`} component={ProfilePage}/>
            <Route path={`${this.props.match.url}/food`} component={FoodPage}/>
          </Switch>
        </Container>
      </div>
    )
  }
}

export default HomePage;
