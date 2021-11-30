/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import reducer from './reducer';
import WorkspotAdmin from '../../components/WorkspotAdmin';
import { requestLocationCapacity } from './actions';
import {
  getStartEndDate,
  getWeekStartEndDate,
} from '../../components/Cal/helpers';

class WorkspotAdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDefault: 'week',
    };
  }

  componentDidMount() {
    const { dateToDisplay } = getWeekStartEndDate(new Date());

    const { startDispDate, endDispDate } = getStartEndDate(
      dateToDisplay,
      'week',
    );
    const startdate = moment(startDispDate).format('YYYY-MM-DD');
    const enddate = moment(endDispDate).format('YYYY-MM-DD');

    this.props.requestLocationCapacity({ startdate, enddate });
  }

  render() {
    const { getCapacity, capacityLoading } = this.props;
    return (
      <>
        <WorkspotAdmin
          getCapacity={getCapacity}
          requestLocationCapacity={this.props.requestLocationCapacity}
          capacityLoading={capacityLoading}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { workspotAdmin } = state;
  console.log(`state`, state);
  return {
    getCapacity:
      workspotAdmin &&
      workspotAdmin.getLocationCapacity &&
      workspotAdmin.getLocationCapacity.capacity,
    capacityLoading:
      workspotAdmin &&
      workspotAdmin.getLocationCapacity &&
      workspotAdmin.getLocationCapacity.loading,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestLocationCapacity: payload =>
      dispatch(requestLocationCapacity(payload)),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'workspotAdmin', reducer });

WorkspotAdminPage.propTypes = {
  requestLocationCapacity: PropTypes.func,
  getCapacity: PropTypes.object,
  capacityLoading: PropTypes.bool,
};

export default compose(
  withReducer,
  //   withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WorkspotAdminPage);
