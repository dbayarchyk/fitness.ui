import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Spinner from '../components/common/Spinner/Spinner';

export default function (ComposedComponent) {
  const WithLoading = ({ isLoading, ...props }) => {
    return (
      <div className="loading-container">
        <Spinner key="loading" isLoading={isLoading} />
        <ComposedComponent key="component" {...props} />
      </div>
    );
  };

  WithLoading.propTypes = {
    isLoading: PropTypes.bool,
  };

  WithLoading.defaultProps = {
    isLoading: true,
  }

  return WithLoading;
}
