/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useMemo, useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import createClass from 'create-react-class';
import Select, { components } from 'react-select';
import Pagination from '../Employee/Pagination';
import Menu from '../assets/images/admin/menu.png';
import Profile from '../assets/images/profileof.png';
import Edit from '../assets/images/edit.svg';
import Sort from '../assets/images/sort.png';
import Search from '../assets/images/admin/search.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
import Warnning from '../../images/officeImage/Warnning.png';

const options = [
  { label: 'Admin', value: 'Admin', name: 'Admin' },
  { label: 'User', value: 'User', name: 'User' },
];

const optionsLocation = [
  { label: 'Washington, DC', name: 'Washington, DC', value: 'DC' },
  { label: 'Richmond, VA', name: 'Richmond, VA', value: 'RIC' },
  { label: 'Not Assigned', name: 'Not Assigned', value: 'Not Assigned' },
];
const Assignments = props => {
  const [open, setOpen] = useState(false);
  return (
    <>
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
                    Office{' '}
                  </p>
                  <Select
                    components={{ Option }}
                    isMulti
                    isClearable={false}
                    defaultValue={options}
                    // value={props.state.selectedOption}
                    onChange={props.handleChangeBox}
                    closeMenuOnSelect
                    hideSelectedOptions={false}
                    onMenuClose={false}
                    className=" admin-employee"
                    name="office"
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
                    Building/Floor{' '}
                  </p>
                  <Select
                    components={{ Option }}
                    isMulti
                    isClearable={false}
                    defaultValue={optionsLocation}
                    onChange={props.handleChangeSpace}
                    closeMenuOnSelect
                    hideSelectedOptions={false}
                    onMenuClose={false}
                    className=" admin-employee"
                    name="building/floor"
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
                    Neighborhood{' '}
                  </p>
                  <Select
                    components={{ Option }}
                    isMulti
                    isClearable={false}
                    defaultValue={optionsLocation}
                    onChange={props.handleChangeSpace}
                    closeMenuOnSelect
                    hideSelectedOptions={false}
                    onMenuClose={false}
                    className=" admin-employee"
                    name="Neighborhood"
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
                    Name{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      name="name"
                      aria-hidden="true"
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Department{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      name="department"
                      alt=""
                      aria-hidden="true"
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Building/Floor{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      aria-hidden="true"
                      name="Building/Floor"
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Neighborhood{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      aria-hidden="true"
                      name="Neighborhood"
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Assigned Space{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      aria-hidden="true"
                      name="AssignedSpace"
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Badge{' '}
                    <img
                      src={Sort}
                      className="img-fluid sort-img"
                      alt=""
                      name="badge"
                      aria-hidden="true"
                    />
                  </th>
                </tr>
              </table>
              <div className="table-bot-flex">
                <div className="selction_one">
                  <select
                    name=""
                    id=""
                    className="pad-manual"
                    // value={props.state.limit}
                    // onChange={e => props.handleLimitChange(e.target.value)}
                  >
                    <option value="10">10 per page</option>
                    <option value="20">20 per page</option>
                    <option value="30">30 per page</option>
                    <option value="40">40 per page</option>
                  </select>
                </div>
                <div className="">
                  {/* {state.page * state.limit - (state.limit - 1)} -
                  {state.page * state.limit} of {props.employeeCount} shown */}
                </div>
                <Pagination
                  className="pagination-bar"
                  // currentPage={state.page}
                  // totalCounts={props.employeeCount * state.limit}
                  // totalCount={props.employeeCount}
                  // pageSize={state.limit}
                  // onPageChange={page => props.handlePageChange(page)}
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
            className="btn csv-modal"
            data-bs-dismiss="modal"
          >
            .CSV Export
          </Button>
          <Button
            variant="primary"
            className="btn xlsx-modal"
            data-bs-dismiss="mo dal"
          >
            .XLSX Export
          </Button>
          <Button
            variant="outline-secondary"
            className="btn dismiss"
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
  handleSearcha: PropTypes.func,
  handleChangeBox: PropTypes.func,
  handleChangeSpace: PropTypes.func,
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
