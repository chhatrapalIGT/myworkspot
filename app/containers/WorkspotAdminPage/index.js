/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import reducer from './reducer';
import WorkspotAdmin from '../../components/WorkspotAdmin';
import {
  requestLocationCapacity,
  resetWorkspotAdminMessage,
  requestCapacityWarning,
  requestExportLocationCapacity,
} from './actions';
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
    this.props.requestCapacityWarning();
  }

  handleClearCal = () => {
    this.props.resetWorkspotAdminMessage();
  };

  componentDidUpdate() {
    const { apiMessage } = this.props;
    if (apiMessage) {
      setTimeout(() => {
        this.props.resetWorkspotAdminMessage();
      }, 5000);
    }
  }

  render() {
    const {
      getCapacity,
      capacityLoading,
      apiMessage,
      apiSuccess,
      getWarningData,
      capacitySuccess,
      exportCapacitySuccess,
      getExportData,
      exportCapacityLoading,
    } = this.props;
    return (
      <WorkspotAdmin
        exportCapacityLoading={exportCapacityLoading}
        exportCapacitySuccess={exportCapacitySuccess}
        getExportData={getExportData}
        capacitySuccess={capacitySuccess}
        getCapacity={getCapacity}
        requestLocationCapacity={this.props.requestLocationCapacity}
        requestExportLocationCapacity={this.props.requestExportLocationCapacity}
        capacityLoading={capacityLoading}
        apiMessage={apiMessage}
        apiSuccess={apiSuccess}
        handleClearCal={this.handleClearCal}
        getWarningData={getWarningData}
      />
    );
  }
}

const mapStateToProps = state => {
  const { workspotAdmin } = state;
  return {
    getCapacity:
      workspotAdmin &&
      workspotAdmin.getLocationCapacity &&
      workspotAdmin.getLocationCapacity.capacity,
    getExportData:
      workspotAdmin &&
      workspotAdmin.getExportLocation &&
      workspotAdmin.getExportLocation.export,
    capacityLoading:
      workspotAdmin &&
      workspotAdmin.getLocationCapacity &&
      workspotAdmin.getLocationCapacity.loading,
    exportCapacityLoading:
      workspotAdmin &&
      workspotAdmin.getExportLocation &&
      workspotAdmin.getExportLocation.loading,
    exportCapacitySuccess:
      workspotAdmin &&
      workspotAdmin.getExportLocation &&
      workspotAdmin.getExportLocation.success,
    capacitySuccess:
      workspotAdmin &&
      workspotAdmin.getLocationCapacity &&
      workspotAdmin.getLocationCapacity.success,
    apiMessage: workspotAdmin && workspotAdmin.apiMessage,
    apiSuccess: workspotAdmin && workspotAdmin.apiSuccess,
    getWarningData:
      workspotAdmin &&
      workspotAdmin.getCapacityWarning &&
      workspotAdmin.getCapacityWarning.getWarning,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestLocationCapacity: payload =>
      dispatch(requestLocationCapacity(payload)),
    requestExportLocationCapacity: payload =>
      dispatch(requestExportLocationCapacity(payload)),
    resetWorkspotAdminMessage: () => dispatch(resetWorkspotAdminMessage()),
    requestCapacityWarning: payload =>
      dispatch(requestCapacityWarning(payload)),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'workspotAdmin', reducer });

WorkspotAdminPage.propTypes = {
  requestLocationCapacity: PropTypes.func,
  resetWorkspotAdminMessage: PropTypes.func,
  requestExportLocationCapacity: PropTypes.func,
  requestCapacityWarning: PropTypes.func,
  getCapacity: PropTypes.object,
  getExportData: PropTypes.object,
  capacityLoading: PropTypes.bool,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.bool,
  capacitySuccess: PropTypes.bool,
  exportCapacitySuccess: PropTypes.bool,
  exportCapacityLoading: PropTypes.bool,
  getWarningData: PropTypes.object,
};

export default compose(
  withReducer,
  //   withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WorkspotAdminPage);
