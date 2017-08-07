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
import ControllBar from './components/ControllBar/ControllBar';
import ProfilePage from '../ProfilePage/ProfilePage';

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Container className="home__container" fluid={true}>
          <Row className="home__container__row">
            <Col xs="3" className="home__controll-bar">
              <ControllBar match={this.props.match}/>
            </Col>

            <Col xs="9" className="home__content">
              <Switch>
                <Route exact path={`${this.props.match.url}/`} render={() => <Redirect to={`${this.props.match.url}/profile`} />} />
                <Route path={`${this.props.match.url}/profile/:tab`} component={ProfilePage}/>
                <Route exact path={`${this.props.match.url}/trainings`} render={() => <div>Trainings</div>}/>
                <Route exact path={`${this.props.match.url}/diet`} render={() => <div>Diet</div>}/>
            </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default HomePage;
