/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable default-case */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-constant-condition */
/* eslint-disable indent */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import PropTypes from 'prop-types';
import './custom.scss';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Datepicker } from '@mobiscroll/react';
import Axios from 'axios';
import { isEmpty } from 'lodash';
import union from '../assets/images/Union.svg';
import editPen from '../assets/images/edit-pen.svg';
import ProfileImg from '../assets/images/myprofile.png';
import profile from '../assets/images/profileof.png';
import '../../../src/lib/mobiscroll/css/mobiscroll.react.scss';
import Calender from '../Cal/Calender';
import MapComponent from '../Resource/map';

const WorkSpot = ({
  onSubmit,
  state,
  onChange,
  onDateChange,
  handleUserSelect,
  handleRemove,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
  locationData,
  getWorkSpots,
  handleColleageUpdate,
  handleEditModal,
  handleUpdatingModalData,
  onUpdateWorkspot,
  neighborhoodData,
  errSuccess,
  neighborhood,
  neighborhoodLoad,
  colleaguesData,
  colleagueWeeklyData,
  colleagueDataLoader,
  profileUserLoading,
  apiMessage,
  apiSuccess,
  requestGetColleagueData,
  monthData,
}) => {
  const [isModal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEmployeeModal, setEmployeeModal] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isLocUpdate, setLocUpdate] = useState(false);
  const [isworkspotLoader, setWorkspotLoader] = useState(false);
  const [isdate, setDate] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [search, setSearch] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const [searchName, setSearchName] = useState([]);
  const [isChange, setChange] = useState(false);
  const divRef = useRef();
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });
  const handleChange = event => {
    setAllUser(colleaguesData);
    let newList = [];
    if (event.target.value !== '' && colleaguesData.length) {
      setSearch(true);
      newList = colleaguesData.filter(({ firstname, lastname }) => {
        const first = firstname.toLowerCase();
        const last = lastname.toLowerCase();
        const finalDataList = first.concat(' ', last);
        const filter = event.target.value.toLowerCase().trim();
        return finalDataList.includes(filter);
      });
    } else {
      setSearch(false);
      newList = [];
    }
    setSearchName(newList);
  };

  const newArr = useMemo(() => {
    const d =
      locationData &&
      locationData.length > 0 &&
      locationData &&
      locationData.filter(obj => !obj.locationname.includes('Remote Work'));
    return d;
  });

  useEffect(() => {
    if (isEmployeeModal && searchName.length) {
      setSearchName([]);
    }
  }, [isEmployeeModal]);

  const handleClickOutside = event => {
    if (divRef && divRef.current && !divRef.current.contains(event.target)) {
      setModal(false);
      setEmployee(false);
      handleEditModal(false);
      setEmployeeModal(false);
    }
  };

  const arr =
    locationData &&
    locationData.length > 0 &&
    locationData &&
    locationData.find(obj => obj.locationname.includes('Remote Work'));

  const updateModalData = (key, val) => {
    handleUpdatingModalData(key, val);
  };

  // eslint-disable-next-line consistent-return
  const addressLink = address => {
    switch (address) {
      case 'DC':
        return 'https://goo.gl/maps/wSt2HtVQ7J2vuoGy7';
      case 'RIC':
        return 'https://goo.gl/maps/sMKpVpBFJJRUqT446';
      case 'BHM':
        return 'https://goo.gl/maps/8zpk6ZWT49puXgp67';
      case 'BLM':
        return 'https://goo.gl/maps/7pjiEquchRcDLWac9';

      default:
    }
  };

  const handleEditModalData = (
    modalState,
    date,
    prevLocation,
    userName,
    work_area,
    work_area_name,
  ) => {
    handleEditModal(modalState);
    updateModalData();
    updateModalData('date', date);
    updateModalData('prevLocation', prevLocation);
    updateModalData('user', userName);
    updateModalData('work_area', work_area);
    updateModalData('work_area_name', work_area_name);
  };

  const neighborhoodColor =
    neighborhoodData && neighborhoodData.colorcode === '0072CE'
      ? 'Blue'
      : neighborhoodData && neighborhoodData.colorcode === 'ED8B00'
      ? 'Orange'
      : neighborhoodData && neighborhoodData.colorcode === '00B1B0'
      ? 'Teal'
      : neighborhoodData && neighborhoodData.colorcode === 'F7CA0F'
      ? 'Yellow'
      : '';

  const dateData = () => {
    const dates = [];
    monthData.filter(ele => {
      const prevDate = moment(ele.date).isBefore(moment(), 'day');

      const getMonth = moment(ele.date).format('MM');
      const nextMonth = moment()
        .add(1, 'month')
        .format('MM');
      const currentMonth = getMonth !== nextMonth;
      let obj = {};
      if (!prevDate && currentMonth) {
        if (ele.officetype === 'EAB Office') {
          obj = {
            date: ele.date,
            markCssClass: 'mbsc-calendar-marks1',
          };
        } else if (ele.locationCode === 'RW') {
          obj = {
            date: ele.date,
            markCssClass: 'mbsc-calendar-marks2',
          };
        } else if (ele.locationCode === 'PTO') {
          obj = {
            date: ele.date,
            markCssClass: 'mbsc-calendar-marks3',
          };
        }
      }

      dates.push(obj);
    });
    return dates;
  };

  const invalidDate = () => {
    const dates = [];
    monthData.filter(ele => {
      let data = {};
      if (ele.locationCode === 'PTO') {
        data = {
          date: ele.date,
        };
      }

      dates.push(data);
    });
    return dates;
  };

  const ColleagueUserName = employeeData
    ? employeeData.firstName &&
      employeeData.firstName.charAt(0).concat(' ', employeeData.lastName)
    : '';

  return (
    <>
      {apiMessage && (
        <div
          className={`"alert-dismissible fade show ${
            apiSuccess ? 'popup_success' : 'popup_err'
          } "`}
          role="alert"
        >
          <p className="text-center m-auto">{apiMessage || ''}</p>
        </div>
      )}

      {profileUserLoading ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
        <div className="wrapper_main">
          <div className="container">
            {moment().format('ddd') === 'Sat' ||
            moment().format('ddd') === 'Sun' ? (
              <div className="card building-block-head black">
                <p className="stroke-2">
                  Hi {neighborhoodData && neighborhoodData.username},
                </p>

                <div className="block-info d-flex flex-wrap">
                  <h3 className="building-name">Enjoy the weekend!</h3>
                </div>
                <div className="building-location-strip d-flex flex-wrap align-items-center" />
              </div>
            ) : neighborhoodLoad ? (
              <div className="card building-block-head">
                <Spinner
                  className="app-spinner workspot_spinner"
                  animation="grow"
                  variant="dark"
                />
              </div>
            ) : (
              neighborhood &&
              neighborhood.success &&
              !isEmpty(neighborhood.neighborhoodData) && (
                <div
                  className={
                    neighborhoodColor === 'Blue'
                      ? 'card building-block-head blue'
                      : neighborhoodColor === 'Orange'
                      ? 'card building-block-head orange'
                      : neighborhoodColor === 'Teal'
                      ? 'card building-block-head teal'
                      : neighborhoodColor === 'Yellow'
                      ? 'card building-block-head yellow'
                      : neighborhoodData &&
                        neighborhoodData.locationCode === 'PTO'
                      ? 'card building-block-head paid-time'
                      : neighborhoodData &&
                        neighborhoodData.locationCode === 'RW'
                      ? 'card building-block-head remote'
                      : 'card building-block-head default'
                  }
                  style={{ backgroundColor: 'white' }}
                >
                  <>
                    {((state.updatingObject &&
                      state.updatingObject.work_area_name &&
                      state.updatingObject.work_area_name.includes('VA')) ||
                      (state.updatingObject &&
                        state.updatingObject.work_area_name &&
                        state.updatingObject.work_area_name.includes('DC'))) &&
                    isChange &&
                    isLocUpdate ? (
                      <>
                        <p className="stroke-2">
                          Hi {neighborhoodData && neighborhoodData.username},
                          your{' '}
                          {state.updatingObject &&
                          state.updatingObject.work_area_name &&
                          state.updatingObject.work_area_name.includes('DC') ? (
                            <span> DC </span>
                          ) : (
                            <span>Richmond </span>
                          )}
                          neighborhood assignment will be ready shortly!
                        </p>
                        <h3 className="building-name neighborhood-font">
                          Please check back in a few minutes
                        </h3>
                      </>
                    ) : (
                      <>
                        {neighborhoodData &&
                        neighborhoodData.locationCode === 'RIC' ? (
                          <p className="stroke-2">
                            Hi {neighborhoodData && neighborhoodData.username},
                            your <span>Richmond </span>
                            neighborhood today is
                          </p>
                        ) : neighborhoodData &&
                          neighborhoodData.locationCode === 'DC' ? (
                          <p className="stroke-2">
                            Hi {neighborhoodData && neighborhoodData.username},
                            your <span> DC </span>
                            neighborhood today is
                          </p>
                        ) : (
                          <>
                            <p className="stroke-2">
                              Hi {neighborhoodData && neighborhoodData.username}
                              , your workspot today is
                            </p>

                            <div className="block-info d-flex flex-wrap">
                              <h3
                                className={
                                  (neighborhoodData &&
                                    neighborhoodData.locationCode === 'DC') ||
                                  (neighborhoodData &&
                                    neighborhoodData.locationCode === 'RIC')
                                    ? 'building-name'
                                    : 'building-data-name'
                                }
                              >
                                {neighborhoodData &&
                                  neighborhoodData.locationName}
                              </h3>
                            </div>
                          </>
                        )}

                        <div className="block-info d-flex flex-wrap">
                          {neighborhoodData && neighborhoodData.building && (
                            <h3 className="building-name">
                              {`Building ${neighborhoodData &&
                                neighborhoodData.building}`}
                            </h3>
                          )}
                          {neighborhoodData && neighborhoodData.floor && (
                            <h3
                              className={
                                neighborhoodColor !== ''
                                  ? 'floor-name'
                                  : 'floor-data-name'
                              }
                            >
                              {`Floor ${neighborhoodData &&
                                neighborhoodData.floor}`}
                            </h3>
                          )}
                          <h3 className="color-code">{neighborhoodColor}</h3>
                        </div>

                        {neighborhoodData &&
                          neighborhoodData.locationCode === 'PTO' && (
                            <div className="block-info d-flex flex-wrap">
                              <h3 className="building-name-paid-time">
                                {neighborhoodData &&
                                  neighborhoodData.timeofftype}
                              </h3>
                            </div>
                          )}
                      </>
                    )}

                    <div className="building-location-strip d-flex flex-wrap align-items-center">
                      {neighborhoodData &&
                        neighborhoodData.locationCode !== 'PTO' && (
                          <>
                            {(state.updatingObject &&
                              state.updatingObject.work_area_name &&
                              state.updatingObject.work_area_name.includes(
                                'VA',
                              )) ||
                              (state.updatingObject &&
                                state.updatingObject.work_area_name &&
                                state.updatingObject.work_area_name.includes(
                                  'DC',
                                )) ||
                              (neighborhoodData &&
                                neighborhoodData.locationCode !== 'RW' && (
                                  <div
                                    className="location d-flex align-items-center"
                                    aria-hidden="true"
                                    target="_blank"
                                  >
                                    <a
                                      className="address_url"
                                      target="_blank"
                                      href={addressLink(
                                        neighborhoodData &&
                                          neighborhoodData.locationCode,
                                      )}
                                    >
                                      <img src={union} alt="" />

                                      {neighborhoodData &&
                                        neighborhoodData.officeAddress}
                                    </a>
                                  </div>
                                ))}
                            <div
                              className="change-workspot d-flex align-items-center"
                              onClick={() => {
                                handleEditModal(true);
                                // handleData();
                                setChange(true);
                                setDate('');
                              }}
                              aria-hidden="true"
                            >
                              <img
                                src={editPen}
                                alt=""
                                className="onHover"
                                aria-hidden="true"
                              />{' '}
                              <a href className="change-workspot">
                                Change Today's Workspot
                              </a>
                            </div>
                          </>
                        )}
                    </div>
                  </>
                </div>
              )
            )}
          </div>
          <div className="office-structure mt-4">
            {neighborhoodData &&
              neighborhoodData.locationCode !== 'RW' &&
              neighborhoodData &&
              neighborhoodData.locationCode !== 'PTO' &&
              ((neighborhoodData && neighborhoodData.building !== null) ||
                (neighborhoodData && neighborhoodData.floor !== null)) && (
                <div className="container" style={{ height: '100%' }}>
                  {neighborhoodLoad ? (
                    <div className="card building-block-head">
                      <Spinner
                        className="app-spinner workspot_spinner"
                        animation="grow"
                        variant="dark"
                      />
                    </div>
                  ) : (
                    neighborhood &&
                    neighborhood.success &&
                    !isEmpty(neighborhood.neighborhoodData) && (
                      <MapComponent
                        building={neighborhoodData.building}
                        floor={neighborhoodData.floor}
                        locationCode={neighborhoodData.locationCode}
                        state={state}
                        imgStyle={imgStyle}
                        handleZoomIn={handleZoomIn}
                        handleZoomOut={handleZoomOut}
                        handleDefault={handleDefault}
                      />
                    )
                  )}
                </div>
              )}
          </div>
          <Calender
            defaultSelected={state.defaultSelected}
            setModal={setModal}
            handleEditModal={handleEditModalData}
            setEmployeeModal={setEmployeeModal}
            allUser={state.allUser}
            setEmployee={setEmployee}
            setVisible={setVisible}
            handleRemove={handleRemove}
            setDate={setDate}
            workSpotData={state.workSpotData}
            getWorkSpots={getWorkSpots}
            state={state}
            isLocUpdate={isLocUpdate}
            errSuccess={errSuccess}
            setChange={setChange}
            colleagueWeeklyData={colleagueWeeklyData}
            colleagueDataLoader={colleagueDataLoader}
            displayDefault={state.displayDefault}
            requestGetColleagueData={requestGetColleagueData}
            handleColleagueModal={datas => setEmployeeData(datas)}
          />
          <Modal
            className="modal fade test_modal"
            show={isModal}
            onHide={() => setModal(false)}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update My Workspot
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <div className="calendarpop">
                    <div className="selection">
                      <select
                        name="work_place"
                        className="dropdown_opt"
                        onChange={onChange}
                      >
                        <optgroup label="EAB Office">
                          {newArr &&
                            newArr.map(i => (
                              <option
                                value={i.locationname}
                                id="location"
                                name="work_place"
                                selected={state.work_place === i.locationCode}
                              >
                                {i && i.locationname}
                              </option>
                            ))}
                        </optgroup>
                        <hr />
                        <option value={arr && arr.locationname}>
                          {arr && arr.locationname}
                        </option>
                      </select>
                    </div>
                    <div className="calendar_main">
                      <Datepicker
                        controls={['calendar']}
                        display="inline"
                        // returnFormat="moment"
                        min={moment().toDate()}
                        // max={moment().endOf('month')}
                        name="date"
                        onChange={onDateChange}
                        selectMultiple={true}
                        selectCounter
                        dateFormat="YYYY-MM-DD"
                        className="workspot_cal"
                        marked={dateData()}
                        invalid={invalidDate()}
                      />
                      <div className="bottom">
                        <span className="eab-ofc">EAB Office</span>
                        <span className="remote">Remote Work</span>
                        <span className="paidoff">Paid Time Off</span>
                      </div>
                    </div>
                    {/* <div className="checkbox-label">
                  <input type="checkbox" id="private-space" />
                  <label htmlFor="private-space">Private space requested</label>
                </div> */}
                    <p className="notice">
                      If you would like to update your weekly default, you can
                      update this under{' '}
                      <Link to="profile" activeClassName="active">
                        <a className="active" href="true">
                          My Profile
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn save-data"
                    onClick={() => {
                      onUpdateWorkspot();
                      setModal(false);
                      // eslint-disable-next-line no-unused-expressions
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn dismiss"
                    data-bs-dismiss="modal"
                    onClick={() => setModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            className="modal fade test_modal"
            show={isEmployeeModal}
            onHide={() => setEmployeeModal(false)}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            id="delegate_workspot"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Search for Colleagues
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setEmployeeModal(false)}
                  />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="searchbox"
                  name="searchValue"
                  onChange={handleChange}
                />
                <div className="modal-body modal-update" id="data_workspot">
                  <form className="delegate-workspot-access" action="submit">
                    {searchName &&
                      searchName.map(i => (
                        <div
                          aria-hidden="true"
                          className="form-group"
                          onClick={() => handleUserSelect(i)}
                        >
                          <img src={ProfileImg} alt="" />
                          <input
                            id={i.employeeid}
                            type="radio"
                            className="checkbox"
                            checked={state.selectedColleagues.includes(i)}
                          />
                          <label htmlFor="jane">
                            {i.firstname} {i.lastname}
                          </label>
                        </div>
                      ))}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn save-data"
                    onClick={() => {
                      handleColleageUpdate();
                      setEmployeeModal(false);
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn dismiss"
                    data-bs-dismiss="modal"
                    onClick={() => setEmployeeModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            className="modal fade test_modal test_modal-employee"
            show={isEmployee}
            onHide={() => setEmployee(false)}
            aria-labelledby="exampleModalLabel"
            style={{ maxWidth: 'calc(100% - 10rem)' }}
            aria-hidden="true"
            centered
            size="lg"
          >
            <div className=" modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header myteam_header">
                  <div className="left-panel myteam_card">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {isdate}
                    </h5>
                  </div>
                  <div className="myteam-user">
                    {' '}
                    <img
                      src={profile}
                      alt=""
                      className="search-colleague-img"
                    />
                    <label htmlFor="my-spot">
                      <span style={{ verticalAlign: 'middle' }}>
                        {employeeData.firstName} {employeeData.lastName}
                      </span>
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setEmployee(false)}
                  />
                </div>
                <div className="modal-body">
                  <div className="office-structure office-structure-modal">
                    {employeeData &&
                      employeeData.locationCode !== 'RW' &&
                      employeeData &&
                      employeeData.locationCode !== 'PTO' &&
                      ((employeeData && employeeData.building === null) ||
                      !employeeData.building ||
                      ((employeeData && employeeData.floor === null) ||
                        !employeeData.floor) ? (
                        <div className="container" style={{ height: '100%' }}>
                          {employeeData && (
                            <h5 style={{ textAlign: 'center' }}>
                              {' '}
                              Relevant Data is not Available
                            </h5>
                          )}
                        </div>
                      ) : (
                        <div className="container" style={{ height: '100%' }}>
                          {employeeData && (
                            <MapComponent
                              building={employeeData.building}
                              floor={employeeData.floor}
                              locationCode={employeeData.locationCode}
                              state={state}
                              imgStyle={imgStyle}
                              handleZoomIn={handleZoomIn}
                              handleZoomOut={handleZoomOut}
                              handleDefault={handleDefault}
                              ColleagueUserName={ColleagueUserName}
                              from="employeeData"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            className="modal fade test_modal"
            show={state.editModal}
            onHide={() => handleEditModal(false)}
            aria-labelledby="exampleModalLabel"
            style={{ maxWidth: 'calc(100% - 0rem)' }}
            aria-hidden="true"
            centered
            size="lg"
            id="set_location"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {isdate ? `Edit ${isdate}` : "Change Today's Workspot"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      handleEditModal(false);
                      setLocUpdate(false);
                    }}
                  />
                </div>
                <div className="modal-body">
                  <form className="delegate-workspot-access" action="submit">
                    <div
                      aria-hidden="true"
                      className="selection  dropdown_locat"
                      style={{ padding: '1rem 1.5rem' }}
                      // onClick={() => handleuserLocation(isdate)}
                    >
                      <select
                        name="work_area_name"
                        className="dropdown_opt"
                        onChange={e =>
                          updateModalData('work_area_name', e.target.value)
                        }
                      >
                        <optgroup label="EAB Office">
                          {newArr &&
                            newArr.map(i => (
                              <option
                                value={i.locationname}
                                id="location"
                                name="work_area"
                                selected={
                                  isChange
                                    ? (neighborhoodData &&
                                        neighborhoodData.locationCode) ===
                                      i.locationCode
                                    : state.updatingObject.prevLocation ===
                                      i.locationCode
                                }
                              >
                                {i && i.locationname}
                              </option>
                            ))}
                        </optgroup>
                        <hr />
                        <option
                          value={arr && arr.locationname}
                          name="work_area"
                          selected={
                            state.updatingObject.prevLocation ===
                            arr.locationCode
                          }
                        >
                          {arr && arr.locationname}
                        </option>
                      </select>
                    </div>
                    <p className="notice" style={{ padding: '0 1.5rem' }}>
                      If you would like to update your weekly default, you can
                      update this under {'   '}
                      <Link to="profile" activeClassName="active">
                        <a className="active" href="true">
                          My Profile
                        </a>
                      </Link>
                    </p>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn save-data"
                    onClick={() => {
                      onSubmit();
                      // eslint-disable-next-line no-unused-expressions
                      setWorkspotLoader(true);
                      setLocUpdate(true);
                      handleEditModal(false);
                      // handleUpdate();
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn dismiss"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleEditModal(false);
                      setLocUpdate(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

WorkSpot.propTypes = {
  onSubmit: PropTypes.func,
  state: PropTypes.object,
  onChange: PropTypes.func,
  onDateChange: PropTypes.func,
  handleUserSelect: PropTypes.func,
  imgStyle: PropTypes.object,
  handleRemove: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleDefault: PropTypes.func,
  // handleuserLocation: PropTypes.func,
  getWorkSpots: PropTypes.func,
  handleColleageUpdate: PropTypes.func,
  handleEditModal: PropTypes.func,
  handleUpdatingModalData: PropTypes.func,
  locationData: PropTypes.object,
  onUpdateWorkspot: PropTypes.func,
  neighborhoodData: PropTypes.object,
  errSuccess: PropTypes.bool,
  neighborhood: PropTypes.object,
  neighborhoodLoad: PropTypes.bool,
  colleaguesData: PropTypes.object,
  colleagueWeeklyData: PropTypes.object,
  colleagueDataLoader: PropTypes.bool,
  profileUserLoading: PropTypes.bool,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.bool,
  requestGetColleagueData: PropTypes.func,
  monthData: PropTypes.object,
};
export default WorkSpot;
