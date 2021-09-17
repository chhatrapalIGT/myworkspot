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

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: [],
    };
  }

  handleChange = option => {
    this.setState(() => ({
      selectedOption: option,
    }));
  };

  handleSubmit = dates => {
    console.log(`handlesub`, dates);
  };

  componentDidMount() {
    this.props.requestGetLocation();
  }

  render() {
    return (
      <>
        <div id="content-wrap">
          <Header />
          <Report
            handleSubmit={this.handleSubmit}
            state={this.state}
            handleChange={this.handleChange}
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
