/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
    return (
      <>
        <div id="content-wrap">
          <Header />
          <Report handleSubmit={this.handleSubmit} />{' '}
        </div>
        <Footer />
      </>
    );
  }
}

ReportPage.propTypes = {};

export default ReportPage;
