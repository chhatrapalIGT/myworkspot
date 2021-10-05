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
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Datepicker } from '@mobiscroll/react';
import Axios from 'axios';
import { isEmpty } from 'lodash';
import locationMap from '../../images/location.png';
import zoomin from '../../images/zoomin.png';
import zoomout from '../../images/zoomout.png';
import union from '../assets/images/Union.svg';
import editPen from '../assets/images/edit-pen.svg';
import ProfileImg from '../assets/images/myprofile.png';
import profile from '../assets/images/profileof.png';
import '../../../src/lib/mobiscroll/css/mobiscroll.react.scss';
import Calender from '../Cal/Calender';
import WF2 from '../Resource/WF2';
import WF3 from '../Resource/WF3';
import WF4 from '../Resource/WF4';
import WF8 from '../Resource/WF8';
import RB1 from '../Resource/RB1';
import RB2 from '../Resource/RB2';
import RB3F1 from '../Resource/RB3F1';
import RB3F2 from '../Resource/RB3F2';
import BLB1 from '../Resource/BLB1';
import BRB1 from '../Resource/BRB1';

import map1 from '../../images/Map_1.svg';
import map2 from '../../images/MapWF2.svg';
import map3 from '../../images/Map_3.svg';
import map4 from '../../images/Map_4.svg';
import map5 from '../../images/Map_5.svg';
import map6 from '../../images/Map_6.svg';
import map7 from '../../images/Map_7.svg';
import map8 from '../../images/Map_8.svg';
import map9 from '../../images/Map_9.svg';
import map10 from '../../images/Map_10.svg';
import bloom from '../assets/images/bloom.svg';
import paidtimeoffimg from '../assets/images/paidtimeoffimg.svg';
import remoteWorkimg from '../assets/images/remoteWorkimg.svg';

