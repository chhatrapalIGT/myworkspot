/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Image, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Pagination from '../Employee/Pagination';
import Menu from '../assets/images/admin/menu.png';
import Sort from '../assets/images/sort-icon.svg';
import Search from '../assets/images/admin/search.svg';
import SelectDownArrow from '../assets/images/down-arrow.svg';
import { CONSTANT } from '../../enum';
const { USER_IMAGE_SRC_LIVE } = CONSTANT;
const WhoIsIn = props => {
  const {
    state,
    whoIsInData,
    officeLocation,
    officeFloor,
    officeNeighborhood,
  } = props;
  const [officeLocations, setOfficeLocations] = useState([
    { label: 'All', name: 'All', value: 'All' },
  ]);
  const [officeFloors, setOfficeFloors] = useState([
    { label: 'All', name: 'All', value: 'All' },
  ]);
  const [officeNeighborhoods, setOfficeNeighborhoods] = useState([
    { label: 'All', name: 'All', value: 'All' },
  ]);

  const today = moment();
  const currentDate = today.format('dddd, MMMM D, YYYY');

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
              <h4 className="common-title"> {"Who's in?"} </h4>
              <span className="px-4 py-3 fw-normal">{currentDate}</span>
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
                      className="dropdown-toggle pointer"
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
                      className="dropdown-toggle pointer"
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
                      className="dropdown-toggle pointer"
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
                <tbody>
                  <tr>
                    <th style={{ width: '20%' }}>
                      <span className="d-flex text-nowrap">
                        Name{' '}
                        <span className="ms-1">
                          <img
                            src={Sort}
                            className="img-fluid sort-img custom-sort-img"
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
                    <th style={{ width: '20%' }}>
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
                    <th style={{ width: '20%' }}>
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
                    <th style={{ width: '20%' }}>
                      <span className="d-flex text-nowrap">
                        Neighborhood{' '}
                        <span>
                          <img
                            src={Sort}
                            className="img-fluid sort-img"
                            alt=""
                            aria-hidden="true"
                            name="neighborhoodname"
                            onClick={() =>
                              props.handleClickSort(
                                'neighborhoodname',
                                props.state.sortOrder.neighborhoodname,
                              )
                            }
                          />
                        </span>
                      </span>
                    </th>
                    <th style={{ width: '20%' }}>
                      <span className="d-flex text-nowrap">
                        Assigned Space{' '}
                        <span>
                          <img
                            src={Sort}
                            className="img-fluid sort-img"
                            alt=""
                            aria-hidden="true"
                            name="workspacename"
                            onClick={() =>
                              props.handleClickSort(
                                'workspacename',
                                props.state.sortOrder.workspacename,
                              )
                            }
                          />
                        </span>
                      </span>
                    </th>
                  </tr>
                </tbody>
                {props.whoIsInLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan="5">
                        <Spinner
                          className="app-spinner"
                          animation="grow"
                          variant="dark"
                        />
                      </td>
                    </tr>
                  </tbody>
                ) : props.whoIsInData && props.whoIsInData.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan="6">
                        <div className="employee-norecord">
                          {'No record found'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {whoIsInData &&
                      whoIsInData.length > 0 &&
                      whoIsInData.map((i, index) => (
                        <tr key={index + 1}>
                          <td
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              onError={props.replaceImage}
                              src={`${USER_IMAGE_SRC_LIVE}${
                                i.employeeid
                              }.wiki.jpg`}
                              className="img-fluid table-user-img"
                              alt=""
                              style={{ height: '32px' }}
                            />{' '}
                            <span>{i.name}</span>
                          </td>
                          <td>{i.department}</td>
                          <td>
                            {i.floor !== null ? `Floor ${i.floor}` : ''}{' '}
                            {i.building !== null
                              ? `Building ${i.building}`
                              : ''}
                          </td>
                          <td>{i.neighborhoodname}</td>
                          <td>{i.workspacename}</td>
                        </tr>
                      ))}
                  </tbody>
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
                    <option value={props.whoIsInCount}>View All</option>
                  </select>
                </div>
                <div className="">
                  {state.page * state.limit - (state.limit - 1)} -
                  {state.page * state.limit} of {props.whoIsInCount} shown
                </div>
                <Pagination
                  className="pagination-bar"
                  currentPage={state.page}
                  totalCounts={props.whoIsInCount * state.limit}
                  totalCount={props.whoIsInCount}
                  pageSize={state.limit}
                  totalPages={props.whoIsInTotalPage}
                  onPageChange={page => props.handlePageChange(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

WhoIsIn.propTypes = {
  whoIsInData: PropTypes.array,
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
  whoIsInLoading: PropTypes.bool,
  whoIsInCount: PropTypes.number,
  whoIsInTotalPage: PropTypes.number,
  replaceImage: PropTypes.func,
};

export default WhoIsIn;
