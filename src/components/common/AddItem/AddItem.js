import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './AddItem.css';

class AddItem extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    input: PropTypes.node,
  }

  static defaultProps = {
    isOpen: false,
    input: <Input key="input" />,
  }

  constructor(props) {
    super(props);

    this.state = {
      isOpen: this.props.isOpen,
    }
  }

  close = () => this.setState({ isOpen: false });

  onButtonClick = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    return [
      this.state.isOpen ? this.props.input : null,

      <Button key="button" color="link" onClick={this.onButtonClick}>
        <FontAwesome name={this.state.isOpen ? 'minus' : 'plus'} />
      </Button>
    ];
  }
}

export default AddItem;
