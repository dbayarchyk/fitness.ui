import React from 'react';
import { connect } from 'react-redux';

import * as authActions from '../actions/auth';

import ControllBar from '../components/ControllBar/ControllBar';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const maspDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, maspDispatchToProps)(ControllBar);
