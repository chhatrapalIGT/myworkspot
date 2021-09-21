import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

const AuthenticateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <>
        <AuthenticatedTemplate>
          <Component {...props} />
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <Redirect to="/login" />
        </UnauthenticatedTemplate>
      </>
    )}
  />
);

AuthenticateRoute.propTypes = {
  component: PropTypes.func,
};
export default AuthenticateRoute;
