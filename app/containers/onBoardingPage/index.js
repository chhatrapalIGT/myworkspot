/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import Boarding from '../../components/Boarding';

class BorardingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: '',
      selectedNames: '',
      checked: false,
      timings: [
        {
          day: 'Monday',
          active: false,
          name: '',
        },
        {
          day: 'Tuesday',
          active: false,
          name: '',
        },
        {
          day: 'Wednesday',
          active: false,
          name: '',
        },
        {
          day: 'Thursday',
          active: false,
          name: '',
        },
        {
          day: 'Friday',
          active: false,
          name: '',
        },
      ],
    };
  }

  handleButtonData = selectedDay => {
    this.setState({ selectedDay });
  };

  handleSubmit = () => {
    const { timings, selectedNames, selectedDay, checked } = this.state;

    if (!checked) {
      const data = timings.map(obj => {
        if (obj.day === selectedDay) {
          // eslint-disable-next-line no-param-reassign
          obj.name = selectedNames;
          return obj;
        }
        return obj;
      });

      this.setState({ timings: data });
    } else {
      const data = timings.map(obj => {
        // eslint-disable-next-line no-param-reassign
        obj.name = selectedNames;
        return obj;
      });

      this.setState({ timings: data, checked: false });
    }
  };

  handleUserSelect = name => {
    this.setState({ selectedNames: name });
  };

  handleCheckbox = () => {
    this.setState({ checked: true });
  };

  render() {
    return (
      <Boarding
        handleCheckbox={this.handleCheckbox}
        handleUserSelect={this.handleUserSelect}
        handleButtonData={this.handleButtonData}
        handleSubmit={this.handleSubmit}
        state={this.state}
      />
    );
  }
}

BorardingPage.propTypes = {};

export default BorardingPage;
