/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useMemo, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import createClass from 'create-react-class';
import Pagination from '../Employee/Pagination';
import Menu from '../assets/images/admin/menu.png';
import Sort from '../assets/images/sort.png';
import Search from '../assets/images/admin/search.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
import Warnning from '../../images/officeImage/Warnning.png';
import Profile from '../assets/images/profileof.png';

const optionsLocation = [
  { label: 'Washington, DC', name: 'Washington, DC', value: 'DC' },
  { label: 'Richmond, VA', name: 'Richmond, VA', value: 'RIC' },
  { label: 'Not Assigned', name: 'Not Assigned', value: 'Not Assigned' },
];
const optionsFloor = [{ label: 'All', name: 'All', value: 'All' }];
const optionsNabourhood = [{ label: 'All', name: 'All', value: 'All' }];

const Assignments = props => {
  const { state, assignmentData } = props;
  const [open, setOpen] = useState(false);
  const updatedAssignData = optionsLocation.map(item => {
    // eslint-disable-next-line no-param-reassign
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalOffice
            ? props.state.finalOffice
            : 'Washington, DC +2'}
        </div>
      </>
    );
    return item;
  });
  const updatedFloorData = optionsFloor.map(item => {
    // eslint-disable-next-line no-param-reassign
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalFloor ? props.state.finalFloor : 'All'}
        </div>
      </>
    );
    return item;
  });
  const updatedNabourData = optionsNabourhood.map(item => {
    // eslint-disable-next-line no-param-reassign
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalNabour ? props.state.finalNabour : 'All'}
        </div>
      </>
    );
    return item;
  });

  const Option = createClass({
    render() {
      return (
        <components.Option {...this.props}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}>
              <label style={{ cursor: 'pointer' }}>
                {`${this.props.data.name} ${this.props.data.labelData || ''}`}
              </label>
              <input
                className="select_checkbox"
                type="checkbox"
                checked={this.props.isSelected}
                onChange={e => null}
              />
            </div>
            <div className={this.props.isSelected ? 'selected_val' : ''} />
          </div>
        </components.Option>
      );
    },
  });

  const colourStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
      border: '1px solid #d1dce7',
    }),

    option: (styles, { isFocused, isSelected, isVisited }) => ({
      ...styles,
      cursor: isFocused ? 'pointer' : '',

      backgroundColor: isSelected
        ? '#f8f8f8'
        : '' || isFocused
        ? '#EbEEF1'
        : '' || isVisited
        ? '#f8f8f8'
        : '#fffff',
      paddingRight: isSelected ? '25px' : '',
      boxShadow: ' 0px 8px 16px rgba(0, 45, 80, 0.12) !important',
      color: '#000',
    }),
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
            // onClick={props.handleData}
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
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h4 className="common-title">Assignments</h4>
              <Button
                variant="primary"
                className="px-4 py-3"
                onClick={() => {
                  setOpen(true);
                }}
              >
                New Export
              </Button>
            </div>
            <div className="head d-flex align-items-center">
              <div className="office-selections wrap">
                <div className="menu-img">
                  <img src={Menu} className="img-fluid" alt="" />
                </div>

                <span htmlFor="role" className="role">
                  <p
                    style={{
                      height: '15px',
                      marginBottom: '0px',
                      fontSize: '12px',
                      marginLeft: '16px',
                    }}
                  >
                    Office
                  </p>
                  <Select
                    components={{ Option }}
                    isMulti
                    isClearable={false}
                    defaultValue={optionsLocation}
                    onChange={props.handleOfficeChange}
                    options={updatedAssignData}
                    hideSelectedOptions={false}
                    onMenuClose={false}
                    className=" admin-employee"
                    name="office"
                    styles={colourStyles}
                    label="Office"
                  />
                </span>
                <span htmlFor="space" className="space">
                  <p
                    style={{
                      height: '15px',
                      marginBottom: '0px',
                      fontSize: '12px',
                      marginLeft: '16px',
                    }}
                  >
                    Building/Floor
                  </p>
                  <Select
                    components={{ Option }}
                    isMulti
                    isClearable={false}
                    defaultValue={optionsFloor}
                    onChange={props.handleChangeFloor}
                    options={updatedFloorData}
                    closeMenuOnSelect
                    hideSelectedOptions={false}
                    onMenuClose={false}
                    className="admin-employee"
                    name="building/floor"
                    styles={colourStyles}
                    label="Building/Floor"
                  />
                </span>
                <span htmlFor="space" className="space">
                  <p
                    style={{
                      height: '15px',
                      marginBottom: '0px',
                      fontSize: '12px',
                      marginLeft: '16px',
                    }}
                  >
                    Neighborhood
                  </p>
                  <Select
                    components={{ Option }}
                    isMulti
                    isClearable={false}
                    defaultValue={optionsNabourhood}
                    onChange={props.handleChangeNeighborhood}
                    options={updatedNabourData}
                    closeMenuOnSelect
                    hideSelectedOptions={false}
                    onMenuClose={false}
                    className=" admin-employee"
                    name="Neighborhood"
                    styles={colourStyles}
                    label="Neighborhood"
                  />
                </span>
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
                  <th style={{ width: '20%' }}>
                    Name
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      name="name"
                      aria-hidden="true"
                      onClick={() =>
                        props.handleClickSort(
                          'name',
                          props.state.sortOrder.name,
                        )
                      }
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Department
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      name="department"
                      alt=""
                      aria-hidden="true"
                      onClick={() =>
                        props.handleClickSort(
                          'department',
                          props.state.sortOrder.department,
                        )
                      }
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Building/Floor
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      aria-hidden="true"
                      name="buildingFloor"
                      onClick={() =>
                        props.handleClickSort(
                          'buildingFloor',
                          props.state.sortOrder.buildingFloor,
                        )
                      }
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Neighborhood
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      aria-hidden="true"
                      name="neighborhood"
                      onClick={() =>
                        props.handleClickSort(
                          'neighborhood',
                          props.state.sortOrder.neighborhood,
                        )
                      }
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Assigned Space
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      aria-hidden="true"
                      name="assignedSpace"
                      onClick={() =>
                        props.handleClickSort(
                          'assignedSpace',
                          props.state.sortOrder.assignedSpace,
                        )
                      }
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Badge
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      name="badge"
                      aria-hidden="true"
                      onClick={() =>
                        props.handleClickSort(
                          'badge',
                          props.state.sortOrder.badge,
                        )
                      }
                    />
                  </th>
                </tr>
                {props.assignmentLoading ? (
                  <tr>
                    <td colSpan="5">
                      <Spinner
                        className="app-spinner"
                        animation="grow"
                        variant="dark"
                      />
                    </td>
                  </tr>
                ) : props.assignmentData &&
                  props.assignmentData.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="employee-norecord">
                        {'No record found'}
                      </div>
                    </td>
                  </tr>
                ) : (
                  assignmentData &&
                  assignmentData.length > 0 &&
                  assignmentData.map((i, index) => (
                    <tr key={index + 1}>
                      <td>
                        <img
                          src={i.photo || Profile}
                          className="img-fluid user-img"
                          alt=""
                          style={{ height: '32px' }}
                        />{' '}
                        {i.name}
                      </td>
                      <td>{i.department}</td>
                      <td>{i.buildingFloor}</td>
                      <td>{i.neighborhood}</td>
                      <td>{i.assignedspace}</td>
                      <td>{i.badge}</td>
                    </tr>
                  ))
                )}
              </table>
              <div className="table-bot-flex">
                <div className="selction_one">
                  <select
                    name=""
                    id=""
                    className="pad-manual"
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
                  {state.page * state.limit} of {props.assignmentCount} shown
                </div>
                <Pagination
                  className="pagination-bar"
                  currentPage={state.page}
                  totalCounts={props.assignmentCount * state.limit}
                  totalCount={props.assignmentCount}
                  pageSize={state.limit}
                  onPageChange={page => props.handlePageChange(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal fade test_modal_pins"
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-header d-block mypadlr mypt-3">
          <div>
            <h5 className="modal-title" id="exampleModalLabel">
              Create a New Export
            </h5>
            <span className="model-content">
              What data do you want to export?
            </span>
          </div>

          <form className="delegate-workspot-access mycheckbox" action="submit">
            <>
              <Form.Check label="Washington, DC" name="group1" />
              <Form.Check label="Richmond, VA" name="group1" />
            </>
          </form>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="modal-footer justify-content-between border-0 mypadlr mypb-3 pt-0">
          <Button
            variant="primary"
            className="btn csv-modal cust-model-btn"
            data-bs-dismiss="modal"
          >
            .CSV Export
          </Button>
          <Button
            variant="primary"
            className="btn xlsx-modal cust-model-btn"
            data-bs-dismiss="mo dal"
          >
            .XLSX Export
          </Button>
          <Button
            variant="outline-secondary"
            className="btn cust-model-btn"
            data-bs-dismiss="modal"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

Assignments.propTypes = {
  assignmentData: PropTypes.object,
  state: PropTypes.object,
  handleOfficeChange: PropTypes.func,
  handleChangeFloor: PropTypes.func,
  handleChangeNeighborhood: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleClickSort: PropTypes.func,
  handleSearcha: PropTypes.func,
  assignmentLoading: PropTypes.bool,
  assignmentCount: PropTypes.number,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
};

export default Assignments;

document.addEventListener(
  'invalid',
  (function() {
    return function(e) {
      e.preventDefault();
    };
  })(),
  true,
);
