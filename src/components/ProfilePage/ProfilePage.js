import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TabContent,
  TabPane,
} from 'reactstrap';
import {
  Route,
  Switch,
} from 'react-router-dom';

import './ProfilePage.css';
import Tabs from '../common/Tabs/Tabs';
import ProgressTab from './ProgressTab/ProgressTab';
import AccountTab from './AccountTab/AccountTab';

const TABS = [
  {
    id: 'progress',
    title: 'Your progress',
    content: <ProgressTab />,
  },
  {
    id: 'account',
    title: 'Account',
    content: <AccountTab />,
  },
];

class ProfilePage extends Component {
  state = { activeTab: this.props.match.params.tab };

  changeTab = tab => this.props.history.push({ pathname: tab.id });

  render() {
    return (
      <div className="profile">
        <Tabs
          tabs={TABS}
          activeTab={this.state.activeTab}
          onTabClick={this.changeTab}
        />
        <TabContent className="profile__tab-content">
          <TabPane>
            <Switch>
              <Route strict exact path="/app/profile/progress" component={ProgressTab} />
              <Route strict exact path="/app/profile/account" component={AccountTab} />
            </Switch>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ProfilePage;
