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
} from './action';

class EmployeePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isEdit: false,
      email: '',
      role: '',
      BadgeNumber: '',
      hasData: false,
      permanentdeskNo: '',
      page: 1,
      limit: 10,
      deskLocationname: '',
      deskFloor: '',
      id: '',
      floor: 'DC',
      build: '4',
      AssignedSpace: '',
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { singleEmployeeData } = props;
    const data = singleEmployeeData;
    const { isEdit, hasData, email } = prevState;
    if (data && data.FirstName && email !== data.email && isEdit && !hasData) {
      return {
        name: data.FirstName.concat(data.LastName),
        email: data.email,
        role: data.Role,
        BadgeNumber: data.BadgeNumber,
        deskLocationname: data.deskLocationname,
        build: data.deskFloor,
        AssignedSpace: data.AssignedSpace,
        hasData: true,
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
    this.setState({ limit: e, page: 0 });
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

  handleEdit = ID => {
    this.setState({ isEdit: true, id: ID });
    this.props.requestEditEmployeeDetail(ID);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { role, BadgeNumber, id, AssignedSpace } = this.state;
    this.props.requestUpdateEmployeeDetail({
      role,
      badgeNo: BadgeNumber,
      permanentdeskNo: AssignedSpace,
      emp_id: id,
    });
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

  handleSearch = e => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    let str = '[';
    value.forEach(ev => {
      str += `"${ev}",`;
    });
    str += ']';
    this.setState({ values: value }, () => {
      this.props.requestGetEmployeeDetail({
        role: str,
      });
    });
  };

  // handleChange = option => {
  //   this.setState(() => ({
  //     selectedOption: option,
  //   }));
  // };

  render() {
    const {
      employeeData,
      workSpace,
      employeeCount,
      singleEmployeeData,
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
          // changeAssignedSpace={this.changeAssignedSpace}
          state={this.state}
          handleLimitChange={this.handleLimitChange}
          handlePageChange={this.handlePageChange}
          employeeCount={employeeCount}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { employee } = state;
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
    workSpace:
      employee &&
      employee.workspotDetail &&
      employee.workspotDetail.workspotData,
    employeeCount:
      employee &&
      employee.EmployeeDetail &&
      employee.EmployeeDetail.employee &&
      employee.EmployeeDetail.employee.count,
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
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EmployeePage);
