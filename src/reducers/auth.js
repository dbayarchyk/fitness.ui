import * as actions from '../actions/auth.js';

const defaultState = {
  isAuthenticated: false,
  currentUser: null,
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user
      };
    case actions.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null
      };
    default:
      return state;
  }
};


export default auth;
