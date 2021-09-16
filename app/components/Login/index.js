import React from 'react';
import PropTypes from 'prop-types';
// import { useMsal } from "@azure/msal-react";

const login = props => (
  <div>
    {console.log('props', props)}
    {props.isAuthenticated ? (
      <button
        type="submit"
        className="login-button"
        name="Logout"
        onClick={() => props.logout()}
      >
        Logout
      </button>
    ) : (
      <button
        type="submit"
        className="login-button"
        name="Login"
        onClick={() => props.login()}
      >
        Login{' '}
      </button>
    )}
  </div>
);

login.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

export default login;
