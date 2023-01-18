/* eslint-disable no-param-reassign */
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

const Option = createClass({
  render() {
    return (
      <components.Option {...this.props}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1' }}>
            <label style={{ cursor: 'pointer' }}>{this.props.data.name}</label>
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

  useEffect(() => {
    const tempArr = [
      { label: 'All', name: 'All', value: 'All', isSelected: true },
    ];
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
    officeFloor &&
      officeFloor.map(obj => {
        if (obj.floor !== null) {
          tempArr.push({
            label: `floor ${obj.floor}`,
            name: `floor ${obj.floor}`,
            value: `floor ${obj.floor}`,
            isSelected: true,
          });
        }
        if (obj.building !== null) {
          tempArr.push({
            label: `building ${obj.building}`,
            name: `building ${obj.building}`,
            value: `building ${obj.building}`,
            isSelected: true,
          });
        }
      });
    setOfficeFloors(tempArr);
  }, [officeFloor]);

  useEffect(() => {
    const tempArr = [
      { label: 'All', name: 'All', value: 'All', isSelected: true },
    ];
    officeNeighborhood &&
      officeNeighborhood.map(obj => {
        tempArr.push({
          label: obj.name,
          name: obj.name,
          value: obj.name,
          isSelected: true,
        });
      });
    setOfficeNeighborhoods(tempArr);
  }, [officeNeighborhood]);

  useEffect(() => {
    if (
      exportAssignmentLoading === false &&
      exportAssignmentData &&
      exportAssignmentData.length > 0
    ) {
      const customArr = [];
      exportAssignmentData &&
        exportAssignmentData.map(obj => {
          customArr.push({
            name: obj.name || '-',
            employeeid: obj.employeeid || '-',
            department: obj.department || '-',
            floor: obj.floor || '-',
            building: obj.building || '-',
            neighborhood: obj.neighborhood || '-',
            assignedSpace: obj.assignedSpace || '-',
            badge: obj.badge || '-',
          });
        });

      if (exportType === 'CSV') {
        const header = Object.keys(customArr[0]);
        generateCSV(exportType, header, customArr, 'Assignments');
        setUserInfo({ offices: [] });
        setExportType('');
        setOpen(false);
      }
      if (exportType === 'XLSX') {
        exportToSpreadsheet(customArr);
        setUserInfo({ offices: [] });
        setExportType('');
        setOpen(false);
      }
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

  const updatedLocation = officeLocations.map(item => {
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalOfficeVal ? props.state.finalOfficeVal : `All`}
        </div>
      </>
    );
    return item;
  });

  const updatedFloors = officeFloors.map(item => {
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalFloorVal ? props.state.finalFloorVal : `All`}
        </div>
      </>
    );
    return item;
  });

  const updatedNeighborhood = officeNeighborhoods.map(item => {
    item.label = (
      <>
        <div className="drop_emp">
          {props.state.finalNeighborhoodVal
            ? props.state.finalNeighborhoodVal
            : `All`}
        </div>
      </>
    );
    return item;
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

  const handleSelectedFloorList = (index, status) => {
    let floorList = [];
    floorList =
      officeFloors &&
      officeFloors.map((item, i) => {
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

    if (floorList.length) {
      const isAllChecked =
        floorList.filter(ele => ele.name !== 'All' && ele.isSelected === true)
          .length ===
        floorList.length - 1;
      floorList = floorList.map(ele => ({
        ...ele,
        isSelected: ele.name === 'All' ? isAllChecked : ele.isSelected,
      }));
    }
    setOfficeFloors(floorList);
    props.handleSelectedFloor(floorList);
  };

  const handleSelectedNeighborList = (index, status) => {
    let neighborList = [];
    neighborList =
      officeNeighborhoods &&
      officeNeighborhoods.map((item, i) => {
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

    if (neighborList.length) {
      const isAllChecked =
        neighborList.filter(
          ele => ele.name !== 'All' && ele.isSelected === true,
        ).length ===
        neighborList.length - 1;
      neighborList = neighborList.map(ele => ({
        ...ele,
        isSelected: ele.name === 'All' ? isAllChecked : ele.isSelected,
      }));
    }
    setOfficeNeighborhoods(neighborList);
    props.handleSelectedNeighbor(neighborList);
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
                <div className="custom-filter-dropdown">
                  <span>Office</span>
                  <div className="dropdown">
                    <input
                      type="input"
                      className="dropdown-toggle"
                      value={state.finalOfficeVal}
                      placeholder="Select..."
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton1"
                      // id="dropdownMenuButton1"
                    />
                    <ul
                      className="dropdown-menu"
                      id="dropdownMenuButton1"
                      aria-labelledby="dropdownMenuButton1"
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
                <div className="custom-filter-dropdown">
                  <span>Building/Floor</span>
                  <div className="dropdown">
                    <input
                      type="input"
                      className="dropdown-toggle"
                      value={state.finalFloorVal}
                      placeholder="Select..."
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton2"
                    />
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      {updatedFloors &&
                        updatedFloors.map((item, index) => (
                          <li
                            aria-hidden
                            onClick={() =>
                              handleSelectedFloorList(index, !item.isSelected)
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
                <div className="custom-filter-dropdown">
                  <span>Neighborhood</span>
                  <div className="dropdown">
                    <input
                      type="input"
                      className="dropdown-toggle"
                      value={state.finalNeighborhoodVal}
                      placeholder="Select..."
                      data-bs-toggle="dropdown"
                      id="dropdownMenuButton3"
                    />
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton3"
                    >
                      {updatedNeighborhood &&
                        updatedNeighborhood.map((item, index) => (
                          <li
                            aria-hidden
                            onClick={() =>
                              handleSelectedNeighborList(
                                index,
                                !item.isSelected,
                              )
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
                    placeholder="Search for name, badge"
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
                      onClick={() =>
                        props.handleClickSort(
                          'name',
                          props.state.sortOrder.name,
                        )
                      }
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
                      onClick={() =>
                        props.handleClickSort(
                          'department',
                          props.state.sortOrder.department,
                        )
                      }
                    />
                  </th>
                  <th style={{ width: '16%' }}>
                    Building/Floor{' '}
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
                    Neighborhood{' '}
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
                    Assigned Space{' '}
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
                    Badge{' '}
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
                      <td
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={i.photo || Profile}
                          className="img-fluid user-img"
                          alt=""
                          style={{ height: '32px' }}
                        />{' '}
                        <span>{i.name}</span>
                      </td>
                      <td>{i.department}</td>
                      <td>
                        {i.floor !== null ? `Floor ${i.floor}` : ''}{' '}
                        {i.building !== null ? `Building ${i.building}` : ''}
                      </td>
                      <td>{i.neighborhood}</td>
                      <td>{i.assignedSpace}</td>
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
            className="btn ass-csv-modal cust-model-btn"
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
