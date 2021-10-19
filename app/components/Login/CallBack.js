import React from 'react';
import { Link } from 'react-router-dom';
import { parse } from 'query-string';

export default function CallBack({ location }) {
  const { hash } = location;
  const response = parse(hash);
  if (response && response.error) {
    alert(response.error_description);
    return <Link to="/auth" />;
  }
  sessionStorage.setItem('AccessToken', JSON.stringify(response));
  return <Link to="/" />;
}
