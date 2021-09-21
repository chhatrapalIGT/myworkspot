/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { connect } from 'react-redux';

// import HomePage from 'containers/HomePage/Loadable';
import Spinner from 'react-bootstrap/Spinner';
import { createStructuredSelector } from 'reselect';
import { makeUserSelector } from './selectors';
import ProfilePage from '../ProfilePage';
import Washington from '../OfficeMapPage';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Faq from '../../components/FAQ';
import Report from '../ReportPage';
import Boarding from '../onBoardingPage';
import WorkSpot from '../WorkspotPage';
import Login from '../../components/Login';

import AuthenticateRoute from '../../components/AuthenticateRoute';

const App = props => {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
  });
  return (
    <div>
      {pageLoading ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
        <Switch>
          <AuthenticateRoute
            exact
            props={props}
            path="/"
            Route
            component={WorkSpot}
          />
          <Route exact path="/login" component={Login} />
          <AuthenticateRoute
            exact
            path="/profile"
            Route
            component={ProfilePage}
            props={props}
          />
          <AuthenticateRoute exact path="/faq" component={Faq} />
          <AuthenticateRoute
            exact
            path="/report"
            Route
            props={props}
            component={Report}
          />
          <AuthenticateRoute
            exact
            path="/board"
            props={props}
            Route
            component={Boarding}
          />
          <AuthenticateRoute
            exact
            Route
            path="/office"
            component={Washington}
            props={props}
          />
          <Route component={NotFoundPage} />
        </Switch>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: makeUserSelector(),
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(App),
);
