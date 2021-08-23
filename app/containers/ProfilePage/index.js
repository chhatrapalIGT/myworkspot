import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Profile from '../../components/Profile';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // search: false,
      // allUser: [],
      // searchName: [],
    };
  }

  handleUserSelect = event => {
    // const selectData = [];
    // const name = event;
    // selectData.push(name);
    console.log('name', event);
    // console.log('selectData', selectData);
  };

  // handleChange = event => {
  //   let newList = [];
  //   if (event.target.value !== '') {
  //     setSearch(true);
  //     newList = allUser.filter(({ userName }) => {
  //       const finalDataList = userName.toLowerCase();
  //       const filter = event.target.value.toLowerCase();
  //       return finalDataList.includes(filter);
  //     });
  //   } else {
  //     setSearch(false);
  //     newList = allUser;
  //   }
  //   setSearchName(newList);
  // };

  render() {
    return (
      <div>
        <Profile handleSelectChange={this.handleUserSelect} />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  // handleSelectChange: PropTypes.func,
};

export default ProfilePage;
