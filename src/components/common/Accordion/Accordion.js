import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import './Accordion.css';

class Accordion extends Component {
  static propTypes = {
    trigger: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
  };

  state = {
    isOpen: false
  };

  triggerCollapse = () => this.setState(oldState => ({ isOpen: !oldState.isOpen }));

  render() {
    const { children } = this.props;
    const trigger = React.cloneElement(this.props.trigger, {
      onClick: this.triggerCollapse,
      color: this.state.isOpen ? 'primary' : this.props.trigger.props.color
    });

    return (
      <div className={this.props.className}>
        {trigger}

        <Collapse isOpen={this.state.isOpen}>
          <div className="accordion__content">
            {children}
          </div>
        </Collapse>
      </div>
    )
  }
}

export default Accordion;
