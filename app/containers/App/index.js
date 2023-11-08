/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  withRouter,
  useLocation,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import HomePage from 'containers/HomePage/Loadable';
import Spinner from 'react-bootstrap/Spinner';
import ProfilePage from '../ProfilePage';
import Washington from '../OfficeMapPage';
import Faq from '../../components/FAQ';
import delegateProfile from '../../components/Profile/delegateProfile';
import Report from '../ReportPage';
import Boarding from '../onBoardingPage';
import WorkSpot from '../WorkspotPage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CallBack from '../../components/Login/CallBack';
import Login from '../../components/Login';
import EmployeePage from '../EmployeePage';
import NotFoundPage from '../NotFoundPage/Loadable';
import officeUpload from '../UploadMapPage';
import space from '../SpacePage';
import WorkspotAdminPage from '../WorkspotAdminPage';
import NeighbourHoodPage from '../NeighbourHoodPage';
import { requestGetOfficeAssignments } from '../NeighbourHoodPage/action';
import AssignmentPage from '../AssignmentPage';
import WhoIsIn from '../WhoIsInPage';

const App = props => {
  const [pageLoading, setPageLoading] = useState(true);
  const [neighborData, setneighborData] = useState();
  const location = useLocation();
  const pathName = location.pathname;
  const { referrer } = document;
  useEffect(() => {
    if (sessionStorage.getItem('neighborData')) {
      setneighborData(JSON.parse(sessionStorage.getItem('neighborData')));
    }
  }, [sessionStorage.getItem('neighborData')]);

  const history = useHistory();

  const requestLogin = async () => {
    const session = sessionStorage.getItem('AccessToken');
    const { hash } = history.location;
    if (
      session === null &&
      hash === '' &&
      !pathName.includes('/NeighBorhoodLocation')
    ) {
      if (!['/auth', '/callBack'].includes(history.location.pathname)) {
        localStorage.setItem('redirectUrl', history.location.pathname);
        localStorage.setItem('referrer', referrer);
      }
      history.push('/auth');
    }
  };

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
            <Route exact path="/auth" component={Login} />
            <Route
              path="/profile"
              Route
              component={ProfilePage}
              props={props}
            />
            <Route exact path="/callback/" component={CallBack} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/officemap" component={officeUpload} />
            <Route exact path="/space" component={space} />
            <Route exact path="/assignments" component={AssignmentPage} />
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
              path="/whoIsIn"
              component={WhoIsIn}
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
              path="/NeighBorhoodLocation/:locationId/:floor/:neighborhoodName"
              component={NeighbourHoodPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
          {pathName ===
          `/NeighBorhoodLocation/${neighborData &&
            neighborData.locId}/${neighborData &&
            neighborData.flor}/${neighborData && neighborData.neighborhood}` ? (
            ''
          ) : (
            <Footer />
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const { profile } = state;
  return {
    profile,
    profileUser: profile && profile.userList,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getOfficeAssignmentsRequest: payload =>
      dispatch(requestGetOfficeAssignments(payload)),
    dispatch,
  };
}

App.propTypes = {
  profileUser: PropTypes.object,
};

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(App),
);
