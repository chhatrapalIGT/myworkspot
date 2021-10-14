/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export default function Login() {
  const [call, setCall] = useState(true);
  const [apiCall, setApiCall] = useState(false);
  useEffect(() => {
    if (call) {
      login();
      setCall(false);
    }
  });

  const login = () => {
    setApiCall(true);
    const url = `${API_URL}/authenticate/login`;
    axios
      .get(url, {
        headers: {
          Authorization: '',
        },
      })
      // eslint-disable-next-line consistent-return
      .then(res => {
        setApiCall(false);
        if (res.data) {
          return window.location.replace(res.data.urls);
        }
      })
      .catch(err => {
        // err;
        console.log('err', err);
        setApiCall(false);
      });
  };

  return (
    <Fragment>
      {apiCall && (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      )}
    </Fragment>
  );
}
