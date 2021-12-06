/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Multiselect from 'multiselect-react-dropdown';
import Pagination from './Pagination';
import Menu from '../assets/images/admin/menu.png';
import Profile from '../assets/images/profileof.png';
import Edit from '../assets/images/edit.svg';
import Sort from '../assets/images/sort.png';
import Search from '../assets/images/admin/search.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
import Warnning from '../../images/officeImage/Warnning.png';
const options = [
  { cat: 'User ', key: 'User', value: 'User' },
  { cat: 'Admin', key: 'Admin', value: 'Admin' },
  // { cat: 'Manager', key: 'Manager', value: 'Manager' },
];
const optionsLocation = [
  { cat: 'Washington, DC', name: 'DC', value: 'DC' },
  { cat: 'Richmond, VA', name: 'RIC', value: 'RIC' },
  { cat: 'Birmingham, AL', name: 'BHM', value: 'BHM' },
  { cat: 'Bloomington, MN', name: 'BLM', value: 'BLM' },
  // { cat: 'Remote Work', name: 'RW', value: 'RW' },
];
const Employee = props => {
  const { state, employeeData } = props;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (state.page - 1) * state.limit;
    const lastPageIndex = firstPageIndex + state.limit;
    return employeeData
      ? employeeData.slice(firstPageIndex, lastPageIndex)
      : [];
  }, [employeeData]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [build, setBuild] = useState(8);
  const data =
    props.workSpace &&
    props.workSpace.find(i =>
      props.state.floor === i.id ? i.FloorBuilding : '',
    );

  const finalValData =
    props.workSpace && props.workSpace.filter(obj => obj.id !== 'RW');

  const space =
    data &&
    data.FloorBuilding.find(
      obj => obj && obj.floorAndBuilding === props.state.build,
    );
  const workspace = space && space.neighborhood.map(i => i.neighborWorkspace);
  const finalData = [];

  workspace &&
    workspace.map(i => {
      if (i && i.length > 0) {
        i.map(j => finalData.push({ officeSpace: j.workspacenumber }));
      }
    });

  useEffect(() => {
    if (props.updateEmployee && props.updateEmployee.success) {
      setShow(!show);
    }
  }, [props.updateEmployee.success]);

  return (
    <>
      {props.updateEmployee && props.updateEmployee.message && (
        <div
          className={`"alert fade show mx-auto ${
            props.updateEmployee && props.updateEmployee.success
              ? 'alert alert-success'
              : 'alert alert-danger '
          } "`}
        >
          <div>
            <img
              src={
                props.updateEmployee && props.updateEmployee.success
                  ? checkedCircle
                  : crossCircle
              }
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />

            {props.updateEmployee && props.updateEmployee.message}
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
        <div className="office_maps">
          <div className="container">
            <h4 className="common-title mb-4">Employees</h4>
            <div className="head d-flex align-items-center">
              <div className="office-selections wrap">
                <div className="menu-img">
                  <img src={Menu} className="img-fluid" alt="" />
                </div>

                <div className="selction_one emp_drop mat-10 ww-100">
                  <label htmlFor="role">Role</label>
                  <Multiselect
                    displayValue="cat"
                    // onKeyPressFn={function noRefCheck() {}}
                    // onRemove={function noRefCheck() {}}
                    // onSearch={function noRefCheck() {}}
                    selectedValues={props.state.selectedOption}
                    onSelect={props.handleChangeBox}
                    options={options}
                    hideSelectedOptions={false}
                    avoidHighlightFirstOption
                    closeOnSelect={false}
                    onRemove={props.handleRemoveRole}
                    closeMenuOnSelect
                    showCheckbox
                    name="role"
                    hidePlaceholder="true"
                    style={{
                      chips: {
                        background: 'transparent',
                        color: 'black',
                        padding: '15px 10px 0px',
                      },
                    }}
                  />
                </div>
                <div className="selction_one emp_drop mat-10 ww-100">
                  <label htmlFor="space">Permanent Space</label>
                  <Multiselect
                    displayValue="cat"
                    // onKeyPressFn={function noRefCheck() {}}
                    // onRemove={function noRefCheck() {}}
                    // onSearch={function noRefCheck() {}}
                    onSelect={props.handleChangeSpace}
                    selectedValues={props.state.selectedOption}
                    options={optionsLocation}
                    onRemove={props.handleRemoveSpace}
                    hideSelectedOptions={false}
                    avoidHighlightFirstOption
                    closeOnSelect={false}
                    name="space"
                    showCheckbox
                    closeMenuOnSelect={false}
                    hidePlaceholder="true"
                    style={{
                      chips: {
                        background: 'transparent',
                        color: 'black',
                        padding: '15px 10px 0px',
                      },
                    }}
                  />
                </div>
              </div>
              <div className="search-box">
                <div className="pos-rela">
                  <input
                    type="text"
                    onChange={props.handleSearcha}
                    name="searchVal"
                    placeholder="Search"
                  />
                  <div className="search-img">
                    <img src={Search} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="emp-table">
              <table>
                <tr>
                  <th>
                    Name{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      name="nameSorting"
                      aria-hidden="true"
                      value={props.state.nameSorting}
                      onClick={() =>
                        props.handleClickSort(
                          'nameSorting',
                          props.state.nameSorting,
                        )
                      }
                    />
                  </th>
                  <th>
                    Role{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      name="RoleSorting"
                      alt=""
                      aria-hidden="true"
                      value={props.state.RoleSorting}
                      onClick={() =>
                        props.handleClickSort(
                          'RoleSorting',
                          props.state.RoleSorting,
                        )
                      }
                    />
                  </th>
                  <th>
                    Permanent Space{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      aria-hidden="true"
                      name="primaryOfficeSorting"
                      value={props.state.primaryOfficeSorting}
                      onClick={() =>
                        props.handleClickSort(
                          'primaryOfficeSorting',
                          props.state.primaryOfficeSorting,
                        )
                      }
                    />
                  </th>
                  <th>
                    Email{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      aria-hidden="true"
                      name="emailSorting"
                      value={props.state.emailSorting}
                      onClick={() =>
                        props.handleClickSort(
                          'emailSorting',
                          props.state.emailSorting,
                        )
                      }
                    />
                  </th>
                  <th>
                    Badge{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      name="badgeSorting"
                      value={props.state.badgeSorting}
                      aria-hidden="true"
                      onClick={() =>
                        props.handleClickSort(
                          'badgeSorting',
                          props.state.badgeSorting,
                        )
                      }
                    />
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
                ) : (
                  employeeData &&
                  employeeData.map(i => (
                    <tr>
                      <td>
                        <img
                          src={i.photo || Profile}
                          className="img-fluid user-img"
                          alt=""
                          style={{ height: '32px' }}
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
            {!props.employeeLoading && (
              <div className="table-bot-flex">
                <div className="selction_one">
                  <select
                    name=""
                    id=""
                    className="pad-manual"
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
                        src={
                          (props.singleEmployeeData &&
                            props.singleEmployeeData.photo) ||
                          Profile
                        }
                        className="img-fluid"
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
                        Yes
                      </p>
                    </div>
                  </div>
                  <form onSubmit={props.handleSubmit}>
                    <div className="selction_one ww-100">
                      <label htmlFor="role">Role</label>
                      <select
                        onChange={props.handleChange}
                        value={props.state.role}
                        name="role"
                      >
                        <option value="Admin"> Admin </option>
                        <option value="User"> User </option>
                      </select>
                    </div>

                    <div className="selction_one after-none ww-100">
                      <label htmlFor="badge" style={{ top: '5px' }}>
                        Badge Number
                      </label>
                      <div className="prefix">BB</div>
                      <input
                        name="BadgeNumber"
                        type="text"
                        placeholder="XXX-XXX"
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
                      <div
                        className={`pro-title1 red ${
                          props.state.AssignedSpace !== '' ? 'unassign' : ''
                        }`}
                      >
                        Unassign
                      </div>
                    </div>

                    <div className="selction_one mat-10 ww-100">
                      <label htmlFor>Office</label>
                      <select
                        className="pad-manual"
                        onChange={props.handleChange}
                        name="floor"
                        value={props.state.floor || 'DC'}
                      >
                        <option id="spval" style={{ color: 'gray' }}>
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

                    <div className="selction_one mat-10 ww-100">
                      <label htmlFor>Building/Floor</label>
                      <select
                        onChange={props.handleChange}
                        name="build"
                        value={`${props.state.build}`}
                        className="pad-manual"
                      >
                        <option id="spval" style={{ color: 'gray' }}>
                          Select Building/Floor
                        </option>
                        {data &&
                          data.FloorBuilding.map(i => (
                            <>
                              <option
                                value={
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

                    <div className="selction_one ww-100">
                      <label htmlFor style={{ color: 'gray' }}>
                        Space
                      </label>
                      <select
                        onChange={props.handleChange}
                        name="AssignedSpace"
                        value={props.state.AssignedSpace}
                        defaultValue={finalData[0]}
                        className="pad-manual"
                      >
                        <option id="spval">select Spaces</option>
                        {finalData &&
                          finalData.map(i => (
                            <option value={i.officeSpace} name="AssignedSpace">
                              {' '}
                              {i && i.officeSpace}{' '}
                            </option>
                          ))}
                      </select>
                    </div>

                    <p className="red minus-10" id="error">
                      <img
                        src="images/red-info.png"
                        className="img-fluid v-bot"
                        alt=""
                      />{' '}
                      You have to fill in this field to assign a space
                    </p>

                    <div className="modal-footer mt-2 border-none pad-0">
                      <button
                        type="submit"
                        className={
                          !props.state.BadgeNumber.length
                            ? 'btn disable-data'
                            : 'btn save-data'
                        }
                        id="save-btn"
                        onClick={() => {
                          // handleClose();
                          props.handleStateClear();
                        }}
                        value="Save"
                      >
                        Save
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
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
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
  handleChange: PropTypes.func,
  workSpace: PropTypes.object,
  state: PropTypes.object,
  employeeCount: PropTypes.number,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handleSearcha: PropTypes.func,
  handleChangeBox: PropTypes.func,
  handleBadgeData: PropTypes.func,
  updateEmployee: PropTypes.object,
  handleData: PropTypes.func,
  handleChangeSpace: PropTypes.func,
  verifyBadgeMsg: PropTypes.string,
  verifyBadgeSuccess: PropTypes.bool,
  handleStateClear: PropTypes.func,
  handleClickSort: PropTypes.func,
  singleEmployeeLoading: PropTypes.bool,
  updateEmployeeLoading: PropTypes.bool,
  employeeLoading: PropTypes.bool,
  handleRemoveSpace: PropTypes.func,
  handleRemoveRole: PropTypes.func,
};

export default Employee;
