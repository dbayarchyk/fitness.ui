import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import './FoodPage.css';

import DailyFoodManage from '../../containers/DailyFoodManage';
import FoodPlan from '../../containers/FoodPlan';
import FoodPlans from '../../containers/FoodPlans';

const ProfilePage = ({ match }) => (
  <div className="food">
    <Switch>
      <Route exact path={`${match.url}/controll/daily`} component={DailyFoodManage} />
      <Route exact path={`${match.url}/food-plans`} component={FoodPlans} />
      <Route exact path={`${match.url}/food-plan/:id`} component={FoodPlan} />
    </Switch>
  </div>
);

ProfilePage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProfilePage;
