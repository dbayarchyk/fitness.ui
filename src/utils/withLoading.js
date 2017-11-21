import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../components/common/Spinner/Spinner';

export default function (ComposedComponent) {
  const WithLoading = ({ isLoading, ...props }) => {
    return [
      <Spinner key="loading" isLoading={isLoading} />,
      <ComposedComponent key="component" {...props} />,
    ];
  };

  WithLoading.propTypes = {
    isLoading: PropTypes.bool,
  };

  WithLoading.defaultProps = {
    isLoading: false,
  };

  return WithLoading;
}
