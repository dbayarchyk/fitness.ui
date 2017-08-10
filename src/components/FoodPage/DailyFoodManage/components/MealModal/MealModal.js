import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class MealModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    meal: PropTypes.object,
    className: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    // To update state when new props are received.
    this.state = {
      meal: this.props.meal
    };

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>{`${this.props.meal ? 'Edit' : 'New'} meal`}</ModalHeader>

        <ModalBody>

        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => this.props.onSubmit(this.state.meal)}>{this.props.meal ? 'Edit' : 'Add'}</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default MealModal;
