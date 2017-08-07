import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './NavBar.css';

const NavBar = ({ tabs, onTabClick, activeTab }) => (
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

NavBar.propTypes = {
  tabs: PropTypes.array.isRequired,
  onTabClick: PropTypes.func.isRequired
}

NavBar.defaultProps = {
  tabs: [],
  onTabClick: () => {}
}

export default NavBar;
