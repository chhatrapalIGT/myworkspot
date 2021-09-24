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
  // requestAddOfficeLocation,
} from '../onBoardingPage/actions';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Profile from '../../components/Profile';
import {
  requestUserlistData,
  requestDelegateData,
  requestGetProfileOfficeData,
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
      selectedNames: '',
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
    this.props.requestGetProfileOfficeData();
    this.props.requestDelegateData();
    this.props.requestUserlistData();
    this.props.requestGetProfileOfficeData({});
    this.props.requestGetOfficeLocation({});
  }

  componentDidUpdate() {
    const { getProfileLocationSuccess, getProfileLocation } = this.props;
    if (
      getProfileLocation &&
      !getProfileLocation.loading &&
      getProfileLocationSuccess &&
      this.state.data
    )
      this.handleData();
  }

  handleClose = () => {
    const { finalData } = this.state;
    this.setState({ userListData: finalData, show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleButtonData = selectedDay => {
    console.log(`selectedDay`, selectedDay);
    this.setState({ selectedDay });
  };

  handleData = () => {
    this.setState({ data: false });
    const { timings, finalLocationDay } = this.state;
    const { getProfileLocation } = this.props;
    const data = getProfileLocation && getProfileLocation.weeklyLocation;

    data.forEach(obj => {
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

    // const data = {
    //   data: finalLocatiopnUpdate,
    //   employeeid: '239322',
    // };
    // this.props.requestAddOfficeLocation(data);
  };

  handleUserSelectData = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleCheckbox = () => {
    this.setState({ checked: true });
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
    const { getProfileLocation, userData, delegateList, location } = this.props;
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
            location={location}
          />
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { profile, locationData } = state;
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
    // requestAddOfficeLocation: payload =>
    //   dispatch(requestAddOfficeLocation(payload)),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

ProfilePage.propTypes = {
  requestGetProfileOfficeData: PropTypes.func,
  requestGetOfficeLocation: PropTypes.func,
  // requestAddOfficeLocation: PropTypes.func,
  location: PropTypes.array,
  getProfileLocation: PropTypes.object,
  requestUserlistData: PropTypes.func,
  userData: PropTypes.object,
  requestDelegateData: PropTypes.object,
  delegateList: PropTypes.object,
  getProfileLocationSuccess: PropTypes.bool,
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
