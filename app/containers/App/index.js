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

// import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Profile from '../../components/Profile';
// import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from '../../global-styles';
import Faq from '../../components/FAQ';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Profile} />
        <Route exact path="/faq" component={Faq} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
