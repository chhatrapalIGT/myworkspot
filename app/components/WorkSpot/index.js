/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import PropTypes from 'prop-types';
import './custom.scss';
import { Datepicker } from '@mobiscroll/react';
import Floormap from '../../images/floormap.png';
import location from '../../images/location.png';
import zoomin from '../../images/zoomin.png';
import zoomout from '../../images/zoomout.png';
import ProfileImg from '../assets/images/myprofile.png';
import profile from '../assets/images/profileof.png';
import '../../../src/lib/mobiscroll/css/mobiscroll.react.min.css';

const WorkSpot = ({
  onSubmit,
  state,
  onChange,
  onDateChange,
  handleUserSelect,
  handleChange,
  handleClose,
}) => {
  const [isModal, setModal] = useState(false);
  const [isEmployeeModal, setEmployeeModal] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const divRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });

  const handleClickOutside = event => {
    if (divRef && divRef.current && !divRef.current.contains(event.target)) {
      setModal(false);
    }
  };

  return (
    <div className="wrapper_main">
      <div className="container">
        <div className="card building-block-head blue">
          <p className="stroke-2">
            Hi Alexander, your <span> DC </span> neighborhood today is
          </p>

          <div className="block-info d-flex flex-wrap">
            <h3 className="building-name">Building 2</h3>
            <h3 className="floor-name">Floor 3</h3>
            <h3 className="color-code">Blue</h3>
          </div>
          <div className="building-location-strip d-flex flex-wrap align-items-center">
            <div className="location d-flex align-items-center">
              <img src="./images/Union.svg" alt="" /> 2445 M Street NW,
              Washington, DC 20037
            </div>
            <div className="change-workspot d-flex align-items-center">
              <img src="./images/edit-pen.svg" alt="" />{' '}
              <a
                href
                className="change-workspot"
                onClick={() => setModal(true)}
              >
                Change Todays Workspot
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="office-structure mt-4">
        <div className="container">
          <div className="card office-structure-inner">
            <div className="left-panel">
              <div className="office-info">
                <p className="name">Washington, DC</p>
                <span className="floor">floor 3</span>
                <span className="floor">floor 4</span>
              </div>
              <div className="office-resource">
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
              <img src={Floormap} alt="" />
              <div className="toolbar">
                <button className="location" type="button">
                  <img src={location} alt="" />
                </button>
                <button className="zoomin" type="button">
                  <img src={zoomin} alt="" />
                </button>
                <button className="zoomout" type="button">
                  <img src={zoomout} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="update-office-workspot mt-40">
          <p className="week-range">June 14 – 18, 2021</p>

          <div className="input-button-strip w-100 d-flex align-items-center">
            <div className="change-log">
              <button type="submit" className="prev">
                &lsaquo;
              </button>
              <span className="what-day">Today</span>
              <button type="submit" className="next">
                &rsaquo;
              </button>
            </div>
            <div
              className="week-month-toggle nav nav-tabs"
              id="nav-tab"
              role="tablist"
            >
              <button
                className="nav-link week-view active"
                id="nav-week-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-week-view"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Week
              </button>
              <button
                className="nav-link week-view"
                id="nav-month-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-month-view"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Month
              </button>
            </div>
            <div className="updatespot">
              <button
                type="submit"
                className="blue-bg-btn"
                data-bs-toggle="modal"
                data-bs-target="#showCalendar"
                onClick={() => setModal(true)}
              >
                Update My Workspot
              </button>
            </div>
          </div>

          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-week-view"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div className="card weekly-default">
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  <div className="day_one disabled">
                    <p className="day-name">Monday</p>
                    <p className="date">14</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Washington, DC</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Tuesday</p>
                    <p className="date today">15</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Wednesday</p>
                    <p className="date">16</p>
                    <div className="day-one-wrapper has-half-paid-off work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                    <div className="day-one-wrapper half-paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Thursday</p>
                    <p className="date">17</p>
                    <div className="day-one-wrapper work-from-home">
                      <p className="work-station">Remote Work</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Friday</p>
                    <p className="date">18</p>
                    <div className="day-one-wrapper paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {state.userListData.length > 0 && (
              <div className="mt-4">
                Search results
                <label style={{ float: 'right' }}> Remove All</label>
                <hr />
              </div>
            )}
            {state.userListData &&
              state.userListData.map(obj => (
                <>
                  <div
                    className="tab-pane fade show active"
                    id="nav-week-view"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="card weekly-default">
                      <div className=" card mt-4 card-user-header">
                        <img src={profile} alt="" />
                        {'   '}
                        <label>
                          <b>{obj}</b>
                        </label>
                        <label style={{ float: 'right' }}> Remove</label>
                      </div>
                      <div className="card1 weekly-default-inner d-flex flex-wrap">
                        <div className="day_one disabled">
                          <p className="day-name">Monday</p>
                          <p className="date">14</p>
                          <div
                            className="day-one-wrapper work-from-office border-top-blue"
                            onClick={() => setEmployee(true)}
                            aria-hidden="true"
                          >
                            <p className="work-station">Washington, DC</p>
                          </div>
                        </div>
                        <div className="day_one">
                          <p className="day-name">Tuesday</p>
                          <p className="date today">15</p>
                          <div
                            className="day-one-wrapper work-from-office border-top-blue"
                            onClick={() => setEmployee(true)}
                            aria-hidden="true"
                          >
                            <p className="work-station">Richmond, VA</p>
                          </div>
                        </div>
                        <div className="day_one">
                          <p className="day-name">Wednesday</p>
                          <p className="date">16</p>
                          <div className="day-one-wrapper has-half-paid-off work-from-office border-top-blue">
                            <p className="work-station">Richmond, VA</p>
                          </div>
                          <div className="day-one-wrapper half-paid-off">
                            <p className="work-station">Paid Time Off</p>
                          </div>
                        </div>
                        <div className="day_one">
                          <p className="day-name">Thursday</p>
                          <p className="date">17</p>
                          <div
                            className="day-one-wrapper work-from-home"
                            onClick={() => setEmployee(true)}
                            aria-hidden="true"
                          >
                            <p className="work-station">Remote Work</p>
                          </div>
                        </div>
                        <div className="day_one">
                          <p className="day-name">Friday</p>
                          <p className="date">18</p>
                          <div
                            className="day-one-wrapper paid-off"
                            onClick={() => setEmployee(true)}
                            aria-hidden="true"
                          >
                            <p className="work-station">Paid Time Off</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            <div
              className="tab-pane fade"
              id="nav-month-view"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div className="card weekly-default month-view-content">
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  <div className="day_one disabled weekend">
                    <p className="day-name">Sunday</p>
                    <p className="date">30</p>
                    <div className="day-one-wrapper">
                      <p className="work-station">Washington, DC</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Monday</p>
                    <p className="date">1</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Washington, DC</p>
                      <span className="floor-location">
                        <img src="./images/floor-location.png" alt="" />
                        Fl 4-Blue
                      </span>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Tuesday</p>
                    <p className="date">2</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Wednesday</p>
                    <p className="date">3</p>
                    <div className="day-one-wrapper has-half-paid-off work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                    <div className="day-one-wrapper half-paid-off">
                      <p className="work-station">Paid Time Off </p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Thursday</p>
                    <p className="date">4</p>
                    <div className="day-one-wrapper work-from-home">
                      <p className="work-station">Remote Work</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Friday</p>
                    <p className="date">5</p>
                    <div className="day-one-wrapper paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one disabled weekend">
                    <p className="day-name">Saturday</p>
                    <p className="date">6</p>
                    <div className="day-one-wrapper" />
                  </div>
                  <div className="day_one disabled weekend">
                    <p className="day-name">Sunday</p>
                    <p className="date">7</p>
                    <div className="day-one-wrapper" />
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Monday</p>
                    <p className="date">8</p>
                    <div className="day-one-wrapper has-half-paid-off work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                    <div className="day-one-wrapper half-paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Tuesday</p>
                    <p className="date">9</p>
                    <div className="day-one-wrapper work-from-home">
                      <p className="work-station">Remote Work</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Wednesday</p>
                    <p className="date">10</p>
                    <div className="day-one-wrapper paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Thursday</p>
                    <p className="date">11</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Washington, DC</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Friday</p>
                    <p className="date">12</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                  </div>
                  <div className="day_one disabled weekend">
                    <p className="day-name">Saturday</p>
                    <p className="date">13</p>
                    <div className="day-one-wrapper" />
                  </div>
                  <div className="day_one disabled weekend">
                    <p className="day-name">Sunday</p>
                    <p className="date">14</p>
                    <div className="day-one-wrapper" />
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Monday</p>
                    <p className="date">15</p>
                    <div className="day-one-wrapper paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Tuesday</p>
                    <p className="date">16</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Washington, DC</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Wednesday</p>
                    <p className="date">17</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Thursday</p>
                    <p className="date">18</p>
                    <div className="day-one-wrapper has-half-paid-off work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                    <div className="day-one-wrapper half-paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Friday</p>
                    <p className="date">19</p>
                    <div className="day-one-wrapper work-from-home">
                      <p className="work-station">Remote Work</p>
                    </div>
                  </div>
                  <div className="day_one disabled weekend">
                    <p className="day-name">Saturday</p>
                    <p className="date">20</p>
                    <div className="day-one-wrapper" />
                  </div>
                  <div className="day_one disabled weekend">
                    <p className="day-name">Sunday</p>
                    <p className="date">21</p>
                    <div className="day-one-wrapper" />
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Monday</p>
                    <p className="date">22</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Tuesday</p>
                    <p className="date">23</p>
                    <div className="day-one-wrapper has-half-paid-off work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                    <div className="day-one-wrapper half-paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one disabled">
                    <p className="day-name">Wednesday</p>
                    <p className="date">24</p>
                    <div className="day-one-wrapper work-from-home">
                      <p className="work-station">Remote Work</p>
                    </div>
                  </div>
                  <div className="day_one current-day">
                    <p className="day-name">Thursday</p>
                    <p className="date today">25</p>
                    <div className="day-one-wrapper paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Friday</p>
                    <p className="date">26</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Washington, DC</p>
                    </div>
                  </div>
                  <div className="day_one weekend">
                    <p className="day-name">Saturday</p>
                    <p className="date">27</p>
                    <div className="day-one-wrapper" />
                  </div>
                  <div className="day_one weekend">
                    <p className="day-name">Sunday</p>
                    <p className="date">28</p>
                    <div className="day-one-wrapper" />
                  </div>
                  <div className="day_one">
                    <p className="day-name">Monday</p>
                    <p className="date">29</p>
                    <div className="day-one-wrapper work-from-home">
                      <p className="work-station">Remote Work</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Tuesday</p>
                    <p className="date">30</p>
                    <div className="day-one-wrapper paid-off">
                      <p className="work-station">Paid Time Off</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Wednesday</p>
                    <p className="date">31</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Washington, DC</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Thursday</p>
                    <p className="date">1</p>
                    <div className="day-one-wrapper work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                  </div>
                  <div className="day_one">
                    <p className="day-name">Friday</p>
                    <p className="date">2</p>
                    <div className="day-one-wrapper has-half-paid-off work-from-office border-top-blue">
                      <p className="work-station">Richmond, VA</p>
                    </div>
                    <div className="day-one-wrapper half-paid-off">
                      <p className="work-station">Paid Time Off </p>
                    </div>
                  </div>
                  <div className="day_one weekend">
                    <p className="day-name">Saturday</p>
                    <p className="date">3</p>
                    <div className="day-one-wrapper" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="light-blue-bg-btn mt-4"
            onClick={() => setEmployeeModal(true)}
          >
            {' '}
            <img src="./images/search-blue.svg" alt="" /> Search for Colleagues
          </button>
        </div>
      </div>

      <Modal
        ref={divRef}
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
            <div className="modal-body modal-view">
              <div className="calendarpop">
                <div className="selection">
                  <select name="location" id="" onChange={onChange}>
                    <option value="Remote Work">Remote Work</option>
                    <option value="Washington, DC">Washington, DC</option>
                    <option value="Malbourne, Aus">Malbourne, Aus</option>
                    <option value="Lord's, UK">Lords, UK</option>
                  </select>
                </div>
                <div className="calendar_main">
                  <Datepicker
                    controls={['calendar']}
                    display="inline"
                    name="date"
                    min={moment().toDate()}
                    onChange={onDateChange}
                    selectMultiple={true}
                    selectCounter={true}
                    dateFormat="MMM DD,YYYY"
                    marked={[
                      {
                        date: new Date(2021, 8, 2),
                        markCssClass: 'mbsc-calendar-marks1',
                      },
                      {
                        date: new Date(2021, 8, 4),
                        markCssClass: 'mbsc-calendar-marks1',
                      },
                      {
                        date: new Date(2021, 8, 5),
                        markCssClass: 'mbsc-calendar-marks2',
                      },
                      {
                        date: new Date(2021, 8, 7),
                        markCssClass: 'mbsc-calendar-marks3',
                      },
                      {
                        date: new Date(2021, 8, 6),
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
                <div className="checkbox-label">
                  <input type="checkbox" id="private-space" />
                  <label htmlFor="private-space">Private space requested</label>
                </div>
                <p className="notice">
                  If you would like to update your weekly default, you can
                  update this under <a href>My Profile</a>
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn save-data"
                onClick={() => {
                  setModal(false);
                  onSubmit();
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
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        ref={divRef}
        className="modal fade test_modal"
        show={isEmployeeModal}
        onHide={() => setEmployeeModal(false)}
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
                {state.searchName &&
                  state.searchName.map(i => (
                    <div
                      aria-hidden="true"
                      className="form-group"
                      onClick={() => handleUserSelect(i.userName)}
                    >
                      <img src={ProfileImg} alt="" />
                      <input id="jane" type="checkbox" className="checkbox" />
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
                  setEmployeeModal(false);
                  // onSubmit();
                  handleClose();
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
        ref={divRef}
        className="modal fade test_modal"
        show={isEmployee}
        onHide={() => setEmployee(false)}
        // id="showCalendar"
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        style={{ maxWidth: 'calc(100% - 20rem)' }}
        aria-hidden="true"
        centered
        size="lg"
      >
        <div className=" modal-dialog-centered">
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
                onClick={() => setEmployee(false)}
              />
            </div>
            <div
              className="modal-body"
              style={{ maxHeight: 'calc(100vh - 600px)' }}
            >
              <div className="office-structure mt-4">
                <div className="container">
                  <div className="card office-structure-inner">
                    <div className="left-panel">
                      <div className="office-info">
                        <p className="name">Washington, DC</p>
                        <span className="floor">floor 3</span>
                        <span className="floor">floor 4</span>
                      </div>
                      <div className="office-resource">
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
                      <img src={Floormap} alt="" />
                      <div className="toolbar">
                        <button className="location" type="button">
                          <img src={location} alt="" />
                        </button>
                        <button className="zoomin" type="button">
                          <img src={zoomin} alt="" />
                        </button>
                        <button className="zoomout" type="button">
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
    </div>
  );
};

WorkSpot.propTypes = {
  onSubmit: PropTypes.func,
  state: PropTypes.object,
  onChange: PropTypes.func,
  onDateChange: PropTypes.func,
  handleUserSelect: PropTypes.func,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
};
export default WorkSpot;
