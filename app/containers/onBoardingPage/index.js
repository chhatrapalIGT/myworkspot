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
} from './actions';

import Demo from '../../components/Header';
import Boarding from '../../components/Boarding';
import Footer from '../../components/Footer';

class BorardingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: '',
      selectedNames: 'Washington, DC',
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
    if (!checked) {
      const data = timings.map(obj => {
        if (obj.day === selectedDay) {
          // eslint-disable-next-line no-param-reassign
          obj.name = selectedNames;
          return obj;
        }
        return obj;
      });

      this.setState({ timings: data });
    } else {
      const data = timings.map(obj => {
        // eslint-disable-next-line no-param-reassign
        obj.name = selectedNames;
        return obj;
      });

      this.setState({ timings: data, checked: false });
    }
  };

  // eslint-disable-next-line consistent-return
  handleSubmitData = () => {
    const { timings, badge, badgedata } = this.state;
    const { location } = this.props;
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
      employeeid: '239323',
      badgenumber: badge && badgedata ? badge.concat(badgedata) : '',
    };

    this.props.requestAddOfficeLocation(data);
  };

  componentDidUpdate() {
    const { addErrorLocation, history } = this.props;
    const { timings } = this.state;
    if (
      (addErrorLocation && addErrorLocation.message) ||
      !addErrorLocation.success
    ) {
      setTimeout(() => {
        this.props.clearBoardData();
      }, 5000);
    }
    const final = timings.filter(data => data.name !== '');

    if (addErrorLocation) {
      // eslint-disable-next-line no-unused-vars
      const value = final.length >= 5 ? history.push('/') : '';
    }
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
    this.setState({ [name]: value });
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
            state={this.state}
            location={location}
            addErrorLocation={addErrorLocation}
            locationErrorHandle={locationErrorHandle}
            addErrorLocationMsg={addErrorLocationMsg}
            locationErrorHandleMsg={locationErrorHandleMsg}
          />
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { locationData } = state;
  return {
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
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeLocation: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    requestAddOfficeLocation: payload =>
      dispatch(requestAddOfficeLocation(payload)),
    clearBoardData: () => dispatch(clearBoardData()),

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
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(BorardingPage);
