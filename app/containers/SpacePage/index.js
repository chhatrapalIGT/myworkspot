/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import saga from './saga';
import reducer from './reducer';
import { requestGetOfficeUpdateData } from '../UploadMapPage/actions';
import { requestUpdateActiveStatus, clearUpdateStatus } from './actions';
import Spaces from '../../components/Spaces';

class OfficeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNames: 'DC',
    };
  }

  componentDidMount() {
    this.props.requestGetOfficeUpdateData({});
  }

  handleUserSelect = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleCloseUpdate = () => {
    this.props.clearUpdateStatus();
  };

  componentDidUpdate() {
    const { spaceUpdate } = this.props;
    if (spaceUpdate && spaceUpdate.message) {
      setTimeout(() => {
        this.props.clearUpdateStatus();
      }, 5000);
    }
  }

  render() {
    const { officeLocation, spaceUpdate, officeSuccess } = this.props;

    return (
      <>
        <div id="content-wrap">
          <Spaces
            state={this.state}
            officeLocation={officeLocation}
            handleUserSelect={this.handleUserSelect}
            handleCloseUpdate={this.handleCloseUpdate}
            requestUpdateActiveStatus={this.props.requestUpdateActiveStatus}
            spaceUpdate={spaceUpdate}
            officeSuccess={officeSuccess}
          />{' '}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { uploadOffice, space } = state;
  return {
    officeLocation:
      uploadOffice &&
      uploadOffice.getOfficeData &&
      uploadOffice.getOfficeData.masterData,
    officeSuccess:
      uploadOffice && uploadOffice.getOfficeData && uploadOffice.getOfficeData,
    spaceUpdate: space && space.updateStatus,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeUpdateData: payload =>
      dispatch(requestGetOfficeUpdateData(payload)),
    requestUpdateActiveStatus: payload =>
      dispatch(requestUpdateActiveStatus(payload)),
    clearUpdateStatus: () => dispatch(clearUpdateStatus()),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'space', reducer });
const withSaga = injectSaga({ key: 'space', saga });

OfficeMap.propTypes = {
  requestGetOfficeUpdateData: PropTypes.func,
  officeLocation: PropTypes.object,
  requestUpdateActiveStatus: PropTypes.func,
  clearUpdateStatus: PropTypes.func,
  spaceUpdate: PropTypes.object,
  officeSuccess: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OfficeMap);
