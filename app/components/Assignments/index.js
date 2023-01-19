/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import createClass from 'create-react-class';
import Select, { components } from 'react-select';
import Pagination from '../Employee/Pagination';
import Menu from '../assets/images/admin/menu.png';
import Sort from '../assets/images/sort.png';
import Search from '../assets/images/admin/search.png';
import Profile from '../assets/images/profileof.png';
import { exportToSpreadsheet, generateCSV } from '../Common/generateCSV';

const Assignments = props => {
  const {
    state,
    assignmentData,
    exportAssignmentData,
    exportAssignmentLoading,
    officeLocation,
    officeFloor,
    officeNeighborhood,
  } = props;
  const [open, setOpen] = useState(false);
  const [exportType, setExportType] = useState('');
  const [officeLocations, setOfficeLocations] = useState([]);
  const [officeFloors, setOfficeFloors] = useState([]);
  const [officeNeighborhoods, setOfficeNeighborhoods] = useState([]);
  const [userinfo, setUserInfo] = useState({ offices: [] });
  let updatedLocation = '';
  let updatedFloors = '';
  let updatedNeighborhood = '';

  useEffect(() => {
    officeLocation &&
      officeLocation.map(obj => {
        if (obj.id === 'DC' || obj.id === 'RIC') {
          const isDuplicate = officeLocations.includes(obj);
          if (!isDuplicate) {
            officeLocations.push({
              label: obj.locationname,
              name: obj.locationname,
              value: obj.id,
            });
            return true;
          }
          return false;
        }
      });
  }, [officeLocation]);

  useEffect(() => {
    officeFloor &&
      officeFloor.map(obj => {
        if (obj.floor !== null) {
          const isDuplicate = officeFloors.includes(obj);
          if (!isDuplicate) {
            officeFloors.push({
              label: `floor ${obj.floor}`,
              name: `floor ${obj.floor}`,
              value: `floor ${obj.floor}`,
            });
            return true;
          }
          return false;
        }
        if (obj.building !== null) {
          const isDuplicate = officeFloors.includes(obj);
          if (!isDuplicate) {
            officeFloors.push({
              label: `building ${obj.building}`,
              name: `building ${obj.building}`,
              value: `building ${obj.building}`,
            });
            return true;
          }
          return false;
        }
      });
  }, [officeFloor]);

  useEffect(() => {
    officeNeighborhood &&
      officeNeighborhood.map(obj => {
        const isDuplicate = officeLocations.includes(obj);
        if (!isDuplicate) {
          officeNeighborhoods.push({
            label: obj.name,
            name: obj.name,
            value: obj.name,
          });
          return true;
        }
        return false;
      });
  }, [officeNeighborhood]);

  useEffect(() => {
    if (
      exportAssignmentLoading === false &&
      exportAssignmentData &&
      exportAssignmentData.length > 0
    ) {
      if (exportType === 'CSV') {
        const header = Object.keys(exportAssignmentData[0]);
        generateCSV(exportType, header, exportAssignmentData, 'Assignments');
      }
      if (exportType === 'XLSX') {
        exportToSpreadsheet(exportAssignmentData);
      }
      setUserInfo({ offices: [] });
      setExportType('');
    }
  }, [exportAssignmentData, exportAssignmentLoading]);

  const handleChange = e => {
    // Destructuring
    const { value, checked } = e.target;
    const { offices } = userinfo;

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        offices: [...offices, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        offices: offices.filter(i => i !== value),
      });
    }
  };

  updatedLocation = officeLocations.map(item => {
    // eslint-disable-next-line no-param-reassign
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalOfficeVal
            ? props.state.finalOfficeVal
            : `Washington, DC +${officeLocations.length - 1}`}
        </div>
      </>
    );
    return item;
  });

  updatedFloors = officeFloors.map(item => {
    // eslint-disable-next-line no-param-reassign
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalFloorVal
            ? props.state.finalFloorVal
            : `Floors, +${officeFloors.length - 1}`}
        </div>
      </>
    );
    return item;
  });

  updatedNeighborhood = officeNeighborhoods.map(item => {
    // eslint-disable-next-line no-param-reassign
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalNeighborhoodVal
            ? props.state.finalNeighborhoodVal
            : `Blue, +${officeNeighborhoods.length - 1}`}
        </div>
      </>
    );
    return item;
  });

  // useEffect(() => {
  //   if (updatedLocation.length > 0) {
  //     updatedLocation &&
  //       updatedLocation.map(obj => {
  //         const isDuplicate = updatedLocation.includes(obj);
  //         if (!isDuplicate) {
  //           updatedLocation.push({
  //             label: obj.name,
  //             name: obj.name,
  //             value: obj.name,
  //           });
  //           return true;
  //         }
  //         return false;
  //       });
  //   }

  //   if (updatedNeighborhood.length > 0) {
  //     updatedNeighborhood &&
  //       updatedNeighborhood.map(obj => {
  //         const isDuplicate = updatedNeighborhood.includes(obj);
  //         if (!isDuplicate) {
  //           updatedNeighborhood.push({
  //             label: obj.name,
  //             name: obj.name,
  //             value: obj.name,
  //           });
  //           return true;
  //         }
  //       });
  //     return false;
  //   }

  //   if (updatedFloors.length > 0) {
  //     updatedFloors &&
  //       updatedFloors.map(obj => {
  //         if (obj.floor !== null) {
  //           const isDuplicate = updatedFloors.includes(obj);
  //           if (!isDuplicate) {
  //             updatedFloors.push({
  //               label: `floor ${obj.floor}`,
  //               name: `floor ${obj.floor}`,
  //               value: `floor ${obj.floor}`,
  //             });
  //             return true;
  //           }
  //           return false;
  //         }
  //         if (obj.building !== null) {
  //           const isDuplicate = updatedFloors.includes(obj);
  //           if (!isDuplicate) {
  //             updatedFloors.push({
  //               label: `building ${obj.building}`,
  //               name: `building ${obj.building}`,
  //               value: `building ${obj.building}`,
  //             });
  //             return true;
  //           }
  //           return false;
  //         }
  //       });
  //     return false;
  //   }
  // }, [updatedLocation, updatedFloors, updatedNeighborhood]);

  const Option = createClass({
    render() {
      return (
        <components.Option {...this.props}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}>
              <label style={{ cursor: 'pointer' }}>
                {this.props.data.name}
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
                <span htmlFor="space" className="space">
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
                    defaultValue={officeLocations}
                    onChange={props.handleSelectedoffice}
                    options={updatedLocation}
                    closeMenuOnSelect
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
                    defaultValue={officeFloors}
                    onChange={props.handleSelectedFloor}
                    options={updatedFloors}
                    closeMenuOnSelect
                    hideSelectedOptions={false}
                    onMenuClose={false}
                    className=" admin-employee"
                    name="floor"
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
                    defaultValue={officeNeighborhoods}
                    onChange={props.handleSelectedNeighbor}
                    options={updatedNeighborhood}
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
                    <td colSpan="6">
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
                    <td colSpan="6">
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
        {!props.exportAssignmentLoading ? (
          <div className="modal-header d-block mypadlr mypt-3">
            <div>
              <h5 className="modal-title" id="exampleModalLabel">
                Create a New Export
              </h5>
              <span className="model-content">
                What data do you want to export?
              </span>
            </div>

            <form
              className="delegate-workspot-access mycheckbox"
              action="submit"
            >
              <>
                <Form.Check
                  label="Washington, DC"
                  value="DC"
                  name="group1"
                  onChange={e => handleChange(e)}
                />
                <Form.Check
                  label="Richmond, VA"
                  value="RIC"
                  name="group1"
                  onChange={e => handleChange(e)}
                />
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
        ) : (
          <Spinner className="app-spinner" animation="grow" variant="dark" />
        )}
        <div className="modal-footer justify-content-between border-0 mypadlr mypb-3 pt-0">
          <Button
            variant="primary"
            className="btn csv-modal cust-model-btn"
            data-bs-dismiss="modal"
            onClick={() => {
              setExportType('CSV');
              props.handleExport(userinfo);
            }}
            disabled={exportAssignmentLoading}
          >
            .CSV Export
          </Button>
          <Button
            variant="primary"
            className="btn xlsx-modal cust-model-btn"
            data-bs-dismiss="modal"
            onClick={() => {
              setExportType('XLSX');
              props.handleExport(userinfo);
            }}
            disabled={exportAssignmentLoading}
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
  assignmentData: PropTypes.array,
  exportAssignmentData: PropTypes.object,
  officeLocation: PropTypes.object,
  officeFloor: PropTypes.object,
  officeNeighborhood: PropTypes.object,
  state: PropTypes.object,
  handleSelectedoffice: PropTypes.func,
  handleSelectedFloor: PropTypes.func,
  handleSelectedNeighbor: PropTypes.func,
  handleLimitChange: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleClickSort: PropTypes.func,
  handleSearcha: PropTypes.func,
  handleExport: PropTypes.func,
  assignmentLoading: PropTypes.bool,
  exportAssignmentLoading: PropTypes.bool,
  assignmentCount: PropTypes.number,
};

export default Assignments;
