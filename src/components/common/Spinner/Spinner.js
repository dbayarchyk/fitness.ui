import React from 'react';
import { RingLoader } from 'halogen';
import PropTypes from 'prop-types';

import './Spinner.css';

const color = '#0275d8';

const Spinner = ({ isLoading }) => isLoading && (
  <div className="spinner-wrapper">
    <RingLoader color={color} />
  </div>
);

Spinner.propTypes = {
  isLoading: PropTypes.bool,
};

Spinner.defaultProps = {
  isLoading: false,
};

export default Spinner;
