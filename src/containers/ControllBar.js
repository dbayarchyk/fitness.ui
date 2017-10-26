import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as authActions from '../actions/auth';

import ControllBar from '../components/ControllBar/ControllBar';

class ControllBarContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false,
  };

  render() {
    return (
      <ControllBar {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const maspDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, maspDispatchToProps)(ControllBarContainer);
