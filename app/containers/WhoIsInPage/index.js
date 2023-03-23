/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import {
  requestGetWhoIsInDetail,
  requestGetOfficeFloor,
  requestGetOfficeNeighborhood,
} from './action';
import { requestGetOfficeLocation } from '../onBoardingPage/actions';
import Profile from '../../components/assets/images/profileof.png';
import WhoIsIn from '../../components/WhoIsIn';

class WhoIsInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      search: '',
      selectedNames: 'DC',
      selectedOffice: [],
      selectedFloor: [],
      selectedBuilding: [],
      selectedNeighbor: [],
      finalOfficeVal: 'Washington, DC',
      finalFloorVal: 'Floor 3, +1',
      finalNeighborhoodVal: 'All',
      srcFloor: ['3', '8'],
      filterApplied: false,
      sortOrder: {
        name: true,
        department: true,
        buildingFloor: true,
        neighborhood: true,
        assignedSpage: true,
      },
    };
  }

  getWhoIsInData = (
    searchKeyword,
    office,
    floor,
    building,
    neighborhood,
    sortBy,
    page,
    limit,
  ) => {
    const finalPayload = {
      searchKeyword,
      office,
      floor,
      building,
      neighborhood,
      sortBy,
      page,
      limit,
    };
    this.props.requestGetWhoIsInDetail(finalPayload);
  };

  handleSelectedoffice = option => {
    const space = [];
    const arrStr = option.split(', ');
    space.push(arrStr[1] === 'VA' ? 'RIC' : 'DC');
    this.setState({ finalOfficeVal: option });
    this.setState({ page: 1 });
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    this.props.requestGetOfficeFloor({
      locationId: space,
    });
    this.props.requestGetOfficeNeighborhood({
      floor: [],
      building: [],
      locationId: space,
    });
    this.setState({
      filterApplied: true,
      selectedFloor: [],
      selectedBuilding: [],
      selectedNeighbor: [],
      finalFloorVal: 'All',
      finalNeighborhoodVal: 'All',
      srcFloor: [],
      srcBuilding: [],
      srcNeighborhood: [],
    });
    const timeoutId = setTimeout(() => {
      this.setState({ srcOffice: space }, () => {
        this.getWhoIsInData(
          this.state.search,
          space,
          this.state.srcFloor,
          this.state.srcBuilding,
          this.state.srcNeighborhood,
          this.state.sortBy,
          this.state.page,
          this.state.limit,
        );
      });
    }, 1000);
    this.setState({
      typingTimeout: timeoutId,
    });
  };

  handleSelectedFloor = option => {
    const space = [];
    option.map(i => {
      if (i.isSelected) {
        space.push(i.value);
      }
      return true;
    });
    const selectedFloorList = option.filter(item => item.isSelected === true);
    let finalFloorVal;
    this.setState({ selectedFloor: selectedFloorList }, () => {
      const val = this.state.selectedFloor.length
        ? this.state.selectedFloor[0].name
        : '';
      if (val === 'All') {
        finalFloorVal = val;
      } else if (this.state.selectedFloor.length > 1) {
        const length = `, +${this.state.selectedFloor.length - 1}`;
        finalFloorVal = val.concat(length);
        this.setState({ finalFloorVal });
      } else if (this.state.selectedFloor.length > 0) {
        finalFloorVal = val;
      } else if (!this.state.selectedFloor.length) {
        finalFloorVal = '';
      }
      this.setState({ finalFloorVal });
      const strFloorArr = [];
      const strBuildingArr = [];
      const removeAfterAll = space.filter(i => i !== 'All');
      removeAfterAll.forEach(ev => {
        const spiltData = ev.split(' ');
        if (spiltData[0] === 'Floor') {
          strFloorArr.push(spiltData[1]);
        } else {
          strBuildingArr.push(spiltData[1]);
        }
      });
      this.setState({ page: 1 });
      this.props.requestGetOfficeNeighborhood({
        floor: strFloorArr,
        building: strBuildingArr,
        locationId: this.state.srcOffice,
      });
      this.setState({
        filterApplied: true,
        selectedNeighbor: [],
        finalNeighborhoodVal: 'All',
        srcNeighborhood: [],
      });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      const timeoutId = setTimeout(() => {
        this.setState(
          { srcFloor: strFloorArr, srcBuilding: strBuildingArr },
          () => {
            this.getWhoIsInData(
              this.state.search,
              this.state.srcOffice,
              strFloorArr,
              strBuildingArr,
              this.srcNeighborhood,
              this.state.sortBy,
              this.state.page,
              this.state.limit,
            );
          },
        );
      }, 1000);
      this.setState({
        typingTimeout: timeoutId,
      });
    });
  };

  handleSelectedNeighbor = option => {
    const space = [];
    option.map(i => {
      if (i.isSelected) {
        space.push(i.value);
      }
      return true;
    });
    const selectedNeighborList = option.filter(
      item => item.isSelected === true,
    );
    let finalNeighborhoodVal;
    this.setState({ selectedNeighbor: selectedNeighborList }, () => {
      const val = this.state.selectedNeighbor.length
        ? this.state.selectedNeighbor[0].name
        : '';
      if (val === 'All') {
        finalNeighborhoodVal = val;
      } else if (this.state.selectedNeighbor.length > 1) {
        const length = `, +${this.state.selectedNeighbor.length - 1}`;
        finalNeighborhoodVal = val.concat(length);
        this.setState({ finalNeighborhoodVal });
      } else if (this.state.selectedNeighbor.length > 0) {
        finalNeighborhoodVal = val;
      } else if (!this.state.selectedNeighbor.length) {
        finalNeighborhoodVal = '';
      }
      this.setState({ finalNeighborhoodVal });
      const strArr = space.filter(i => i !== 'All');
      this.setState({ page: 1 });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      const timeoutId = setTimeout(() => {
        this.setState({ srcNeighborhood: strArr }, () => {
          this.getWhoIsInData(
            this.state.search,
            this.state.srcOffice,
            this.state.srcFloor,
            this.state.srcBuilding,
            strArr,
            this.state.sortBy,
            this.state.page,
            this.state.limit,
          );
        });
      }, 1000);
      this.setState({
        typingTimeout: timeoutId,
      });
    });
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 });
    this.getWhoIsInData(
      this.state.search,
      this.state.srcOffice,
      this.state.srcFloor,
      this.state.srcBuilding,
      this.state.srcNeighborhood,
      this.state.sortBy,
      1,
      e,
    );
  };

  handlePageChange = e => {
    const { limit } = this.state;
    this.setState({ page: e });
    this.getWhoIsInData(
      this.state.search,
      this.state.srcOffice,
      this.state.srcFloor,
      this.state.srcBuilding,
      this.state.srcNeighborhood,
      this.state.sortBy,
      e,
      limit,
    );
  };

  handleSearcha = e => {
    const { value } = e.target;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      this.setState({ search: value }, () => {
        this.props.requestGetWhoIsInDetail({
          searchKeyword: this.state.search,
          office: this.state.srcOffice,
          floor: this.state.srcFloor,
          building: this.state.srcBuilding,
          neighborhood: this.state.srcNeighborhood,
          sortBy: this.state.sortBy,
          page: this.state.page,
          limit: this.state.limit,
        });
      });
    }, 1000);
    this.setState({
      typingTimeout: timeoutId,
    });
  };

  handleClickSort = (key, val) => {
    this.setState(prev => ({ sortOrder: { ...prev.sortOrder, [key]: !val } }));
    let sortBy;
    if (val) {
      sortBy = `${[key]}-ASC`;
    } else {
      sortBy = `${[key]}-DESC`;
    }
    this.setState({ sortBy });
    this.props.requestGetWhoIsInDetail({
      searchKeyword: this.state.search,
      office: this.state.srcOffice,
      floor: this.state.srcFloor,
      building: this.state.srcBuilding,
      neighborhood: this.state.srcNeighborhood,
      sortBy,
      page: this.state.page,
      limit: this.state.limit,
    });
  };

  replaceImage = error => {
    // eslint-disable-next-line no-param-reassign
    error.target.src = Profile;
  };

  componentDidMount() {
    this.props.requestGetOfficeLocation({});
    this.props.requestGetOfficeFloor({
      floor: ['3', '8'],
      building: [],
      locationId: ['DC'],
    });
    this.props.requestGetOfficeNeighborhood({});
    this.props.requestGetWhoIsInDetail({
      page: this.state.page,
      limit: this.state.limit,
    });
  }

  componentDidUpdate() {
    const { apiMessage } = this.props;
    const { strVal, strSpace, sortBy, search } = this.state;
  }

  render() {
    const {
      whoIsInData,
      officeLocation,
      officeFloor,
      officeNeighborhood,
      whoIsInLoading,
      whoIsInCount,
      apiMessage,
      apiSuccess,
      whoIsInTotalPage,
    } = this.props;
    return (
      <div>
        <WhoIsIn
          whoIsInTotalPage={whoIsInTotalPage}
          whoIsInData={whoIsInData}
          officeLocation={officeLocation}
          officeFloor={officeFloor}
          officeNeighborhood={officeNeighborhood}
          state={this.state}
          handleSelectedoffice={this.handleSelectedoffice}
          handleSelectedFloor={this.handleSelectedFloor}
          handleSelectedNeighbor={this.handleSelectedNeighbor}
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          handleClickSort={this.handleClickSort}
          handleSearcha={this.handleSearcha}
          whoIsInLoading={whoIsInLoading}
          whoIsInCount={whoIsInCount}
          apiSuccess={apiSuccess}
          apiMessage={apiMessage}
          replaceImage={this.replaceImage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { whoIsIn, locationData } = state;
  return {
    whoIsInData:
      whoIsIn &&
      whoIsIn.whoIsInDetail &&
      whoIsIn.whoIsInDetail.whoIsIn &&
      whoIsIn.whoIsInDetail.whoIsIn.data,
    officeFloor: whoIsIn && whoIsIn.officeFloor && whoIsIn.officeFloor.floors,
    officeNeighborhood:
      whoIsIn &&
      whoIsIn.officeNeighborhood &&
      whoIsIn.officeNeighborhood.neighborhood,
    officeLocation:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.location,
    whoIsInLoading:
      whoIsIn && whoIsIn.whoIsInDetail && whoIsIn.whoIsInDetail.loading,
    whoIsInCount:
      whoIsIn &&
      whoIsIn.whoIsInDetail &&
      whoIsIn.whoIsInDetail.whoIsIn &&
      whoIsIn.whoIsInDetail.whoIsIn.count,
    whoIsInTotalPage:
      whoIsIn &&
      whoIsIn.whoIsInDetail &&
      whoIsIn.whoIsInDetail.whoIsIn &&
      whoIsIn.whoIsInDetail.whoIsIn.totalPages,
    apiMessage: whoIsIn && whoIsIn.apiMessage,
    apiSuccess: whoIsIn && whoIsIn.apiSuccess,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetWhoIsInDetail: payload =>
      dispatch(requestGetWhoIsInDetail(payload)),
    requestGetOfficeLocation: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    requestGetOfficeFloor: payload => dispatch(requestGetOfficeFloor(payload)),
    requestGetOfficeNeighborhood: payload =>
      dispatch(requestGetOfficeNeighborhood(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'whoIsIn', reducer });
const withSaga = injectSaga({ key: 'whoIsIn', saga });

WhoIsInPage.propTypes = {
  requestGetWhoIsInDetail: PropTypes.func,
  requestGetOfficeLocation: PropTypes.func,
  requestGetOfficeFloor: PropTypes.func,
  requestGetOfficeNeighborhood: PropTypes.func,
  officeLocation: PropTypes.object,
  officeFloor: PropTypes.object,
  officeNeighborhood: PropTypes.object,
  whoIsInLoading: PropTypes.bool,
  whoIsInCount: PropTypes.number,
  whoIsInData: PropTypes.array,
  whoIsInTotalPage: PropTypes.number,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WhoIsInPage);
