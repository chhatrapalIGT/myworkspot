/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from './config';
import Login from '../../components/Login';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
    };
    this.login = this.login.bind(this);

    this.publicClientApplication = new PublicClientApplication({
      auth: {
        clientId: config.appId,
        authority: config.authority,
        redirectUri: config.redirectUri,
      },
      cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
      },
    });
  }

  loginRequest = {
    scopes: ['User.Read'],
  };

  login = async () => {
    const { history } = this.props;
    try {
      await this.publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account',
      });
      this.handleLogin();
      this.setState({ isAuthenticated: true });

      if (this.state.isAuthenticated) {
        history.push('/');
      }
    } catch (err) {
      this.setState({
        isAuthenticated: false,
        error: err,
      });
    }
  };

  logout = async () => {
    const { history } = this.props;
    try {
      await this.publicClientApplication.logoutPopup({
        clientId: config.clientId,
        authority: config.authority,
        redirectUri: config.redirectUri,
      });
      this.setState({ isAuthenticated: false });
      if (!this.state.isAuthenticated) {
        history.push('/');
      }
    } catch (err) {
      this.setState({
        isAuthenticated: false,
        error: err,
      });
    }
  };

  render() {
    return <Login state={this.state} login={this.login} logout={this.logout} />;
  }
}

LoginPage.propTypes = {
  history: PropTypes.object,
};
export default LoginPage;
