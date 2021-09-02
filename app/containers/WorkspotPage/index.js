/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component, createRef } from 'react';
// import PropTypes from 'prop-types';
import Axios from 'axios';
import Workspot from '../../components/WorkSpot';

class WorkSpotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null,
      width: null,
      search: false,
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
    });
  }

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
      this.setState({ search: true });
      newList = allUser.filter(({ userName }) => {
        const finalDataList = userName.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return finalDataList.includes(filter);
      });
    } else {
      this.setState({ search: true });
      newList = allUser;
    }
    this.setState({ searchName: newList });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onDateChange = event => {
    this.setState({ date: event.valueText });
  };

  onSubmit = () => {
    const { location, date } = this.state;
    const payload = {
      date,
      location,
    };
    console.log(`payload`, payload);
  };

  handleClose = () => {
    const { finalData } = this.state;
    this.setState({ userListData: finalData });
  };

  render() {
    return (
      <Workspot
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
