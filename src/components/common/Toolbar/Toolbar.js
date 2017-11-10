import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';

import './Toolbar.css';

class Toolbar extends Component {
  static propTypes = {
    title: PropTypes.node,
    actions: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string,
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
    })),
  };
  
  static defaultProps = {
    title: null,
    actions: [],
  };

  state = {
    isOpen: false,
  };

  toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }))

  render() {
    return (
      <div className="toolbar">
        <Navbar color="faded" light expand="md">
          <NavbarBrand className="toolbar-title">{this.props.title}</NavbarBrand>
          
          <NavbarToggler onClick={this.toggle} />

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto toolbar-actions" navbar>
              {
                this.props.actions.map((action, actionIndex) => (
                  <Button
                    color="link"
                    className="toolbar-action"
                    key={actionIndex}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    title={action.title}
                  >
                    <span className="toolbar-action__icon">
                      {action.icon}
                    </span>

                    <span className="toolbar-action__title">
                      {action.title}
                    </span>
                  </Button>
                ))
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Toolbar;
