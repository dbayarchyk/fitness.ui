import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import logo from './fitness-logo.png'
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header" color="faded">
        <div className="header__content">
          <span className="header__sidebar-trigger">
            <FontAwesome name="bars"/>
          </span>      
          <NavbarBrand>
            <Link to="/">
              <img src={logo} alt="Fitness" height="50"/>
            </Link>
          </NavbarBrand>
        </div>
      </header>
    )
  }
}

export default Header;