/* eslint-disable react/no-unused-state */
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
import {
  requestUpdateActiveStatus,
  clearUpdateStatus,
  clearMessage,
} from './actions';
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
    this.props.clearMessage();
  };

  componentDidUpdate() {
    const { spaceUpdate, setSpaceUpdate } = this.props;
    if (spaceUpdate && spaceUpdate.success && spaceUpdate.message) {
      this.props.requestGetOfficeUpdateData({});
      this.props.clearUpdateStatus();
    }
    if (setSpaceUpdate && setSpaceUpdate.showUpdateStatusMessage) {
      setTimeout(() => {
        this.props.clearMessage();
      }, 5000);
    }
  }

  render() {
    const {
      officeLocation,
      spaceUpdate,
      officeSuccess,
      setSpaceUpdate,
    } = this.props;

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
            setSpaceUpdate={setSpaceUpdate}
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
    setSpaceUpdate: space && space,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeUpdateData: payload =>
      dispatch(requestGetOfficeUpdateData(payload)),
    requestUpdateActiveStatus: payload =>
      dispatch(requestUpdateActiveStatus(payload)),
    clearUpdateStatus: () => dispatch(clearUpdateStatus()),
    clearMessage: () => dispatch(clearMessage()),
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
  clearMessage: PropTypes.func,
  spaceUpdate: PropTypes.object,
  officeSuccess: PropTypes.object,
  setSpaceUpdate: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OfficeMap);
