import React from 'react';
import { NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import logo from './white-logo.png';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="header__content">
      <span className="header__sidebar-trigger">
        <FontAwesome name="bars" />
      </span>      
      <NavbarBrand>
        <Link to="/">
          <img src={logo} alt="Fitness" height="50" />
        </Link>
      </NavbarBrand>
    </div>
  </header>
);

export default Header;
