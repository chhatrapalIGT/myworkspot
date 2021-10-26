/* eslint-disable react/no-unescaped-entities */
/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../../images/picture.svg';

import '../../components/assets/css/style.scss';

export default function NotFound() {
  return (
    <>
      <div>
        <img
          src={errorImg}
          alt=""
          style={{ margin: '8rem auto auto auto', display: 'flex' }}
        />
      </div>
      <div style={{ marginTop: '4rem' }}>
        <h2 className="text-center">Oops...</h2>
        <p className="text-center">
          We can't seems to find the page you are looking for.{' '}
        </p>
      </div>
      <div className="onboarding-main text-center">
        <Link to="/">
          <button type="button" className="change_btn">
            Return to Home
          </button>
        </Link>
      </div>
    </>
  );
}
