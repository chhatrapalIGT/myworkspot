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
      floor: '',
      build: '',
      AssignedSpace: '',
      selectedOption: [],
      selectedRole: [],
      EditModel: false,
      handleUnassign: false,
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

  getEmpData = (id, search, value, space, sortBy, page, limit) => {
    const finalPayload = {
      id,
      search,
      value,
      space,
      sortBy,
      page,
      limit,
    };
    this.props.requestGetEmployeeDetail(finalPayload);
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 });
    this.getEmpData(
      '',
      '',
      this.state.strVal,
      this.state.strSpace,
      this.state.sortBy,
      1,
      e,
    );
  };

  handlePageChange = e => {
    const { limit } = this.state;
    this.setState({ page: e });
    this.getEmpData(
      '',
      '',
      this.state.strVal,
      this.state.strSpace,
      this.state.sortBy,
      e,
      limit,
    );
  };

  componentDidMount() {
    this.props.requestGetEmployeeDetail({ search: '', role: '' });
    this.props.requestGetWorkspace();
  }

  componentDidUpdate() {
    const { updateEmployee, apiMessage } = this.props;
    if (updateEmployee && updateEmployee.success) {
      setTimeout(() => {
        this.clearAssign();
        this.props.resetDataEmp();
        this.props.requestGetEmployeeDetail({ search: '', role: '' });
      }, 3000);
    }

    if (apiMessage) {
      setTimeout(() => {
        this.props.resetDataEmp();
      }, 5000);
    }
  }

  clearAssign = () => {
    this.setState({ handleUnassign: false });
  };

  handleEdit = ID => {
    this.setState({ isEdit: true, id: ID, hasData: true });
    this.props.requestEditEmployeeDetail(ID);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { role, BadgeNumber, id, AssignedSpace, handleUnassign } = this.state;
    const { verifyBadge } = this.props;
    const badge = BadgeNumber.slice(0, 3).concat(BadgeNumber.slice(4, 7));
    const permanentdeskNo = handleUnassign ? 'Unassign' : AssignedSpace;
    if (BadgeNumber.length) {
      this.props.requestUpdateEmployeeDetail({
        role: this.state.role || 'Admin',
        badgeNo: `BB${badge}`,
        permanentdeskNo,
        emp_id: id,
      });
    }
  };

  handleUnassignedSpace = (name, val) => {
    this.setState({ [name]: !val });
    this.setState({ floor: '', build: '', AssignedSpace: '' });
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
          role: this.state.role,
          limit: this.state.limit,
          page: this.state.page,
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
        isAdminpanel: true,
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
    this.setState({ selectedRole: option }, () => {
      let finalRole;
      const val = this.state.selectedRole.length
        ? this.state.selectedRole[0].name
        : '';
      if (this.state.selectedRole.length > 1) {
        finalRole = val.concat(
          `; ${this.state.selectedRole ? this.state.selectedRole[1].name : ''}`,
        );
        this.setState({ finalRole });
      } else if (this.state.selectedRole.length > 0) {
        finalRole = val;
      }
      this.setState({ finalRole });
    });
    let str = '[';
    values.forEach(ev => {
      str += `,"${ev}"`;
    });
    str += ']';
    const da = str.slice(0, 1);
    const ta = str.slice(2);
    const strVal = values.length !== 0 ? da && da.concat(ta) : '';
    this.setState({ strVal });

    this.props.requestGetEmployeeDetail({
      value: strVal,
      space: this.state.strSpace,
      limit: this.state.limit,
      page: this.state.page,
    });
  };

  handleChangeSpace = option => {
    const space = option.map(i => i.value);
    let finalVal;
    this.setState({ selectedOption: option }, () => {
      const val = this.state.selectedOption.length
        ? this.state.selectedOption[0].name
        : '';
      if (this.state.selectedOption.length > 1) {
        const length = `, +${this.state.selectedOption.length - 1}`;
        finalVal = val.concat(length);
        this.setState({ finalVal });
      } else if (this.state.selectedOption.length > 0) {
        finalVal = val;
      }
      this.setState({ finalVal });
      let str = '[';
      space.forEach(ev => {
        str += `,"${ev}"`;
      });
      str += ']';
      const da = str.slice(0, 1);
      const ta = str.slice(2);
      const strSpace = space.length !== 0 ? da && da.concat(ta) : '';
      this.setState({ strSpace });

      this.props.requestGetEmployeeDetail({
        space: strSpace,
        value: this.state.strVal,
        limit: this.state.limit,
        page: this.state.page,
      });
    });
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
    this.setState({ sortBy });
    this.props.requestGetEmployeeDetail({
      sortBy,
      limit: this.state.limit,
      page: this.state.page,
    });
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
      apiMessage,
      apiSuccess,
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
          apiSuccess={apiSuccess}
          apiMessage={apiMessage}
          handleUnassignedSpace={this.handleUnassignedSpace}
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
    apiMessage: employee && employee.apiMessage,
    apiSuccess: employee && employee.apiSuccess,
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
)(EmployeePage);
