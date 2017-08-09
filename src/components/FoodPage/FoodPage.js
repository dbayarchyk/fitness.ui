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

import DailyFoodManage from './DailyFoodManage/DailyFoodManage';

class ProfilePage extends Component {

  render() {
    return (
      <div className="food">
        Food
        <Switch>
          <Route exact path={`${this.props.match.url}/controll/daily`} component={DailyFoodManage} />
        </Switch>
      </div>
    )
  }
}

export default ProfilePage;
