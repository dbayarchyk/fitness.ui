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

import './ProfilePage.css';
import NavBar from './components/NavBar/NavBar';
import ProgressTab from './ProgressTab/ProgressTab';
import AccountTab from './AccountTab/AccountTab';

const TABS = [
  {
    id: 'progress',
    title: 'Your progress',
    content: <ProgressTab/>
  },
  {
    id: 'account',
    title: 'Account',
    content: <AccountTab/>
  }
];

class ProfilePage extends Component {
  state = {
    activeTab: this.props.match.params.tab
  };

  changeTab = tab => this.props.history.push({ pathname: tab.id });

  render() {
    return (
      <div className="profile">
        <NavBar
          tabs={TABS}
          activeTab={this.state.activeTab}
          onTabClick={this.changeTab.bind(this)}
        />
        <TabContent className="profile__tab-content">
           <TabPane>
             <Switch>
               <Route strict exact={true} path={`/app/profile/progress`} component={ProgressTab}/>
               <Route strict exact={true} path={`/app/profile/account`} component={AccountTab}/>
             </Switch>
           </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default ProfilePage;
