/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import Employee from '../../components/Employee';
import {
  requestGetEmployeeDetail,
  requestEditEmployeeDetail,
  requestUpdateEmployeeDetail,
  requestGetWorkspace,
  resetDataEmp,
} from './action';

import { requestVerifyBadge, clearBoardData } from '../onBoardingPage/actions';

class EmployeePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isEdit: false,
      email: '',
      role: 'Admin',
      BadgeNumber: '',
      hasData: true,
      permanentdeskNo: '',
      page: 1,
      limit: 10,
      deskLocationname: '',
      deskFloor: '',
      id: '',
      floor: 'DC',
      build: '4',
      AssignedSpace: '',
      selectedOption: [],
      EditModel: false,
      sortOrder: {
        name: true,
        email: true,
        primaryOffice: true,
        badge: true,
        role: true,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { singleEmployeeData } = nextProps;
    const data = singleEmployeeData;
    const { hasData, email } = prevState;
    if (data && data.Email && data.Email !== email && hasData) {
      const badgeId = data.BadgeNumber;
      return {
        name: data.FirstName.concat(data.LastName),
        email: data.Email,
        role: data.Role,
        BadgeNumber: badgeId.slice(3),
        deskLocationname: data.deskLocationId,
        floor: data.deskLocationId,
        build:
          data.deskFloor !== null && data.deskBuilding !== null
            ? data.deskFloor.concat(data.deskBuilding)
            : data.deskBuilding !== null
            ? data.deskBuilding
            : data.deskFloor !== null
            ? data.deskFloor
            : '',
        AssignedSpace: data.AssignedSpace,
        hasData: false,
      };
    }
    return null;
  }

  getEmpData = (id, search, page, limit) => {
    const finalPayload = {
      id,
      search,
      page,
      limit,
    };
    this.props.requestGetEmployeeDetail(finalPayload);
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 });
    this.getEmpData('', '', 1, e);
  };

  handlePageChange = e => {
    const { limit } = this.state;
    this.setState({ page: e });
    this.getEmpData('', '', e, limit);
  };

  componentDidMount() {
    this.props.requestGetEmployeeDetail({ search: '', role: '' });
    this.props.requestGetWorkspace();
  }

  componentDidUpdate() {
    const { updateEmployee } = this.props;
    if (updateEmployee && updateEmployee.success) {
      setTimeout(() => {
        this.props.resetDataEmp();
      }, 3000);
    }
  }

  handleEdit = ID => {
    this.setState({ isEdit: true, id: ID, hasData: true });
    this.props.requestEditEmployeeDetail(ID);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { role, BadgeNumber, id, AssignedSpace } = this.state;
    const { verifyBadge } = this.props;
    const badge = BadgeNumber.slice(0, 3).concat(BadgeNumber.slice(4, 7));
    if (BadgeNumber.length) {
      this.props.requestUpdateEmployeeDetail({
        role: this.state.role || 'Admin',
        badgeNo: `BB${badge}`,
        permanentdeskNo: AssignedSpace,
        emp_id: id,
      });
    }
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSearcha = e => {
    const { name, value } = e.target;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      this.setState({ [name]: value }, () => {
        this.props.requestGetEmployeeDetail({
          search: this.state.searchVal,
          role: this.state.rolee,
        });
      });
    }, 1000);
    this.setState({
      typingTimeout: timeoutId,
    });
  };

  handleBadgeData = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const { BadgeNumber, id } = this.state;
      const badge = BadgeNumber.slice(0, 3).concat(BadgeNumber.slice(4, 7));
      const data = {
        employeeid: id,
        badgeid: `BB${badge}`,
      };
      if (data.badgeid.length === 8) {
        this.props.requestVerifyBadge(data);
      }
    });
  };

  handleData = () => {
    this.props.resetDataEmp();
  };

  handleChangeBox = option => {
    const values = option.map(i => i.value);
    let str = '[';
    values.forEach(ev => {
      str += `,"${ev}"`;
    });
    str += ']';
    const da = str.slice(0, 1);
    const ta = str.slice(2);
    const strVal = da && da.concat(ta);
    this.props.requestGetEmployeeDetail({ value: strVal });
  };

  handleChangeSpace = option => {
    const space = option.map(i => i.value);
    let str = '[';
    space.forEach(ev => {
      str += `,"${ev}"`;
    });
    str += ']';
    const da = str.slice(0, 1);
    const ta = str.slice(2);
    const strVal = da && da.concat(ta);
    this.props.requestGetEmployeeDetail({ space: strVal });
  };

  handleRemoveSpace = data => {
    const space = data.map(i => i.value);
    let str = '[';
    space.forEach(ev => {
      str += `,"${ev}"`;
    });
    str += ']';
    const da = str.slice(0, 1);
    const ta = str.slice(2);
    const strVal = da && da.concat(ta);
    if (strVal === '[') {
      this.props.requestGetEmployeeDetail({ search: '', role: '' });
    } else {
      this.props.requestGetEmployeeDetail({ space: strVal });
    }
  };

  handleRemoveRole = data => {
    const space = data.map(i => i.value);
    let str = '[';
    space.forEach(ev => {
      str += `,"${ev}"`;
    });
    str += ']';
    const da = str.slice(0, 1);
    const ta = str.slice(2);
    const strVal = da && da.concat(ta);
    if (strVal === '[') {
      this.props.requestGetEmployeeDetail({ search: '', role: '' });
    } else {
      this.props.requestGetEmployeeDetail({ value: strVal });
    }
  };

  handleStateClear = () => {
    this.props.clearBoardData();
  };

  handleClickSort = (key, val) => {
    this.setState(prev => ({ sortOrder: { ...prev.sortOrder, [key]: !val } }));
    let sortBy;
    if (val) {
      sortBy = `${[key]}-ASC`;
    } else {
      sortBy = `${[key]}-DESC`;
    }
    this.props.requestGetEmployeeDetail({ sortBy });
  };

  render() {
    const {
      employeeData,
      workSpace,
      employeeCount,
      singleEmployeeData,
      updateEmployee,
      verifyBadgeMsg,
      verifyBadgeSuccess,
      singleEmployeeLoading,
      updateEmployeeLoading,
      employeeLoading,
    } = this.props;
    return (
      <div>
        <Employee
          editEmployee={this.handleEdit}
          handleSubmit={this.handleSubmit}
          employeeData={employeeData}
          handleSearch={this.handleSearch}
          handleSearcha={this.handleSearcha}
          workSpace={workSpace}
          singleEmployeeData={singleEmployeeData}
          handleChange={this.handleChange}
          state={this.state}
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          employeeCount={employeeCount}
          handleSelectChange={this.handleSelectChange}
          handleChangeBox={this.handleChangeBox}
          handleBadgeData={this.handleBadgeData}
          handleData={this.handleData}
          updateEmployee={updateEmployee}
          handleChangeSpace={this.handleChangeSpace}
          verifyBadgeSuccess={verifyBadgeSuccess}
          verifyBadgeMsg={verifyBadgeMsg}
          handleStateClear={this.handleStateClear}
          singleEmployeeLoading={singleEmployeeLoading}
          handleClickSort={this.handleClickSort}
          updateEmployeeLoading={updateEmployeeLoading}
          employeeLoading={employeeLoading}
          handleRemoveSpace={this.handleRemoveSpace}
          handleRemoveRole={this.handleRemoveRole}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { employee, locationData } = state;
  return {
    employeeData:
      employee &&
      employee.EmployeeDetail &&
      employee.EmployeeDetail.employee &&
      employee.EmployeeDetail.employee.userData,
    singleEmployeeData:
      employee &&
      employee.EditEmployeeDetail &&
      employee.EditEmployeeDetail.singleEmployee,
    singleEmployeeLoading:
      employee &&
      employee.EditEmployeeDetail &&
      employee.EditEmployeeDetail.loading,
    workSpace:
      employee &&
      employee.workspotDetail &&
      employee.workspotDetail.workspotData,
    employeeCount:
      employee &&
      employee.EmployeeDetail &&
      employee.EmployeeDetail.employee &&
      employee.EmployeeDetail.employee.count,
    updateEmployee: employee && employee.UpdateEmployee,
    verifyBadge: locationData && locationData.verifyBadge,
    verifyBadgeSuccess:
      locationData &&
      locationData.verifyBadge &&
      locationData.verifyBadge.success,
    verifyBadgeMsg:
      locationData &&
      locationData.verifyBadge &&
      locationData.verifyBadge.message,
    updateEmployeeLoading:
      employee && employee.UpdateEmployee && employee.UpdateEmployee.loading,
    employeeLoading:
      employee && employee.EmployeeDetail && employee.EmployeeDetail.loading,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetEmployeeDetail: payload =>
      dispatch(requestGetEmployeeDetail(payload)),
    requestEditEmployeeDetail: payload =>
      dispatch(requestEditEmployeeDetail(payload)),
    requestUpdateEmployeeDetail: payload =>
      dispatch(requestUpdateEmployeeDetail(payload)),
    requestGetWorkspace: payload => dispatch(requestGetWorkspace(payload)),
    clearBoardData: () => dispatch(clearBoardData()),
    requestVerifyBadge: payload => dispatch(requestVerifyBadge(payload)),
    resetDataEmp: () => dispatch(resetDataEmp()),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'employee', reducer });
const withSaga = injectSaga({ key: 'employee', saga });

EmployeePage.propTypes = {
  requestGetEmployeeDetail: PropTypes.object,
  employeeData: PropTypes.object,
  requestEditEmployeeDetail: PropTypes.object,
  singleEmployeeData: PropTypes.object,
  requestUpdateEmployeeDetail: PropTypes.object,
  requestGetWorkspace: PropTypes.object,
  workSpace: PropTypes.object,
  employeeCount: PropTypes.number,
  requestVerifyBadge: PropTypes.object,
  updateEmployee: PropTypes.object,
  // handleData: PropTypes.func,
  resetDataEmp: PropTypes.object,
  verifyBadge: PropTypes.object,
  verifyBadgeMsg: PropTypes.string,
  verifyBadgeSuccess: PropTypes.bool,
  clearBoardData: PropTypes.func,
  singleEmployeeLoading: PropTypes.bool,
  updateEmployeeLoading: PropTypes.bool,
  employeeLoading: PropTypes.bool,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EmployeePage);
