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
            <Link to="/">Fitness</Link>
          </NavbarBrand>
        </div>
      </header>
    )
  }
}

export default Header;
