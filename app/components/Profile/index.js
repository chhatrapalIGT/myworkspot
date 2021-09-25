/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ProfileImg from '../assets/images/myprofile.png';
import Edit from '../assets/images/edit.svg';

import Close from '../assets/images/close.svg';

const Profile = ({
  handleButtonData,
  state,
  handleCheckbox,
  handleUserSelectData,
  handleSubmit,
  getProfileLocation,
  userData,
  delegateList,
  delegateSuccess,
  location,
  apiMessage,
  apiSuccess,
}) => {
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);

  const [search, setSearch] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchName, setSearchName] = useState([]);
  const [userListData, setUserListData] = useState([]);
  useEffect(() => {
    if (delegateList && delegateList.length && delegateSuccess && open) {
      setAllUser(delegateList);
      setSearchName(delegateList);
      setOpen(false);
    }
  }, [delegateList]);

  const handleChange = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);
      newList = allUser.filter(({ firstname }) => {
        const finalDataList = firstname.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return finalDataList.includes(filter);
      });
    } else {
      setSearch(false);
      newList = allUser;
    }
    setSearchName(newList);
  };

  const selectData = [];
  let finalData = [];
  const handleUserSelect = firstname => {
    if (selectData.includes(firstname)) {
      const index = selectData.indexOf(firstname);
      selectData.splice(index, 1);
    } else {
      selectData.push(firstname);
    }
    finalData = selectData;
  };

  const handleClose = () => {
    setUserListData(finalData);
    setShow(false);
  };

  const handleChangeDay = name => {
    setModal(true);
    handleButtonData(name);
  };

  const data = location && location.length && location[location.length - 1];

  const finalLocation =
    location && location.length
      ? location.filter(obj => obj && obj.locationname !== 'Remote Work')
      : '';

  // const handleRemove = i => {
  //   userListData.splice(i, 1);
  //   setUserListData(userListData);
  // };

  return (
    <Fragment>
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
        <div className="wrapper_main">
          <div className="my-profile">
            <div className="container">
              <h4 className="common-title">My Profile</h4>
              <div className="card my-profile-inner">
                <div className="left-aside d-flex align-items-center justify-content-center">
                  <div className="wrapper">
                    <div className="profile-picture">
                      <img src={ProfileImg} alt="" />
                    </div>
                    <h3 className="profile-username">
                      {' '}
                      {userData && userData.firstname}{' '}
                      {userData && userData.lastname}
                    </h3>
                    <span className="designation">
                      {userData && userData.jobtitle}
                    </span>
                  </div>
                </div>
                <div className="right-content">
                  <div className="col_one">
                    <div className="attr_one">
                      <span>Employee ID</span>
                      <p> {userData && userData.employeeid}</p>
                    </div>
                    <div className="attr_one">
                      <span>Manager</span>
                      <p>Cameron Williamson</p>
                    </div>
                  </div>
                  <div className="col_one">
                    <div className="attr_one">
                      <span>Primary Office</span>
                      <p>{userData && userData.primaryofficelocation}</p>
                    </div>
                    <div className="attr_one">
                      <span>Assigned Space</span>
                      <p>1435</p>
                    </div>
                  </div>
                  <div className="col_one">
                    <div className="attr_one">
                      <span>Badge Number</span>
                      <p>BB {userData && userData.badgeNumber}</p>
                      <a className="replace" href>
                        <img src={Edit} alt="" />
                        Replace My Badge
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="weekly-default onboarding-main mt-40">
            <div className="container">
              <h4 className="common-title">Weekly Default</h4>
              <p className="w-50 stroke-2 mt-3">
                Your weekly default will pre-populate for each week unless you
                update <i>My</i>Workspot for a specific day. You can update My
                Workspot for a particular day on the homepage.
              </p>
              <div className="on-boarding-inner p-0">
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  {state.finalLocationDay && !state.finalLocationDay.length ? (
                    <Spinner
                      className="app-spinner profile"
                      animation="grow"
                      variant="dark"
                    />
                  ) : (
                    <>
                      {state.finalLocationDay &&
                        state.finalLocationDay.map(t => (
                          <div className="day_one">
                            <p className="day-name">{t.day}</p>

                            <a
                              href
                              data-bs-toggle="modal"
                              data-bs-target="#set_location"
                            >
                              <div
                                onClick={() => handleChangeDay(t.day)}
                                className={`day-one-wrapper ${
                                  t.name === ''
                                    ? 'add-location'
                                    : t.name !== 'Remote Work'
                                    ? 'work-from-office border-top-blue'
                                    : t.name === 'Remote Work'
                                    ? 'work-from-home'
                                    : 'add-location'
                                }`}
                              >
                                <label
                                  value={t.day}
                                  onClick={() => {
                                    handleButtonData(t.day);
                                  }}
                                >
                                  {t.name}
                                </label>
                              </div>
                            </a>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="workspot-access mt-40">
            <div className="container">
              <h4 className="common-title">
                <i>My</i>Workspot Access
              </h4>
              <p className="w-50 stroke-2 mt-3">
                You can delegate <i>My</i>Workspot access to other colleagues at
                EAB.
              </p>
              <div className="card mt-4 work-access-inner">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <h5>
                    Delegate <i>My</i>Workspot Access to
                  </h5>
                  <button
                    type="button"
                    onClick={() => setShow(true)}
                    className="btn blue-color-btn"
                  >
                    Delegate <i>My</i>Workspot Access
                  </button>
                </div>
                <div className="access-to">
                  {userListData &&
                    userListData.map(i => (
                      <div className="access-one">
                        <img src={ProfileImg} alt="" />
                        {i}
                        <a className="close_btn" href>
                          <img src={Close} alt="" />
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="workspot-access mt-4">
            <div className="container">
              <div className="card work-access-inner">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <h5>
                    I Can Update <i>My</i>Workspot for
                  </h5>
                </div>
                <div className="access-to update-workshop">
                  <div className="access-one">
                    <img src={ProfileImg} alt="" />
                    Wade Warren
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="modal fade test_modal"
          show={modal}
          onHide={() => setModal(false)}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-block">
                <h5 className="modal-title" id="exampleModalLabel">
                  Set {state.selectedDay && state.selectedDay} Schedule
                </h5>
                <p className="mb-0 mt-2 stroke-2">
                  Choose a place where you usually work on this day <br /> of
                  the week
                </p>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setModal(false)}
                />
              </div>
              <div className="modal-body">
                <form className="delegate-workspot-access" action="submit">
                  <div className="selection">
                    <select name="location" onChange={handleUserSelectData}>
                      <optgroup label="EAB Office">
                        {finalLocation &&
                          finalLocation.map(i => (
                            <option
                              htmlFor="jane"
                              value={i.locationname}
                              id="location"
                              style={{ padding: '50px' }}
                            >
                              {i.locationname}
                            </option>
                          ))}
                      </optgroup>
                      <hr />
                      <option value={data && data.locationname}>
                        {data && data.locationname}
                      </option>
                    </select>
                  </div>

                  <div className="applyall d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="apply-all"
                      onClick={() => handleCheckbox()}
                    />
                    <label htmlFor="apply-all" className="stroke-2">
                      Apply to all days of the week
                    </label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn save-data"
                  onClick={() => {
                    handleSubmit();
                    setModal(false);
                  }}
                >
                  Save
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
          show={show}
          onHide={() => handleClose()}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          id="set_location"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delegate <i>My</i>Workspot Access
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShow(false);
                  }}
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
                  {searchName.length &&
                    searchName.map(i => (
                      <div
                        aria-hidden="true"
                        className="form-group"
                        onClick={() => handleUserSelect(i.firstname)}
                      >
                        <img src={ProfileImg} alt="" />
                        <input id="jane" type="radio" className="checkbox" />
                        <label htmlFor="jane">{i.firstname}</label>
                      </div>
                    ))}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn save-data"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="btn dismiss"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </Fragment>
  );
};

Profile.propTypes = {
  handleButtonData: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleCheckbox: PropTypes.func,
  state: PropTypes.object,
  handleUserSelectData: PropTypes.func,
  getProfileLocation: PropTypes.object,
  userData: PropTypes.object,
  delegateList: PropTypes.object,
  location: PropTypes.object,
  delegateSuccess: PropTypes.bool,
  apiSuccess: PropTypes.bool,
  apiMessage: PropTypes.string,
};
export default Profile;
