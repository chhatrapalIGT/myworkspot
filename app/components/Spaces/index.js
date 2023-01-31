/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { Button, Form, Image, Modal, Dropdown } from 'react-bootstrap';
import createClass from 'create-react-class';
import Select, { components } from 'react-select';
import { exportToSpreadsheet, generateCSV } from '../Common/generateCSV';
import Sort from '../assets/images/sort.png';
import Search from '../assets/images/admin/search.png';
import Menu from '../assets/images/admin/menu.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import vector from '../../images/InfoOne.png';
import crossCircle from '../../images/x-circle-fill.svg';
import SelectDownArrow from '../assets/images/down-arrow.svg';
import GreyPencil from '../../images/GreyPencil.png';
import CheckboxInput from '../assets/images/Checkbox_input.svg';
import Pagination from '../Employee/Pagination';

const Spaces = ({
  state,
  handleUserSelect,
  officeLocation,
  handleCloseUpdate,
  spaceUpdate,
  setSpaceUpdate,
  officeSuccess,
  requestUpdateActiveStatus,
  manageSpace,
  manageLoading,
  exportManage,
  exportLoading,
  exportSuccess,
  handleLimitChange,
  handlePageChange,
  dataCount,
  handleClickSort,
  handleSearcha,
  requestGetManageExport,
  handleSelectedoffice,
  officeSrcLocation,
  officeFloor,
  officeNeighborhood,
  handleSelectedFloor,
  handleSelectedNeighbor,
  lockSpaceData,
  neighborData,
}) => {
  const [flooring, setFloor] = useState();
  const [color, setColor] = useState();
  const [setActive, setActiveState] = useState('');
  const [updateState, setUpdateState] = useState('');
  const [manageLoader, setManageLoader] = useState('');
  const [manageData, setManageData] = useState({});
  const [spaceData, setSpaceData] = useState('');
  const [spaceValue, setSpaceValue] = useState([]);
  const [spaceAllChecked, setSpaceAllChecked] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [floorbuildData, setFloorbuildData] = useState([]);
  const [officeTypeData, setOfficeTypeData] = useState([]);
  const [open, setOpen] = useState(false);
  const [checkOpen, setCheckOpen] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [csvOpen, setCsvOpen] = useState('');
  const [userinfo, setUserInfo] = useState({
    offices: [],
  });
  const [officeLocations, setOfficeLocations] = useState([]);
  const [officeFloors, setOfficeFloors] = useState([]);
  const [updatedOfficeFloor, setUpdatedOfficeFloor] = useState([]);
  const [officeNeighborhoods, setOfficeNeighborhoods] = useState([]);
  const [updatedNeibour, setUpdatedNeibour] = useState([]);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isShowColDropdown, setIsShowColDropdown] = useState('');

  let updatedFloors = [];
  const updatedNeighborhood = [];
  const inputValue = e => {
    setEditedText(e.target.value);
  };

  console.log('spaceAllChecked::::>M<>', spaceAllChecked);

  const handleClear = () => {
    const allChecked = spaceValue.map(el => {
      const alldata = {
        ...el,
        isChecked: false,
        algorithm: false,
        isFloor: false,
        isNeighborh: false,
        isPen: false,
        spaceType: false,
        isInput: false,
      };
      return alldata;
    });
    setSpaceValue(allChecked);
  };

  const handleSelectAll = event => {
    const { checked } = event.target;
    if (checked) {
      setCheckOpen(true);
      if (spaceValue && spaceValue.length > 0) {
        const allChecked = spaceValue.map(el => {
          const alldata = {
            ...el,
            isChecked: true,
            algorithm: true,
            isFloor: true,
            isNeighborh: true,
            isPen: true,
            spaceType: true,
          };
          return alldata;
        });
        setSpaceValue(allChecked);
      }
    } else {
      setCheckOpen(false);
      if (spaceValue && spaceValue.length > 0) {
        const allChecked = spaceValue.map(el => {
          const alldata = {
            ...el,
            isChecked: false,
            algorithm: false,
            isInput: false,
            isFloor: false,
            isNeighborh: false,
            isPen: false,
            spaceType: false,
          };
          return alldata;
        });
        setSpaceValue(allChecked);
      }
    }
  };

  const onEditEnd = () => {
    setisEditing(false);
  };

  function handleKeydown(event) {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        event.preventDefault();
        event.stopPropagation();
        setisEditing(false);
      }
    }
    return event.key === 'Enter' || event.key === 'Escape';
  }
  useEffect(() => {
    if (manageSpace && manageSpace.length > 0) {
      const inputData =
        manageSpace &&
        manageSpace.length > 0 &&
        manageSpace.map(ele => {
          const inputVal = {
            ...ele,
            isChecked: false,
            isInput: false,
            isFloor: false,
            isNeighborh: false,
            spaceType: false,
            algorithm: false,
            isPen: false,
          };
          return inputVal;
        });
      setSpaceValue(inputData);
    }
  }, [manageSpace]);

  useEffect(() => {
    if (spaceValue && spaceValue.length > 0) {
      const data = spaceValue.filter(arr => arr.isChecked === true);
      setSpaceAllChecked(data);
    }
  }, [spaceValue]);

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
    updatedFloors = tempArr.filter(i => i.value !== 'All');
    setOfficeFloors(tempArr);
    setUpdatedOfficeFloor(updatedFloors);
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
        updatedNeighborhood.push({
          label: obj.name,
          name: obj.name,
          value: obj.name,
        });
      });
    setOfficeNeighborhoods(tempArr);
    setUpdatedNeibour(updatedNeighborhood);
  }, [officeNeighborhood]);

  function toggleAccordion(id) {
    setColor('');
    if (id === setActive) {
      setActiveState('');
    } else {
      setActiveState(id);
      setUpdateState('');
    }
  }

  useEffect(() => {
    if (
      !exportLoading &&
      exportSuccess &&
      exportManage &&
      exportManage.length > 0
    ) {
      const cstarr = [];
      exportManage &&
        exportManage.map(obj => {
          cstarr.push({
            active: obj.active || '-',
            assigned: obj.assigned || '-',
            attributes: obj.attributes || '-',
            building: obj.building || '-',
            floor: obj.floor || '-',
            id: obj.id || '-',
            neighborhoodname: obj.neighborhoodname || '-',
            type: obj.type || '-',
            workspacename: obj.workspacename || '-',
          });
        });
      if (csvOpen === 'CSV') {
        const header = Object.keys(cstarr[0]);
        generateCSV(csvOpen, header, cstarr, 'MailedReport');
        setUserInfo({ offices: [] });
        setCsvOpen('');
        setOpen(false);
      }
      if (csvOpen === 'XLSX') {
        exportToSpreadsheet(cstarr);
        setUserInfo({ offices: [] });
        setCsvOpen('');
        setOpen(false);
      }
      setUserInfo({ offices: [] });
    }
  }, [exportManage, exportLoading, exportSuccess]);

  function toggleSecondAccordion(id) {
    if (id === updateState) {
      setUpdateState('');
    } else {
      setUpdateState(id);
    }
  }

  function handleExport(data) {
    const arr = [];
    data.offices.map(ev => {
      const isDuplicate = arr.includes(ev);
      if (!isDuplicate) {
        arr.push(ev);
        return true;
      }
      return false;
    });
    requestGetManageExport({
      newExport: true,
      officeSearch: arr.length > 0 ? arr : ['DC', 'RIC'],
    });
  }

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

  const handleCheckbox = (data, val, final) => {
    const dataFinal = flooring && flooring.split(',');
    setManageLoader(final);
    if (final === 'FloorClick') {
      const dataVal = data && data.split(',');
      const payload = {
        floor: dataVal && dataVal[0] !== 'null' ? dataVal[0] : '',
        building: dataVal && dataVal[1] !== 'null' ? dataVal[1] : '',
        isLocationBuildingFloor: true,
        locationid: state.selectedNames,
        active: !val,
      };
      requestUpdateActiveStatus(payload);
    } else if (final === 'colorCLick') {
      const payload = {
        active: !val,
        locationid: state.selectedNames,
        floor: dataFinal && dataFinal[0] !== 'null' ? dataFinal[0] : '',
        building: dataFinal && dataFinal[1] !== 'null' ? dataFinal[1] : '',
        colorcode: data,
        isWorkspace: false,
      };
      requestUpdateActiveStatus(payload);
    } else if (final === 'neighborhoodClick') {
      const payload = {
        active: val,
        locationid: state.selectedNames,
        floor: dataFinal && dataFinal[0] !== 'null' ? dataFinal[0] : '',
        building: dataFinal && dataFinal[1] !== 'null' ? dataFinal[1] : '',
        isWorkspace: true,
        isWorkspaceId: data,
      };
      requestUpdateActiveStatus(payload);
    }
  };

  const floorData =
    lockSpaceData &&
    lockSpaceData.find(data =>
      data.id === state.selectedNames ? data.buildingFloor : '',
    );
  const finalLocate =
    officeLocation &&
    officeLocation.filter(
      obj => obj.id !== 'BHM' && obj.id !== 'RW' && obj.id !== 'BLM',
    );

  const handlePane = id => {
    const spaceInp =
      spaceValue &&
      spaceValue.length > 0 &&
      spaceValue.map(el => {
        if (el.id === id) {
          const val = {
            ...el,
            isInput: true,
          };
          return val;
        }
        return el;
      });
    setSpaceValue(spaceInp);
  };

  const onCheckbox = (e, idx) => {
    const { value, checked } = e.target;
    const spaceInp =
      spaceValue &&
      spaceValue.length > 0 &&
      spaceValue.map(el => {
        if (el.id === idx && checked === true) {
          const val = {
            ...el,
            isChecked: true,
            isFloor: true,
            isNeighborh: true,
            spaceType: true,
            algorithm: true,
            isPen: true,
          };
          return val;
        } else if (el.id === idx && checked === false) {
          const val = {
            ...el,
            isChecked: false,
            isInput: false,
            isFloor: false,
            isNeighborh: false,
            spaceType: false,
            algorithm: false,
            isPen: false,
          };
          return val;
        }
        return el;
      });
    setSpaceValue(spaceInp);
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
    handleSelectedoffice(officeList);
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
    handleSelectedFloor(floorList);
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
    handleSelectedNeighbor(neighborList);
  };

  const handleNeibourUpdateSelect = data => {
    setUpdatedData({
      name: data.name,
    });
  };
  const enableEdit = () => {
    // setShowEditIcons(true);
    console.log('focused');
  };
  const disableEdit = () => {
    console.log('onBlur');
    // setShowEditIcons(false);
  };

  const handleFloorUpdateSelect = (data, rowId, col) => {
    const dataName = [];
    dataName.push({
      name: data.name,
      rowId,
      col,
    });
    setFloorbuildData(dataName);
  };

  const handleOfficeUpdateSelect = (data, rowId, col) => {
    const dataName = [];
    dataName.push({
      name: data.name,
      rowId,
      col,
    });
    setOfficeTypeData(dataName);
  };

  return (
    <div className="wrapper_main">
      {setSpaceUpdate && setSpaceUpdate.showUpdateStatusMessage && (
        <div
          className={`alert fade show mx-auto ${
            setSpaceUpdate && setSpaceUpdate.showUpdateStatusSuccess
              ? 'alert alert-success'
              : 'alert alert-danger'
          }`}
        >
          <div>
            <img
              src={
                setSpaceUpdate && setSpaceUpdate.showUpdateStatusSuccess
                  ? checkedCircle
                  : crossCircle
              }
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />
            {(setSpaceUpdate && setSpaceUpdate.showUpdateStatusMessage) || ''}
          </div>
          <div
            aria-hidden="true"
            style={{
              float: 'right',
              fontSize: 'large',
              marginLeft: '10px',
            }}
            onClick={handleCloseUpdate}
            className="day-pointer"
          >
            &#10006;
          </div>
        </div>
      )}
      <div className="office_maps" style={{ marginBottom: '65px' }}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h4 className="common-title">Manage Spaces</h4>
            <Button
              variant="primary"
              className="px-4 py-3"
              style={{ borderRadius: '8px' }}
              onClick={() => {
                setOpen(true);
                setUserInfo({ offices: [] });
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
                    style={{ cursor: 'alias' }}
                    className="dropdown-toggle"
                    value={state.finalOfficeVal}
                    placeholder="Select..."
                    data-bs-toggle="dropdown"
                    data-target="#dropdownMenuButton1"
                    // id="dropdownMenuButton1"
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
                    style={{ cursor: 'alias' }}
                    className="dropdown-toggle"
                    value={state.finalFloorVal}
                    placeholder="Select..."
                    data-bs-toggle="dropdown"
                    data-target="#dropdownMenuButton2"
                  />
                  <Image
                    className="img_select"
                    data-bs-toggle="dropdown"
                    data-target="#dropdownMenuButton2"
                    src={SelectDownArrow}
                  />
                  <ul
                    className="dropdown-menu"
                    id="dropdownMenuButton2"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    {officeFloors &&
                      officeFloors.map((item, index) => (
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
                    style={{ cursor: 'alias' }}
                    className="dropdown-toggle"
                    value={state.finalNeighborhoodVal}
                    placeholder="Select..."
                    data-bs-toggle="dropdown"
                    data-target="#dropdownMenuButton3"
                  />
                  <Image
                    className="img_select"
                    data-bs-toggle="dropdown"
                    data-target="#dropdownMenuButton3"
                    src={SelectDownArrow}
                  />
                  <ul
                    className="dropdown-menu"
                    id="dropdownMenuButton3"
                    aria-labelledby="dropdownMenuButton3"
                  >
                    {officeNeighborhoods &&
                      officeNeighborhoods.map((item, index) => (
                        <li
                          aria-hidden
                          onClick={() =>
                            handleSelectedNeighborList(index, !item.isSelected)
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
                  onChange={handleSearcha}
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
            <table id="tableData">
              <tr>
                <th>
                  {spaceAllChecked.length === 0 ||
                  spaceAllChecked.length === spaceValue.length ? (
                    <Form.Check
                      onChange={e => handleSelectAll(e)}
                      className="mycheckbox1"
                      name="group2"
                      checked={
                        spaceAllChecked.length !== 0 &&
                        spaceAllChecked.length === spaceValue.length
                      }
                    />
                  ) : (
                    <>
                      <img
                        aria-hidden
                        onClick={() => handleClear()}
                        src={CheckboxInput}
                        alt="img"
                      />
                    </>
                  )}
                </th>
                <th style={{ width: '17%' }}>
                  Building/floor{' '}
                  <img
                    src={Sort}
                    className="img-fluid sort-img"
                    alt=""
                    name="floor"
                    aria-hidden="true"
                    value={manageData.floor}
                    onClick={() =>
                      handleClickSort(
                        'building_floor',
                        state.sortOrder.building_floor,
                      )
                    }
                  />
                </th>
                <th style={{ width: '16%' }}>
                  Neighborhood{' '}
                  <img
                    src={Sort}
                    className="img-fluid sort-img"
                    name="neighborhood"
                    alt=""
                    aria-hidden="true"
                    value={manageData.neighborhood}
                    onClick={() =>
                      handleClickSort(
                        'neighborhood',
                        state.sortOrder.neighborhood,
                      )
                    }
                  />
                </th>
                <th style={{ width: '13%' }}>
                  Space{' '}
                  <img
                    src={Sort}
                    className="img-fluid sort-img"
                    alt=""
                    aria-hidden="true"
                    name="space"
                    value={manageData.space}
                    onClick={() =>
                      handleClickSort('space', state.sortOrder.space)
                    }
                  />
                </th>
                <th style={{ width: '16%' }}>
                  Space type{' '}
                  <img
                    src={Sort}
                    className="img-fluid sort-img"
                    alt=""
                    aria-hidden="true"
                    name="type"
                    value={manageData.type}
                    onClick={() =>
                      handleClickSort('space_type', state.sortOrder.space_type)
                    }
                  />
                </th>
                <th style={{ width: '16%' }}>
                  Assigned{' '}
                  <img
                    src={Sort}
                    className="img-fluid sort-img"
                    alt=""
                    aria-hidden="true"
                    name="assigned"
                    value={manageData.assigned}
                    onClick={() =>
                      handleClickSort('assigned', state.sortOrder.assigned)
                    }
                  />
                </th>
                <th style={{ width: '17%' }}>
                  algorithm Status{' '}
                  <img
                    src={Sort}
                    className="img-fluid sort-img"
                    alt=""
                    name="status"
                    aria-hidden="true"
                    value={manageData.status}
                    onClick={() =>
                      handleClickSort(
                        'algorithm_status',
                        state.sortOrder.algorithm_status,
                      )
                    }
                  />
                </th>
              </tr>
              {manageLoading ? (
                <tr>
                  <td colSpan="7">
                    <Spinner
                      className="app-spinner"
                      animation="grow"
                      variant="dark"
                    />
                  </td>
                </tr>
              ) : manageSpace && manageSpace.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="employee-norecord">No record found</div>
                  </td>
                </tr>
              ) : (
                spaceValue &&
                spaceValue.length > 0 &&
                spaceValue.map((i, idx) => (
                  <tr>
                    <td>
                      <Form.Check
                        className="mycheckbox1"
                        name="group2"
                        checked={i.isChecked ? true : false}
                        onChange={e => {
                          onCheckbox(e, i.id);
                        }}
                      />
                    </td>
                    <td className="assigned_text">
                      {i.isNeighborh ? (
                        <div className="table-filter-dropdown">
                          <div className="table-filter-dropdown-group">
                            <div
                              className=""
                              aria-hidden
                              onClick={() => {
                                setIsShowDropdown(true);
                                setIsShowColDropdown('floor');
                              }}
                            >
                              <input
                                type="input"
                                style={{ cursor: 'alias' }}
                                value={`${i.floor}`}
                                placeholder="Select..."
                                className="drop-input"
                              />
                              <Image
                                className="img_select"
                                src={SelectDownArrow}
                              />
                            </div>
                            {isShowDropdown && isShowColDropdown === 'floor' ? (
                              <div className="dropdown-list-group">
                                <ul>
                                  {updatedOfficeFloor &&
                                    updatedOfficeFloor.map((item, index) => (
                                      <li
                                        key={item.name}
                                        aria-hidden
                                        onClick={() => {
                                          handleNeibourUpdateSelect(
                                            item,
                                            index,
                                          );
                                        }}
                                      >
                                        {/* <div className="list-items isChecked"> */}
                                        <div className="list-items">
                                          <span>{item.name}</span>
                                          {/* <img
                                          src={CheckedItem}
                                          alt=""
                                          className="float-end"
                                        /> */}
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                                <div className="drop-footer">
                                  <input
                                    type="checkbox"
                                    className="getAll"
                                    name="all"
                                  />
                                  <small className="getAll_text">
                                    {' '}
                                    Update 2 selected items
                                  </small>
                                  <div className="footer-button-group right">
                                    <span
                                      aria-hidden
                                      onClick={() => setIsShowDropdown(false)}
                                    >
                                      Cancel
                                    </span>{' '}
                                    <Button className="btn apply-btn">
                                      Apply
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      ) : (
                        <span aria-hidden>
                          {i.floor}
                          {i.building}
                        </span>
                      )}
                    </td>
                    <td className="assigned_text">
                      {i.isNeighborh ? (
                        <div className="table-filter-dropdown">
                          <div className="table-filter-dropdown-group">
                            <div
                              className=""
                              aria-hidden
                              onClick={() => {
                                setIsShowDropdown(true);
                                setIsShowColDropdown('neighbor');
                              }}
                            >
                              <input
                                type="input"
                                style={{ cursor: 'alias' }}
                                value={`${i.neighborhoodname}`}
                                placeholder="Select..."
                                className="drop-input"
                              />
                              <Image
                                className="img_select"
                                src={SelectDownArrow}
                              />
                            </div>
                            {isShowDropdown &&
                            isShowColDropdown === 'neighbor' ? (
                              <div className="dropdown-list-group">
                                <ul>
                                  {updatedNeibour &&
                                    updatedNeibour.map((item, index) => (
                                      <li
                                        key={item.name}
                                        aria-hidden
                                        onClick={() => {
                                          handleNeibourUpdateSelect(
                                            item,
                                            index,
                                          );
                                        }}
                                      >
                                        {/* <div className="list-items isChecked"> */}
                                        <div className="list-items">
                                          <span>{item.name}</span>
                                          {/* <img
                                         src={CheckedItem}
                                         alt=""
                                         className="float-end"
                                       /> */}
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                                <div className="drop-footer">
                                  <input
                                    type="checkbox"
                                    className="getAll"
                                    name="all"
                                  />
                                  <small className="getAll_text">
                                    {' '}
                                    Update 2 selected items
                                  </small>
                                  <div className="footer-button-group right">
                                    <span
                                      aria-hidden
                                      onClick={() => setIsShowDropdown(false)}
                                    >
                                      Cancel
                                    </span>{' '}
                                    <Button className="btn apply-btn">
                                      Apply
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      ) : (
                        <>{i.neighborhoodname}</>
                      )}
                    </td>

                    {i.isInput ? (
                      <td className="assigned_text">
                        <div className="table-input-group">
                          <input
                            type="text"
                            value={editedText}
                            onKeyDown={event => {
                              handleKeydown(event);
                            }}
                            onClick={() => {
                              setIsShowDropdown(true);
                              setIsShowColDropdown('space');
                            }}
                            className="updateSpace"
                            onChange={e => inputValue(e)}
                            onBlur={onEditEnd}
                          />
                          {isShowDropdown && isShowColDropdown === 'space' ? (
                            <div className="list-group">
                              <div className="drop-footer">
                                <div className="footer-button-group right">
                                  <span
                                    aria-hidden
                                    onClick={() => setIsShowDropdown(false)}
                                  >
                                    Cancel
                                  </span>{' '}
                                  <Button className="btn apply-btn">
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </td>
                    ) : (
                      <td className="assigned_text">
                        <div className="select-none">
                          {i.workspacename || editedText}
                          {i.isPen && (
                            <Image
                              className="editInput"
                              src={GreyPencil}
                              onClick={() => {
                                handlePane(i.id);
                              }}
                            />
                          )}
                        </div>
                      </td>
                    )}
                    {/* <td className="assigned_text">
                      {i.spaceType ? (
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            {i.type}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Something else
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <>{i.type}</>
                      )}
                    </td> */}
                    <td className="assigned_text">
                      {i.spaceType ? (
                        <div className="custom-update-dropdown">
                          <div className="dropdown">
                            <input
                              type="input"
                              style={{ cursor: 'alias' }}
                              className="dropdown-toggle"
                              value={
                                (officeTypeData &&
                                  officeTypeData.length > 0 &&
                                  officeTypeData.map(ele =>
                                    ele.rowId === idx
                                      ? ele.name
                                      : i.neighborhoodname,
                                  )) ||
                                i.neighborhoodname
                              }
                              placeholder="Select..."
                              data-bs-toggle="dropdown"
                              data-target="#dropdownMenuButton3"
                            />
                            <Image
                              className="img_update"
                              data-bs-toggle="dropdown"
                              data-target="#dropdownMenuButton3"
                              src={SelectDownArrow}
                            />
                            <ul
                              className="dropdown-menu"
                              id="dropdownMenuButton3"
                              aria-labelledby="dropdownMenuButton3"
                            >
                              {updatedNeibour &&
                                updatedNeibour.map((item, index) => (
                                  <li
                                    aria-hidden
                                    onClick={() =>
                                      handleOfficeUpdateSelect(item, idx)
                                    }
                                  >
                                    <span>{item.name}</span>
                                    <div
                                      className={
                                        (officeTypeData &&
                                          officeTypeData.length > 0 &&
                                          officeTypeData.map(ele =>
                                            ele.rowId === idx &&
                                            ele.name === item.name
                                              ? 'selected_val float-end'
                                              : '',
                                          )) ||
                                        (updatedNeibour &&
                                          updatedNeibour.length > 0 &&
                                          updatedNeibour.map(ele =>
                                            ele.name === item.name
                                              ? 'selected_val float-end'
                                              : '',
                                          ))
                                      }
                                    />
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <>{i.type}</>
                      )}
                    </td>
                    <td
                      className={`${
                        i.assigned === 'Not assigned'
                          ? 'notAssign_text'
                          : 'assigned_text'
                      }`}
                    >
                      {i.assigned}
                    </td>
                    {/* <td className="assigned_text">
                      {i.algorithm ? (
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            {i.active === true ? 'Active' : 'Inactive'}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">
                              Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              Another action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                              Something else
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <>{i.active === true ? 'Active' : 'Inactive'}</>
                      )}
                    </td> */}
                    <td className="assigned_text">
                      {i.algorithm ? (
                        <div className="custom-update-dropdown">
                          <div className="dropdown">
                            <input
                              type="input"
                              style={{ cursor: 'alias' }}
                              className="dropdown-toggle"
                              value={
                                (officeTypeData &&
                                  officeTypeData.length > 0 &&
                                  officeTypeData.map(ele =>
                                    ele.rowId === idx
                                      ? ele.name
                                      : i.active === true
                                      ? 'Active'
                                      : 'Inactive',
                                  )) ||
                                i.active === true
                                  ? 'Active'
                                  : 'Inactive'
                              }
                              placeholder="Select..."
                              data-bs-toggle="dropdown"
                              data-target="#dropdownMenuButton3"
                            />
                            <Image
                              className="img_update"
                              data-bs-toggle="dropdown"
                              data-target="#dropdownMenuButton3"
                              src={SelectDownArrow}
                            />
                            <ul
                              className="dropdown-menu"
                              id="dropdownMenuButton3"
                              aria-labelledby="dropdownMenuButton3"
                            >
                              {updatedNeibour &&
                                updatedNeibour.map((item, index) => (
                                  <li
                                    aria-hidden
                                    onClick={() =>
                                      handleOfficeUpdateSelect(item, idx)
                                    }
                                  >
                                    <span>{item.name}</span>
                                    <div
                                      className={
                                        (officeTypeData &&
                                          officeTypeData.length > 0 &&
                                          officeTypeData.map(ele =>
                                            ele.rowId === idx &&
                                            ele.name === item.name
                                              ? 'selected_val float-end'
                                              : '',
                                          )) ||
                                        (updatedNeibour &&
                                          updatedNeibour.length > 0 &&
                                          updatedNeibour.map(ele =>
                                            ele.name === item.name
                                              ? 'selected_val float-end'
                                              : '',
                                          ))
                                      }
                                    />
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <>{i.active === true ? 'Active' : 'Inactive'}</>
                      )}
                    </td>
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
                  value={state.limit}
                  onChange={e => handleLimitChange(e.target.value)}
                >
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
                  <option value="30">30 per page</option>
                  <option value="40">40 per page</option>
                </select>
              </div>
              <div className="">
                {state.page * state.limit - (state.limit - 1)} -
                {state.page * state.limit} of {dataCount && dataCount.count}{' '}
                shown
              </div>
              <Pagination
                className="pagination-bar"
                currentPage={state.page}
                totalCounts={dataCount && dataCount.count * state.limit}
                totalCount={dataCount && dataCount.count}
                pageSize={state.limit}
                onPageChange={page => handlePageChange(page)}
              />
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
        {!exportLoading ? (
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
              handleExport(userinfo);
              setCsvOpen('CSV');
            }}
            disabled={exportLoading}
          >
            .CSV Export
          </Button>
          <Button
            variant="primary"
            className="btn xlsx-modal cust-model-btn"
            data-bs-dismiss="modal"
            onClick={() => {
              handleExport(userinfo);
              setCsvOpen('XLSX');
            }}
            disabled={exportLoading}
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
      <div className="office_maps">
        <div className="container">
          <div className="head d-flex align-items-center">
            <div className="d-flex align-items-center">
              <h4 className="common-title mb-0 me-2">Locked Spaces</h4>
              <div className="data-63">
                <img
                  style={{ marginBottom: '7px' }}
                  src={vector}
                  alt=""
                  aria-hidden="true"
                  name="Building/Floor"
                />
                <span className="hover-data expected_hover-span">
                  <span>Inactive workstations and offices</span>
                </span>
              </div>
            </div>
            <div className="office-selections wrap">
              <div className="selction_one ww-100">
                <label htmlFor>Office</label>
                <select
                  name=""
                  id=""
                  value={state.selectedNames}
                  onChange={e => {
                    handleUserSelect(e);
                    setActiveState('');
                  }}
                  className="set_drop"
                >
                  {finalLocate &&
                    finalLocate.map(obj => (
                      <>
                        <option
                          value={obj.id}
                          key={obj.locationname}
                          id="building"
                        >
                          {obj.locationname}
                        </option>
                      </>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="spaces-section">
            {officeLocation && !officeLocation.length ? (
              <Spinner
                className="app-spinner"
                animation="grow"
                variant="dark"
              />
            ) : (
              <>
                {floorData &&
                  floorData.buildingFloor &&
                  floorData.buildingFloor.map(obj => (
                    <div className="accordion_box">
                      <div
                        aria-hidden="true"
                        className={`accordion3 line ${
                          setActive === obj.floorId ? 'active' : ''
                        }`}
                        key={obj.floor}
                        id={obj.floor}
                        onClick={() => {
                          setFloor(`${obj.floor}`);
                          toggleAccordion(obj.floorId);
                        }}
                      >
                        <span className="dash-menu-item">
                          {obj.building !== null && obj.floor !== null
                            ? `Building ${obj.building || null},
                                    Floor ${obj.floor}`
                            : obj.building !== null
                            ? `Building ${obj.building || null}`
                            : obj.floor !== null
                            ? `Floor ${obj.floor}`
                            : ''}
                        </span>{' '}
                        <span className="acc-small">{`${
                          obj.lockedWorkspaceNumber
                        }/${obj.totalWorkspace} Locked`}</span>
                      </div>

                      <div
                        className={`panel2 ${
                          setActive === obj.floorId ? '' : 'display_acc'
                        }`}
                      >
                        <div className="panel-list">
                          <div className="dash-menu-list">
                            {obj &&
                              obj.neighborhood.map(floor => (
                                <>
                                  <input
                                    type="checkbox"
                                    id={obj.floor.concat(floor.name)}
                                    checked={
                                      floor.neighborhoodLockedSpace ===
                                      floor.neighborhoodTotalSpace
                                    }
                                    name="checkedItem1"
                                    value="add1"
                                    className="lock2 invisible"
                                    onChange={e => {
                                      handleCheckbox(
                                        floor.colorcode,
                                        e.target.checked,
                                        'colorCLick',
                                      );
                                      setColor(floor.name);
                                    }}
                                  />

                                  <label htmlFor={obj.floor.concat(floor.name)}>
                                    {spaceUpdate &&
                                      spaceUpdate.loading &&
                                      manageLoader === 'colorCLick' && (
                                        <div
                                          className={
                                            floor.name === color
                                              ? 'spinner-border space_loading'
                                              : ''
                                          }
                                        />
                                      )}
                                  </label>
                                  <div
                                    className={`accordion2 ${
                                      updateState === floor.name ? 'active' : ''
                                    }`}
                                    aria-hidden="true"
                                    onClick={() => {
                                      setColor(floor.name);
                                      toggleSecondAccordion(floor.name);
                                    }}
                                  >
                                    <span className="dash-menu-item1 line">
                                      <span
                                        className={`sq-${floor.name.toLowerCase()}`}
                                      />{' '}
                                      {floor.name}{' '}
                                    </span>
                                    <span className="acc-small">{`${
                                      floor.lockedWorkspaceNumber
                                    }/${floor.totalWorkspace} Locked`}</span>
                                  </div>
                                  <div
                                    className={`panel1 ${
                                      updateState === floor.name
                                        ? ''
                                        : 'display_acc'
                                    }`}
                                  >
                                    {floor &&
                                      floor.workspaces &&
                                      floor.workspaces.map(space => (
                                        <>
                                          <input
                                            type="checkbox"
                                            id={space.id}
                                            name="checkedItem2"
                                            value="add2"
                                            checked={space.active}
                                            className="lock3 invisible"
                                            onChange={e => {
                                              handleCheckbox(
                                                space.id,
                                                e.target.checked,
                                                'neighborhoodClick',
                                              );
                                              setSpaceData(space.workspacename);
                                            }}
                                          />
                                          <div className="dash-menu-data">
                                            <label htmlFor={space.id}>
                                              {spaceUpdate &&
                                                spaceUpdate.loading &&
                                                manageLoader ===
                                                  'neighborhoodClick' && (
                                                  <div
                                                    className={
                                                      space.workspacename ===
                                                      spaceData
                                                        ? 'spinner-border space_Update_load'
                                                        : ''
                                                    }
                                                  />
                                                )}
                                            </label>
                                            <div
                                              className="dash-menu-list2"
                                              value={space.workspacename}
                                            >
                                              {space.workspacename}{' '}
                                            </div>
                                          </div>
                                        </>
                                      ))}
                                  </div>
                                </>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Spaces.propTypes = {
  state: PropTypes.object,
  officeLocation: PropTypes.object,
  handleUserSelect: PropTypes.func,
  requestUpdateActiveStatus: PropTypes.func,
  handleCloseUpdate: PropTypes.func,
  spaceUpdate: PropTypes.object,
  officeSuccess: PropTypes.object,
  setSpaceUpdate: PropTypes.object,
  manageSpace: PropTypes.object,
  exportManage: PropTypes.object,
  lockSpaceData: PropTypes.object,
  neighborData: PropTypes.object,
  officeSrcLocation: PropTypes.object,
  officeNeighborhood: PropTypes.object,
  officeFloor: PropTypes.object,
  exportLoading: PropTypes.bool,
  manageLoading: PropTypes.bool,
  exportSuccess: PropTypes.bool,
  dataCount: PropTypes.object,
  handleLimitChange: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleClickSort: PropTypes.func,
  handleSearcha: PropTypes.func,
  requestGetManageExport: PropTypes.func,
  handleSelectedoffice: PropTypes.func,
  handleSelectedFloor: PropTypes.func,
  handleSelectedNeighbor: PropTypes.func,
};
export default Spaces;
