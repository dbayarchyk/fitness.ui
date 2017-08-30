import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import './FoodPage.css';
import DailyFoodManage from './DailyFoodManage/DailyFoodManage';
import FoodPlans from './FoodPlans/FoodPlans';

class ProfilePage extends Component {

  render() {
    return (
      <div className="food">
        <Switch>
          <Route exact path={`${this.props.match.url}/controll/daily`} component={DailyFoodManage} />
          <Route exact path={`${this.props.match.url}/food-plans`} component={FoodPlans} />
        </Switch>
      </div>
    )
  }
}

export default ProfilePage;
