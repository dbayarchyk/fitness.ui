import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom'

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
        <NavItem>
          Logout
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
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={this.toggle} />
        <NavbarBrand>
          <Link to="/">Fitness</Link>
        </NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          { isAuthenticated ? userLinks : guestLinks}
        </Collapse>
      </Navbar>
    )
  }
}

export default Header;
