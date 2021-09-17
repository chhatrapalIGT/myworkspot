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
import { requestGetOfficeData } from './actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Office from '../../components/OfficeWDC ';

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

  componentDidMount() {
    this.props.requestGetOfficeData({});
  }

  render() {
    const imgStyle = {
      transform: `scale(${this.state.scale}) rotate(${this.state.rotate}deg)`,
    };

    return (
      <>
        <div id="content-wrap">
          <Header />
          <Office
            imgStyle={imgStyle}
            state={this.state}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
            handleMouseOut={this.handleMouseOut}
            handleMouseMove={this.handleMouseMove}
          />{' '}
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const {} = state;
  return {};
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeData: payload => dispatch(requestGetOfficeData(payload)),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'officeData', reducer });
const withSaga = injectSaga({ key: 'officeData', saga });

OfficeMap.propTypes = {
  requestGetOfficeData: PropTypes.func,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OfficeMap);
