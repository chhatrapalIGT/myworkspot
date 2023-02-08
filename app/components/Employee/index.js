/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useMemo, useEffect } from 'react';
import { Image, Modal, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import createClass from 'create-react-class';
import Select, { components } from 'react-select';
import Pagination from './Pagination';
import Menu from '../assets/images/admin/menu.png';
import Profile from '../assets/images/profileof.png';
import Edit from '../assets/images/edit.svg';
import Sort from '../assets/images/sort.png';
import SelectDownArrow from '../assets/images/down-arrow.svg';
import Search from '../assets/images/admin/search.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
import Warnning from '../../images/officeImage/Warnning.png';
import { CONSTANT } from '../../enum';
const { USER_IMAGE_SRC_LIVE } = CONSTANT;
const Employee = props => {
  const {
    state,
    singleEmployeeData,
    employeeData,
    officeLocation,
    userRoles,
  } = props;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (state.page - 1) * state.limit;
    const lastPageIndex = firstPageIndex + state.limit;
    return employeeData
      ? employeeData.slice(firstPageIndex, lastPageIndex)
      : [];
  }, [employeeData]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [officeLocations, setOfficeLocations] = useState([
    { label: 'All', name: 'All', value: 'All' },
  ]);
  const [userRole, setUserRole] = useState([
    { label: 'All', name: 'All', value: 'All' },
  ]);
  const [role, setRole] = useState([]);

  useEffect(() => {
    const tempArr = [
      { label: 'All', name: 'All', value: 'All', isSelected: true },
    ];
    tempArr.push({
      label: 'Not Assigned',
      name: 'Not Assigned',
      value: 'Not Assigned',
      isSelected: true,
    });
    officeLocation &&
      officeLocation.map(obj => {
        if (obj.id === 'DC' || obj.id === 'RIC') {
          tempArr.push({
            label: obj.locationname,
            name: obj.locationname,
            value: obj.id,
            isSelected: true,
          });
        }
      });

    setOfficeLocations(tempArr);
  }, [officeLocation]);

  useEffect(() => {
    const tempArr = [
      { label: 'All', name: 'All', value: 'All', isSelected: true },
    ];

    userRoles &&
      userRoles.map(obj => {
        tempArr.push({
          label: obj.role,
          name: obj.role,
          value: obj.role,
          isSelected: true,
        });
      });
    const FilterArr = tempArr.filter(ele => ele.name !== 'All');
    setRole(FilterArr);
    setUserRole(tempArr);
  }, [userRoles]);

  const data =
    props.workSpace &&
    props.workSpace.find(i =>
      props.state.floor === i.id ? i.FloorBuilding : '',
    );

  const finalValData =
    props.workSpace &&
    props.workSpace.filter(
      obj => obj.id !== 'RW' && obj.id !== 'BHM' && obj.id !== 'BLM',
    );

  const space =
    data &&
    data.FloorBuilding.find(
      obj => obj && Number(obj.floor) === props.state.build,
    );

  const workspace = space && space.neighborhood.map(i => i.neighborWorkspace);
  const finalData = [];
  workspace &&
    workspace.map(i => {
      if (i && i.length > 0) {
        i.map(j =>
          finalData.push({ officeSpace: j.workspacenumber, officeId: j.id }),
        );
      }
    });
  useEffect(() => {
    if (props.updateEmployee && props.updateEmployee.success) {
      setShow(!show);
    }
  }, [props.updateEmployee.success]);

  const handleSelectedRoleList = (index, status) => {
    let roleList = [];
    roleList =
      userRole &&
      userRole.map((item, i) => {
        if (index === 0) {
          return {
            label: item.name,
            name: item.name,
            value: item.value,
            isSelected: status,
          };
        }
        if (i === index) {
          return {
            label: item.name,
            name: item.name,
            value: item.value,
            isSelected: status,
          };
        }
        return item;
      });

    if (roleList.length) {
      const isAllChecked =
        roleList.filter(ele => ele.name !== 'All' && ele.isSelected === true)
          .length ===
        roleList.length - 1;

      roleList = roleList.map(ele => ({
        ...ele,
        isSelected: ele.name === 'All' ? isAllChecked : ele.isSelected,
      }));
    }
    setUserRole(roleList);
    props.handleSelectedRole(roleList);
  };

  const handleSelectedList = (index, status) => {
    let officeList = [];
    officeList =
      officeLocations &&
      officeLocations.map((item, i) => {
        if (index === 0) {
          return {
            label: item.name,
            name: item.name,
            value: item.value,
            isSelected: status,
          };
        }
        if (i === index) {
          return {
            label: item.name,
            name: item.name,
            value: item.value,
            isSelected: status,
          };
        }
        return item;
      });

    if (officeList.length) {
      const isAllChecked =
        officeList.filter(ele => ele.name !== 'All' && ele.isSelected === true)
          .length ===
        officeList.length - 1;

      officeList = officeList.map(ele => ({
        ...ele,
        isSelected: ele.name === 'All' ? isAllChecked : ele.isSelected,
      }));
    }
    setOfficeLocations(officeList);
    props.handleSelectedoffice(officeList);
  };

  return (
    <>
      {props.apiMessage && (
        <div
          className={`"alert fade show mx-auto ${
            props.apiSuccess ? 'alert alert-success' : 'alert alert-danger '
          } "`}
        >
          <div>
            <img
              src={props.apiSuccess ? checkedCircle : crossCircle}
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />

            {props.apiMessage}
          </div>
          <div
            style={{ float: 'right', fontSize: 'large', marginLeft: '10px' }}
            onClick={props.handleData}
            className="day-pointer"
            aria-hidden="true"
          >
            &#10006;
          </div>
        </div>
      )}
      <div className="wrapper_main emp_wrapper">
        <div className="office_maps" style={{ marginBottom: '95px' }}>
          <div className="container">
            <h4 className="common-title mb-4">Employees</h4>
            <div className="head d-flex align-items-center">
              <div className="office-selections wrap">
                <div className="menu-img">
                  <img src={Menu} className="img-fluid" alt="" />
                </div>
                <div className="custom-filter-dropdown pointer">
                  <span>Role</span>
                  <div className="dropdown">
                    <input
                      type="input"
                      style={{ cursor: 'alias' }}
                      className="dropdown-toggle pointer"
                      value={state.finalRoleVal}
                      placeholder="Select..."
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton1"
                    />
                    <Image
                      className="img_select"
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton1"
                      src={SelectDownArrow}
                    />
                    <ul
                      className="dropdown-menu"
                      id="dropdownMenuButton1"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {userRole &&
                        userRole.map((item, index) => (
                          <li
                            aria-hidden
                            onClick={() =>
                              handleSelectedRoleList(index, !item.isSelected)
                            }
                          >
                            <span>{item.name}</span>
                            <div
                              className={
                                item.isSelected ? 'selected_val float-end' : ''
                              }
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="custom-filter-dropdown pointer">
                  <span>Permanent Space</span>
                  <div className="dropdown">
                    <input
                      type="input"
                      style={{ cursor: 'alias' }}
                      className="dropdown-toggle pointer"
                      value={state.finalOfficeVal}
                      placeholder="Select..."
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton1"
                    />
                    <Image
                      className="img_select pointer"
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton2"
                      src={SelectDownArrow}
                    />
                    <ul
                      className="dropdown-menu"
                      id="dropdownMenuButton1"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      {officeLocations &&
                        officeLocations.map((item, index) => (
                          <li
                            aria-hidden
                            onClick={() =>
                              handleSelectedList(index, !item.isSelected)
                            }
                          >
                            <span>{item.name}</span>
                            <div
                              className={
                                item.isSelected ? 'selected_val float-end' : ''
                              }
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="search-box">
                <div className="pos-rela">
                  <input
                    type="text"
                    onChange={props.handleSearcha}
                    name="searchVal"
                    placeholder="Search..."
                  />
                  <div className="search-img">
                    <img src={Search} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="emp-table emp-text-color table-responsive">
              <table className="table">
                <tr>
                  <th>
                    <span className="d-flex align-items-center">
                      <strong> Name</strong>
                      <span>
                        <img
                          src={Sort}
                          className="img-fluid sort-img"
                          alt=""
                          name="name"
                          aria-hidden="true"
                          value={props.state.name}
                          onClick={() =>
                            props.handleClickSort(
                              'name',
                              props.state.sortOrder.name,
                            )
                          }
                        />
                      </span>
                    </span>
                  </th>
                  <th>
                    <span className="d-flex align-items-center">
                      Role
                      <span>
                        <img
                          src={Sort}
                          className="img-fluid sort-img"
                          name="role"
                          alt=""
                          aria-hidden="true"
                          value={props.state.role}
                          onClick={() =>
                            props.handleClickSort(
                              'role',
                              props.state.sortOrder.role,
                            )
                          }
                        />
                      </span>
                    </span>
                  </th>
                  <th>
                    <span className="d-flex align-items-center">
                      Permanent Space
                      <span>
                        <img
                          src={Sort}
                          className="img-fluid sort-img"
                          alt=""
                          aria-hidden="true"
                          name="primaryOffice"
                          value={props.state.primaryOffice}
                          onClick={() =>
                            props.handleClickSort(
                              'primaryOffice',
                              props.state.sortOrder.primaryOffice,
                            )
                          }
                        />
                      </span>
                    </span>
                  </th>
                  <th>
                    <span className="d-flex align-items-center">
                      Email
                      <span>
                        <img
                          src={Sort}
                          className="img-fluid sort-img"
                          alt=""
                          aria-hidden="true"
                          name="email"
                          value={props.state.Email}
                          onClick={() =>
                            props.handleClickSort(
                              'email',
                              props.state.sortOrder.email,
                            )
                          }
                        />
                      </span>
                    </span>
                  </th>
                  <th>
                    <span className="d-flex align-items-center">
                      Badge
                      <span>
                        <img
                          src={Sort}
                          className="img-fluid sort-img"
                          alt=""
                          name="badge"
                          value={props.state.badge}
                          aria-hidden="true"
                          onClick={() =>
                            props.handleClickSort(
                              'badge',
                              props.state.sortOrder.badge,
                            )
                          }
                        />
                      </span>
                    </span>
                  </th>
                  <th />
                </tr>
                {props.employeeLoading ? (
                  <td colSpan="5">
                    <Spinner
                      className="app-spinner"
                      animation="grow"
                      variant="dark"
                    />
                  </td>
                ) : props.employeeData && props.employeeData.length === 0 ? (
                  <td colSpan="5">
                    <div className="employee-norecord">{'No record found'}</div>
                  </td>
                ) : (
                  employeeData &&
                  employeeData.map(i => (
                    <tr>
                      <td>
                        <img
                          src={`${USER_IMAGE_SRC_LIVE}${i.employeeid}.wiki.jpg`}
                          className="img-fluid table-user-img"
                          alt=""
                          onError={props.replaceImage}
                          style={{
                            borderRadius: '50%',
                            height: '32px',
                            width: '32px',
                          }}
                        />{' '}
                        {i.firstname}
                        {''} {i.lastname}
                      </td>
                      <td>{i.userRole}</td>
                      <td>{i.deskDetails}</td>
                      <td>{i.email}</td>
                      <td>{i.badgeId}</td>
                      <td>
                        {' '}
                        <img
                          src={Edit}
                          onClick={() => {
                            props.editEmployee(i.employeeid);
                            handleShow();
                            props.clearAssign();
                          }}
                          aria-hidden="true"
                          alt="Edit"
                          className="day-pointer"
                        />
                      </td>
                    </tr>
                  ))
                )}
                {/* </tr> */}
              </table>
            </div>
            {!props.employeeLoading &&
              (props.employeeData && props.employeeData.length > 0) && (
                <div className="table-bot-flex">
                  <div className="selction_one">
                    <select
                      name=""
                      id=""
                      className="pad-manual page-color"
                      value={props.state.limit}
                      onChange={e => props.handleLimitChange(e.target.value)}
                    >
                      <option value="10">10 per page</option>
                      <option value="20">20 per page</option>
                      <option value="30">30 per page</option>
                      <option value="40">40 per page</option>
                    </select>
                  </div>
                  <div className="">
                    {state.page * state.limit - (state.limit - 1)} -
                    {state.page * state.limit} of {props.employeeCount} shown
                  </div>
                  <Pagination
                    className="pagination-bar"
                    currentPage={state.page}
                    totalCounts={props.employeeCount * state.limit}
                    totalCount={props.employeeCount}
                    pageSize={state.limit}
                    totalPages={props.empTotalPage}
                    onPageChange={page => props.handlePageChange(page)}
                  />
                </div>
              )}
          </div>
        </div>
        <Modal
          className="modal fade  test_modal"
          id="invite_team"
          show={show}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Employee Info
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShow(false);
                    props.handleStateClear();
                    props.onCancel();
                  }}
                />
              </div>
              {props.singleEmployeeLoading ? (
                <Spinner
                  className="app-spinner"
                  animation="grow"
                  variant="dark"
                />
              ) : (
                <div className="modal-body pt-0">
                  <div className="prof-flex">
                    <div className="mar-4">
                      <img
                        src={`${USER_IMAGE_SRC_LIVE}${props.state.id}.wiki.jpg`}
                        className="img-fluid"
                        onError={props.replaceImage}
                        style={{
                          borderRadius: '50%',
                          height: '120px',
                          width: '120px',
                        }}
                        alt=""
                      />
                    </div>
                    <div className="">
                      <div className="pro-title">
                        {props.singleEmployeeData &&
                          props.singleEmployeeData.FirstName}{' '}
                        {props.singleEmployeeData &&
                          props.singleEmployeeData.LastName}
                      </div>
                      <p>
                        <span className="gray-font">Title:</span>{' '}
                        {props.singleEmployeeData &&
                          props.singleEmployeeData.Title}
                      </p>
                      <p>
                        <span className="gray-font">Primary Office:</span>{' '}
                        {props.singleEmployeeData &&
                          props.singleEmployeeData.deskLocationname}
                      </p>
                      <p>
                        <span className="gray-font">Email:</span>{' '}
                        {props.singleEmployeeData &&
                          props.singleEmployeeData.Email}
                      </p>
                      <p>
                        <span className="gray-font">
                          Private Space Eligible:
                        </span>{' '}
                        {props.singleEmployeeData &&
                          props.singleEmployeeData.leaderscommittee}
                      </p>
                    </div>
                  </div>
                  <form onSubmit={props.handleSubmit}>
                    <div className="selction_one ww-100 pointer">
                      <label htmlFor="role">Role</label>
                      <select
                        onChange={e => {
                          props.handleChange;
                          props.handleRole(e.target.value);
                        }}
                        value={props.state.role}
                        name="role"
                        placeholder="Select role"
                        disabled={
                          sessionStorage.getItem('Admin Owner') === 'false'
                        }
                      >
                        {role &&
                          role.map(ele => (
                            <option key={ele.name} value={ele.name}>
                              {ele.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="selction_one after-none ww-100 pointer">
                      <label htmlFor="badge" style={{ top: '5px' }}>
                        Badge Number
                      </label>
                      <div className="prefix">BB</div>
                      <input
                        name="BadgeNumber"
                        type="text"
                        placeholder="XXX-XXX"
                        maxLength="7"
                        id="badgeUpdate"
                        value={props.state.BadgeNumber}
                        className="form-control"
                        onChange={props.handleBadgeData}
                      />
                      {props.verifyBadgeMsg && !props.verifyBadgeSuccess && (
                        <div className="d-flex" style={{ marginTop: '10px' }}>
                          <img
                            src={Warnning}
                            alt="warn"
                            style={{
                              margin: '4px 5px 0px 0px',
                              height: '14px',
                            }}
                          />
                          <div style={{ color: 'red' }}>
                            {props.verifyBadgeMsg}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="d-flex align-items-center justify-content-between mt-4 mb-2">
                      <div className="pro-title1">Permanent Space</div>
                      {props.state.AssignedSpace !== null &&
                        props.state.AssignedSpace !== '' &&
                        !props.state.handleUnassign && (
                          <button
                            className={`pro-title1 red ${
                              props.state.AssignedSpace !== null
                                ? ''
                                : 'unassign'
                            }`}
                            name="handleUnassign"
                            style={{
                              border: 'none',
                              background: 'transparent',
                            }}
                            onClick={() =>
                              props.handleUnassignedSpace(
                                'handleUnassign',
                                props.state.handleUnassign,
                              )
                            }
                            aria-hidden="true"
                            type="button"
                            disabled={props.state.handleUnassign}
                          >
                            Unassign
                          </button>
                        )}
                    </div>

                    <div className="selction_one mat-10 ww-100 pointer">
                      <label htmlFor>Office</label>
                      <select
                        className="pad-manual"
                        onChange={props.handleChange}
                        name="floor"
                        value={props.state.floor}
                      >
                        <option
                          id="spval1"
                          value=""
                          selected
                          disabled
                          hidden
                          style={{ color: '#526E88' }}
                        >
                          Select Office
                        </option>
                        {finalValData &&
                          finalValData.map(i => (
                            <option name="location" value={i.id}>
                              {i.locationname}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="selction_one mat-10 ww-100 pointer">
                      <label htmlFor>Building/Floor</label>
                      <select
                        onChange={props.handleChange}
                        name="build"
                        value={`${props.state.build}`}
                        className="pad-manual"
                      >
                        <option
                          id="spval2"
                          value=""
                          selected
                          disabled
                          hidden
                          style={{ color: '#526E88' }}
                        >
                          Select Building/Floor
                        </option>
                        {data &&
                          data.FloorBuilding.map(i => (
                            <>
                              <option
                                value={
                                  // i.id
                                  i.floor &&
                                  i.floor !== null &&
                                  i.building &&
                                  i.building !== null
                                    ? `${i.floor}${i.building}`
                                    : i.building && i.building !== null
                                    ? `${i.building}`
                                    : i.floor && i.floor !== null
                                    ? `${i.floor}`
                                    : ''
                                }
                              >
                                {i.floor &&
                                i.floor !== null &&
                                i.building &&
                                i.building !== null
                                  ? `Building ${i.building}, Floor${i.floor}`
                                  : i.building && i.building !== null
                                  ? `Building ${i.building}`
                                  : i.floor && i.floor !== null
                                  ? `Floor ${i.floor}`
                                  : ''}
                              </option>
                            </>
                          ))}
                      </select>
                    </div>

                    <div className="selction_one ww-100 pointer">
                      <label htmlFor style={{ color: '#526E88' }}>
                        Space
                      </label>
                      <select
                        onChange={props.handleChange}
                        name="AssignedSpace"
                        value={props.state.AssignedSpace}
                        placeholder="Select Space"
                        className="pad-manual"
                        // required={
                        //   props.state.build !== '' ||
                        //   (props.state.floor !== null &&
                        //     props.state.floor !== '')
                        // }
                      >
                        <option
                          id="spval gray-font"
                          value=""
                          selected
                          disabled
                          hidden
                          style={{ color: '#526E88' }}
                        >
                          Select Space
                        </option>
                        {finalData &&
                          finalData.map(i => (
                            <>
                              <option value={i.officeId}>
                                {i && i.officeSpace}{' '}
                              </option>
                            </>
                          ))}
                      </select>
                    </div>

                    <div className="modal-footer mt-2 border-none pad-0">
                      <button
                        type="submit"
                        className="btn save-data"
                        id="save-btn"
                        onClick={() => {
                          // handleClose();
                          props.handleStateClear();
                        }}
                        value="Save"
                      >
                        Save{' '}
                        {props.updateEmployeeLoading && (
                          <div className="spinner-border" />
                        )}
                      </button>

                      <button
                        type="button"
                        className="btn dismiss"
                        data-bs-dismiss="modal"
                        onClick={() => {
                          setShow(false);
                          props.handleStateClear();
                          props.onCancel();
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  {props.apiMessage && (
                    <div
                      className={`"alert fade show mx-auto ${
                        props.apiSuccess
                          ? 'alert alert-success'
                          : 'alert alert-danger '
                      } "`}
                      style={{ position: 'revert' }}
                    >
                      <div>
                        <img
                          src={props.apiSuccess ? checkedCircle : crossCircle}
                          alt=""
                          style={{ paddingRight: '5px', marginBottom: ' 4px' }}
                        />
                        {props.apiMessage}
                      </div>
                      <div
                        style={{
                          float: 'right',
                          fontSize: 'large',
                          marginLeft: '10px',
                        }}
                        onClick={props.handleData}
                        className="day-pointer"
                        aria-hidden="true"
                      >
                        &#10006;
                      </div>
                    </div>
                  )}
                  {props.userMessage && (
                    <div
                      className={`"alert fade show mx-auto ${
                        props.apiSuccess
                          ? 'alert alert-success'
                          : 'alert alert-danger '
                      } "`}
                      style={{ position: 'revert' }}
                    >
                      <div>
                        <img
                          src={
                            props.userMessageStatus
                              ? checkedCircle
                              : crossCircle
                          }
                          alt=""
                          style={{ paddingRight: '5px', marginBottom: ' 4px' }}
                        />
                        {props.userMessage}
                      </div>
                      <div
                        style={{
                          float: 'right',
                          fontSize: 'large',
                          marginLeft: '10px',
                        }}
                        onClick={props.handleData}
                        className="day-pointer"
                        aria-hidden="true"
                      >
                        &#10006;
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

Employee.propTypes = {
  editEmployee: PropTypes.func,
  employeeData: PropTypes.object,
  singleEmployeeData: PropTypes.object,
  handleSubmit: PropTypes.func,
  handleRole: PropTypes.func,
  handleChange: PropTypes.func,
  workSpace: PropTypes.object,
  state: PropTypes.object,
  userRoles: PropTypes.object,
  officeLocation: PropTypes.object,
  employeeCount: PropTypes.number,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handleSearcha: PropTypes.func,
  handleBadgeData: PropTypes.func,
  updateEmployee: PropTypes.object,
  handleData: PropTypes.func,
  handleSelectedoffice: PropTypes.func,
  handleSelectedRole: PropTypes.func,
  verifyBadgeMsg: PropTypes.string,
  verifyBadgeSuccess: PropTypes.bool,
  handleStateClear: PropTypes.func,
  handleClickSort: PropTypes.func,
  singleEmployeeLoading: PropTypes.bool,
  updateEmployeeLoading: PropTypes.bool,
  employeeLoading: PropTypes.bool,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
  handleUnassignedSpace: PropTypes.func,
  clearAssign: PropTypes.func,
  onCancel: PropTypes.func,
  replaceImage: PropTypes.func,
  empTotalPage: PropTypes.number,
  userMessage: PropTypes.string,
  userMessageStatus: PropTypes.bool,
};

export default Employee;

document.addEventListener(
  'invalid',
  (function() {
    return function(e) {
      e.preventDefault();
    };
  })(),
  true,
);
