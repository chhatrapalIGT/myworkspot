/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';

const login = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const history = useHistory();

  const LoginHandler = () => {
    // console.log("Trying to login via popup")
    try {
      const loginResponse = instance.loginRedirect().then(response => {
        console.log(`Login Response: ${response.json()}`);
      });

      console.log(loginResponse);
    } catch (err) {
      console.log(err);
    }
  };
  return <div>{isAuthenticated ? history.push('/') : LoginHandler()}</div>;
};

export default login;
