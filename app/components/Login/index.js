/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export default function Login() {
  const [call, setCall] = useState(true);
  useEffect(() => {
    if (call) {
      login();
      setCall(false);
    }
  });

  const login = () => {
    const url = `${API_URL}/authenticate/login`;
    axios
      .get(url, {
        headers: {
          Authorization: '',
        },
      })
      .then(res => {
        if (res.data) {
          return window.location.replace(res.data.urls);
        }
      })
      .catch(err => {
        return err;
      });
  };

  return <Fragment />;
}
