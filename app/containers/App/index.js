/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// import HomePage from 'containers/HomePage/Loadable';
import ProfilePage from '../ProfilePage';
// import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from '../../global-styles';
import Faq from '../../components/FAQ';
import Report from '../ReportPage';
import Boarding from '../onBoardingPage';

const App = props => (
  <div>
    <Switch>
      <Route exact path="/" component={ProfilePage} />
      <Route exact path="/faq" component={Faq} />
      <Route exact path="/report" props={props} component={Report} />
      <Route exact path="/boarding" props={props} component={Boarding} />
      <Route component={NotFoundPage} />
    </Switch>
    <GlobalStyle />
  </div>
);

export default App;
