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
import TrainingPlans from '../TrainingPlans/TrainingPlans';
import TrainingPlan from '../TrainingPlan/TrainingPlan';
import TrainingContainer from '../Training/TrainingContainer';

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Container className="home__container" fluid={true}>
          <Switch>
            <Route exact path={`${this.props.match.url}/`} render={() => <Redirect to={`${this.props.match.url}/profile/progress`} />} />
            <Route path={`${this.props.match.url}/profile/:tab`} component={ProfilePage}/>
            <Route path={`${this.props.match.url}/food`} component={FoodPage}/>
            <Route exact path={`${this.props.match.url}/training-plans`} component={TrainingPlans}/>
            <Route path={`${this.props.match.url}/training-plan/:id`} component={TrainingPlan}/>
            <Route exact path={`${this.props.match.url}/training`} component={TrainingContainer}/>
          </Switch>
        </Container>
      </div>
    )
  }
}

export default HomePage;