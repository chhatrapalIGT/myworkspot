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
import {
  requestGetOfficeUpdateData,
  requestFileUpload,
  clearOfficeData,
  clearUploadSuccess,
  requestAddUpdateResource,
} from './actions';
import Office from '../../components/Office';

const zoomStep = 1;
const maxScale = 5;
const minScale = 1;
const defaultScale = minScale;
const defaultRotate = 0;

class UploadMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: defaultScale,
      rotate: defaultRotate,
      version: 0,
      selectedNames: 'DC',
      file: [],
    };
  }

  handleZoomIn = () => {
    this.setState(state => {
      const newScale = state.scale + zoomStep;
      return {
        scale: newScale <= maxScale ? newScale : maxScale,
      };
    });
  };

  handleZoomOut = () => {
    this.setState(state => {
      const newScale = state.scale - zoomStep;
      return {
        scale: newScale >= minScale ? newScale : minScale,
      };
    });
  };

  handleDefault = () => {
    this.setState(state => ({
      scale: defaultScale,
      rotate: 0,
      version: state.version + 1,
    }));
  };

  componentDidMount() {
    this.props.requestGetOfficeUpdateData({});
  }

  componentDidUpdate() {
    const { officeUpdateMessage, uploadCsv } = this.props;
    if (uploadCsv && uploadCsv.success) {
      this.props.requestGetOfficeUpdateData({});
      this.props.clearUploadSuccess();
    }
    if (officeUpdateMessage) {
      setTimeout(() => {
        this.props.clearOfficeData();
      }, 5000);
    }
  }

  handleCloseIcon = () => {
    this.props.clearOfficeData();
  };

  handleUserSelect = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleAddResource = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addfileResource = event => {
    const name = event.target.files[0];
    this.setState({ file: name });
  };

  render() {
    const imgStyle = {
      transform: `scale(${this.state.scale}) rotate(${this.state.rotate}deg)`,
    };
    const {
      officeLocation,
      officeUpdateMessage,
      officeUpdateSuccess,
    } = this.props;

    return (
      <>
        <div id="content-wrap">
          <Office
            imgStyle={imgStyle}
            state={this.state}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
            requestFileUpload={this.props.requestFileUpload}
            requestAddUpdateResource={this.props.requestAddUpdateResource}
            officeLocation={officeLocation}
            handleUserSelect={this.handleUserSelect}
            handleCloseIcon={this.handleCloseIcon}
            handleAddResource={this.handleAddResource}
            addfileResource={this.addfileResource}
            officeUpdateMessage={officeUpdateMessage}
            officeUpdateSuccess={officeUpdateSuccess}
          />{' '}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { uploadOffice } = state;
  return {
    officeLocation:
      uploadOffice &&
      uploadOffice.getOfficeData &&
      uploadOffice.getOfficeData.masterData,
    officeUpdateMessage: uploadOffice && uploadOffice.officeUpdateMessage,
    officeUpdateSuccess: uploadOffice && uploadOffice.officeUpdateSuccess,
    uploadCsv: uploadOffice && uploadOffice.uploadCsv,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeUpdateData: payload =>
      dispatch(requestGetOfficeUpdateData(payload)),
    requestFileUpload: payload => dispatch(requestFileUpload(payload)),
    requestAddUpdateResource: payload =>
      dispatch(requestAddUpdateResource(payload)),
    clearOfficeData: () => dispatch(clearOfficeData()),
    clearUploadSuccess: () => dispatch(clearUploadSuccess()),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'uploadOffice', reducer });
const withSaga = injectSaga({ key: 'uploadOffice', saga });

UploadMap.propTypes = {
  requestGetOfficeUpdateData: PropTypes.func,
  requestFileUpload: PropTypes.func,
  requestAddUpdateResource: PropTypes.func,
  clearOfficeData: PropTypes.func,
  clearUploadSuccess: PropTypes.func,
  officeLocation: PropTypes.object,
  officeUpdateMessage: PropTypes.string,
  officeUpdateSuccess: PropTypes.bool,
  uploadCsv: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(UploadMap);
