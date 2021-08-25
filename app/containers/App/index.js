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

const App = props => (
  <div>
    <Switch>
      <Route exact path="/" component={ProfilePage} props={props} />
      <Route exact path="/faq" component={Faq} />
      <Route component={NotFoundPage} />
    </Switch>
    <GlobalStyle />
  </div>
);

export default App;
