/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component, createRef } from 'react';
// import PropTypes from 'prop-types';
import Office from '../../components/OfficeWDC ';

class OfficeMap extends Component {
  constructor(props) {
    super(props);
    this.imgRef = createRef();
    this.state = {
      height: null,
      width: null,
    };
  }

  handleZoomIn = () => {
    const height = this.imgRef.current.clientHeight;
    const width = this.imgRef.current.clientWidth;
    this.setState({
      height: height + 30,
      width: width + 30,
    });
  };

  handleZoomOut = () => {
    const height = this.imgRef.current.clientHeight;
    const width = this.imgRef.current.clientWidth;
    this.setState({
      height: height - 20,
      width: width - 20,
    });
  };

  handleDefault = () => {
    this.setState({
      height: this.initialHeight,
      width: this.initialWidth,
    });
  };

  render() {
    const imgStyle = { height: this.state.height, width: this.state.width };
    return (
      <Office
        imgStyle={imgStyle}
        state={this.state}
        imgRefData={this.imgRef}
        handleZoomIn={this.handleZoomIn}
        handleZoomOut={this.handleZoomOut}
        handleDefault={this.handleDefault}
      />
    );
  }
}

OfficeMap.propTypes = {};

export default OfficeMap;
