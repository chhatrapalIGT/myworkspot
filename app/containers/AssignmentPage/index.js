/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import Assignments from '../../components/Assignments';
import { requestGetAssignmentDetail } from './action';

class AssignmentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      selectedoffice: [],
      selectedFloor: [],
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
    officeLocation,
    stroffice,
    strNeighbor,
    sortBy,
    page,
    limit,
  ) => {
    const finalPayload = {
      searchKeyword,
      officeLocation,
      stroffice,
      strNeighbor,
      sortBy,
      page,
      limit,
    };
    this.props.requestGetAssignmentDetail(finalPayload);
  };

  handleOfficeChange = option => {
    const space = option.map(i => i.value);
    let finalOffice;
    this.setState({ selectedoffice: option }, () => {
      const val = this.state.selectedoffice.length
        ? this.state.selectedoffice[0].name
        : '';
      if (this.state.selectedoffice.length > 1) {
        const length = `, +${this.state.selectedoffice.length - 1}`;
        finalOffice = val.concat(length);
        this.setState({ finalOffice });
      } else if (this.state.selectedoffice.length > 0) {
        finalOffice = val;
      }
      this.setState({ finalOffice });
      let str = '[';
      space.forEach(ev => {
        str += `,"${ev}"`;
      });
      str += ']';
      const da = str.slice(0, 1);
      const ta = str.slice(2);
      const officeLocation = space.length !== 0 ? da && da.concat(ta) : '';
      this.setState({ officeLocation });
      this.setState({ page: 1 });

      this.props.requestGetAssignmentDetail({
        searchKeyword: this.state.searchVal,
        officeLocation: this.state.officeLocation,
        strFloor: this.state.strFloor,
        strNeighbor: this.state.strNeighbor,
        sortBy: this.state.sortBy,
        page: this.state.page,
        limit: this.state.limit,
      });
    });
  };

  handleChangeFloor = option => {
    const values = option.map(i => i.value);
    this.setState({ selectedFloor: option }, () => {
      let finalFloor;
      const val = this.state.selectedFloor.length
        ? this.state.selectedFloor[0].name
        : '';
      if (this.state.selectedFloor.length > 1) {
        finalFloor = val.concat(
          `; ${
            this.state.selectedFloor ? this.state.selectedFloor[1].name : ''
          }`,
        );
        this.setState({ finalFloor });
      } else if (this.state.selectedFloor.length > 0) {
        finalFloor = val;
      }
      this.setState({ finalFloor });
      this.setState({ page: 1 });
    });
    let str = '[';
    values.forEach(ev => {
      str += `,"${ev}"`;
    });
    str += ']';
    const da = str.slice(0, 1);
    const ta = str.slice(2);
    const strFloor = values.length !== 0 ? da && da.concat(ta) : '';
    this.setState({ strFloor });

    this.props.requestGetAssignmentDetail({
      searchKeyword: this.state.searchVal,
      officeLocation: this.state.officeLocation,
      strFloor: this.state.strFloor,
      strNeighbor: this.state.strNeighbor,
      sortBy: this.state.sortBy,
      page: this.state.page,
      limit: this.state.limit,
    });
  };

  handleChangeNeighborhood = option => {
    const values = option.map(i => i.value);
    this.setState({ selectedNeighbor: option }, () => {
      let finalNeighbor;
      const val = this.state.selectedNeighbor.length
        ? this.state.selectedNeighbor[0].name
        : '';
      if (this.state.selectedNeighbor.length > 1) {
        finalNeighbor = val.concat(
          `; ${
            this.state.selectedNeighbor
              ? this.state.selectedNeighbor[1].name
              : ''
          }`,
        );
        this.setState({ finalNeighbor });
      } else if (this.state.selectedNeighbor.length > 0) {
        finalNeighbor = val;
      }
      this.setState({ finalNeighbor });
      this.setState({ page: 1 });
    });
    let str = '[';
    values.forEach(ev => {
      str += `,"${ev}"`;
    });
    str += ']';
    const da = str.slice(0, 1);
    const ta = str.slice(2);
    const strNeighbor = values.length !== 0 ? da && da.concat(ta) : '';
    this.setState({ strNeighbor });

    this.props.requestGetAssignmentDetail({
      searchKeyword: this.state.searchVal,
      officeLocation: this.state.officeLocation,
      strFloor: this.state.strFloor,
      strNeighbor: this.state.strNeighbor,
      sortBy: this.state.sortBy,
      page: this.state.page,
      limit: this.state.limit,
    });
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 });
    this.getAssignData(
      this.state.searchVal,
      this.state.officeLocation,
      this.state.strFloor,
      this.state.strNeighbor,
      this.state.sortBy,
      1,
      e,
    );
  };

  handlePageChange = e => {
    const { limit } = this.state;
    this.setState({ page: e });
    this.getAssignData(
      this.state.searchVal,
      this.state.officeLocation,
      this.state.strFloor,
      this.state.strNeighbor,
      this.state.sortBy,
      e,
      limit,
    );
  };

  handleSearcha = e => {
    const { name, value } = e.target;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      this.setState({ [name]: value }, () => {
        this.props.requestGetAssignmentDetail({
          searchKeyword: this.state.searchVal,
          officeLocation: this.state.officeLocation,
          strFloor: this.state.strFloor,
          strNeighbor: this.state.strNeighbor,
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
      searchKeyword: this.state.searchVal,
      officeLocation: this.state.officeLocation,
      strFloor: this.state.strFloor,
      strNeighbor: this.state.strNeighbor,
      sortBy,
      page: this.state.page,
      limit: this.state.limit,
    });
  };

  componentDidMount() {
    this.props.requestGetAssignmentDetail({
      page: this.state.page,
      limit: this.state.limit,
    });
  }

  render() {
    const {
      assignmentData,
      assignmentLoading,
      assignmentCount,
      apiMessage,
      apiSuccess,
    } = this.props;
    return (
      <div>
        <Assignments
          assignmentData={assignmentData}
          state={this.state}
          handleOfficeChange={this.handleOfficeChange}
          handleChangeFloor={this.handleChangeFloor}
          handleChangeNeighborhood={this.handleChangeNeighborhood}
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          handleClickSort={this.handleClickSort}
          handleSearcha={this.handleSearcha}
          handleData={this.handleData}
          assignmentLoading={assignmentLoading}
          assignmentCount={assignmentCount}
          apiSuccess={apiSuccess}
          apiMessage={apiMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { assignment } = state;
  return {
    assignmentData:
      assignment &&
      assignment.assignmentDetail &&
      assignment.assignmentDetail.assignment &&
      assignment.assignmentDetail.assignment.assignmentsData,
    assignmentLoading:
      assignment &&
      assignment.assignmentDetail &&
      assignment.assignmentDetail.loading,
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
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'assignment', reducer });
const withSaga = injectSaga({ key: 'assignment', saga });

AssignmentPage.propTypes = {
  requestGetAssignmentDetail: PropTypes.object,
  assignmentData: PropTypes.object,
  assignmentLoading: PropTypes.bool,
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
