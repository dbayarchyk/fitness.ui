import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'reactstrap';

import './CharacteristicField.css';

export const CharacteristicField = props =>
  <Row {...props} className={`characteristic-field ${props.className}`} />;

CharacteristicField.propTypes = {
  className: PropTypes.string,
};

CharacteristicField.defaultProps = {
  className: '',
};

export const CharacteristicKey = props =>
  <Col xs="12" sm="6" md="4" lg="3" {...props} className={`characteristic-field__col ${props.className}`} />;

CharacteristicKey.propTypes = {
  className: PropTypes.string,
};

CharacteristicKey.defaultProps = {
  className: '',
};

export const CharacteristicValue = props =>
  <Col xs="12" sm="6" md="8" lg="9" {...props} className={`characteristic-field__col ${props.className}`} />;

CharacteristicValue.propTypes = {
  className: PropTypes.string,
};

CharacteristicValue.defaultProps = {
  className: '',
};
