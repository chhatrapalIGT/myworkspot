/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Axios from 'axios';
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
    };
  }

  componentDidMount() {
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

  // let finalData = this.state;
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

  render() {
    return (
      <>
        <div id="content-wrap">
          <Header />
          <Profile
            state={this.state}
            handleChange={this.handleChange}
            handleClose={this.handleClose}
            handleUserSelect={this.handleUserSelect}
            handleShow={this.handleShow}
          />
        </div>
        <Footer />
      </>
    );
  }
}

ProfilePage.propTypes = {};

export default ProfilePage;
