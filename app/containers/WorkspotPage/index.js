/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Axios from 'axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Workspot from '../../components/WorkSpot';

const zoomStep = 1;
const maxScale = 5;
const minScale = 1;
const defaultScale = minScale;
const defaultRotate = 0;

class WorkSpotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: false,
      type: '',
      dateValue: new Date(),
      allUser: [],
      searchName: [],
      userListData: [],
      selectData: [],
      finalData: [],
      date: [],
      location: 'Washington, DC',
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

  handleRemove = name => {
    const { userListData } = this.state;
    if (userListData.includes(name)) {
      const idx = userListData.indexOf(name);
      userListData.splice(idx, 1);
    } else {
      userListData.push(name);
    }
    return userListData;
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
  };

  handleClose = () => {
    const { finalData } = this.state;
    this.setState({ userListData: finalData });
  };

  render() {
    const imgStyle = {
      transform: `scale(${this.state.scale}) rotate(${this.state.rotate}deg)`,
    };

    return (
      <>
        <div id="content-wrap">
          <Header />
          <Workspot
            onSubmit={this.onSubmit}
            handleUserSelect={this.handleUserSelect}
            handleChange={this.handleChange}
            handleClose={this.handleClose}
            state={this.state}
            onChange={this.onChange}
            onDateChange={this.onDateChange}
            handleRemove={this.handleRemove}
            imgStyle={imgStyle}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
          />
        </div>
        <Footer />
      </>
    );
  }
}

export default WorkSpotPage;
