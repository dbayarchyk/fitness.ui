import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import './ConfirmationDialog.css';

const ConfirmationDialog = ({
  isOpen,
  title,
  body,
  cancelButton,
  submitButton,
  onAnswer
}) => (
  <Modal
    isOpen={isOpen}
    toggle={() => onAnswer(false)}
  >
    <ModalHeader toggle={() => onAnswer(false)}>
      {title}
    </ModalHeader>

    <ModalBody>
      {body}
    </ModalBody>

    <ModalFooter>
      <Button
        color="secondary"
        onClick={() => onAnswer(false)}
        {...cancelButton}
      />

      <Button
        color="primary"
        onClick={() => onAnswer(true)}
        {...submitButton}
      />
    </ModalFooter>
  </Modal>
);

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.node,
  body: PropTypes.node,
  cancelButton: PropTypes.shape({
    children: PropTypes.node,
  }),
  submitButton: PropTypes.shape({
    children: PropTypes.node,
  }),
  onAnswer: PropTypes.func,
};

ConfirmationDialog.defaultProps = {
  isOpen: false,
  title: 'Please confirm',
  body: 'Are you sure?',
  cancelButton: {
    children: 'Cancel',
  },
  submitButton: {
    children: 'Sumbit',
  },
  onAnswer: answer => answer,
};

export default ConfirmationDialog;