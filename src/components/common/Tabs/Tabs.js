import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './Tabs.css';

const Tabs = ({ tabs, onTabClick, activeTab }) => (
  <Nav tabs>
    {
      tabs.map(tab => (
        <NavItem className="nav-tab__item" key={tab.id}>
          <NavLink
            className={tab.id === activeTab ? 'active' : ''}
            onClick={() => onTabClick(tab)}
          >
            {tab.title}
          </NavLink>
        </NavItem>
      ))
    }
  </Nav>
);

Tabs.propTypes = {
  tabs: PropTypes.array,
  onTabClick: PropTypes.func,
  activeTab: PropTypes.any.isRequired,
};

Tabs.defaultProps = {
  tabs: [],
  onTabClick: () => {},
};

export default Tabs;
