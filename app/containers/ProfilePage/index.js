/* eslint-disable func-names */
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
  requestVerifyBadge,
  clearBoardData,
  clearBadgeSuccess,
  clearProfileBadgeSuccess,
} from '../onBoardingPage/actions';

import Profile from '../../components/Profile';
import {
  requestUserlistData,
  requestDelegateData,
  requestGetProfileOfficeData,
  clearData,
  requestBadgeData,
  requestAddDelegateList,
  requestRemoveDelegateList,
  requestGetDelegateList,
} from './actions';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      trueData: true,
      show: false,
      search: false,
      allUser: [],
      searchName: [],
      userListData: [],
      selectData: [],
      finalData: [],
      finalLocationDay: [],
      updatedlistArray: [],
      listArray: [],
      selectedDay: '',
      selectedNames: '',
      activePage: 1,
      finalval: '',
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
    this.props.requestGetDelegateList();
    this.props.requestGetProfileOfficeData({});
    this.props.requestGetOfficeLocation({});
    this.props.requestDelegateData({});
  }

  componentWillUnmount() {
    this.props.clearBoardData();
    this.props.clearData();
  }

  componentDidUpdate() {
    const {
      getProfileLocationSuccess,
      getProfileLocation,
      apiMessage,
      locationMessage,
      badgeUpdateData,
      locationApiMessage,
      locationApiSuccess,
    } = this.props;

    if (
      getProfileLocation &&
      !getProfileLocation.loading &&
      getProfileLocationSuccess &&
      this.state.data
    ) {
      this.handleData();
    }
    if (
      apiMessage ||
      locationMessage ||
      badgeUpdateData.message ||
      (locationApiMessage && !locationApiSuccess)
    ) {
      setTimeout(() => {
        this.props.clearData();
        this.props.clearBoardData();
      }, 5000);
    }

    if (
      this.props &&
      this.props.verifyBadgeChk &&
      this.props.verifyBadgeChk.update
    ) {
      setTimeout(() => {
        this.handleCloseBadge();
        this.props.clearProfileBadgeSuccess();
      }, 1000);
    }
  }

  handleCloseBadge = () => {
    this.setState({ badgedata: '', badge: '' });
    document.getElementById('badgeNumVal1').focus();
  };

  handlecloseDataIcon = () => {
    this.props.clearData();
    this.props.clearBoardData();
    this.props.clearBadgeSuccess();
  };

  handleClearstate = () => {
    this.setState({ listArray: [], trueData: false });
  };

  handleClose = () => {
    const { finalData } = this.state;
    this.setState({ userListData: finalData, show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleBadgeData = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const finalValue1 = document.getElementById('badgeNumber');
      const finalValue2 = document.getElementById('badgeValue');
      const firstInput2 = document.getElementById('badgeNumVal2');
      const firstInput1 = document.getElementById('badgeNumVal1');
      // eslint-disable-next-line func-names
      finalValue1.onkeyup = function() {
        // eslint-disable-next-line radix
        if (this.value.length === parseInt(this.attributes.maxlength.value)) {
          finalValue2.focus();
        }
      };

      finalValue2.onkeyup = function() {
        // eslint-disable-next-line radix
        if (this.value.length === 0) {
          finalValue1.focus();
        }
      };

      const { badge, badgedata } = this.state;
      const badgeLan1 = badge !== undefined ? badge : '';
      const badgeLan2 = badgedata !== undefined ? badgedata : '';

      const data = {
        badgeid: badge ? `BB${badgeLan1 + badgeLan2}` : '',
      };
      if (
        firstInput2.value === finalValue2.value &&
        firstInput1.value === finalValue1.value
      ) {
        this.props.requestVerifyBadge(data);
      }
    });
  };

  handleManageFirstBox = () => {
    const firstInput1 = document.getElementById('badgeNumVal1');
    const firstInput2 = document.getElementById('badgeNumVal2');
    firstInput1.onkeyup = function() {
      // eslint-disable-next-line radix
      if (this.value.length === parseInt(this.attributes.maxlength.value)) {
        firstInput2.focus();
      }
    };

    firstInput2.onkeyup = function() {
      // eslint-disable-next-line radix
      if (this.value.length === 0) {
        firstInput1.focus();
      }
    };
  };

  handleCloseBtn = () => {
    this.props.clearBoardData();
    this.handleCloseBadge();
    this.props.clearBadgeSuccess();
    this.props.clearData();
  };

  handleButtonData = (selectedDay, finalval) => {
    this.setState({ selectedDay });
    this.setState({ finalval });
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
              id: obj.locationCode,
            });
          }
        });
      });
    }
    return finalLocationDay;
  };

  handleSelectedNamesChange = name => {
    this.setState({ selectedNames: name });
  };

  handleSubmit = () => {
    const {
      selectedNames,
      selectedDay,
      checked,
      privateSpace,
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
      this.setState({
        finalLocationDay: dataValue,
        checked: false,
      });
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
      privateSpace,
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
    const { badgedata, badge } = this.state;
    const data = {
      badgeid: badge && badgedata ? `BB${badge.concat(badgedata)}` : '',
    };
    if (this.props.verifyBadgeSuccess) {
      this.props.requestBadgeData(data);
    }
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
  //     case 'Birmigham , BHM':
  //       color = 'border-top-green';
  //       break;
  //     case 'Bloomington , BLM':
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
      location,
      apiMessage,
      apiSuccess,
      locationSuccess,
      locationMessage,
      badgeUpdateData,
      verifyBadgeSuccess,
      verifyBadgeMsg,
      delegrateUsersList,
      delegateList,
      locationApiSuccess,
      locationApiMessage,
      history,
      badgeUpdateSuccess,
      verifyBadgeLoading,
      badgeUpdateLoading,
      verifyBadgeChk,
    } = this.props;
    const validateBadge =
      history &&
      history.location &&
      history.location.state &&
      history.location.state.badge;
    return (
      <>
        <div id="content-wrap">
          <Profile
            state={this.state}
            handleCheckbox={this.handleCheckbox}
            handleUserSelect={this.handleUserSelect}
            handleButtonData={this.handleButtonData}
            handleSubmit={this.handleSubmit}
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
            handleManageFirstBox={this.handleManageFirstBox}
            handleBadgeSubmit={this.handleBadgeSubmit}
            handleSelectedNamesChange={this.handleSelectedNamesChange}
            apiSuccess={apiSuccess}
            locationSuccess={locationSuccess}
            locationMessage={locationMessage}
            badgeUpdateData={badgeUpdateData}
            verifyBadgeSuccess={verifyBadgeSuccess}
            verifyBadgeMsg={verifyBadgeMsg}
            handleCloseBtn={this.handleCloseBtn}
            handlecloseDataIcon={this.handlecloseDataIcon}
            requestAddDelegateList={this.props.requestAddDelegateList}
            requestRemoveDelegateList={this.props.requestRemoveDelegateList}
            delegrateUsersList={delegrateUsersList}
            onScroll={this.handleScroll}
            locationApiMessage={locationApiMessage}
            locationApiSuccess={locationApiSuccess}
            validateBadge={validateBadge}
            verifyBadgeLoading={verifyBadgeLoading}
            badgeUpdateSuccess={badgeUpdateSuccess}
            badgeUpdateLoading={badgeUpdateLoading}
            verifyBadgeChk={verifyBadgeChk}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { profile, locationData } = state;
  return {
    getProfileLocation: profile && profile.getOffice,
    userData: profile && profile.userList && profile.userList.user,

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
    locationApiMessage: locationData && locationData.apiMessage,
    locationApiSuccess: locationData && locationData.apiSuccess,
    badgeUpdateData: profile && profile.badgeUpdate,
    badgeUpdateSuccess:
      profile && profile.badgeUpdate && profile.badgeUpdate.success,
    badgeUpdateLoading:
      profile && profile.badgeUpdate && profile.badgeUpdate.loading,
    delegrateUsersList:
      profile &&
      profile.getUpdatedelegateListData &&
      profile.getUpdatedelegateListData.delegateUpdate,

    verifyBadgeSuccess:
      locationData &&
      locationData.verifyBadge &&
      locationData.verifyBadge.success,
    verifyBadgeLoading:
      locationData &&
      locationData.verifyBadge &&
      locationData.verifyBadge.loading,
    verifyBadgeChk:
      locationData && locationData.verifyBadge && locationData.verifyBadge,
    verifyBadgeMsg:
      locationData &&
      locationData.verifyBadge &&
      locationData.verifyBadge.message,
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
    clearBadgeSuccess: () => dispatch(clearBadgeSuccess()),
    clearProfileBadgeSuccess: () => dispatch(clearProfileBadgeSuccess()),
    requestBadgeData: payload => dispatch(requestBadgeData(payload)),
    requestVerifyBadge: payload => dispatch(requestVerifyBadge(payload)),
    requestAddDelegateList: payload =>
      dispatch(requestAddDelegateList(payload)),
    requestRemoveDelegateList: payload =>
      dispatch(requestRemoveDelegateList(payload)),
    requestGetDelegateList: payload =>
      dispatch(requestGetDelegateList(payload)),
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
  requestVerifyBadge: PropTypes.object,
  verifyBadgeSuccess: PropTypes.bool,
  verifyBadgeMsg: PropTypes.string,
  requestAddDelegateList: PropTypes.func,
  requestRemoveDelegateList: PropTypes.func,
  requestGetDelegateList: PropTypes.func,
  delegrateUsersList: PropTypes.object,
  locationApiMessage: PropTypes.string,
  locationApiSuccess: PropTypes.bool,
  history: PropTypes.object,
  clearBadgeSuccess: PropTypes.func,
  verifyBadgeChk: PropTypes.string,
  verifyBadgeLoading: PropTypes.bool,
  badgeUpdateSuccess: PropTypes.bool,
  badgeUpdateLoading: PropTypes.bool,
  clearProfileBadgeSuccess: PropTypes.object,
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