const WorkSpot = ({
  onSubmit,
  state,
  onChange,
  onDateChange,
  handleUserSelect,
  handleChange,
  handleRemove,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
  handleuserLocation,
  locationData,
  getWorkSpots,
  handleColleageUpdate,
  handleEditModal,
  handleUpdatingModalData,
  onUpdateWorkspot,
  apiMessage,
  apiSuccess,
  neighborhoodData,
  errMessage,
  errSuccess,
  location,
  neighborhood,
  workspotSuccess,
  locationSuccess,
  locationMsg,
  neighborhoodSuccess,
  neighborhoodMsg,
  workspotMessage,
  neighborhoodLoad,
}) => {
  const isDraggable = state.scale > 1;
  const [isModal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEmployeeModal, setEmployeeModal] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isLocUpdate, setLocUpdate] = useState(false);
  const [isdate, setDate] = useState('');
  const [locationName, setLocationName] = useState([]);
  const [calData, setCalData] = useState([]);
  const [finalImg, setFinalImg] = useState('');
  const [data, setData] = useState({});
  const [officeRest, setOfficeRest] = useState('');
  const [call, setCall] = useState(true);
  const divRef = useRef();
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });
  const newArr = useMemo(() => {
    const d =
      locationData &&
      locationData.length > 0 &&
      locationData &&
      locationData.filter(obj => !obj.locationname.includes('Remote Work'));
    return d;
  });

  const handleClickOutside = event => {
    if (divRef && divRef.current && !divRef.current.contains(event.target)) {
      setModal(false);
      setEmployee(false);
      handleEditModal(false);
      setEmployeeModal(false);
    }
  };

  useEffect(() => {
    const url = `https://mocki.io/v1/947b4269-a50f-4e16-8157-30d04fb8879a`;
    Axios.get(url, {}).then(res => {
      // setAllUser(res.data);
      setLocationName(res.data);
    });
  }, []);

  // const getCurrentData = state.workSpotData.find(ele =>
  //   moment(ele.date, 'MM/D/YYYY').isSame(moment().format('MM/D/YY')),
  // );
  // console.log(`getCurrentData`, getCurrentData);

  const arr =
    locationData &&
    locationData.length > 0 &&
    locationData &&
    locationData.find(obj => obj.locationname.includes('Remote Work'));

  const filteredData = useMemo(() => {
    if (!state.searchValue) return state.userList;
    return state.userList.filter(ele =>
      ele.userName.toLowerCase().includes(state.searchValue.toLowerCase()),
    );
  }, [state.userList, state.searchValue]);

  const updateModalData = (key, val) => {
    handleUpdatingModalData(key, val);
  };

  useEffect(() => {
    calData.map(obj => setData(obj));
    if (call && Object.keys(neighborhoodData).length > 0) {
      if (
        neighborhoodData &&
        neighborhoodData.building !== null &&
        (neighborhoodData && neighborhoodData.floor !== null)
      ) {
        imgData(
          neighborhoodData && neighborhoodData.locationCode,

          neighborhoodData &&
            neighborhoodData.building &&
            neighborhoodData.building.concat(
              neighborhoodData && neighborhoodData.floor,
            ),
        );
      } else if (neighborhoodData && neighborhoodData.floor === null) {
        imgData(
          neighborhoodData && neighborhoodData.locationCode,

          neighborhoodData && neighborhoodData.building,
        );
      } else if (neighborhoodData && neighborhoodData.building === null) {
        imgData(
          neighborhoodData && neighborhoodData.locationCode,

          neighborhoodData && neighborhoodData.floor,
        );
      }
    }
  }, [call, neighborhoodData]);

  const imgData = async (neighborhoodImg, neighborhoodBuild) => {
    let imageSrc = '';
    let officeRes = '';
    switch (neighborhoodImg) {
      case 'DC':
        switch (neighborhoodBuild) {
          case '2':
            imageSrc = map2;
            officeRes = WF2;
            break;
          case '3':
            imageSrc = map1;
            officeRes = WF3;
            break;
          case '4':
            imageSrc = map3;
            officeRes = WF4;
            break;
          case '8':
            imageSrc = map4;
            officeRes = WF8;
            break;
        }
        break;
      case 'VA':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map5;
            officeRes = RB1;
            break;
          case '2':
            imageSrc = map6;
            officeRes = RB2;
            break;
          // building 3 , floor 1
          case '31':
            imageSrc = map7;
            officeRes = RB3F1;
            break;
          case '32':
            imageSrc = map8;
            officeRes = RB3F2;
            break;
        }
        break;
      case 'AL':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map10;
            officeRes = BRB1;
            break;
        }
        break;

      case 'MN':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map9;
            officeRes = BLB1;
            break;
        }
        break;

      default:
    }

    setFinalImg(imageSrc);
    setOfficeRest(officeRes);
    setCall(false);
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
    neighborhoodData && neighborhoodData.colorcode === 'a5c3e2'
      ? 'Blue'
      : neighborhoodData && neighborhoodData.colorcode === 'aa2121'
      ? 'Red'
      : '';

  return (
    <>
      {(errMessage || locationMsg || workspotMessage || neighborhoodMsg) && (
        <div
          className={`alert-dismissible fade show ${
            errSuccess ||
            locationSuccess ||
            neighborhoodSuccess ||
            workspotSuccess
              ? 'popup_success'
              : 'popup_err'
          } `}
          role="alert"
        >
          <p className="text-center m-auto">
            {errMessage || locationMsg || workspotMessage || neighborhoodMsg}
          </p>
        </div>
      )}

      <div className="wrapper_main">
        <div className="container">
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
              <div
                className={
                  (neighborhoodData &&
                    neighborhoodData.locationCode === 'VA') ||
                  (neighborhoodData && neighborhoodData.locationCode === 'DC')
                    ? 'card building-block-head blue'
                    : (neighborhoodData &&
                        neighborhoodData.locationCode === 'MN') ||
                      (neighborhoodData &&
                        neighborhoodData.locationCode === 'AL')
                    ? 'card building-block-head black'
                    : neighborhoodData && neighborhoodData.locationCode === 'RW'
                    ? 'card building-block-head grey'
                    : neighborhoodData &&
                      neighborhoodData.locationCode === 'PTO'
                    ? 'card building-block-head violate'
                    : 'card building-block-head'
                }
                style={{ backgroundColor: 'white' }}
              >
                <>
                  {neighborhoodData.locationCode === 'RW' ||
                  neighborhoodData.locationCode === 'PTO' ||
                  neighborhoodData.locationCode === 'MN' ||
                  neighborhoodData.locationCode === 'AL' ? (
                    <>
                      <p className="stroke-2">
                        Hi {neighborhoodData && neighborhoodData.username}, your
                        workspot today is
                      </p>

                      <div className="block-info d-flex flex-wrap">
                        <h3 className="building-name">
                          {neighborhoodData && neighborhoodData.locationName}
                        </h3>
                      </div>
                    </>
                  ) : (
                    <>
                      {(state.updatingObject.work_area === 'VA' ||
                        state.updatingObject.work_area === 'DC') &&
                      isLocUpdate ? (
                        <>
                          <p className="stroke-2">
                            Hi {neighborhoodData && neighborhoodData.username},
                            your{' '}
                            <span>
                              {' '}
                              {neighborhoodData &&
                                neighborhoodData.locationCode}{' '}
                            </span>
                            neighborhood assignment will be ready shortly!
                          </p>
                          <h3 className="building-name neighborhood-font">
                            Please check back in a few minutes
                          </h3>
                        </>
                      ) : (
                        <>
                          <p className="stroke-2">
                            Hi {neighborhoodData && neighborhoodData.username},
                            your{' '}
                            <span>
                              {' '}
                              {neighborhoodData &&
                                neighborhoodData.locationCode}{' '}
                            </span>
                            neighborhood today is
                          </p>
                          <div className="block-info d-flex flex-wrap">
                            {neighborhoodData && neighborhoodData.building && (
                              <h3 className="building-name">
                                {`Building ${neighborhoodData &&
                                  neighborhoodData.building}`}
                              </h3>
                            )}
                            {neighborhoodData && neighborhoodData.floor && (
                              <h3 className="floor-name">
                                {`Floor ${neighborhoodData &&
                                  neighborhoodData.floor}`}
                              </h3>
                            )}
                            <h3 className="color-code">{neighborhoodColor}</h3>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div className="building-location-strip d-flex flex-wrap align-items-center">
                    {neighborhoodData &&
                      neighborhoodData.locationCode !== 'PTO' && (
                        <>
                          {(state.updatingObject.work_area !== 'VA' ||
                            state.updatingObject.work_area !== 'DC' ||
                            (neighborhoodData &&
                              neighborhoodData.locationCode !== 'RW')) &&
                            neighborhoodData &&
                            neighborhoodData.officeAddress && (
                              <div
                                className="location d-flex align-items-center"
                                aria-hidden="true"
                                target="_blank"
                              >
                                <a
                                  target="_blank"
                                  href="https://goo.gl/maps/wSt2HtVQ7J2vuoGy7"
                                >
                                  <img src={union} alt="" />
                                  {/* <img
                            src={locationImage(
                              neighborhoodData && neighborhoodData.locationName,
                            )}
                            alt=""
                          /> */}
                                </a>
                                {neighborhoodData &&
                                  neighborhoodData.officeAddress}
                              </div>
                            )}
                          <div
                            className="change-workspot d-flex align-items-center"
                            onClick={() => {
                              handleEditModal(true);
                              // handleData();
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
                    <div
                      className="card office-structure-inner"
                      style={{ height: '100%' }}
                    >
                      {!neighborhoodData.locationCode ||
                      neighborhoodData.locationCode === 'RW' ||
                      neighborhoodData.locationCode === 'PTO' ? (
                        <Spinner
                          className="app-spinner workspot_spinner"
                          animation="grow"
                          variant="dark"
                        />
                      ) : (
                        <>
                          {officeRest || ''}
                          <div className="right-map">
                            <Draggable
                              disabled={!isDraggable}
                              key={state.version}
                            >
                              <div
                                className="drag_image"
                                style={isDraggable ? { cursor: 'move' } : null}
                              >
                                <img
                                  src={finalImg}
                                  alt=""
                                  style={imgStyle}
                                  draggable="false"
                                />
                              </div>
                            </Draggable>
                            <div className="toolbar">
                              <button
                                className="location"
                                type="button"
                                onClick={() => handleDefault()}
                              >
                                <img src={locationMap} alt="" />
                              </button>
                              <button
                                className="zoomin"
                                type="button"
                                onClick={() => handleZoomIn()}
                              >
                                <img src={zoomin} alt="" />
                              </button>
                              <button
                                className="zoomout"
                                type="button"
                                onClick={() => handleZoomOut()}
                              >
                                <img src={zoomout} alt="" />
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
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
          setCalData={setCalData}
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
                      <optgroup label="EAB office">
                        {/* {locationName &&
                        locationName.map(i => ( */}
                        {newArr &&
                          newArr.map(i => (
                            <option
                              value={i.locationname}
                              id="location"
                              name="work_place"
                              selected={
                                state.updatingObject.prevLocation ===
                                i.locationCode
                              }
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
                      returnFormat="moment"
                      min={moment().toDate()}
                      // max={moment().endOf('month')}
                      name="date"
                      onChange={onDateChange}
                      selectMultiple={true}
                      selectCounter
                      dateFormat="YYYY-MM-DD"
                      // headerText="dates selected"
                      // invalid={[
                      //   {
                      //     recurring: {
                      //       repeat: 'weekly',
                      //       weekDays: 'SA,SU',
                      //     },
                      //   },
                      // ]}
                      marked={[
                        {
                          date: new Date(2021, 8, 28),
                          markCssClass: 'mbsc-calendar-marks1',
                        },
                        {
                          date: new Date(2021, 8, 29),
                          markCssClass: 'mbsc-calendar-marks1',
                        },
                        {
                          date: new Date(2021, 8, 29),
                          markCssClass: 'mbsc-calendar-marks3',
                        },
                        {
                          date: new Date(2021, 8, 30),
                          markCssClass: 'mbsc-calendar-marks3',
                        },
                      ]}
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
                    // handleDataUpdate();
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
                  Update My Workspot
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEmployeeModal(false)}
                />
              </div>
              <div className="modal-body">
                <form className="delegate-workspot-access" action="submit">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="searchbox"
                    onChange={handleChange}
                  />
                  {filteredData.map(i => (
                    <div
                      aria-hidden="true"
                      className="form-group"
                      onClick={() => handleUserSelect(i.userName)}
                    >
                      <img src={ProfileImg} alt="" />
                      <input
                        id="jane"
                        type="radio"
                        className="checkbox"
                        checked={state.selectedColleagues.includes(i.userName)}
                      />
                      <label htmlFor="jane">{i.userName}</label>
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
                  <img src={profile} alt="" />
                  <label htmlFor="my-spot">Jane Cooper</label>
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
                  <div className="container p-0">
                    <div className="card office-structure-inner">
                      <div className="left-panel">
                        <div className="office-info">
                          <p className="name">Washington, DC</p>
                          <span className="floor">Floor 3</span>
                          {/* <span className="floor">floor 4</span> */}
                        </div>
                        <div className="office-resource myteam_res">
                          <p>Office Resources</p>
                          <div className="office-part-one yellow">
                            <span className="informer" />
                            <label htmlFor="my-spot">Yellow</label>
                          </div>
                          <div className="office-part-one teal">
                            <span className="informer" />
                            <label htmlFor="my-spot">Teal</label>
                          </div>
                          <div className="office-part-one orange">
                            <span className="informer" />
                            <label htmlFor="my-spot">Orange</label>
                          </div>
                          <div className="office-part-one blue">
                            <span className="informer" />
                            <label htmlFor="my-spot">Blue</label>
                          </div>
                          <div className="office-part-one teal">
                            <span className="informer">315</span>
                            <label htmlFor="my-spot">Bel-Air</label>
                          </div>
                          <div className="office-part-one teal">
                            <span className="informer">332</span>
                            <label htmlFor="my-spot">Walkerville</label>
                          </div>
                          <div className="office-part-one white">
                            <span className="informer">334</span>
                            <label htmlFor="my-spot">Common Room</label>
                          </div>
                          <div className="office-part-one black">
                            <span className="informer">359</span>
                            <label htmlFor="my-spot">The Post</label>
                          </div>
                          <div className="office-part-one heart pink">
                            <span className="informer">
                              <img src="./images/heart.png" alt="" />
                            </span>
                            <label htmlFor="my-spot">AED</label>
                          </div>
                        </div>
                      </div>
                      <div className="right-map">
                        <Draggable disabled={!isDraggable} key={state.version}>
                          <div
                            className="drag_image"
                            style={isDraggable ? { cursor: 'move' } : null}
                          >
                            <img
                              src={map2}
                              alt=""
                              style={imgStyle}
                              draggable="false"
                            />
                          </div>
                        </Draggable>
                        <div className="toolbar">
                          <button
                            className="location"
                            type="button"
                            onClick={() => handleDefault()}
                          >
                            <img src={locationMap} alt="" />
                          </button>
                          <button
                            className="zoomin"
                            type="button"
                            onClick={() => handleZoomIn()}
                          >
                            <img src={zoomin} alt="" />
                          </button>
                          <button
                            className="zoomout"
                            type="button"
                            onClick={() => handleZoomOut()}
                          >
                            <img src={zoomout} alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
          style={{ maxWidth: 'calc(100% - 20rem)' }}
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
                    onClick={() => handleuserLocation(isdate)}
                  >
                    <select
                      name="work_area"
                      className="dropdown_opt"
                      onChange={e =>
                        updateModalData('work_area_name', e.target.value)
                      }
                    >
                      <optgroup label="EAB office">
                        {newArr &&
                          newArr.map(i => (
                            <option
                              value={i.locationname}
                              id="location"
                              name="work_area"
                              selected={
                                state.updatingObject.prevLocation ===
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
                          state.updatingObject.prevLocation === arr.locationCode
                        }
                      >
                        {arr && arr.locationname}
                      </option>
                    </select>
                  </div>

                  {/* <hr /> */}
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
                    setLocUpdate(true);
                    handleEditModal(false);
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
    </>
  );
};

WorkSpot.propTypes = {
  onSubmit: PropTypes.func,
  state: PropTypes.object,
  onChange: PropTypes.func,
  onDateChange: PropTypes.func,
  handleUserSelect: PropTypes.func,
  handleChange: PropTypes.func,
  imgStyle: PropTypes.object,
  handleRemove: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleDefault: PropTypes.func,
  handleuserLocation: PropTypes.func,
  getWorkSpots: PropTypes.func,
  handleColleageUpdate: PropTypes.func,
  handleEditModal: PropTypes.func,
  handleUpdatingModalData: PropTypes.func,
  locationData: PropTypes.object,
  onUpdateWorkspot: PropTypes.func,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.bool,
  neighborhoodData: PropTypes.object,
  errMessage: PropTypes.string,
  errSuccess: PropTypes.bool,
  location: PropTypes.object,
  neighborhood: PropTypes.object,
  workspotSuccess: PropTypes.bool,
  locationSuccess: PropTypes.bool,
  locationMsg: PropTypes.string,
  neighborhoodSuccess: PropTypes.bool,
  neighborhoodMsg: PropTypes.string,
  workspotMessage: PropTypes.string,
  neighborhoodLoad: PropTypes.bool,
};
export default WorkSpot;
