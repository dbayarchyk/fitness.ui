import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Container } from 'reactstrap';

import './HomePage.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import FoodPage from '../FoodPage/FoodPage';
import TrainingPlan from '../TrainingPlan/TrainingPlan';

import Training from '../../containers/Training';
import TrainingPlans from '../../containers/TrainingPlans';

const HomePage = ({ match }) => (
  <div className="home">
    <Container className="home__container" fluid={true}>
      <Switch>
        <Route exact path={`${match.url}/`} render={() => <Redirect to={`${match.url}/profile/progress`} />} />
        <Route path={`${match.url}/profile/:tab`} component={ProfilePage}/>
        <Route path={`${match.url}/food`} component={FoodPage}/>
        <Route exact path={`${match.url}/training-plans`} component={TrainingPlans}/>
        <Route path={`${match.url}/training-plan/:id`} component={TrainingPlan}/>
        <Route exact path={`${match.url}/training`} component={Training}/>
      </Switch>
    </Container>
  </div>
)

export default HomePage;