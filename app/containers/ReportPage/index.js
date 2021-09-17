/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Report from '../../components/Report';
import reducer from './reducer';
import { requestGetLocation } from './actions';

const zoomStep = 1;
const maxScale = 5;
const minScale = 1;
const defaultScale = minScale;
const defaultRotate = 0;
class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: [],
      scale: defaultScale,
      rotate: defaultRotate,
      version: 0,
      selectedNames: '',
      date: [],
    };
  }

  handleChange = option => {
    this.setState(() => ({
      selectedOption: option,
    }));
  };

  handleUserSelect = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleZoomIn = () => {
    this.setState(state => {
      const newScale = state.scale + zoomStep;
      return {
        scale: newScale <= maxScale ? newScale : maxScale,
      };
    });
  };

  onDateChange = event => {
    this.setState({ date: event.valueText });
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
    this.props.requestGetLocation();
  }

  render() {
    const imgStyle = {
      transform: `scale(${this.state.scale}) rotate(${this.state.rotate}deg)`,
    };
    return (
      <>
        <div id="content-wrap">
          <Header />
          <Report
            state={this.state}
            handleChange={this.handleChange}
            imgStyle={imgStyle}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
            handleUserSelect={this.handleUserSelect}
            onDateChange={this.onDateChange}
          />{' '}
        </div>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  const { workspot } = state;
  return {
    locationData:
      workspot &&
      workspot.getLocationData &&
      workspot.getLocationData.locationList,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetLocation: payload => dispatch(requestGetLocation(payload)),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'myTeam', reducer });

ReportPage.propTypes = {
  requestGetLocation: PropTypes.func,
};

// export default WorkSpotPage;
export default compose(
  withReducer,
  //   withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ReportPage);
