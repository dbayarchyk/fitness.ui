import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../components/common/Spinner/Spinner';

export default function (ComposedComponent) {
  const WithLoading = ({ isLoading, ...props }) => {
    if (isLoading) {
      return <Spinner isLoading />
    }

    return <ComposedComponent {...props} />
  };

  WithLoading.propTypes = {
    isLoading: PropTypes.bool,
  };

  WithLoading.defaultProps = {
    isLoading: true,
  }

  return WithLoading;
}
