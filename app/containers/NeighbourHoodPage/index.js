/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
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
    this.props.requestGetOfficeAssignments({
      locationId: this.props.match.params.locationId,
      floor: this.props.match.params.floor,
      neighborhoodName: this.props.match.params.neighborhoodName,
      todayDate: this.state.date,
    });
  }

  render() {
    const { requestGetOfficeAssignments, location, neighbourHood } = this.props;
    return (
      <div>
        <BlueNeighbourHood
          neighbourHood={neighbourHood}
          location={location}
          requestGetOfficeAssignments={requestGetOfficeAssignments}
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
    requestGetOfficeAssignments: payload =>
      dispatch(requestGetOfficeAssignments(payload)),
    getOfficeLocationRequest: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'neighbourHood', reducer });
const withSaga = injectSaga({ key: 'neighbourHood', saga });

NeighBourHoodPage.propTypes = {
  requestGetOfficeAssignments: PropTypes.func,
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
