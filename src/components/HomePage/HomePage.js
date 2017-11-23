import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Container } from 'reactstrap';

import './HomePage.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import FoodPage from '../FoodPage/FoodPage';

import Training from '../../containers/Training';
import TrainingPlans from '../../containers/TrainingPlans';
import TrainingPlan from '../../containers/TrainingPlan';
import TrainingOverview from '../../containers/TrainingOverview';

import Manage from '../../containers/Manage';
import MuscleBuilder from '../../containers/MuscleBuilder';
import ExerciseBuilder from '../../containers/ExerciseBuilder';

const HomePage = ({ match }) => (
  <div className="home">
    <Container className="home__container" fluid>
      <Switch>
        <Route exact path={`${match.url}/`} render={() => <Redirect to={`${match.url}/profile/progress`} />} />
        <Route path={`${match.url}/profile/:tab`} component={ProfilePage} />
        <Route path={`${match.url}/food`} component={FoodPage} />
        <Route exact path={`${match.url}/training-plans`} component={TrainingPlans} />
        <Route path={`${match.url}/training-plan/:id`} component={TrainingPlan} />
        <Route exact path={`${match.url}/training`} component={Training} />
        <Route exact path={`${match.url}/training/:id`} component={TrainingOverview} />

        <Route exact path={`${match.url}/manage/:type`} component={Manage} />
        <Route exact path={`${match.url}/muscle-builder/:id`} component={MuscleBuilder} />
        <Route exact path={`${match.url}/muscle-builder`} component={MuscleBuilder} />
        <Route exact path={`${match.url}/exercise-builder/:id`} component={ExerciseBuilder} />
        <Route exact path={`${match.url}/exercise-builder`} component={ExerciseBuilder} />
      </Switch>
    </Container>
  </div>
);

HomePage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default HomePage;
