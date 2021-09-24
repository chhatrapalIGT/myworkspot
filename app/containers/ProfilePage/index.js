/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import {
  requestGetOfficeLocation,
  requestAddOfficeLocation,
  clearBoardData,
} from '../onBoardingPage/actions';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Profile from '../../components/Profile';
import {
  requestUserlistData,
  requestDelegateData,
  requestGetProfileOfficeData,
  clearData,
  requestBadgeData,
} from './actions';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      show: false,
      search: false,
      allUser: [],
      searchName: [],
      userListData: [],
      selectData: [],
      finalData: [],
      finalLocationDay: [],
      selectedDay: '',
      selectedNames: 'Washington , DC',
      checked: false,
      data: true,
      timings: [
        {
          day: 'Monday',
          active: false,
          name: '',
          id: '',
        },
        {
          day: 'Tuesday',
          active: false,
          name: '',
          id: '',
        },
        {
          day: 'Wednesday',
          active: false,
          name: '',
          id: '',
        },
        {
          day: 'Thursday',
          active: false,
          name: '',
          id: '',
        },
        {
          day: 'Friday',
          active: false,
          name: '',
          id: '',
        },
      ],
    };
  }

  componentDidMount() {
    this.props.requestDelegateData();
    this.props.requestUserlistData();
    this.props.requestGetProfileOfficeData({});
    this.props.requestGetOfficeLocation({});
  }

  componentDidUpdate() {
    const {
      getProfileLocationSuccess,
      getProfileLocation,
      apiMessage,
      locationMessage,
      badgeUpdateData,
    } = this.props;
    if (
      getProfileLocation &&
      !getProfileLocation.loading &&
      getProfileLocationSuccess &&
      this.state.data
    ) {
      this.handleData();
    }
    if (badgeUpdateData && badgeUpdateData.success && badgeUpdateData.message) {
      this.props.requestUserlistData();
    }
    if (apiMessage || locationMessage || badgeUpdateData.message) {
      setTimeout(() => {
        this.props.clearData();
        this.props.clearBoardData();
      }, 5000);
    }
  }

  handleClose = () => {
    const { finalData } = this.state;
    this.setState({ userListData: finalData, show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleBadgeData = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleButtonData = selectedDay => {
    this.setState({ selectedDay });
  };

  handleData = () => {
    this.setState({ data: false });
    const { timings, finalLocationDay } = this.state;
    const { getProfileLocation } = this.props;
    const finalData = getProfileLocation && getProfileLocation.weeklyLocation;
    if (finalData) {
      finalData.forEach(obj => {
        // eslint-disable-next-line array-callback-return
        timings.map(e => {
          if (e.day === obj.dayofweek) {
            finalLocationDay.push({
              day: obj.dayofweek,
              name: obj.locationName,
              id: obj.id,
            });
          }
        });
      });
    }
    return finalLocationDay;
  };

  handleSubmit = () => {
    const {
      selectedNames,
      selectedDay,
      checked,
      finalLocationDay,
    } = this.state;
    const { location } = this.props;

    if (!checked) {
      const dataValue = finalLocationDay.map(obj => {
        if (obj.day === selectedDay) {
          // eslint-disable-next-line no-param-reassign
          obj.name = selectedNames;
          return obj;
        }
        return obj;
      });
      this.setState({ finalLocationDay: dataValue });
    } else {
      const dataValue = finalLocationDay.map(obj => {
        // eslint-disable-next-line no-param-reassign
        obj.name = selectedNames;
        return obj;
      });

      this.setState({ finalLocationDay: dataValue, checked: false });
    }

    const finalLocatiopnUpdate = [];
    finalLocationDay.forEach(data => {
      // eslint-disable-next-line array-callback-return
      location.map(e => {
        if (e.locationname === data.name) {
          finalLocatiopnUpdate.push({
            defaultlocation: e.id,
            dayofweek: data.day,
          });
        }
      });
    });

    const data = {
      data: finalLocatiopnUpdate,
      employeeid: '239323',
    };
    this.props.requestAddOfficeLocation(data);
  };

  handleUserSelectData = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleCheckbox = () => {
    this.setState({ checked: true });
  };

  handleBadgeSubmit = () => {
    const { badgeData } = this.state;
    const data = {
      employeeid: '239323',
      badgeid: badgeData,
    };

    this.props.requestBadgeData(data);
  };

  // allTabColor = type => {
  //   let color;
  //   switch (type) {
  //     case 'Washington , DC':
  //       color = 'border-top-orange';
  //       break;
  //     case 'Richmond , VA':
  //       color = 'border-top-blue';
  //       break;
  //     case 'Birmigham , AL':
  //       color = 'border-top-green';
  //       break;
  //     case 'Bloomington , MN':
  //       color = 'border-top-black';
  //       break;

  //     default:
  //       color = 'white';
  //   }
  //   return color;
  // };

  render() {
    const {
      getProfileLocation,
      delegateSuccess,
      userData,
      delegateList,
      location,
      apiMessage,
      apiSuccess,
      locationSuccess,
      locationMessage,
      badgeUpdateData,
    } = this.props;
    return (
      <>
        <div id="content-wrap">
          <Header />
          <Profile
            state={this.state}
            handleCheckbox={this.handleCheckbox}
            handleUserSelect={this.handleUserSelect}
            handleButtonData={this.handleButtonData}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleClose={this.handleClose}
            handleUserSelectData={this.handleUserSelectData}
            handleShow={this.handleShow}
            allTabColor={this.allTabColor}
            getProfileLocation={getProfileLocation}
            userData={userData}
            delegateList={delegateList}
            delegateSuccess={delegateSuccess}
            location={location}
            apiMessage={apiMessage}
            handleBadgeData={this.handleBadgeData}
            handleBadgeSubmit={this.handleBadgeSubmit}
            apiSuccess={apiSuccess}
            locationSuccess={locationSuccess}
            locationMessage={locationMessage}
            badgeUpdateData={badgeUpdateData}
          />
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { profile, locationData } = state;
  console.log('state', state);
  return {
    getProfileLocation: profile && profile.getOffice,
    userData:
      profile &&
      profile.userList &&
      profile.userList.user &&
      profile.userList.user[0],
    delegateList:
      profile && profile.delegateList && profile.delegateList.delegate,
    delegateSuccess:
      profile && profile.delegateList && profile.delegateList.success,
    getProfileLocationSuccess:
      profile && profile.getOffice && profile.getOffice.success,
    location:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.location,
    locationSuccess: locationData && locationData.addOfficeLocation.success,
    locationMessage: locationData && locationData.addOfficeLocation.message,
    apiSuccess: profile && profile.apiSuccess,
    apiMessage: profile && profile.apiMessage,
    badgeUpdateData: profile && profile.badgeUpdate,
  };
};
export function mapDispatchToProps(dispatch) {
  return {
    requestGetProfileOfficeData: payload =>
      dispatch(requestGetProfileOfficeData(payload)),
    requestUserlistData: payload => dispatch(requestUserlistData(payload)),
    requestDelegateData: payload => dispatch(requestDelegateData(payload)),
    requestGetOfficeLocation: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    requestAddOfficeLocation: payload =>
      dispatch(requestAddOfficeLocation(payload)),
    clearData: () => dispatch(clearData()),
    clearBoardData: () => dispatch(clearBoardData()),
    requestBadgeData: payload => dispatch(requestBadgeData(payload)),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

ProfilePage.propTypes = {
  requestGetProfileOfficeData: PropTypes.func,
  requestGetOfficeLocation: PropTypes.func,
  requestAddOfficeLocation: PropTypes.func,
  requestBadgeData: PropTypes.func,
  location: PropTypes.array,
  getProfileLocation: PropTypes.object,
  requestUserlistData: PropTypes.func,
  userData: PropTypes.object,
  requestDelegateData: PropTypes.object,
  delegateList: PropTypes.object,
  getProfileLocationSuccess: PropTypes.bool,
  delegateSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.bool,
  locationSuccess: PropTypes.bool,
  locationMessage: PropTypes.string,
  clearData: PropTypes.object,
  clearBoardData: PropTypes.object,
  badgeUpdateData: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  //   withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProfilePage);
