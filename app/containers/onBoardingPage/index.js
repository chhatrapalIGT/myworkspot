/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import Demo from '../../components/Header';
import Boarding from '../../components/Boarding';
import Footer from '../../components/Footer';

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

  handleSubmitData = () => {
    const { timings, badge, badgedata } = this.state;
    const { history } = this.props;
    const final = timings.filter(data => data.name !== '');
    const value =
      final.length >= 5 && badge && badgedata ? history.push('/workspot') : '';
    return value;
  };

  handleUserSelect = name => {
    this.setState({ selectedNames: name });
  };

  handleCheckbox = () => {
    this.setState({ checked: true });
  };

  handleBadgeData = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <div id="content-wrap">
          <Demo />
          <Boarding
            handleCheckbox={this.handleCheckbox}
            handleUserSelect={this.handleUserSelect}
            handleButtonData={this.handleButtonData}
            handleSubmit={this.handleSubmit}
            handleSubmitData={this.handleSubmitData}
            handleBadgeData={this.handleBadgeData}
            state={this.state}
          />
        </div>
        <Footer />
      </>
    );
  }
}

BorardingPage.propTypes = {
  history: PropTypes.object,
};

export default BorardingPage;
