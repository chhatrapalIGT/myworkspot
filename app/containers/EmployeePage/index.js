/* eslint-disable no-shadow */
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
  clearEmp,
  requestgetUserRole,
} from './action';

import {
  requestVerifyBadge,
  clearBoardData,
  requestGetOfficeLocation,
} from '../onBoardingPage/actions';
import Profile from '../../components/assets/images/profileof.png';

class EmployeePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isEdit: false,
      email: '',
      role: '',
      BadgeNumber: '',
      hasData: true,
      permanentdeskId: '',
      page: 1,
      limit: 10,
      deskLocationname: '',
      deskFloor: '',
      id: '',
      floor: '',
      build: 0,
      AssignedSpace: '',
      finalOfficeVal: 'All',
      finalRoleVal: 'All',
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
            ? Number(data.deskBuilding)
            : data.deskFloor !== null
            ? Number(data.deskFloor)
            : '',
        AssignedSpace: data.AssignedSpaceId,
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

  onCancel = () => {
    const { singleEmployeeData } = this.props;
    const building =
      singleEmployeeData.deskFloor !== null &&
      singleEmployeeData.deskBuilding !== null
        ? singleEmployeeData.deskFloor.concat(singleEmployeeData.deskBuilding)
        : singleEmployeeData.deskBuilding !== null
        ? singleEmployeeData.deskBuilding
        : singleEmployeeData.deskFloor !== null
        ? singleEmployeeData.deskFloor
        : '';
    this.setState({
      build: Number(building),
      floor: singleEmployeeData.deskLocationId,
      AssignedSpace: singleEmployeeData.AssignedSpace,
    });
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 });
    this.getEmpData(
      '',
      this.state.searchVal,
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
      this.state.searchVal,
      this.state.strVal,
      this.state.strSpace,
      this.state.sortBy,
      e,
      limit,
    );
  };

  componentDidMount() {
    this.props.requestGetOfficeLocation({});
    this.props.requestgetUserRole();
    this.props.requestGetEmployeeDetail({ search: '', role: '' });
    this.props.requestGetWorkspace();
  }

  componentWillUnmount() {
    this.props.resetDataEmp();
    this.props.clearEmp();
  }

  componentDidUpdate() {
    const { updateEmployee, apiMessage } = this.props;
    const { strVal, strSpace, sortBy, searchVal } = this.state;
    if (updateEmployee && updateEmployee.success) {
      this.props.clearEmp();
      this.props.requestGetEmployeeDetail({
        search: searchVal,
        value: strVal,
        space: strSpace,
        sortBy,
        page: this.state.page,
        limit: this.state.limit,
      });
      setTimeout(() => {
        this.clearAssign();
        this.props.resetDataEmp();
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

  handleRole = value => {
    this.setState({ role: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { BadgeNumber, id, AssignedSpace, handleUnassign } = this.state;
    const badge = BadgeNumber.slice(0, 3).concat(BadgeNumber.slice(4, 7));
    const permanentdeskId = handleUnassign ? 'Unassign' : AssignedSpace;
    this.props.requestUpdateEmployeeDetail({
      role: this.state.role,
      badgeNo: badge !== '' ? `BB${badge}` : '',
      permanentdeskId,
      emp_id: id,
    });
  };

  handleUnassignedSpace = (name, val) => {
    this.setState({ [name]: !val });
    this.setState({ floor: '', build: '', AssignedSpace: '' });
  };

  handleChange = event => {
    const { value, name } = event.target;
    if (name === 'floor') {
      this.setState({
        [name]: value,
        handleUnassign: false,
      });
    } else {
      this.setState({
        [name]: Number(value),
      });
    }
  };

  handleSearcha = e => {
    const { name, value } = e.target;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      this.setState({ [name]: value }, () => {
        if (this.state.searchVal !== '') {
          this.getEmpData(
            '',
            this.state.searchVal,
            this.state.strVal,
            this.state.strSpace,
            this.state.sortBy,
            this.state.page,
            this.state.limit,
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

  handleBadgeData = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => {
      const { BadgeNumber, id } = this.state;
      const ele = document.getElementById('badgeUpdate');
      // eslint-disable-next-line func-names
      ele.onkeyup = function(e) {
        if (ele.value.length === 3 && e.key !== 'Backspace') {
          ele.value += '-';
        }
      };
      const badge = BadgeNumber.slice(0, 3).concat(BadgeNumber.slice(4, 7));
      const data = {
        employeeid: id,
        badgeid: `BB${badge}`,
        isAdminpanel: true,
      };
      if (ele.value.length === 7) {
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
      this.setState({ page: 1 });
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
      search: this.state.searchVal,
      limit: this.state.limit,
    });
  };

  handleSelectedRole = option => {
    const space = [];
    option.map(i => {
      if (i.isSelected) {
        space.push(i.value);
      }
      return true;
    });
    const selectRoleList = option.filter(item => item.isSelected === true);
    let finalRoleVal;
    this.setState({ selectedRole: selectRoleList }, () => {
      const val = this.state.selectedRole.length
        ? this.state.selectedRole[0].name
        : '';

      if (val === 'All') {
        finalRoleVal = val;
      } else if (this.state.selectedRole.length > 1) {
        const length = `, +${this.state.selectedRole.length - 1}`;
        finalRoleVal = val.concat(length);
        this.setState({ finalRoleVal });
      } else if (this.state.selectedRole.length > 0) {
        finalRoleVal = val;
      } else if (!this.state.selectedRole.length) {
        finalRoleVal = '';
      }
      this.setState({ finalRoleVal });
      const strArr = space.filter(i => i !== 'All');
      this.setState({ page: 1 });
      if (this.state.typingTimeout) {
        clearTimeout(this.state.typingTimeout);
      }
      const timeoutId = setTimeout(() => {
        this.setState({ strVal: strArr }, () => {
          this.props.requestGetEmployeeDetail({
            value: strArr,
            space: this.state.strSpace,
            search: this.state.searchVal,
            limit: this.state.limit,
          });
        });
      }, 1000);
      this.setState({
        typingTimeout: timeoutId,
      });
    });
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
      const timeoutId = setTimeout(() => {
        this.setState({ strSpace: strArr }, () => {
          this.props.requestGetEmployeeDetail({
            search: this.state.searchVal,
            value: this.state.strVal,
            space: strArr,
            sortBy: this.state.sortBy,
            limit: this.state.limit,
            page: this.state.page,
          });
        });
      }, 1000);
      this.setState({
        typingTimeout: timeoutId,
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
      search: this.state.searchVal,
      value: this.state.strVal,
      space: this.state.strSpace,
      sortBy,
      limit: this.state.limit,
      page: this.state.page,
    });
  };

  replaceImage = error => {
    // eslint-disable-next-line no-param-reassign
    error.target.src = Profile;
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
      officeLocation,
      userRoles,
      apiMessage,
      apiSuccess,
      userMessage,
      userMessageStatus,
      empTotalPage,
    } = this.props;
    return (
      <div>
        <Employee
          empTotalPage={empTotalPage}
          editEmployee={this.handleEdit}
          handleRole={this.handleRole}
          handleSubmit={this.handleSubmit}
          employeeData={employeeData}
          userRoles={userRoles}
          handleSearch={this.handleSearch}
          handleSearcha={this.handleSearcha}
          workSpace={workSpace}
          singleEmployeeData={singleEmployeeData}
          handleChange={this.handleChange}
          state={this.state}
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          employeeCount={employeeCount}
          handleSelectedoffice={this.handleSelectedoffice}
          handleSelectedRole={this.handleSelectedRole}
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
          officeLocation={officeLocation}
          apiSuccess={apiSuccess}
          apiMessage={apiMessage}
          userMessage={userMessage}
          userMessageStatus={userMessageStatus}
          handleUnassignedSpace={this.handleUnassignedSpace}
          clearAssign={this.clearAssign}
          onCancel={this.onCancel}
          replaceImage={this.replaceImage}
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
    userRoles: employee && employee.userRole && employee.userRole.userRoles,
    userMessage: employee && employee.userRole && employee.userRole.apiMessage,
    empTotalPage:
      employee &&
      employee.EmployeeDetail &&
      employee.EmployeeDetail.employee &&
      employee.EmployeeDetail.employee.totalPages,
    userMessageStatus:
      employee && employee.userRole && employee.userRole.apiSuccess,
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
    officeLocation:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.location,
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
    requestgetUserRole: payload => dispatch(requestgetUserRole(payload)),
    requestEditEmployeeDetail: payload =>
      dispatch(requestEditEmployeeDetail(payload)),
    requestUpdateEmployeeDetail: payload =>
      dispatch(requestUpdateEmployeeDetail(payload)),
    requestGetOfficeLocation: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    requestGetWorkspace: payload => dispatch(requestGetWorkspace(payload)),
    clearBoardData: () => dispatch(clearBoardData()),
    requestVerifyBadge: payload => dispatch(requestVerifyBadge(payload)),
    resetDataEmp: () => dispatch(resetDataEmp()),
    clearEmp: () => dispatch(clearEmp()),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'employee', reducer });
const withSaga = injectSaga({ key: 'employee', saga });

EmployeePage.propTypes = {
  requestGetEmployeeDetail: PropTypes.object,
  requestgetUserRole: PropTypes.func,
  userRoles: PropTypes.object,
  employeeData: PropTypes.object,
  requestEditEmployeeDetail: PropTypes.object,
  singleEmployeeData: PropTypes.object,
  requestUpdateEmployeeDetail: PropTypes.object,
  requestGetWorkspace: PropTypes.object,
  workSpace: PropTypes.object,
  employeeCount: PropTypes.number,
  requestVerifyBadge: PropTypes.object,
  updateEmployee: PropTypes.object,
  requestGetOfficeLocation: PropTypes.func,
  officeLocation: PropTypes.object,
  resetDataEmp: PropTypes.object,
  // verifyBadge: PropTypes.object,
  empTotalPage: PropTypes.number,
  verifyBadgeMsg: PropTypes.string,
  verifyBadgeSuccess: PropTypes.bool,
  clearBoardData: PropTypes.func,
  singleEmployeeLoading: PropTypes.bool,
  updateEmployeeLoading: PropTypes.bool,
  employeeLoading: PropTypes.bool,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
  userMessage: PropTypes.string,
  userMessageStatus: PropTypes.bool,
  clearEmp: PropTypes.func,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EmployeePage);
