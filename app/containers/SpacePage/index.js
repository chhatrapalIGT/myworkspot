/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import reducer from './reducer';
import { requestGetOfficeUpdateData } from '../UploadMapPage/actions';
import {
  requestUpdateActiveStatus,
  clearUpdateStatus,
  clearMessage,
  requestGetManageSpace,
  requestGetManageExport,
  requestGetLockSpace,
  requestGetNeighborName,
  requestGetOfficesType,
  requestGetFloorByName,
  requestManageUpdateSpace,
} from './actions';
import Spaces from '../../components/Spaces';
import { requestGetOfficeLocation } from '../onBoardingPage/actions';
import {
  requestGetOfficeFloor,
  requestGetOfficeNeighborhood,
} from '../AssignmentPage/action';

class OfficeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNames: 'DC',
      page: 1,
      limit: 10,
      searchFilter: '',
      selectedOffice: [],
      selectedFloor: [],
      selectedBuilding: [],
      selectedNeighbor: [],
      selectedOfficetype: [],
      finalOfficeVal: 'Washington, DC',
      finalFloorVal: 'Floor 3, +1',
      finalNeighborhoodVal: 'All',
      finalOfficeTypeVal: 'All',
      neighborhoodSearch: [],
      neighborName: [],
      officeTypeName: [],
      srcOffice: ['DC'],
      srcFloor: ['3', '8'],
      srcBuilding: [],
      srcNeighborhood: [],
      srcOfficeType: [],
      newExport: false,
      filterApplied: false,
      sortOrder: {
        building_floor: true,
        neighborhood: true,
        space: true,
        space_type: true,
        assigned: true,
        algorithm_status: true,
      },
    };
  }

  componentDidMount() {
    this.props.requestGetOfficeUpdateData({});
    this.props.requestGetManageSpace({
      searchFilter: this.state.searchVal,
      officeSearch: ['DC'],
      floorSearch: ['3', '8'],
      neighborhoodSearch: this.state.neighborhoodSearch,
      sort_column: this.state.sort_column,
      limit: this.state.limit,
      page: this.state.page,
    });
    this.props.requestGetOfficeLocation({
      locationId: ['DC'],
    });
    this.props.requestGetOfficeFloor({
      floor: ['3', '8'],
      building: [],
      locationId: ['DC'],
    });
    this.props.requestGetOfficeNeighborhood({
      floor: ['3', '8'],
      building: [],
      locationId: ['DC'],
    });
    this.props.requestGetLockSpace({});
    this.props.requestGetOfficesType({});
  }

  handleManagespaceUpdate = () => {
    this.props.requestGetManageSpace({
      searchFilter: this.state.searchVal,
      officeSearch: this.state.srcOffice,
      floorSearch: this.state.srcFloor,
      neighborhoodSearch: this.state.neighborhoodSearch,
      spaceTypeSearch: this.state.spaceTypeSearch,
      sort_column: this.state.sort_column,
      limit: this.state.limit,
      page: this.state.page,
    });
  };

  handleSearcha = e => {
    const { name, value } = e.target;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      this.setState({ [name]: value }, () => {
        if (this.state.searchVal !== '') {
          this.getManageData(
            this.state.searchVal,
            this.state.srcOffice,
            this.state.srcFloor,
            this.state.srcBuilding,
            this.state.srcNeighborhood,
            this.state.srcOfficeType,
            this.state.sort_column,
            this.state.page,
            this.state.limit,
            this.state.newExport,
          );
        } else {
          this.handleLimitChange(10);
        }
      });
    }, 1000);
    this.setState({
      typingTimeout: timeoutId,
    });
  };

  handleFloorByName = data => {
    this.props.requestGetFloorByName({
      locationId: [data],
    });
  };

  getManageData = (
    searchFilter,
    officeSearch,
    floorSearch,
    buldingSearch,
    neighborhoodSearch,
    spaceTypeSearch,
    sort_column,
    page,
    limit,
    newExport,
  ) => {
    const finalPayload = {
      searchFilter,
      officeSearch,
      floorSearch,
      buldingSearch,
      neighborhoodSearch,
      spaceTypeSearch,
      sort_column,
      page,
      limit,
      newExport,
    };
    this.props.requestGetManageSpace(finalPayload);
  };

  getNeighborData = (floor, building, locationId) => {
    const finalPayload = {
      floor,
      building,
      locationId,
    };
    this.props.requestGetManageSpace(finalPayload);
  };

  handleSelectedoffice = option => {
    const space = [];
    option.map(i => {
      if (i.isSelected) {
        space.push(i.value);
      }
      return true;
    });
    const selectOfficeList = option.filter(item => item.isSelected === true);
    let finalOfficeVal;
    this.setState({ selectedOffice: selectOfficeList }, () => {
      const val = this.state.selectedOffice.length
        ? this.state.selectedOffice[0].name
        : '';
      if (val === 'All') {
        finalOfficeVal = val;
      } else if (this.state.selectedOffice.length > 1) {
        const length = `, +${this.state.selectedOffice.length - 1}`;
        finalOfficeVal = val.concat(length);
        this.setState({ finalOfficeVal });
      } else if (this.state.selectedOffice.length > 0) {
        finalOfficeVal = val;
      } else if (!this.state.selectedOffice.length) {
        finalOfficeVal = '';
      }
      this.setState({ finalOfficeVal });
      const strArr = space.filter(i => i !== 'All');
      this.setState({ page: 1 });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      this.props.requestGetOfficeFloor({
        locationId: strArr,
      });
      this.props.requestGetOfficeNeighborhood({
        floor: [],
        building: [],
        locationId: strArr,
      });
      this.setState({
        filterApplied: true,
        selectedFloor: [],
        selectedBuilding: [],
        selectedNeighbor: [],
        selectedOfficetype: [],
        finalFloorVal: 'All',
        finalNeighborhoodVal: 'All',
        srcFloor: [],
        srcBuilding: [],
        srcNeighborhood: [],
        srcOfficeType: [],
      });
      const timeoutId = setTimeout(() => {
        this.setState({ srcOffice: strArr }, () => {
          this.getManageData(
            this.state.searchVal,
            strArr,
            this.state.srcFloor,
            this.state.srcBuilding,
            this.state.srcNeighborhood,
            this.state.srcOfficeType,
            this.state.sort_column,
            this.state.page,
            this.state.limit,
            this.state.newExport,
          );
        });
      }, 1000);
      this.setState({
        typingTimeout: timeoutId,
      });
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
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      this.props.requestGetOfficeNeighborhood({
        floor: strFloorArr,
        building: strBuildingArr,
        locationId: this.state.srcOffice,
      });
      this.setState({
        filterApplied: true,
        selectedNeighbor: [],
        selectedOfficetype: [],
        finalNeighborhoodVal: 'All',
        srcNeighborhood: [],
        srcOfficeType: [],
      });
      const timeoutId = setTimeout(() => {
        this.setState(
          { srcFloor: strFloorArr, srcBuilding: strBuildingArr },
          () => {
            this.getManageData(
              this.state.searchVal,
              this.state.srcOffice,
              strFloorArr,
              strBuildingArr,
              this.state.srcNeighborhood,
              this.state.srcOfficeType,
              this.state.sort_column,
              this.state.page,
              this.state.limit,
              this.state.newExport,
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
          this.getManageData(
            this.state.searchVal,
            this.state.srcOffice,
            this.state.srcFloor,
            this.state.srcBuilding,
            strArr,
            this.state.srcOfficeType,
            this.state.sort_column,
            this.state.page,
            this.state.limit,
            this.state.newExport,
          );
        });
      }, 1000);
      this.setState({
        typingTimeout: timeoutId,
      });
    });
  };

  handleSelectedOfficeType = option => {
    const space = [];
    option.map(i => {
      if (i.isSelected) {
        space.push(i.value);
      }
      return true;
    });
    const selectedOfficeTypeList = option.filter(
      item => item.isSelected === true,
    );
    let finalOfficeTypeVal;
    this.setState({ selectedOfficetype: selectedOfficeTypeList }, () => {
      const val = this.state.selectedOfficetype.length
        ? this.state.selectedOfficetype[0].name
        : '';
      if (val === 'All') {
        finalOfficeTypeVal = val;
      } else if (this.state.selectedOfficetype.length > 1) {
        const length = `, +${this.state.selectedOfficetype.length - 1}`;
        finalOfficeTypeVal = val.concat(length);
        this.setState({ finalOfficeTypeVal });
      } else if (this.state.selectedOfficetype.length > 0) {
        finalOfficeTypeVal = val;
      } else if (!this.state.selectedOfficetype.length) {
        finalOfficeTypeVal = '';
      }
      this.setState({ finalOfficeTypeVal });
      const strArr = space.filter(i => i !== 'All');
      this.setState({ page: 1 });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      const timeoutId = setTimeout(() => {
        this.setState({ srcOfficeType: strArr }, () => {
          this.getManageData(
            this.state.searchVal,
            this.state.srcOffice,
            this.state.srcFloor,
            this.state.srcBuilding,
            this.state.srcNeighborhood,
            strArr,
            this.state.sort_column,
            this.state.page,
            this.state.limit,
            this.state.newExport,
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
    this.getManageData(
      this.state.searchVal,
      this.state.srcOffice,
      this.state.srcFloor,
      this.state.srcBuilding,
      this.state.srcNeighborhood,
      this.state.srcOfficeType,
      this.state.sort_column,
      1,
      e,
      this.state.newExport,
    );
  };

  handlePageChange = e => {
    const { limit } = this.state;
    this.setState({ page: e });
    this.getManageData(
      this.state.searchVal,
      this.state.srcOffice,
      this.state.srcFloor,
      this.state.srcBuilding,
      this.state.srcNeighborhood,
      this.state.srcOfficeType,
      this.state.sort_column,
      e,
      limit,
      this.state.newExport,
    );
  };

  handleClickSort = (key, val) => {
    this.setState(prev => ({
      sortOrder: { ...prev.sortOrder, [key]: !val },
    }));
    let sort_column;
    if (val) {
      sort_column = `${[key]}-ASC`;
    } else {
      sort_column = `${[key]}-DESC`;
    }
    this.setState({ sort_column });
    this.props.requestGetManageSpace({
      officeSearch: this.state.srcOffice,
      floorSearch: this.state.srcFloor,
      buldingSearch: this.state.srcBuilding,
      neighborhoodSearch: this.state.srcNeighborhood,
      spaceTypeSearch: this.state.srcOfficeType,
      searchFilter: this.state.searchVal,
      sort_column,
      limit: this.state.limit,
      page: this.state.page,
    });
  };

  handleUserSelect = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleCloseUpdate = () => {
    this.props.clearMessage();
  };

  componentDidUpdate() {
    const { spaceUpdate, setSpaceUpdate } = this.props;
    if (spaceUpdate && spaceUpdate.success && spaceUpdate.message) {
      this.props.requestGetOfficeUpdateData({});
      this.props.clearUpdateStatus();
    }
    if (setSpaceUpdate && setSpaceUpdate.showUpdateStatusMessage) {
      setTimeout(() => {
        this.props.clearMessage();
      }, 5000);
    }
  }

  handleData = () => {
    this.props.clearMessage();
  };

  render() {
    const {
      officeLocation,
      spaceUpdate,
      officeSuccess,
      setSpaceUpdate,
      manageSpace,
      exportManage,
      lockSpaceData,
      neighborData,
      floorBulidingData,
      officesData,
      exportLoading,
      manageLoading,
      manageSuccess,
      exportSuccess,
      dataCount,
      officeSrcLocation,
      officeFloor,
      officeNeighborhood,
      manageUpdateSpaceRequest,
      manageDataSuccess,
      manageDataError,
      manageDataMessage,
      manageTotalPages,
      requestGetLockSpace,
    } = this.props;
    return (
      <>
        <div id="content-wrap">
          <Spaces
            requestGetLockSpace={requestGetLockSpace}
            manageTotalPages={manageTotalPages}
            manageDataMessage={manageDataMessage}
            manageDataError={manageDataError}
            handleData={this.handleData}
            handleFloorByName={this.handleFloorByName}
            handleManagespaceUpdate={this.handleManagespaceUpdate}
            requestGetFloorByName={this.props.requestGetFloorByName}
            manageDataSuccess={manageDataSuccess}
            requestManageUpdateSpace={manageUpdateSpaceRequest}
            manageSpace={manageSpace}
            exportManage={exportManage}
            lockSpaceData={lockSpaceData}
            neighborData={neighborData}
            floorBulidingData={floorBulidingData}
            officesData={officesData}
            exportLoading={exportLoading}
            manageLoading={manageLoading}
            manageSuccess={manageSuccess}
            exportSuccess={exportSuccess}
            dataCount={dataCount}
            officeSrcLocation={officeSrcLocation}
            officeNeighborhood={officeNeighborhood}
            officeFloor={officeFloor}
            state={this.state}
            officeLocation={officeLocation}
            handleLimitChange={this.handleLimitChange}
            handlePageChange={this.handlePageChange}
            handleClickSort={this.handleClickSort}
            handleUserSelect={this.handleUserSelect}
            handleCloseUpdate={this.handleCloseUpdate}
            handleSearcha={this.handleSearcha}
            handleSelectedoffice={this.handleSelectedoffice}
            handleSelectedFloor={this.handleSelectedFloor}
            handleSelectedNeighbor={this.handleSelectedNeighbor}
            handleSelectedOfficeType={this.handleSelectedOfficeType}
            requestGetManageSpace={this.props.requestGetManageSpace}
            requestGetManageExport={this.props.requestGetManageExport}
            requestGetNeighborName={this.props.requestGetNeighborName}
            requestUpdateActiveStatus={this.props.requestUpdateActiveStatus}
            spaceUpdate={spaceUpdate}
            setSpaceUpdate={setSpaceUpdate}
            officeSuccess={officeSuccess}
          />{' '}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { uploadOffice, space, assignment, locationData } = state;
  return {
    dataCount:
      space && space.manageSpace && space.manageSpace.getWorkSpaceDataPage,
    manageSpace: space && space.manageSpace && space.manageSpace.data,
    manageTotalPages:
      space &&
      space.manageSpace &&
      space.manageSpace.getWorkSpaceDataPage &&
      space.manageSpace.getWorkSpaceDataPage.TotalPages,
    manageLoading: space && space.manageSpace && space.manageSpace.loading,
    manageSuccess: space && space.manageSpace && space.manageSpace.success,
    exportManage: space && space.manageExport && space.manageExport.data,
    exportLoading: space && space.manageExport && space.manageExport.loading,
    exportSuccess: space && space.manageExport && space.manageExport.success,
    manageDataSuccess:
      space && space.updateManageSpace && space.updateManageSpace.success,
    manageDataMessage:
      space && space.updateManageSpace && space.updateManageSpace.message,
    lockSpaceData: space && space.lockSpace && space.lockSpace.data,
    neighborData: space && space.neighborName && space.neighborName.data,
    floorBulidingData: space && space.floorByName && space.floorByName.data,
    officesData: space && space.officesType && space.officesType.data,
    officeFloor:
      assignment && assignment.officeFloor && assignment.officeFloor.floors,
    officeNeighborhood:
      assignment &&
      assignment.officeNeighborhood &&
      assignment.officeNeighborhood.neighborhood,
    officeSrcLocation:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.location,
    officeLocation:
      uploadOffice &&
      uploadOffice.getOfficeData &&
      uploadOffice.getOfficeData.masterData,
    officeSuccess:
      uploadOffice && uploadOffice.getOfficeData && uploadOffice.getOfficeData,
    spaceUpdate: space && space.updateStatus,
    setSpaceUpdate: space && space,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeUpdateData: payload =>
      dispatch(requestGetOfficeUpdateData(payload)),
    requestUpdateActiveStatus: payload =>
      dispatch(requestUpdateActiveStatus(payload)),
    requestGetManageSpace: payload => dispatch(requestGetManageSpace(payload)),
    requestGetManageExport: payload =>
      dispatch(requestGetManageExport(payload)),
    requestGetOfficeLocation: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    requestGetOfficeFloor: payload => dispatch(requestGetOfficeFloor(payload)),
    requestGetOfficeNeighborhood: payload =>
      dispatch(requestGetOfficeNeighborhood(payload)),
    requestGetLockSpace: payload => dispatch(requestGetLockSpace(payload)),
    requestGetNeighborName: payload =>
      dispatch(requestGetNeighborName(payload)),
    requestGetFloorByName: payload => dispatch(requestGetFloorByName(payload)),
    requestGetOfficesType: payload => dispatch(requestGetOfficesType(payload)),
    manageUpdateSpaceRequest: payload =>
      dispatch(requestManageUpdateSpace(payload)),
    clearUpdateStatus: () => dispatch(clearUpdateStatus()),
    clearMessage: () => dispatch(clearMessage()),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'space', reducer });
const withSaga = injectSaga({ key: 'space', saga });

OfficeMap.propTypes = {
  requestGetOfficeUpdateData: PropTypes.func,
  manageUpdateSpaceRequest: PropTypes.func,
  requestGetManageSpace: PropTypes.func,
  requestGetManageExport: PropTypes.func,
  requestGetLockSpace: PropTypes.func,
  requestGetNeighborName: PropTypes.func,
  requestGetOfficesType: PropTypes.func,
  requestGetFloorByName: PropTypes.func,
  requestGetOfficeLocation: PropTypes.func,
  requestGetOfficeFloor: PropTypes.func,
  requestGetOfficeNeighborhood: PropTypes.func,
  officeLocation: PropTypes.object,
  requestUpdateActiveStatus: PropTypes.func,
  clearUpdateStatus: PropTypes.func,
  clearMessage: PropTypes.func,
  spaceUpdate: PropTypes.object,
  manageSpace: PropTypes.object,
  exportManage: PropTypes.object,
  lockSpaceData: PropTypes.object,
  neighborData: PropTypes.object,
  floorBulidingData: PropTypes.object,
  exportLoading: PropTypes.bool,
  manageLoading: PropTypes.bool,
  manageSuccess: PropTypes.bool,
  manageDataSuccess: PropTypes.bool,
  exportSuccess: PropTypes.bool,
  officesData: PropTypes.object,
  dataCount: PropTypes.object,
  officeSuccess: PropTypes.bool,
  setSpaceUpdate: PropTypes.object,
  officeSrcLocation: PropTypes.object,
  officeFloor: PropTypes.object,
  officeNeighborhood: PropTypes.object,
  manageDataError: PropTypes.string,
  manageTotalPages: PropTypes.number,
  manageDataMessage: PropTypes.string,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OfficeMap);
