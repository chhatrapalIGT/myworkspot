/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import { requestGetOfficeData, clearOffice } from './actions';

import Office from '../../components/OfficeWDC';

const zoomStep = 1;
const maxScale = 5;
const minScale = 1;
const defaultScale = minScale;
const defaultRotate = 0;

class OfficeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: defaultScale,
      rotate: defaultRotate,
      version: 0,
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

  componentDidUpdate() {
    const { officeLocationErrorHandle } = this.props;
    if (
      officeLocationErrorHandle &&
      !officeLocationErrorHandle.success &&
      officeLocationErrorHandle.error
    ) {
      setTimeout(() => {
        this.props.clearOffice();
      }, 5000);
    }
  }

  handleClearOffice = () => {
    this.props.clearOffice();
  };

  componentDidMount() {
    this.props.requestGetOfficeData({});
  }

  render() {
    const imgStyle = {
      transform: `scale(${this.state.scale}) rotate(${this.state.rotate}deg)`,
    };
    const dataStyle = {
      display: 'inline-block',
      transform: 'translate(16.5151px, 8.15472px) scale(0.940591)',
      transformOrigin: ' -50px 362px',
      height: ' 40vh',
      cursor: 'pointer',
    };

    const { officeLocation, officeLocationErrorHandle, badgeData } = this.props;

    return (
      <>
        <div id="content-wrap">
          <Office
            imgStyle={imgStyle}
            dataStyle={dataStyle}
            state={this.state}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
            handleClearOffice={this.handleClearOffice}
            handleMouseOut={this.handleMouseOut}
            handleMouseMove={this.handleMouseMove}
            officeLocation={officeLocation}
            officeLocationErrorHandle={officeLocationErrorHandle}
            badgeData={badgeData}
          />{' '}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { officeData, profile } = state;
  return {
    badgeData: profile && profile.userList,
    officeLocation:
      officeData &&
      officeData.getOfficeData &&
      officeData.getOfficeData.masterData &&
      officeData.getOfficeData.masterData.data,

    officeLocationErrorHandle:
      officeData && officeData.getOfficeData && officeData.getOfficeData,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeData: payload => dispatch(requestGetOfficeData(payload)),
    clearOffice: payload => dispatch(clearOffice(payload)),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'officeData', reducer });
const withSaga = injectSaga({ key: 'officeData', saga });

OfficeMap.propTypes = {
  requestGetOfficeData: PropTypes.func,
  officeLocation: PropTypes.object,
  officeLocationErrorHandle: PropTypes.string,
  clearOffice: PropTypes.func,
  badgeData: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OfficeMap);
