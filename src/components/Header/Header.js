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
import { Link } from 'react-router-dom'

import './Header.css';
import * as authActions from '../../actions/auth';

class Header extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false
  }

  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { isAuthenticated } = this.props;

    const userLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem onClick={this.props.logout}>
          <Button color="primary" onClick={this.props.logout}>
            Logout
          </Button>
        </NavItem>
      </Nav>
    );
    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link className="nav-link" to="/signin">Sign in</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/signup">Sign up</Link>
        </NavItem>
      </Nav>
    );

    return (
      <header className="header">
        <Navbar color="faded" light toggleable>
            <NavbarToggler right onClick={this.toggle} />
            <NavbarBrand>
              <Link to="/">Fitness</Link>
            </NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              { isAuthenticated ? userLinks : guestLinks}
            </Collapse>
        </Navbar>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const maspDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, maspDispatchToProps)(Header);
