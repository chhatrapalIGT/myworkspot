/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Axios from 'axios';
import saga from './saga';
import reducer from './reducer';
import { requestGetProfileOfficeData } from './actions';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Profile from '../../components/Profile';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      show: false,
      search: false,
      allUser: [],
      searchName: [],
      userListData: [],
      selectData: [],
      finalData: [],
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

  componentDidMount() {
    this.props.requestGetProfileOfficeData();
    const url = `https://mocki.io/v1/11523d43-5f93-4a6f-adda-327ee52a8b1f`;
    Axios.get(url).then(res => {
      const datas = res.data;
      this.setState({ allUser: datas, searchName: datas });
    });
  }

  handleChange = event => {
    let newList = [];
    if (event.target.value !== '') {
      this.setState({ search: true });
      newList = this.state.allUser.filter(({ userName }) => {
        const finalDataList = userName.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return finalDataList.includes(filter);
      });
    } else {
      this.setState({ search: false });
      newList = this.state.allUser;
    }
    this.setState({ searchName: newList });
  };

  handleUserSelect = username => {
    const { selectData } = this.state;
    if (selectData.includes(username)) {
      const index = selectData.indexOf(username);
      selectData.splice(index, 1);
    } else {
      selectData.push(username);
    }
    this.state.finalData = selectData;
  };

  handleClose = () => {
    const { finalData } = this.state;
    this.setState({ userListData: finalData, show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleButtonData = selectedDay => {
    console.log(`selectedDay`, selectedDay);
    this.setState({ selectedDay });
  };

  handleSubmit = () => {
    const { timings, selectedNames, selectedDay, checked } = this.state;
    console.log(`timings`, timings);
    console.log(`selectedNames`, selectedNames);
    console.log(`selectedDay`, selectedDay);

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

  handleUserSelectData = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleCheckbox = () => {
    this.setState({ checked: true });
  };

  // allTabColor = type => {
  //   let color;
  //   switch (type) {
  //     case 'Washington , DC':
  //       color = 'border-top-orange';
  //       break;
  //     case 'Richmond , VA':
  //       color = 'border-top-blue';
  //       break;
  //     case 'Birmigham , AL':
  //       color = 'border-top-green';
  //       break;
  //     case 'Bloomington , MN':
  //       color = 'border-top-black';
  //       break;

  //     default:
  //       color = 'white';
  //   }
  //   return color;
  // };

  render() {
    const { getProfileLocation } = this.props;
    return (
      <>
        <div id="content-wrap">
          <Header />
          <Profile
            state={this.state}
            handleCheckbox={this.handleCheckbox}
            handleUserSelect={this.handleUserSelect}
            handleButtonData={this.handleButtonData}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleClose={this.handleClose}
            handleUserSelectData={this.handleUserSelectData}
            handleShow={this.handleShow}
            allTabColor={this.allTabColor}
            getProfileLocation={getProfileLocation}
          />
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { profile } = state;
  return {
    getProfileLocation: profile && profile.getOffice,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetProfileOfficeData: payload =>
      dispatch(requestGetProfileOfficeData(payload)),

    dispatch,
  };
}
const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

ProfilePage.propTypes = {
  requestGetProfileOfficeData: PropTypes.func,
  getProfileLocation: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ProfilePage);
