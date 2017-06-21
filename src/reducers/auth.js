import * as actions from '../actions/auth.js';

const defaultState = {
  isAuthenticated: false,
  currentUser: null,
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.user
      };
    default:
      return state;
  }
};

export default auth;
