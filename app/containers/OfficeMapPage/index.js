/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
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

  render() {
    const imgStyle = {
      transform: `scale(${this.state.scale}) rotate(${this.state.rotate}deg)`,
    };

    return (
      <Office
        imgStyle={imgStyle}
        state={this.state}
        handleZoomIn={this.handleZoomIn}
        handleZoomOut={this.handleZoomOut}
        handleDefault={this.handleDefault}
        handleMouseOut={this.handleMouseOut}
        handleMouseMove={this.handleMouseMove}
      />
    );
  }
}

OfficeMap.propTypes = {};

export default OfficeMap;
