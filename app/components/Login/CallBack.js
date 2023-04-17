import React from 'react';
import { Redirect } from 'react-router-dom';
import { parse } from 'query-string';

export default function CallBack({ location }) {
  const { hash } = location;
  const response = parse(hash);
  if (response && response.error) {
    alert(response.error_description);
    return <Redirect to="/auth" />;
  }
  sessionStorage.setItem('AccessToken', JSON.stringify(response));
  const redirectURL = sessionStorage.getItem('redirectUrl') || '/';
  console.log('redirectURL', redirectURL);
  sessionStorage.removeItem('sessionStorage');
  return <Redirect to={redirectURL} />;
}
