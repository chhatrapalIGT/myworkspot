/* eslint-disable func-names */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
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
  requestVerifyBadge,
} from './actions';
import { requestUserlistData } from '../ProfilePage/actions';
import Demo from '../../components/Header';
import Boarding from '../../components/Boarding';
import Footer from '../../components/Footer';

class BorardingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: '',
      selectedNames: this.props.location.length
        ? this.props.location &&
          this.props.location[0] &&
          this.props.location[0].locationname
        : 'Washington, DC',
      checked: false,
      timings: [
        {
          day: 'Monday',
          name: '',
        },
        {
          day: 'Tuesday',
          name: '',
        },
        {
          day: 'Wednesday',
          name: '',
        },
        {
          day: 'Thursday',
          name: '',
        },
        {
          day: 'Friday',
          name: '',
        },
      ],
      add: true,
    };
  }

  handleButtonData = selectedDay => {
    this.setState({ selectedDay });
  };

  handleUserSelect = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleSubmit = () => {
    const { timings, selectedNames, selectedDay, checked } = this.state;
    const { location } = this.props;
    if (!checked) {
      const data = timings.map(obj => {
        if (obj.day === selectedDay) {
          // eslint-disable-next-line no-param-reassign
          obj.name = selectedNames;
          return obj;
        }
        return obj;
      });
      this.setState({
        selectedNames: location && location[0] && location[0].locationname,
      });

      this.setState({ timings: data });
    } else {
      const data = timings.map(obj => {
        // eslint-disable-next-line no-param-reassign
        obj.name = selectedNames;
        return obj;
      });
      this.setState({
        selectedNames: location && location[0] && location[0].locationname,
      });

      this.setState({ timings: data, checked: false });
    }
  };

  // eslint-disable-next-line consistent-return
  handleSubmitData = () => {
    const { timings, badge, badgedata, privateSpace } = this.state;
    const { location, verifyBadgeSuccess } = this.props;
    const final = timings.filter(data => data.name !== '');

    const finalLocationDay = [];
    final.forEach(data => {
      // eslint-disable-next-line array-callback-return
      location.map(e => {
        if (e.locationname === data.name) {
          finalLocationDay.push({
            defaultlocation: e.id,
            dayofweek: data.day,
          });
        }
      });
    });

    const data = {
      data: finalLocationDay,
      badgenumber: badge && badgedata ? `BB${badge.concat(badgedata)}` : '',
      privateSpace,
    };
    const firstInput1 = document.getElementById('badgeNumVal2');
    if (
      firstInput1 &&
      firstInput1.value.length &&
      badgedata &&
      final.length >= 5 &&
      verifyBadgeSuccess
    ) {
      this.props.requestAddOfficeLocation(data);
    } else if (final.length >= 5 && !firstInput1.value.length && !badgedata) {
      this.props.requestAddOfficeLocation(data);
    }
  };

  componentDidUpdate() {
    const { addErrorLocation, history, addErrorLocationMsg } = this.props;
    const { timings, add } = this.state;
    if (addErrorLocation && add) {
      this.handleStateData();
      this.props.requestUserlistData({});
    }
    if (addErrorLocationMsg || !addErrorLocation) {
      setTimeout(() => {
        this.props.clearBoardData();
      }, 5000);
    }
    const final = timings.filter(data => data.name !== '');

    if (addErrorLocation && addErrorLocationMsg) {
      // eslint-disable-next-line no-unused-vars
      const value = final.length >= 5 ? history.push('/workspot') : '';
    }
  }

  handleStateData = () => {
    this.setState({ add: false });
  };

  handleData = () => {
    this.props.clearBoardData();
  };

  componentWillUnmount() {
    this.props.clearBoardData();
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckbox = () => {
    this.setState({ checked: true });
  };

  handleBadgeData = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const finalValue1 = document.getElementById('badgeNumber');
      const finalValue2 = document.getElementById('badgeValue');
      const firstInput2 = document.getElementById('badgeNumVal2');
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
      if (firstInput2.value === finalValue2.value) {
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

  componentDidMount() {
    this.props.requestGetOfficeLocation({});
  }

  render() {
    const {
      location,
      locationErrorHandle,
      addErrorLocation,
      addErrorLocationMsg,
      locationErrorHandleMsg,
      isLoading,
      badgeUpdateData,
      badgeUpdateSuccess,
      badgeUpdateMsg,
      verifyBadgeSuccess,
      verifyBadgeMsg,
      userName,
      badgeData,
      profileUserLoading,
    } = this.props;
    return (
      <>
        <div id="content-wrap">
          <Demo />
          <Boarding
            handleCheckbox={this.handleCheckbox}
            handleUserSelect={this.handleUserSelect}
            handleButtonData={this.handleButtonData}
            handleSubmit={this.handleSubmit}
            handleSubmitData={this.handleSubmitData}
            handleBadgeData={this.handleBadgeData}
            handleData={this.handleData}
            handleManageFirstBox={this.handleManageFirstBox}
            state={this.state}
            location={location}
            addErrorLocation={addErrorLocation}
            locationErrorHandle={locationErrorHandle}
            addErrorLocationMsg={addErrorLocationMsg}
            locationErrorHandleMsg={locationErrorHandleMsg}
            isLoading={isLoading}
            badgeUpdateData={badgeUpdateData}
            badgeUpdateSuccess={badgeUpdateSuccess}
            badgeUpdateMsg={badgeUpdateMsg}
            verifyBadgeSuccess={verifyBadgeSuccess}
            verifyBadgeMsg={verifyBadgeMsg}
            userName={userName}
            profileUserLoading={profileUserLoading}
            badgeData={badgeData}
          />
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { locationData, profile } = state;
  return {
    badgeData: profile && profile.userList && profile.userList.user,

    location:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.location,
    locationErrorHandle:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.success,
    locationErrorHandleMsg:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.message,
    addErrorLocation:
      locationData &&
      locationData.addOfficeLocation &&
      locationData.addOfficeLocation.success,
    addErrorLocationMsg:
      locationData &&
      locationData.addOfficeLocation &&
      locationData.addOfficeLocation.message,
    isLoading:
      locationData &&
      locationData.addOfficeLocation &&
      locationData.addOfficeLocation.loading,
    verifyBadgeSuccess:
      locationData &&
      locationData.verifyBadge &&
      locationData.verifyBadge.success,
    verifyBadgeMsg:
      locationData &&
      locationData.verifyBadge &&
      locationData.verifyBadge.message,
    userName:
      profile &&
      profile.userList &&
      profile.userList.user &&
      profile.userList.user.firstname,
    profileUserLoading: profile && profile.userList && profile.userList.loading,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeLocation: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    requestAddOfficeLocation: payload =>
      dispatch(requestAddOfficeLocation(payload)),
    clearBoardData: () => dispatch(clearBoardData()),
    // requestBadgeData: payload => dispatch(requestBadgeData(payload)),
    requestVerifyBadge: payload => dispatch(requestVerifyBadge(payload)),
    requestUserlistData: payload => dispatch(requestUserlistData(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'locationData', reducer });
const withSaga = injectSaga({ key: 'locationData', saga });

BorardingPage.propTypes = {
  requestGetOfficeLocation: PropTypes.func,
  requestAddOfficeLocation: PropTypes.func,
  clearBoardData: PropTypes.func,
  history: PropTypes.object,
  locationErrorHandle: PropTypes.object,
  location: PropTypes.array,
  addErrorLocation: PropTypes.bool,
  addErrorLocationMsg: PropTypes.string,
  locationErrorHandleMsg: PropTypes.string,
  isLoading: PropTypes.bool,
  badgeUpdateData: PropTypes.object,
  badgeUpdateSuccess: PropTypes.bool,
  badgeUpdateMsg: PropTypes.string,
  requestVerifyBadge: PropTypes.object,
  verifyBadgeSuccess: PropTypes.bool,
  verifyBadgeMsg: PropTypes.string,
  userName: PropTypes.string,
  profileUserLoading: PropTypes.bool,
  requestUserlistData: PropTypes.func,
  badgeData: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(BorardingPage);
