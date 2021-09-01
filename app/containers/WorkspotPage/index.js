/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component, createRef } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import Axios from 'axios';
import Workspot from '../../components/WorkSpot';

class WorkSpotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null,
      width: null,
      modal: false,
      search: false,
      employeeModal: false,
      type: '',
      dateValue: new Date(),
      allUser: [],
      searchName: [],
      userListData: [],
      selectData: [],
      finalData: [],
      date: [],
      location: '',
    };
    this.imgRef = createRef();
  }

  handleSubmit = dates => {
    console.log(`handlesub`, dates);
  };

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

  componentDidMount() {
    const url = `https://mocki.io/v1/503b1d85-b034-466b-af55-fc5ae262e848`;
    Axios.get(url).then(res => {
      this.setState({ allUser: res.data });
      this.setState({ searchName: res.data });
      // setAllUser(res.data);
      // setSearchName(res.data);
    });
  }

  // const selectData = [];
  // let finalData = [];
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

  handleChange = event => {
    const { allUser } = this.state;
    let newList = [];
    if (event.target.value !== '') {
      // setSearch(true);
      this.setState({ search: true });
      newList = allUser.filter(({ userName }) => {
        const finalDataList = userName.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return finalDataList.includes(filter);
      });
    } else {
      // setSearch(false);
      this.setState({ search: true });
      newList = allUser;
    }
    // setSearchName(newList);
    this.setState({ searchName: newList });
  };

  onChange = event => {
    console.log(`event`, event);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onDateChange = event => {
    console.log(`date`, event);
    const { name, value } = event.valueText;
    const { date } = this.state;
    this.setState({ date: event.valueText });
    console.log(`name, value`, name, value);
    console.log(`date>>>>>>`, date);
  };

  onSubmit = () => {
    const { dateValue, location, date } = this.state;
    console.log(`dateValue||||`, dateValue);
    const payload = {
      date,
      location,
    };
    console.log(`payload`, payload);
  };

  handleClose = () => {
    const { finalData } = this.state;
    // setUserListData(finalData);
    this.setState({ userListData: finalData });
    console.log(`userListData`, this.state.userListData);
    // setEmployeeModal(false);
  };

  render() {
    console.log(`allUser>>>`, this.state.allUser);
    console.log(`this.state`, this.state);
    console.log(`this.state.searchName`, this.state.searchName);
    return (
      <Workspot
        handleSubmit={this.handleSubmit}
        onSubmit={this.onSubmit}
        handleUserSelect={this.handleUserSelect}
        handleChange={this.handleChange}
        handleClose={this.handleClose}
        state={this.state}
        onChange={this.onChange}
        onDateChange={this.onDateChange}
      />
    );
  }
}

export default WorkSpotPage;
