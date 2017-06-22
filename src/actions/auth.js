import jwtDecode from 'jwt-decode';

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = token => dispatch => {
  const user = jwtDecode(token);

  localStorage.setItem('token', token);

  dispatch({
    type: LOGIN,
    user,
  });
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');

  dispatch({
    type: LOGOUT,
  });
};
