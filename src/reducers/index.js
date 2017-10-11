import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr'

import auth from './auth';
import training from './training';

export default {
  toastr,
  auth,
  training
};
