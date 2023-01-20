/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import moment from 'moment';
import saga from './saga';
import reducer from './reducer';
import Assignments from '../../components/Assignments';
import {
  requestGetAssignmentDetail,
  requestGetExportData,
  requestGetOfficeFloor,
  requestGetOfficeNeighborhood,
} from './action';
import { requestGetOfficeLocation } from '../onBoardingPage/actions';

class AssignmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      search: '',
      selectedOffice: [],
      selectedFloor: [],
      selectedBuilding: [],
      selectedNeighbor: [],
      sortOrder: {
        name: true,
        department: true,
        buildingFloor: true,
        neighborhood: true,
        assignedSpage: true,
        badge: true,
      },
    };
  }

  getAssignData = (
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
    this.props.requestGetAssignmentDetail(finalPayload);
  };

  handleSelectedoffice = option => {
    const space = option.map(i => i.value);
    let finalOfficeVal;
    this.setState({ selectedOffice: option }, () => {
      const val = this.state.selectedOffice.length
        ? this.state.selectedOffice[0].name
        : '';
      if (this.state.selectedOffice.length > 1) {
        const length = `, +${this.state.selectedOffice.length - 1}`;
        finalOfficeVal = val.concat(length);
        this.setState({ finalOfficeVal });
      } else if (this.state.selectedOffice.length > 0) {
        finalOfficeVal = val;
      }
      this.setState({ finalOfficeVal });
      const strArr = [];
      space.forEach(ev => {
        strArr.push(ev);
      });
      this.setState({ page: 1 });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      const timeoutId = setTimeout(() => {
        this.setState({ srcOffice: strArr }, () => {
          this.getAssignData(
            this.state.search,
            strArr,
            this.state.selectedFloor,
            this.state.selectedBuilding,
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
    });
  };

  handleSelectedFloor = option => {
    const space = option.map(i => i.value);
    let finalFloorVal;
    this.setState({ selectedFloor: option }, () => {
      const val = this.state.selectedFloor.length
        ? this.state.selectedFloor[0].name
        : '';
      if (this.state.selectedFloor.length > 1) {
        const length = `, +${this.state.selectedFloor.length - 1}`;
        finalFloorVal = val.concat(length);
        this.setState({ finalFloorVal });
      } else if (this.state.selectedFloor.length > 0) {
        finalFloorVal = val;
      }
      this.setState({ finalFloorVal });
      const strFloorArr = [];
      const strBuildingArr = [];
      space.forEach(ev => {
        const spiltData = ev.split(' ');
        if (spiltData[0] === 'floor') {
          strFloorArr.push(spiltData[1]);
        } else {
          strBuildingArr.push(spiltData[1]);
        }
      });
      this.setState({ page: 1 });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      const timeoutId = setTimeout(() => {
        this.setState(
          { srcFloor: strFloorArr, srcBuilding: strBuildingArr },
          () => {
            this.getAssignData(
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
    const space = option.map(i => i.value);
    let finalNeighborhoodVal;
    this.setState({ selectedNeighbor: option }, () => {
      const val = this.state.selectedNeighbor.length
        ? this.state.selectedNeighbor[0].name
        : '';
      if (this.state.selectedNeighbor.length > 1) {
        const length = `, +${this.state.selectedNeighbor.length - 1}`;
        finalNeighborhoodVal = val.concat(length);
        this.setState({ finalNeighborhoodVal });
      } else if (this.state.selectedNeighbor.length > 0) {
        finalNeighborhoodVal = val;
      }
      this.setState({ finalNeighborhoodVal });
      const strArr = [];
      space.forEach(ev => {
        strArr.push(ev);
      });
      this.setState({ page: 1 });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      const timeoutId = setTimeout(() => {
        this.setState({ srcNeighborhood: strArr }, () => {
          this.getAssignData(
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
    this.getAssignData(
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
    this.getAssignData(
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
        this.props.requestGetAssignmentDetail({
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
    this.props.requestGetAssignmentDetail({
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

  handleExport = data => {
    const locArr = [];
    data.offices.map(obj => {
      const isDuplicate = locArr.includes(obj);
      if (!isDuplicate) {
        locArr.push(obj);
        return true;
      }
      return false;
    });
    this.props.requestGetExportData({
      office: locArr.length > 0 ? locArr : ['DC', 'RIC'],
      newExport: true,
      todayDate: moment().format('YYYY-MM-DD'),
    });
  };

  componentDidMount() {
    this.props.requestGetOfficeLocation({});
    this.props.requestGetOfficeFloor({});
    this.props.requestGetOfficeNeighborhood({});
    this.props.requestGetAssignmentDetail({
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
      assignmentData,
      officeLocation,
      officeFloor,
      officeNeighborhood,
      assignmentLoading,
      exportAssignmentLoading,
      assignmentCount,
      exportAssignmentData,
      apiMessage,
      apiSuccess,
    } = this.props;
    return (
      <div>
        <Assignments
          assignmentData={assignmentData}
          exportAssignmentData={exportAssignmentData}
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
          handleExport={this.handleExport}
          handleData={this.handleData}
          assignmentLoading={assignmentLoading}
          exportAssignmentLoading={exportAssignmentLoading}
          assignmentCount={assignmentCount}
          apiSuccess={apiSuccess}
          apiMessage={apiMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { assignment, locationData } = state;
  return {
    assignmentData:
      assignment &&
      assignment.assignmentDetail &&
      assignment.assignmentDetail.assignment &&
      assignment.assignmentDetail.assignment.assignmentsData,
    officeFloor:
      assignment && assignment.officeFloor && assignment.officeFloor.floors,
    officeNeighborhood:
      assignment &&
      assignment.officeNeighborhood &&
      assignment.officeNeighborhood.neighborhood,
    officeLocation:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.location,
    assignmentLoading:
      assignment &&
      assignment.assignmentDetail &&
      assignment.assignmentDetail.loading,
    exportAssignmentData:
      assignment &&
      assignment.exportAssignmentDetails &&
      assignment.exportAssignmentDetails.exportAssignment &&
      assignment.exportAssignmentDetails.exportAssignment.assignmentsData,
    exportAssignmentLoading:
      assignment &&
      assignment.exportAssignmentDetails &&
      assignment.exportAssignmentDetails.loading,
    assignmentCount:
      assignment &&
      assignment.assignmentDetail &&
      assignment.assignmentDetail.assignment &&
      assignment.assignmentDetail.assignment.count,
    apiMessage: assignment && assignment.apiMessage,
    apiSuccess: assignment && assignment.apiSuccess,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetAssignmentDetail: payload =>
      dispatch(requestGetAssignmentDetail(payload)),
    requestGetExportData: payload => dispatch(requestGetExportData(payload)),
    requestGetOfficeLocation: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    requestGetOfficeFloor: payload => dispatch(requestGetOfficeFloor(payload)),
    requestGetOfficeNeighborhood: payload =>
      dispatch(requestGetOfficeNeighborhood(payload)),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'assignment', reducer });
const withSaga = injectSaga({ key: 'assignment', saga });

AssignmentPage.propTypes = {
  requestGetAssignmentDetail: PropTypes.func,
  requestGetExportData: PropTypes.func,
  requestGetOfficeLocation: PropTypes.func,
  requestGetOfficeFloor: PropTypes.func,
  requestGetOfficeNeighborhood: PropTypes.func,
  officeLocation: PropTypes.object,
  officeFloor: PropTypes.object,
  officeNeighborhood: PropTypes.object,
  assignmentData: PropTypes.object,
  exportAssignmentData: PropTypes.object,
  assignmentLoading: PropTypes.bool,
  exportAssignmentLoading: PropTypes.bool,
  assignmentCount: PropTypes.number,
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
)(AssignmentPage);
