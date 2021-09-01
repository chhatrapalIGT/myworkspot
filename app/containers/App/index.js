/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// import HomePage from 'containers/HomePage/Loadable';
import Spinner from 'react-bootstrap/Spinner';
import ProfilePage from '../ProfilePage';
import Washington from '../OfficeMapPage';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Faq from '../../components/FAQ';
import Report from '../ReportPage';
import Boarding from '../onBoardingPage';
import WorkSpot from '../WorkspotPage';

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
          <Route exact path="/" component={Boarding} props={props} />
          <Route exact path="/profile" component={ProfilePage} props={props} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/report" props={props} component={Report} />
          <Route exact path="/workspot" props={props} component={WorkSpot} />
          <Route exact path="/office" component={Washington} props={props} />
          <Route component={NotFoundPage} />
        </Switch>
      )}
    </div>
  );
};

export default App;
