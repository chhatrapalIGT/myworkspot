/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect, useState } from 'react';
import { Switch, Route, withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { connect } from 'react-redux';

// import HomePage from 'containers/HomePage/Loadable';
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router';
import ProfilePage from '../ProfilePage';
import Washington from '../OfficeMapPage';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Faq from '../../components/FAQ';
import delegateProfile from '../../components/Profile/delegateProfile';
import Report from '../ReportPage';
import Boarding from '../onBoardingPage';
import WorkSpot from '../WorkspotPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import Login from '../../components/Login';
import CallBack from '../../components/Login/CallBack';
// import Login from '../../components/Login';
import EmployeePage from '../EmployeePage';
import officeUpload from '../UploadMapPage';
import space from '../SpacePage';
import WorkspotAdminPage from '../WorkspotAdminPage';
import NeighbourHoodPage from '../NeighbourHoodPage';

const App = props => {
  const [pageLoading, setPageLoading] = useState(true);
  const location = useLocation();
  const pathName = location.pathname;
  const history = useHistory();

  const requestLogin = async () => {
    const session = sessionStorage.getItem('AccessToken');
    const { hash } = history.location;
    if (session === null && hash === '') {
      history.push('/auth');
    }
  };

  const pathNameUrl = [
    '/locationId=DC&floor=2&neighborhoodName=Blue',
    '/locationId=DC&floor=3&neighborhoodName=Blue',
    '/locationId=DC&floor=4&neighborhoodName=Blue',
    '/locationId=DC&floor=8&neighborhoodName=Blue',
    '/locationId=BLM&floor=Building_1&neighborhoodName=Yellow',
    '/locationId=RIC&floor=Floor_2&neighborhoodName=Green',
  ];

  useEffect(() => {
    requestLogin();
    setTimeout(() => {
      setPageLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      {pageLoading ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
        <>
          <Header />
          <Switch>
            {/* <Route exact path="/auth" component={Login} /> */}
            <Route
              // exact
              path="/profile"
              Route
              component={ProfilePage}
              props={props}
            />
            <Route exact path="/callback/" component={CallBack} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/officemap" component={officeUpload} />
            <Route exact path="/space" component={space} />
            <Route
              exact
              path="/report"
              Route
              props={props}
              component={Report}
            />
            {props.profileUser && props.profileUser.isFirstTime === true ? (
              <Route exact path="/" props={props} Route component={Boarding} />
            ) : (
              <Route exact props={props} path="/" Route component={WorkSpot} />
            )}
            <Route
              exact
              props={props}
              path="/workspot"
              Route
              component={WorkSpot}
            />

            <Route
              path="/profile/delegate"
              props={props}
              Route
              component={delegateProfile}
            />
            <Route
              exact
              Route
              path="/office"
              component={Washington}
              props={props}
            />
            <Route
              exact
              Route
              props={props}
              path="/employee"
              component={EmployeePage}
            />
            <Route
              exact
              Route
              props={props}
              path="/home"
              component={WorkspotAdminPage}
            />
            <Route
              Route
              props={props}
              path="/locationId=DC&floor=2&neighborhoodName=Blue"
              component={NeighbourHoodPage}
            />
            <Route
              Route
              props={props}
              path="/locationId=DC&floor=3&neighborhoodName=Blue"
              component={NeighbourHoodPage}
            />
            <Route
              Route
              props={props}
              path="/locationId=DC&floor=4&neighborhoodName=Blue"
              component={NeighbourHoodPage}
            />
            <Route
              Route
              props={props}
              path="/locationId=DC&floor=8&neighborhoodName=Blue"
              component={NeighbourHoodPage}
            />
            <Route
              Route
              props={props}
              path="/locationId=BLM&floor=Building_1&neighborhoodName=Yellow"
              component={NeighbourHoodPage}
            />
            <Route
              Route
              props={props}
              path="/locationId=RIC&floor=Floor_2&neighborhoodName=Green"
              component={NeighbourHoodPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
          {pathNameUrl.includes(pathName) ? '' : <Footer />}
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const { profile } = state;
  return {
    profile,
    profileUser: profile && profile.userList && profile.userList.user,
  };
};

App.propTypes = {
  profileUser: PropTypes.object,
};

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(App),
);
