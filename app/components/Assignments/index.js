/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Modal, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Pagination from '../Employee/Pagination';
import Menu from '../assets/images/admin/menu.png';
import Sort from '../assets/images/sort-icon.svg';
import Search from '../assets/images/admin/search.svg';
import SelectDownArrow from '../assets/images/down-arrow.svg';
import { exportToSpreadsheet, generateCSV } from '../Common/generateCSV';
import { CONSTANT } from '../../enum';
const { USER_IMAGE_SRC_LIVE } = CONSTANT;
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
  const [officeLocations, setOfficeLocations] = useState([
    { label: 'All', name: 'All', value: 'All' },
  ]);
  const [officeFloors, setOfficeFloors] = useState([
    { label: 'All', name: 'All', value: 'All' },
  ]);
  const [officeNeighborhoods, setOfficeNeighborhoods] = useState([
    { label: 'All', name: 'All', value: 'All' },
  ]);
  const [userinfo, setUserInfo] = useState({ offices: [] });

  useEffect(() => {
    const tempArr = [
      { label: 'All', name: 'All', value: 'All', isSelected: false },
    ];
    officeLocation &&
      officeLocation.map(obj => {
        if (obj.id === 'DC' || obj.id === 'RIC') {
          tempArr.push({
            label: obj.locationname,
            name: obj.locationname,
            value: obj.id,
            isSelected: false,
          });
        }
      });
    setOfficeLocations(tempArr);
  }, [officeLocation]);

  useEffect(() => {
    const tempArr = [
      { label: 'All', name: 'All', value: 'All', isSelected: false },
    ];
    officeFloor &&
      officeFloor.map(obj => {
        if (obj.floor !== null) {
          tempArr.push({
            label: `Floor ${obj.floor}`,
            name: `Floor ${obj.floor}`,
            value: `Floor ${obj.floor}`,
            isSelected: false,
          });
        }
        // not required now
        // if (obj.building !== null) {
        //   tempArr.push({
        //     label: `Building ${obj.building}`,
        //     name: `Building ${obj.building}`,
        //     value: `Building ${obj.building}`,
        //     isSelected: true,
        //   });
        // }
      });
    setOfficeFloors(tempArr);
  }, [officeFloor]);

  useEffect(() => {
    const tempArr = [
      { label: 'All', name: 'All', value: 'All', isSelected: false },
    ];
    officeNeighborhood &&
      officeNeighborhood.map(obj => {
        if (obj.name !== '4th Floor')
          tempArr.push({
            label: obj.name,
            name: obj.name,
            value: obj.name,
            isSelected: false,
          });
      });
    setOfficeNeighborhoods(tempArr);
  }, [officeNeighborhood]);

  useEffect(() => {
    const customArr = [];
    if (exportAssignmentData && exportAssignmentData.length > 0) {
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
    } else {
      customArr.push({
        name: '',
        employeeid: '',
        department: '',
        floor: '',
        building: '',
        neighborhood: '',
        assignedSpace: '',
        badge: '',
      });
    }
    if (exportType === 'CSV') {
      const header = Object.keys(customArr[0]);
      generateCSV(exportType, header, customArr, 'Assignments');
      setUserInfo({ offices: [] });
      setExportType('');
      setOpen(false);
    }
    if (exportType === 'XLSX') {
      exportToSpreadsheet(customArr, 'Assignments');
      setUserInfo({ offices: [] });
      setExportType('');
      setOpen(false);
    }
  }, [exportAssignmentData]);

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
            <div className="d-flex justify-content-between mb-4">
              <h4 className="common-title">Assignments</h4>
              <Button
                variant="primary"
                className="px-2 px-md-4 py-2 py-md-3 fw-normal"
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
                <div className="custom-filter-dropdown pointer">
                  <span className="pointer title">Office</span>
                  <div className="dropdown pointer">
                    <input
                      type="input"
                      style={{ cursor: 'alias' }}
                      readOnly
                      className="dropdown-toggle pointer filter-cursor"
                      value={state.finalOfficeVal}
                      placeholder="All"
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton1"
                      // id="dropdownMenuButton1"
                    />
                    <Image
                      className="img_select pointer"
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton1"
                      src={SelectDownArrow}
                    />
                    <ul
                      className="dropdown-menu pointer"
                      id="dropdownMenuButton1"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {officeLocations &&
                        officeLocations.map((item, index) => (
                          <li
                            className="pointer"
                            aria-hidden
                            onClick={() =>
                              handleSelectedList(index, !item.isSelected)
                            }
                          >
                            <span className="item-text">{item.name}</span>
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
                  <span className="pointer title">Building/Floor</span>
                  <div className="dropdown pointer">
                    <input
                      type="input"
                      style={{ cursor: 'alias' }}
                      readOnly
                      className="dropdown-toggle pointer filter-cursor"
                      value={state.finalFloorVal}
                      placeholder="All"
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton2"
                    />
                    <Image
                      className="img_select pointer"
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton2"
                      src={SelectDownArrow}
                    />
                    <ul
                      className="dropdown-menu pointer"
                      id="dropdownMenuButton2"
                      aria-labelledby="dropdownMenuButton2"
                    >
                      {officeFloors &&
                        officeFloors.map((item, index) => (
                          <li
                            className="pointer"
                            aria-hidden
                            onClick={() =>
                              handleSelectedFloorList(index, !item.isSelected)
                            }
                          >
                            <span className="item-text">{item.name}</span>
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
                  <span className="pointer title">Neighborhood</span>
                  <div className="dropdown pointer">
                    <input
                      type="input"
                      style={{ cursor: 'alias' }}
                      readOnly
                      className="dropdown-toggle pointer filter-cursor"
                      value={state.finalNeighborhoodVal}
                      placeholder="All"
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton3"
                    />
                    <Image
                      className="img_select pointer"
                      data-bs-toggle="dropdown"
                      data-target="#dropdownMenuButton3"
                      src={SelectDownArrow}
                    />
                    <ul
                      className="dropdown-menu pointer"
                      id="dropdownMenuButton3"
                      aria-labelledby="dropdownMenuButton3"
                    >
                      {officeNeighborhoods &&
                        officeNeighborhoods.map((item, index) => (
                          <li
                            className="pointer"
                            aria-hidden
                            onClick={() =>
                              handleSelectedNeighborList(
                                index,
                                !item.isSelected,
                              )
                            }
                          >
                            <span className="item-text">{item.name}</span>
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
            <div className="assign-table">
              <table>
                <tr>
                  <th style={{ width: '20%' }}>
                    <span className="d-flex text-nowrap">
                      Name{' '}
                      <span className="ms-1">
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
                      </span>
                    </span>
                  </th>
                  <th style={{ width: '16%' }}>
                    <span className="d-flex text-nowrap">
                      Department{' '}
                      <span>
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
                      </span>
                    </span>
                  </th>
                  <th style={{ width: '16%' }}>
                    <span className="d-flex text-nowrap">
                      Building/Floor{' '}
                      <span>
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
                      </span>
                    </span>
                  </th>
                  <th style={{ width: '16%' }}>
                    <span className="d-flex text-nowrap">
                      Neighborhood{' '}
                      <span>
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
                      </span>
                    </span>
                  </th>
                  <th style={{ width: '16%' }}>
                    <span className="d-flex text-nowrap">
                      Assigned Space{' '}
                      <span>
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
                      </span>
                    </span>
                  </th>
                  <th style={{ width: '16%' }}>
                    <span className="d-flex text-nowrap">
                      Badge{' '}
                      <span>
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
                      </span>
                    </span>
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
                          onError={props.replaceImage}
                          src={`${USER_IMAGE_SRC_LIVE}${i.employeeid}.wiki.jpg`}
                          className="img-fluid table-user-img"
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
                    <option value={props.assignmentCount}>View All</option>
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
                  assignTotalPages={props.assignTotalPage}
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
            className="btn cust-model-cancel-btn"
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
  assignTotalPage: PropTypes.number,
  replaceImage: PropTypes.func,
};

export default Assignments;
