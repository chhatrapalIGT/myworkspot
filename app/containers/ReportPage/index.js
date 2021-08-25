/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import Report from '../../components/Report';

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = dates => {
    console.log(`handlesub`, dates);
  };

  render() {
    return <Report handleSubmit={this.handleSubmit} />;
  }
}

ReportPage.propTypes = {};

export default ReportPage;
