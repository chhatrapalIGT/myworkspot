/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react';
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
import CheckedItem from '../assets/images/Checked.svg';
import hoverImage from '../assets/images/hoverImage.png';
const algoStatus = [
  {
    name: 'Active',
    value: 'Active',
  },
  {
    name: 'Inactive',
    value: 'Inactive',
  },
];

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
  manageDataSuccess,
  officeFloor,
  officeNeighborhood,
  handleSelectedFloor,
  handleSelectedNeighbor,
  lockSpaceData,
  neighborData,
  floorBulidingData,
  requestManageUpdateSpace,
  handleManagespaceUpdate,
  officesData,
  handleData,
  manageTotalPages,
  manageDataMessage,
  handleFloorByName,
  requestGetLockSpace,
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
  const [open, setOpen] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [csvOpen, setCsvOpen] = useState('');
  const [userinfo, setUserInfo] = useState({
    offices: [],
  });
  const [officeLocations, setOfficeLocations] = useState([]);
  const [officeFloors, setOfficeFloors] = useState([]);
  const [buildFloors, setBuildFloors] = useState([]);
  const [updatedOfficeFloor, setUpdatedOfficeFloor] = useState([]);
  const [officeNeighborhoods, setOfficeNeighborhoods] = useState([]);
  const [updatedNeibour, setUpdatedNeibour] = useState([]);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isShowColDropdown, setIsShowColDropdown] = useState('');
  const [isShowRowDropdown, setIsShowRowDropdown] = useState(null);
  const [currentCheckedValue, setCurrentCheckedValue] = useState('');
  const [changeAll, setChangeAll] = useState(false);
  const [exportDC, setExportDC] = useState(true);
  const [exportRIC, setExportRIC] = useState(true);
  let updatedFloors = [];
  const updatedNeighborhood = [];
  const inputValue = e => {
    setEditedText(e.target.value);
  };
  const ref = useRef();

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

  useEffect(() => {
    if (!manageDataSuccess && manageDataMessage) {
      setTimeout(() => {
        handleData();
      }, 7000);
    }
    if (manageDataSuccess && manageDataMessage) {
      setTimeout(() => {
        handleData();
      }, 7000);
    }
  }, [manageDataSuccess, manageDataMessage]);

  useEffect(() => {
    if (manageDataSuccess) {
      handleManagespaceUpdate();
      requestGetLockSpace();
    }
  }, [manageDataSuccess]);

  const handleUpdateManageSpace = (rowData, cols, map) => {
    const idData = [];
    const floorObj = [];
    const neibourObj = [];
    if (rowData && rowData.length) {
      if (changeAll) {
        rowData &&
          rowData.length > 0 &&
          rowData.filter(ele => {
            idData.push(ele.id);
            floorObj.push({
              id: ele.id || null,
              floor: currentCheckedValue,
              building: ele.building || null,
              neighborhoodname: ele.neighborhoodname || null,
              locationid: ele.locationid || null,
            });
            neibourObj.push({
              id: ele.id || null,
              floor: ele.floor || null,
              building: ele.building || null,
              neighborhoodname: currentCheckedValue,
              locationid: ele.locationid || null,
            });
          });
      } else {
        idData.push(cols.id);
        floorObj.push({
          id: cols.id || null,
          floor: currentCheckedValue,
          building: cols.building || null,
          neighborhoodname: cols.neighborhoodname || null,
          locationid: cols.locationid || null,
        });
        neibourObj.push({
          id: cols.id || null,
          floor: cols.floor || null,
          building: cols.building || null,
          neighborhoodname: currentCheckedValue,
          locationid: cols.locationid || null,
        });
      }
    } else {
      idData.push(cols.id);
      floorObj.push({
        id: cols.id || null,
        floor: currentCheckedValue,
        building: cols.building || null,
        neighborhoodname: cols.neighborhoodname || null,
        locationid: cols.locationid || null,
      });
      neibourObj.push({
        id: cols.id || null,
        floor: cols.floor || null,
        building: cols.building || null,
        neighborhoodname: currentCheckedValue,
        locationid: cols.locationid || null,
      });
    }
    let payload = {};
    if (map === 'flooringCols') {
      payload = {
        floor: floorObj,
        neighborhoodname: null,
        Space_No: null,
        Space_Type: null,
        active: null,
        id: rowData.length > 0 ? idData : idData[0].id || [cols.id],
      };
      requestManageUpdateSpace(payload);
    }
    if (map === 'neibourCols') {
      payload = {
        neighborhoodname: neibourObj,
        floor: null,
        Space_No: null,
        Space_Type: null,
        active: null,
        id: rowData.length > 0 ? idData : idData[0].id || [cols.id],
      };
      requestManageUpdateSpace(payload);
    }
    if (map === 'spaceCols') {
      payload = {
        floor: null,
        Space_No: currentCheckedValue,
        neighborhoodname: null,
        Space_Type: null,
        active: null,
        id: cols.id,
      };
      requestManageUpdateSpace(payload);
    }
    if (map === 'spaceTypesCols') {
      payload = {
        Space_Type: currentCheckedValue,
        neighborhoodname: null,
        Space_No: null,
        floor: null,
        active: null,
        id: rowData.length > 0 ? idData : idData[0].id || [cols.id],
      };
      requestManageUpdateSpace(payload);
    }
    if (map === 'algorithmCols') {
      payload = {
        Space_Type: null,
        neighborhoodname: null,
        Space_No: null,
        floor: null,
        active: currentCheckedValue === 'Active' ? true : false,
        id: rowData.length > 0 ? idData : idData[0].id || [cols.id],
      };
      requestManageUpdateSpace(payload);
    }
  };

  const handleSelectAll = event => {
    const { checked } = event.target;
    if (checked) {
      if (spaceValue && spaceValue.length > 0) {
        const allChecked = spaceValue.map(el => {
          const alldata = {
            ...el,
            isChecked: true,
          };
          return alldata;
        });
        setSpaceValue(allChecked);
      }
    } else if (spaceValue && spaceValue.length > 0) {
      const allChecked = spaceValue.map(el => {
        const alldata = {
          ...el,
          isChecked: false,
        };
        return alldata;
      });
      setSpaceValue(allChecked);
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
      { label: 'All', name: 'All', value: 'All', isSelected: false },
    ];
    officeLocation &&
      officeLocation.map(obj => {
        if (obj.id === 'DC' || obj.id === 'RIC') {
          if (obj.id === 'DC') {
            tempArr.push({
              label: obj.locationname,
              name: obj.locationname,
              value: obj.id,
              isSelected: true,
            });
          } else {
            tempArr.push({
              label: obj.locationname,
              name: obj.locationname,
              value: obj.id,
              isSelected: false,
            });
          }
        }
      });
    setOfficeLocations(tempArr);
  }, [officeLocation]);
  useEffect(() => {
    const tempArr = [];

    if (state.filterApplied) {
      tempArr.push({
        label: 'All',
        name: 'All',
        value: 'All',
        isSelected: true,
      });
    } else {
      tempArr.push({
        label: 'All',
        name: 'All',
        value: 'All',
        isSelected: false,
      });
    }
    officeFloor &&
      officeFloor.map(obj => {
        if (state.filterApplied) {
          if (obj.floor !== null) {
            tempArr.push({
              label: `Floor ${obj.floor}`,
              name: `Floor ${obj.floor}`,
              value: `Floor ${obj.floor}`,
              isSelected: true,
            });
          }
          // if (obj.building !== null) {
          //   tempArr.push({
          //     label: `Building ${obj.building}`,
          //     name: `Building ${obj.building}`,
          //     value: `Building ${obj.building}`,
          //     isSelected: true,
          //   });
          // }
        } else if (obj.floor !== null) {
          if (obj.floor === 3 || obj.floor === 8) {
            tempArr.push({
              label: `Floor ${obj.floor}`,
              name: `Floor ${obj.floor}`,
              value: `Floor ${obj.floor}`,
              isSelected: true,
            });
          } else {
            tempArr.push({
              label: `Floor ${obj.floor}`,
              name: `Floor ${obj.floor}`,
              value: `Floor ${obj.floor}`,
              isSelected: false,
            });
          }
        }
        // if (obj.building !== null) {
        //   tempArr.push({
        //     label: `Building ${obj.building}`,
        //     name: `Building ${obj.building}`,
        //     value: `Building ${obj.building}`,
        //     isSelected: false,
        //   });
        // }
        // }
      });
    updatedFloors = tempArr.filter(i => i.value !== 'All');
    setOfficeFloors(tempArr);
  }, [officeFloor]);

  useEffect(() => {
    const tempRICArr = [];
    floorBulidingData &&
      floorBulidingData.map(obj => {
        if (obj.floor !== null) {
          tempRICArr.push({
            label: `Floor ${obj.floor}`,
            name: `Floor ${obj.floor}`,
            value: `Floor ${obj.floor}`,
            isSelected: true,
          });
        }
      });
    setUpdatedOfficeFloor(tempRICArr);
  }, [floorBulidingData]);

  useEffect(() => {
    const tempArr = [
      { label: 'All', name: 'All', value: 'All', isSelected: true },
    ];
    officeNeighborhood &&
      officeNeighborhood.map(obj => {
        if (obj.name !== '4th Floor') {
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
        }
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
    const DCarr = [];
    const RICarr = [];
    if (exportManage && exportManage.length > 0) {
      exportManage &&
        exportManage.map(obj => {
          if (obj.locationid === 'DC') {
            DCarr.push({
              OfficeId: obj.locationid,
              Building: obj.building || '-',
              Floor: obj.floor || '-',
              Neighborhood: obj.neighborhoodname || '-',
              Space: obj.workspacename || '-',
              SpaceType: obj.type || '-',
              Attributes: obj.attributes || '-',
              Assigned: obj.assigned || '-',
              AlgorithmStatus: obj.active || '-',
              // id: obj.id || '-',
            });
          }
          if (obj.locationid === 'RIC') {
            RICarr.push({
              OfficeId: obj.locationid,
              Building: obj.building || '-',
              Floor: obj.floor || '-',
              Neighborhood: obj.neighborhoodname || '-',
              Space: obj.workspacename || '-',
              SpaceType: obj.type || '-',
              Attributes: obj.attributes || '-',
              Assigned: obj.assigned || '-',
              AlgorithmStatus: obj.active || '-',
              // id: obj.id || '-',
            });
          }
        });
    } else {
      DCarr.push({
        OfficeId: '',
        Building: '',
        Floor: '',
        Neighborhood: '',
        Space: '',
        SpaceType: '',
        Attributes: '',
        Assigned: '',
        AlgorithmStatus: '',
        // id: '',
      });
      RICarr.push({
        OfficeId: '',
        Building: '',
        Floor: '',
        Neighborhood: '',
        Space: '',
        SpaceType: '',
        Attributes: '',
        Assigned: '',
        AlgorithmStatus: '',
        // id: '',
      });
    }
    if (csvOpen === 'CSV') {
      if (
        (userinfo && userinfo.offices.length > 1) ||
        (userinfo && userinfo.offices.length === 0)
      ) {
        const header = Object.keys(DCarr[0]);
        generateCSV('CSV', header, DCarr, 'DC Spaces');
        const header1 = Object.keys(RICarr[0]);
        generateCSV('CSV', header1, RICarr, 'Richmond Spaces');
      } else if (userinfo && userinfo.offices.includes('DC')) {
        const header = Object.keys(DCarr[0]);
        generateCSV('CSV', header, DCarr, 'DC Spaces');
      } else if (userinfo && userinfo.offices.includes('RIC')) {
        const header = Object.keys(RICarr[0]);
        generateCSV('CSV', header, RICarr, 'Richmond Spaces');
      }
      setCsvOpen('');
      setOpen(false);
      setExportDC(false);
      setExportRIC(false);
      setUserInfo({ offices: [] });
    }
    if (csvOpen === 'XLSX') {
      if (
        (userinfo && userinfo.offices.length > 1) ||
        (userinfo && userinfo.offices.length === 0)
      ) {
        exportToSpreadsheet(DCarr, 'DC Spaces');
        exportToSpreadsheet(RICarr, 'Richmond Spaces');
      } else if (userinfo && userinfo.offices.includes('DC')) {
        exportToSpreadsheet(DCarr, 'DC Spaces');
      } else if (userinfo && userinfo.offices.includes('RIC')) {
        exportToSpreadsheet(RICarr, 'Richmond Spaces');
      }
      setCsvOpen('');
      setOpen(false);
      setExportDC(false);
      setExportRIC(false);
      setUserInfo({ offices: [] });
    }
    setUserInfo({ offices: [] });
  }, [exportManage]);

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
      sort_column: state.sort_column,
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

  const handlePane = (id, toggleStatus) => {
    const spaceInp =
      spaceValue &&
      spaceValue.length > 0 &&
      spaceValue.map(el => {
        if (el.id === id) {
          const val = {
            ...el,
            isInput: toggleStatus,
            algorithm: false,
            isFloor: false,
            isNeighborh: false,
            isPen: false,
            spaceType: false,
          };
          return val;
        }

        return el;
      });
    setSpaceValue(spaceInp);
  };
  const handleFloor = (id, toggleStatus) => {
    const spaceInp =
      spaceValue &&
      spaceValue.length > 0 &&
      spaceValue.map(el => {
        if (el.id === id) {
          const val = {
            ...el,
            isFloor: toggleStatus,
            isInput: false,
            algorithm: false,
            isNeighborh: false,
            isPen: false,
            spaceType: false,
          };
          return val;
        }
        return el;
      });
    setSpaceValue(spaceInp);
  };
  const handleNeibour = (id, toggleStatus) => {
    const spaceInp =
      spaceValue &&
      spaceValue.length > 0 &&
      spaceValue.map(el => {
        if (el.id === id) {
          const val = {
            ...el,
            isFloor: false,
            isInput: false,
            algorithm: false,
            isNeighborh: toggleStatus,
            isPen: false,
            spaceType: false,
          };
          return val;
        }
        return el;
      });
    setSpaceValue(spaceInp);
  };
  const handleSpaceType = (id, toggleStatus) => {
    const spaceInp =
      spaceValue &&
      spaceValue.length > 0 &&
      spaceValue.map(el => {
        if (el.id === id) {
          const val = {
            ...el,
            isFloor: false,
            isInput: false,
            algorithm: false,
            isNeighborh: false,
            isPen: false,
            spaceType: toggleStatus,
          };
          return val;
        }
        return el;
      });
    setSpaceValue(spaceInp);
  };
  const handleAlgoridham = (id, toggleStatus) => {
    const spaceInp =
      spaceValue &&
      spaceValue.length > 0 &&
      spaceValue.map(el => {
        if (el.id === id) {
          const val = {
            ...el,
            isFloor: false,
            isInput: false,
            algorithm: toggleStatus,
            isNeighborh: false,
            isPen: false,
            spaceType: false,
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
          };
          return val;
        } else if (el.id === idx && checked === false) {
          const val = {
            ...el,
            isChecked: false,
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
  const handleSelectedBuildFloorList = (index, status) => {
    let floorList = [];
    floorList =
      buildFloors &&
      buildFloors.map((item, i) => {
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
    setBuildFloors(floorList);
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

  const handleChangeAll = e => {
    const { value, checked } = e.target;
    setChangeAll(checked);
  };

  return (
    <div className="wrapper_main" ref={ref}>
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

      {manageDataMessage && (
        <div
          className={`"alert fade show mx-auto ${
            manageDataSuccess ? 'alert alert-success' : 'alert alert-danger '
          } "`}
        >
          <div>
            <img
              src={manageDataSuccess ? checkedCircle : crossCircle}
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />
            {manageDataMessage}
          </div>
          <div
            style={{
              float: 'right',
              fontSize: 'large',
              marginLeft: '10px',
            }}
            onClick={handleData}
            className="day-pointer"
            aria-hidden="true"
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
                    placeholder="All"
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
                    placeholder="All"
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
                    placeholder="All"
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
                  placeholder="Search..."
                />
                <div className="search-img">
                  <img src={Search} className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="neibour-table">
            <table id="tableData">
              <tr>
                {sessionStorage.getItem('Admin Owner') === 'true' && (
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
                          style={{ height: '17px', width: '17px' }}
                          aria-hidden
                          onClick={() => handleClear()}
                          src={CheckboxInput}
                          alt="img"
                        />
                      </>
                    )}
                  </th>
                )}
                <th>
                  <span className="d-flex text-nowrap">
                    Building/floor{' '}
                    <span className="ms-1">
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
                    </span>
                  </span>
                </th>
                <th>
                  <span className="d-flex text-nowrap">
                    Neighborhood{' '}
                    <span className="ms-1">
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
                    </span>
                  </span>
                </th>
                <th>
                  <span className="d-flex text-nowrap">
                    Space{' '}
                    <span className="ms-1">
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
                    </span>
                  </span>
                </th>
                <th>
                  <span className="d-flex text-nowrap">
                    Space type{' '}
                    <span className="ms-1">
                      <img
                        src={Sort}
                        className="img-fluid sort-img"
                        alt=""
                        aria-hidden="true"
                        name="type"
                        value={manageData.type}
                        onClick={() =>
                          handleClickSort(
                            'space_type',
                            state.sortOrder.space_type,
                          )
                        }
                      />
                    </span>
                  </span>
                </th>
                <th>
                  <span className="d-flex text-nowrap">
                    Assigned{' '}
                    <span className="ms-1">
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
                    </span>
                  </span>
                </th>
                <th>
                  <span className="d-flex text-nowrap">
                    algorithm Status{' '}
                    <span className="ms-1">
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
                    </span>
                  </span>
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
                  <tr
                    className={`${
                      i.isChecked ? 'active-hover active-img' : ''
                    }`}
                  >
                    {sessionStorage.getItem('Admin Owner') === 'true' && (
                      <td>
                        <Form.Check
                          className="mycheckbox1 custom-ml"
                          name="group2"
                          checked={i.isChecked ? true : false}
                          onChange={e => {
                            onCheckbox(e, i.id);
                          }}
                          onClick={() => {
                            setIsShowDropdown(false);
                            setIsShowColDropdown('');
                            setIsShowRowDropdown(idx);
                            setCurrentCheckedValue('');
                            setEditedText('');
                            setChangeAll(false);
                          }}
                        />
                      </td>
                    )}
                    <td className="assigned_text">
                      {i.isFloor ? (
                        <div className="table-filter-dropdown">
                          <div className="table-filter-dropdown-group">
                            <div
                              className=""
                              aria-hidden
                              onClick={() => {
                                setIsShowDropdown(true);
                                setIsShowColDropdown('floor');
                                setIsShowRowDropdown(idx);
                                setChangeAll(false);
                                setCurrentCheckedValue('');
                              }}
                            >
                              <input
                                type="input"
                                style={{ cursor: 'alias' }}
                                value={
                                  currentCheckedValue !== '' &&
                                  isShowRowDropdown === idx &&
                                  isShowColDropdown === 'floor'
                                    ? currentCheckedValue
                                    : i.floor
                                }
                                className="drop-input"
                              />
                              <Image
                                className="img_select"
                                src={SelectDownArrow}
                                onClick={() => {
                                  setIsShowColDropdown('');
                                  setIsShowRowDropdown(null);
                                  setCurrentCheckedValue('');
                                  setIsShowDropdown(false);
                                  handleFloor(i.id, !isShowDropdown);
                                }}
                              />
                            </div>
                            {isShowDropdown &&
                            isShowRowDropdown === idx &&
                            isShowColDropdown === 'floor' ? (
                              <div className="dropdown-list-group">
                                <ul>
                                  {updatedOfficeFloor &&
                                    updatedOfficeFloor.map((item, index) => (
                                      <li
                                        key={item.name}
                                        aria-hidden
                                        onClick={() => {
                                          setCurrentCheckedValue(item.name);
                                        }}
                                      >
                                        {currentCheckedValue === item.name ? (
                                          <div className="list-items isChecked">
                                            <span>{item.name}</span>
                                            <img
                                              src={CheckedItem}
                                              alt=""
                                              className="float-end"
                                            />
                                          </div>
                                        ) : (
                                          <div className="list-items">
                                            <span>{item.name}</span>
                                          </div>
                                        )}
                                      </li>
                                    ))}
                                </ul>
                                <div className="drop-footer">
                                  {spaceAllChecked &&
                                  spaceAllChecked.length > 1 ? (
                                    <>
                                      <input
                                        type="checkbox"
                                        className="getAll"
                                        name="all"
                                        onChange={e => handleChangeAll(e)}
                                      />
                                      <small className="getAll_text">
                                        Update{' '}
                                        {spaceAllChecked &&
                                          spaceAllChecked.length}{' '}
                                        selected items
                                      </small>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                  <div className="footer-button-group right">
                                    <span
                                      className="onHover"
                                      aria-hidden
                                      onClick={() => {
                                        setIsShowColDropdown('');
                                        setIsShowRowDropdown(null);
                                        setCurrentCheckedValue('');
                                        setIsShowDropdown(false);
                                        handleFloor(i.id, false);
                                      }}
                                    >
                                      Cancel
                                    </span>{' '}
                                    <Button
                                      onClick={() => {
                                        handleUpdateManageSpace(
                                          spaceAllChecked,
                                          i,
                                          'flooringCols',
                                        );
                                        setIsShowColDropdown('');
                                        setIsShowRowDropdown(null);
                                        setCurrentCheckedValue('');
                                        handleFloor(i.id, false);
                                      }}
                                      className="btn apply-btn"
                                    >
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
                        <div className="arrow-on-hover">
                          <span aria-hidden>
                            {i.floor}
                            {i.building}
                          </span>
                          {sessionStorage.getItem('Admin Owner') === 'true' && (
                            <Image
                              onClick={() => {
                                handleFloor(i.id, true);
                                handleFloorByName(i.locationid);
                              }}
                              src={hoverImage}
                            />
                          )}
                        </div>
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
                                setIsShowRowDropdown(idx);
                                setChangeAll(false);
                                setCurrentCheckedValue('');
                              }}
                            >
                              <input
                                type="input"
                                style={{ cursor: 'alias' }}
                                value={
                                  currentCheckedValue !== '' &&
                                  isShowRowDropdown === idx &&
                                  isShowColDropdown === 'neighbor'
                                    ? currentCheckedValue
                                    : i.neighborhoodname
                                }
                                className="drop-input"
                              />
                              <Image
                                className="img_select"
                                src={SelectDownArrow}
                                onClick={() => {
                                  setIsShowColDropdown('');
                                  setIsShowRowDropdown(null);
                                  setCurrentCheckedValue('');
                                  setIsShowDropdown(false);
                                  handleNeibour(i.id, !isShowDropdown);
                                }}
                              />
                            </div>
                            {isShowDropdown &&
                            isShowRowDropdown === idx &&
                            isShowColDropdown === 'neighbor' ? (
                              <div className="dropdown-list-group">
                                <ul>
                                  {updatedNeibour &&
                                    updatedNeibour.map((item, index) => (
                                      <li
                                        key={item.name}
                                        aria-hidden
                                        onClick={() => {
                                          setCurrentCheckedValue(item.name);
                                        }}
                                      >
                                        {currentCheckedValue === item.name ? (
                                          <div className="list-items isChecked">
                                            <span>{item.name}</span>
                                            <img
                                              src={CheckedItem}
                                              alt=""
                                              className="float-end"
                                            />
                                          </div>
                                        ) : (
                                          <div className="list-items">
                                            <span>{item.name}</span>
                                          </div>
                                        )}
                                      </li>
                                    ))}
                                </ul>
                                <div className="drop-footer">
                                  {spaceAllChecked &&
                                  spaceAllChecked.length > 1 ? (
                                    <>
                                      <input
                                        type="checkbox"
                                        className="getAll"
                                        name="all"
                                        onChange={e => handleChangeAll(e)}
                                      />
                                      <small className="getAll_text">
                                        Update{' '}
                                        {spaceAllChecked &&
                                          spaceAllChecked.length}{' '}
                                        selected items
                                      </small>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                  <div className="footer-button-group right">
                                    <span
                                      className="onHover"
                                      aria-hidden
                                      onClick={() => {
                                        setIsShowColDropdown('');
                                        setIsShowRowDropdown(null);
                                        setCurrentCheckedValue('');
                                        setIsShowDropdown(false);
                                        handleNeibour(i.id, false);
                                      }}
                                    >
                                      Cancel
                                    </span>{' '}
                                    <Button
                                      onClick={() => {
                                        handleUpdateManageSpace(
                                          spaceAllChecked,
                                          i,
                                          'neibourCols',
                                        );
                                        setIsShowColDropdown('');
                                        setIsShowRowDropdown(null);
                                        setCurrentCheckedValue('');
                                        handleNeibour(i.id, false);
                                      }}
                                      className="btn apply-btn"
                                    >
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
                        <div className="arrow-on-hover">
                          <span>{i.neighborhoodname}</span>
                          {sessionStorage.getItem('Admin Owner') === 'true' && (
                            <Image
                              onClick={() => handleNeibour(i.id, true)}
                              src={hoverImage}
                            />
                          )}
                        </div>
                      )}
                    </td>
                    <td className="assigned_text">
                      {i.isInput ? (
                        <div className="table-input-group">
                          <div
                            className=""
                            aria-hidden
                            onClick={() => {
                              setIsShowDropdown(true);
                              setIsShowColDropdown('space');
                              setIsShowRowDropdown(idx);
                              setChangeAll(false);
                              setCurrentCheckedValue('');
                            }}
                          >
                            {currentCheckedValue !== '' ? (
                              <input
                                type="text"
                                defaultValue={
                                  currentCheckedValue !== '' &&
                                  isShowRowDropdown === idx &&
                                  isShowColDropdown === 'space'
                                    ? currentCheckedValue
                                    : i.workspacename
                                }
                                onKeyDown={event => {
                                  handleKeydown(event);
                                }}
                                className="updateSpace"
                                onChange={e => {
                                  setCurrentCheckedValue(e.target.value);
                                  inputValue(e);
                                }}
                                onBlur={onEditEnd}
                              />
                            ) : (
                              <input
                                type="text"
                                value={i.workspacename}
                                onKeyDown={event => {
                                  handleKeydown(event);
                                }}
                                className="updateSpace"
                                onChange={e => {
                                  setCurrentCheckedValue(e.target.value);
                                  inputValue(e);
                                }}
                                onBlur={onEditEnd}
                              />
                            )}
                          </div>
                          {isShowDropdown &&
                          isShowRowDropdown === idx &&
                          isShowColDropdown === 'space' ? (
                            <div className="list-group">
                              <div className="drop-footer">
                                <div className="footer-button-group right">
                                  <span
                                    className="onHover"
                                    aria-hidden
                                    onClick={() => {
                                      setIsShowColDropdown('');
                                      setIsShowRowDropdown(null);
                                      setCurrentCheckedValue('');
                                      setIsShowDropdown(false);
                                      setEditedText('');
                                      handlePane(i.id, false);
                                    }}
                                  >
                                    Cancel
                                  </span>{' '}
                                  <Button
                                    onClick={() => {
                                      handleUpdateManageSpace(
                                        spaceAllChecked,
                                        i,
                                        'spaceCols',
                                      );
                                      setIsShowColDropdown('');
                                      setIsShowRowDropdown(null);
                                      setCurrentCheckedValue('');
                                      handlePane(i.id, false);
                                    }}
                                    className="btn apply-btn"
                                  >
                                    Apply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      ) : (
                        <div className="select-none arrow-on-hover">
                          {i.workspacename || editedText}
                          {sessionStorage.getItem('Admin Owner') === 'true' && (
                            <Image
                              className="editInput img_height"
                              src={GreyPencil}
                              onClick={() => handlePane(i.id, true)}
                            />
                          )}
                        </div>
                      )}
                    </td>
                    <td className="assigned_text">
                      {i.spaceType ? (
                        <div className="table-filter-dropdown col-custom-width">
                          <div className="table-filter-dropdown-group">
                            <div
                              className=""
                              aria-hidden
                              onClick={() => {
                                setIsShowDropdown(true);
                                setIsShowColDropdown('spaceType');
                                setIsShowRowDropdown(idx);
                                setChangeAll(false);
                                setCurrentCheckedValue('');
                              }}
                            >
                              <input
                                type="input"
                                style={{ cursor: 'alias' }}
                                value={
                                  currentCheckedValue !== '' &&
                                  isShowRowDropdown === idx &&
                                  isShowColDropdown === 'spaceType'
                                    ? currentCheckedValue
                                    : i.assigned === 'Not assigned' &&
                                      (i.type === 'Workstation' ||
                                        i.type === 'Office')
                                    ? `${i.type} (Flex)`
                                    : i.assigned !== 'Not assigned' &&
                                      (i.type === 'Workstation' ||
                                        i.type === 'Office')
                                    ? `${i.type} (Permanent)`
                                    : i.type
                                }
                                className="drop-input"
                              />
                              <Image
                                className="img_select"
                                src={SelectDownArrow}
                                onClick={() => {
                                  setIsShowColDropdown('');
                                  setIsShowRowDropdown(null);
                                  setCurrentCheckedValue('');
                                  setIsShowDropdown(false);
                                  setEditedText('');
                                  handleSpaceType(i.id, !isShowDropdown);
                                }}
                              />
                            </div>
                            {isShowDropdown &&
                            isShowRowDropdown === idx &&
                            isShowColDropdown === 'spaceType' ? (
                              <div className="dropdown-list-group">
                                <ul>
                                  {officesData &&
                                    officesData.map((item, index) => (
                                      <li
                                        key={item.name}
                                        aria-hidden
                                        onClick={() => {
                                          setCurrentCheckedValue(item.name);
                                        }}
                                      >
                                        {currentCheckedValue === item.name ? (
                                          <div className="list-items isChecked">
                                            <span>{item.name}</span>
                                            <img
                                              src={CheckedItem}
                                              alt=""
                                              className="float-end"
                                            />
                                          </div>
                                        ) : (
                                          <div className="list-items">
                                            <span>{item.name}</span>
                                          </div>
                                        )}
                                      </li>
                                    ))}
                                </ul>
                                <div className="drop-footer">
                                  {spaceAllChecked &&
                                  spaceAllChecked.length > 1 ? (
                                    <>
                                      <input
                                        type="checkbox"
                                        className="getAll"
                                        name="all"
                                        onChange={e => handleChangeAll(e)}
                                      />
                                      <small className="getAll_text">
                                        Update{' '}
                                        {spaceAllChecked &&
                                          spaceAllChecked.length}{' '}
                                        selected items
                                      </small>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                  <div className="footer-button-group right">
                                    <span
                                      className="onHover"
                                      aria-hidden
                                      onClick={() => {
                                        setIsShowColDropdown('');
                                        setIsShowRowDropdown(null);
                                        setCurrentCheckedValue('');
                                        setIsShowDropdown(false);
                                        setEditedText('');
                                        handleSpaceType(i.id, false);
                                      }}
                                    >
                                      Cancel
                                    </span>{' '}
                                    <Button
                                      onClick={() => {
                                        handleUpdateManageSpace(
                                          spaceAllChecked,
                                          i,
                                          'spaceTypesCols',
                                        );
                                        setIsShowColDropdown('');
                                        setIsShowRowDropdown(null);
                                        setCurrentCheckedValue('');
                                        handleSpaceType(i.id, false);
                                      }}
                                      className="btn apply-btn"
                                    >
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
                        <div className="arrow-on-hover">
                          {i.attributes === '' || i.attributes === null ? (
                            <span>
                              {i.type}
                              {/* {i.assigned === 'Not assigned' &&
                              (i.type === 'Workstation' || i.type === 'Office')
                                ? `${i.type} (flex)`
                                : i.assigned !== 'Not assigned' &&
                                  (i.type === 'Workstation' ||
                                    i.type === 'Office')
                                ? `${i.type} (Permanent)`
                                : i.type} */}
                            </span>
                          ) : (
                            <span>{`${i.type} (${i.attributes})`}</span>
                          )}
                          {sessionStorage.getItem('Admin Owner') === 'true' && (
                            <Image
                              onClick={() => handleSpaceType(i.id, true)}
                              src={hoverImage}
                            />
                          )}
                        </div>
                      )}
                    </td>
                    <td
                      className={`${
                        i.assigned === 'Not assigned'
                          ? 'notAssign_text'
                          : 'assigned_text'
                      }`}
                      style={{ width: '133px', whiteSpace: 'inherit' }}
                    >
                      <span className="d-flex flex-wrap">{i.assigned}</span>
                    </td>
                    <td className="assigned_text">
                      {i.algorithm ? (
                        <div className="table-filter-dropdown">
                          <div className="table-filter-dropdown-group">
                            <div
                              className=""
                              aria-hidden
                              onClick={() => {
                                setIsShowDropdown(true);
                                setIsShowColDropdown('status');
                                setIsShowRowDropdown(idx);
                                setChangeAll(false);
                                setCurrentCheckedValue('');
                              }}
                            >
                              <input
                                type="input"
                                style={{ cursor: 'alias' }}
                                value={
                                  currentCheckedValue !== '' &&
                                  isShowRowDropdown === idx &&
                                  isShowColDropdown === 'status'
                                    ? currentCheckedValue
                                    : i.active === true
                                    ? 'Active'
                                    : 'Inactive'
                                }
                                className="drop-input"
                              />
                              <Image
                                className="img_select"
                                src={SelectDownArrow}
                                onClick={() => {
                                  setIsShowColDropdown('');
                                  setIsShowRowDropdown(null);
                                  setCurrentCheckedValue('');
                                  setIsShowDropdown(false);
                                  setEditedText('');
                                  handleAlgoridham(i.id, !isShowDropdown);
                                }}
                              />
                            </div>
                            {isShowDropdown &&
                            isShowRowDropdown === idx &&
                            isShowColDropdown === 'status' ? (
                              <div className="dropdown-list-group">
                                <ul>
                                  {algoStatus &&
                                    algoStatus.map((item, index) => (
                                      <li
                                        key={item.name}
                                        aria-hidden
                                        onClick={() => {
                                          setCurrentCheckedValue(item.name);
                                        }}
                                      >
                                        {currentCheckedValue === item.name ? (
                                          <div className="list-items isChecked">
                                            <span>{item.name}</span>
                                            <img
                                              src={CheckedItem}
                                              alt=""
                                              className="float-end"
                                            />
                                          </div>
                                        ) : (
                                          <div className="list-items">
                                            <span>{item.name}</span>
                                          </div>
                                        )}
                                      </li>
                                    ))}
                                </ul>
                                <div className="drop-footer">
                                  {spaceAllChecked &&
                                  spaceAllChecked.length > 1 ? (
                                    <>
                                      <input
                                        type="checkbox"
                                        className="getAll"
                                        name="all"
                                        onChange={e => handleChangeAll(e)}
                                      />
                                      <small className="getAll_text">
                                        Update{' '}
                                        {spaceAllChecked &&
                                          spaceAllChecked.length}{' '}
                                        selected items
                                      </small>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                  <div className="footer-button-group right">
                                    <span
                                      className="onHover"
                                      aria-hidden
                                      onClick={() => {
                                        setIsShowColDropdown('');
                                        setIsShowRowDropdown(null);
                                        setCurrentCheckedValue('');
                                        setIsShowDropdown(false);
                                        setEditedText('');
                                        handleAlgoridham(i.id, false);
                                      }}
                                    >
                                      Cancel
                                    </span>{' '}
                                    <Button
                                      onClick={() => {
                                        handleUpdateManageSpace(
                                          spaceAllChecked,
                                          i,
                                          'algorithmCols',
                                        );
                                        setIsShowColDropdown('');
                                        setIsShowRowDropdown(null);
                                        setCurrentCheckedValue('');
                                        handleAlgoridham(i.id, false);
                                      }}
                                      className="btn apply-btn"
                                    >
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
                        <div className="arrow-on-hover">
                          <span>
                            {i.active === true ? 'Active' : 'Inactive'}
                          </span>
                          {sessionStorage.getItem('Admin Owner') === 'true' && (
                            <Image
                              onClick={() => handleAlgoridham(i.id, true)}
                              src={hoverImage}
                            />
                          )}
                        </div>
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
                  <option value={dataCount && dataCount.count}>View All</option>
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
                spaceTotalPages={manageTotalPages}
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
            className="btn cust-model-cancel-btn"
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
                        className="accordion3 line"
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

                      <div className="panel2">
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
                                      setColor(floor.id);
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
                                      updateState === floor.id ? 'active' : ''
                                    }`}
                                    aria-hidden="true"
                                    onClick={() => {
                                      setColor(floor.id);
                                      toggleSecondAccordion(floor.id);
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
                                      updateState === floor.id
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
  requestManageUpdateSpace: PropTypes.func,
  handleManagespaceUpdate: PropTypes.func,
  handleCloseUpdate: PropTypes.func,
  spaceUpdate: PropTypes.object,
  officeSuccess: PropTypes.object,
  setSpaceUpdate: PropTypes.object,
  manageSpace: PropTypes.object,
  exportManage: PropTypes.object,
  lockSpaceData: PropTypes.object,
  neighborData: PropTypes.object,
  floorBulidingData: PropTypes.object,
  manageDataSuccess: PropTypes.bool,
  officeNeighborhood: PropTypes.object,
  officeFloor: PropTypes.object,
  officesData: PropTypes.object,
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
  handleFloorByName: PropTypes.func,
  requestGetLockSpace: PropTypes.func,
  handleData: PropTypes.func,
  manageTotalPages: PropTypes.number,
  manageDataMessage: PropTypes.string,
};
export default Spaces;
