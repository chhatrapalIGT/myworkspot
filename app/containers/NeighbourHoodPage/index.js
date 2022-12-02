/* eslint-disable object-shorthand */
/* eslint-disable prefer-template */
/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable vars-on-top */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import history from '../../utils/history';
import saga from './saga';
import reducer from './reducer';
import { requestGetOfficeAssignments } from './action';
import { requestGetOfficeLocation } from '../onBoardingPage/actions';
import BlueNeighbourHood from '../../components/Neighborhood/blueNeighbourHood';
class NeighBourHoodPage extends Component {
  constructor(props) {
    super(props);
    var today = new Date(),
      date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();
    this.state = {
      date: moment(date).format('YYYY-MM-DD'),
    };
  }

  componentDidMount() {
    const pathdata = history && history.location && history.location.pathname;
    if (pathdata === '/locationId=DC&floor=2&neighborhoodName=Blue') {
      this.props.getOfficeAssignmentsRequest({
        locationId: 'DC',
        floor: 2,
        neighborhoodName: 'Blue' || '',
        todayDate: this.state.date,
      });
    }
    if (pathdata === '/locationId=DC&floor=3&neighborhoodName=Blue') {
      this.props.getOfficeAssignmentsRequest({
        locationId: 'DC',
        floor: 3,
        neighborhoodName: 'Blue' || '',
        todayDate: this.state.date,
      });
    }
    if (pathdata === '/locationId=DC&floor=4&neighborhoodName=Blue') {
      this.props.getOfficeAssignmentsRequest({
        locationId: 'DC',
        floor: 4,
        neighborhoodName: 'Blue' || '',
        todayDate: this.state.date,
      });
    }
    if (pathdata === '/locationId=DC&floor=8&neighborhoodName=Blue') {
      this.props.getOfficeAssignmentsRequest({
        locationId: 'DC',
        floor: 8,
        neighborhoodName: 'Blue' || '',
        todayDate: this.state.date,
      });
    }
    if (
      pathdata === '/locationId=BLM&floor=Building_1&neighborhoodName=Yellow'
    ) {
      this.props.getOfficeAssignmentsRequest({
        locationId: 'BLM',
        floor: 'Building-1',
        neighborhoodName: 'Yellow' || '',
        todayDate: this.state.date,
      });
    }
    if (pathdata === '/locationId=RIC&floor=Floor_2&neighborhoodName=Green') {
      this.props.getOfficeAssignmentsRequest({
        locationId: 'RIC',
        floor: 'Floor-2',
        neighborhoodName: 'Green' || '',
        todayDate: this.state.date,
      });
    }
    this.props.getOfficeLocationRequest({});
  }

  render() {
    const { getOfficeAssignmentsRequest, location, neighbourHood } = this.props;
    return (
      <div>
        <BlueNeighbourHood
          neighbourHood={neighbourHood}
          location={location}
          requestGetOfficeAssignments={getOfficeAssignmentsRequest}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { neighbourHood, locationData } = state;
  return {
    neighbourHood: neighbourHood && neighbourHood.getOfficeLocation,
    location:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.location,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    getOfficeAssignmentsRequest: payload =>
      dispatch(requestGetOfficeAssignments(payload)),
    getOfficeLocationRequest: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'neighbourHood', reducer });
const withSaga = injectSaga({ key: 'neighbourHood', saga });

NeighBourHoodPage.propTypes = {
  getOfficeAssignmentsRequest: PropTypes.object,
  getOfficeLocationRequest: PropTypes.object,
  location: PropTypes.object,
  neighbourHood: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(NeighBourHoodPage);
