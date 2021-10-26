/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ProfileImg from '../assets/images/myprofile.png';
import Edit from '../assets/images/edit.svg';
import Add from '../../images/Vectorplus.png';
import Warnning from '../../images/officeImage/Warnning.png';
import Close from '../assets/images/close.svg';

const Profile = ({
  handleButtonData,
  badgeUpdateSuccess,
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
  locationSuccess,
  locationMessage,
  handleBadgeData,
  handleBadgeSubmit,
  badgeUpdateData,
  handleSelectedNamesChange,
  verifyBadgeSuccess,
  verifyBadgeMsg,
  handleCloseBtn,
  requestAddDelegateList,
  requestRemoveDelegateList,
  delegrateUsersList,
  locationApiMessage,
  locationApiSuccess,
}) => {
  const [openbadgeData, setOpenBadgeData] = useState(true);
  const [show, setShow] = useState(false);
  const [openBadge, setOpenBadge] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchName, setSearchName] = useState([]);
  const [userListData, setUserListData] = useState([]);
  const [selectData, setselectData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [search, setSearch] = useState(false);

  const badgeValues = userData && userData.badgeNumber;
  const value =
    badgeValues &&
    badgeValues.slice(0, 2) +
      badgeValues.slice(3, 7) +
      badgeValues.slice(7, 10);

  const finalBadges =
    value && `${value.substring(0, 2)} ${value.substring(2, value.length)}`;

  const inputval =
    userData && userData.badgeNumber && userData.badgeNumber.slice(3, 6);
  const inputval2 =
    userData && userData.badgeNumber && userData.badgeNumber.slice(7, 11);

  useEffect(() => {
    if (show && searchName.length) {
      setSearchName([]);
    }
  }, [show]);

  useEffect(() => {
    if (
      badgeUpdateData &&
      badgeUpdateData.success &&
      badgeUpdateData.message &&
      openbadgeData
    ) {
      setOpenBadge(false);
      setOpenBadgeData(false);
    }

    if (delegrateUsersList && delegrateUsersList.length > 0) {
      setUserListData(delegrateUsersList);
      setselectData(delegrateUsersList);
    }
  }, [badgeUpdateData, delegrateUsersList]);

  let dataName = [];
  const handleUserSelect = firstname => {
    dataName = [...selectData];
    if (dataName.includes(firstname)) {
      const index = dataName.indexOf(firstname);
      dataName.splice(index, 1);
    } else {
      dataName.push(firstname);
    }
    setselectData(dataName);
  };

  const handleChange = event => {
    let newList = [];
    if (event.target.value !== '' && delegateList.length) {
      setSearch(true);
      newList = delegateList.filter(({ firstname, lastname }) => {
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

  const handleClose = () => {
    const data = [...selectData];
    function unique(dataVal, key) {
      return [...new Map(dataVal.map(x => [key(x), x])).values()];
    }

    setUserListData(unique(data, obj => obj.employeeid));
    setShow(false);
  };

  const addDelegateList = () => {
    const finalValue = selectData.map(data => data.employeeid);
    const finalDataPayload = {
      employeeid: 239323,
      delegateid: finalValue,
    };
    requestAddDelegateList(finalDataPayload);
  };

  const handleChangeDay = (name, data) => {
    setSelectedValue(data);
    setModal(true);
    handleButtonData(name, data);
    handleSelectedNamesChange(data);
  };

  const data = location && location.length && location[location.length - 1];
  const finalLocation =
    location && location.length
      ? location.filter(obj => obj && obj.locationCode !== 'RW')
      : '';

  const handleRemove = name => {
    const newArr = [...userListData];
    const dataVal = newArr.filter(datas => datas.employeeid === name);
    if (dataVal[0].employeeid) {
      const idx = newArr.findIndex(val => val.employeeid === name);
      newArr.splice(idx, 1);
      setUserListData(newArr);
      setselectData(newArr);
    }

    setselectData(newArr);
    requestRemoveDelegateList({ id: dataVal[0].employeeid });
  };

  return (
    <Fragment>
      <>
        {(apiMessage || locationMessage || locationApiMessage) && (
          <div
            className={`"alert-dismissible fade show ${
              apiSuccess || locationSuccess || locationApiSuccess
                ? 'popup_success'
                : 'popup_err'
            } "`}
            role="alert"
          >
            <p className="text-center m-auto">
              {apiMessage || locationMessage || locationApiMessage || ''}
            </p>
          </div>
        )}
        <div className="wrapper_main">
          <div className="my-profile">
            <div className="container">
              <h4 className="common-title">My Profile</h4>

              {/* <div className="card my-profile-inner"> */}
              {isEmpty(userData) ? (
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  <Spinner
                    className="app-spinner profile"
                    animation="grow"
                    variant="dark"
                    // style={{ width: '0%' }}
                  />
                </div>
              ) : (
                <>
                  <div className="card my-profile-inner">
                    <div className="left-aside d-flex align-items-center justify-content-center">
                      <div className="wrapper">
                        <div className="profile-picture">
                          <img
                            src={(userData && userData.photo) || ProfileImg}
                            alt=""
                            style={{
                              border: '1px solid black',
                              borderRadius: '60px',
                            }}
                          />
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
                          <p>{userData && userData.managerName}</p>
                        </div>
                      </div>
                      <div className="col_one">
                        <div className="attr_one">
                          <span>Primary Office</span>
                          <p>{userData && userData.primaryofficelocation}</p>
                        </div>
                        {userData && userData.permanentdesk && (
                          <div className="attr_one">
                            <span>Assigned Space</span>
                            <p>
                              {userData && userData.permanentdesk
                                ? userData.permanentdesk
                                : ''}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="col_one">
                        <div className="attr_one">
                          <span>Badge Number</span>
                          {!openBadge && (
                            <>
                              {userData.badgeNumber ? (
                                <>
                                  <p>
                                    {/* {state.badgedata
                                      ? `BB ${state.badge.concat(
                                          state.badgedata,
                                        )}`
                                      : finalBadges} */}
                                    {userData.badgeNumber}
                                  </p>
                                  <a
                                    className="replace"
                                    href
                                    onClick={() => setOpenBadge(true)}
                                  >
                                    <img src={Edit} alt="" />
                                    Replace My Badge
                                  </a>
                                </>
                              ) : (
                                <>
                                  <p>
                                    {badgeUpdateSuccess &&
                                      (state.badgedata &&
                                        `BB- ${state.badge}-
                                          ${state.badgedata}
                                        `)}
                                    {/* { userData.badgeNumber} */}
                                  </p>

                                  {!badgeUpdateSuccess ? (
                                    <a
                                      className="replace"
                                      href
                                      onClick={() => setOpenBadge(true)}
                                    >
                                      <img src={Add} alt="" />
                                      Add My Badge
                                    </a>
                                  ) : (
                                    <a
                                      className="replace"
                                      href
                                      onClick={() => setOpenBadge(true)}
                                    >
                                      <img src={Edit} alt="" />
                                      Replace My Badge
                                    </a>
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {openBadge && (
                            <div className="edit-badge-number opened">
                              <div
                                className={`input-taker
                            ${!verifyBadgeSuccess &&
                              verifyBadgeSuccess !== '' &&
                              'badge_err_profile'}
                          `}
                              >
                                <input
                                  type="text"
                                  disabled
                                  value="BB"
                                  style={{ height: '42px' }}
                                />
                                <div className="d-flex">
                                  <input
                                    id="badgeNumber"
                                    name="badge"
                                    type="text"
                                    className="put-value badge_val"
                                    placeholder={inputval || 'XXX'}
                                    maxLength="3"
                                    onChange={handleBadgeData}
                                  />
                                  <span>−</span>
                                  <input
                                    id="badgeValue"
                                    className="put-value badge_val"
                                    name="badgedata"
                                    type="text"
                                    placeholder={inputval2 || 'XXX'}
                                    maxLength="3"
                                    onChange={handleBadgeData}
                                  />
                                </div>
                              </div>

                              <div className="action-buttons">
                                <button
                                  type="button"
                                  href
                                  className={
                                    verifyBadgeSuccess ? 'save' : 'save_btn'
                                  }
                                  onClick={() => {
                                    handleBadgeSubmit();
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  href
                                  onClick={() => {
                                    setOpenBadge(false);
                                    handleCloseBtn();
                                  }}
                                  className="cancel"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                          {badgeUpdateData &&
                            !badgeUpdateData.success &&
                            badgeUpdateData.message && (
                              <p style={{ color: 'red' }}>
                                {`! ${badgeUpdateData.message}`}
                              </p>
                            )}
                          {verifyBadgeMsg && !verifyBadgeSuccess && (
                            <div
                              className="d-flex"
                              style={{ marginTop: '10px' }}
                            >
                              <img
                                src={Warnning}
                                alt="warn"
                                style={{
                                  margin: '4px 5px 0px 0px',
                                  height: '14px',
                                }}
                              />
                              <div style={{ color: 'red' }}>
                                {verifyBadgeMsg}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="weekly-default onboarding-main mt-40">
            <div className="container">
              <h4 className="common-title">Weekly Default</h4>
              <p className="stroke-2 mt-3 profile_desc">
                Your weekly default will pre-populate for each week unless you
                update <i>my</i>Workspot for a specific day.
                <br /> You can update <i>my</i>Workspot for a particular day on
                the homepage.
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
                                onClick={() => handleChangeDay(t.day, t.name)}
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
                <i>my</i>Workspot Access
              </h4>
              <p className="w-50 stroke-2 mt-3">
                You can delegate <i>my</i>Workspot access to other colleagues at
                EAB.
              </p>
              <div className="card mt-4 work-access-inner">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <h5>
                    Delegate <i>my</i>Workspot Access to
                  </h5>
                  <button
                    type="button"
                    onClick={() => setShow(true)}
                    className="btn blue-color-btn"
                  >
                    Delegate <i>my</i>Workspot Access
                  </button>
                </div>
                {/* {userListData.length <= 0 ? (
                  <Spinner
                    className="app-spinner profile"
                    animation="grow"
                    variant="dark"
                  />
                ) : ( */}
                <div className="access-to">
                  {userListData &&
                    userListData.map(i => (
                      <div className="access-one">
                        <img src={ProfileImg} alt="" />
                        {i.firstname} {i.lastname}
                        <a
                          className="close_btn"
                          href
                          onClick={() => handleRemove(i.employeeid)}
                        >
                          <img src={Close} alt="" />
                        </a>
                      </div>
                    ))}
                </div>
                {/* )} */}
              </div>
            </div>
          </div>

          <div className="workspot-access mt-4">
            <div className="container">
              <div className="card work-access-inner">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <h5>
                    I Can Update <i>my</i>Workspot for
                  </h5>
                </div>
                {/* <div className="access-to update-workshop">
                  <div className="access-one">
                    <img src={ProfileImg} alt="" />
                    Wade Warren
                  </div>
                </div> */}
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
                    <select
                      name="location"
                      onChange={handleUserSelectData}
                      defaultValue={selectedValue}
                    >
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
          onHide={() => {
            setShow(false);
          }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          id="set_location"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delegate <i>my</i>Workspot Access
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
              <input
                type="search"
                placeholder="Search..."
                className="searchbox"
                name="searchValue"
                onChange={handleChange}
              />
              <div className="modal-body modal-update" id="data_update">
                <form className="delegate-workspot-access" action="submit">
                  {searchName &&
                    searchName.map(i => (
                      <div
                        aria-hidden="true"
                        className={`${selectData.includes(i) &&
                          'checked_item'}  form-group`}
                        // className="form-group"
                        onClick={() => handleUserSelect(i)}
                      >
                        <img src={ProfileImg} alt="" />
                        <input
                          id={i.employeeid}
                          type="radio"
                          className="checkbox"
                          checked={selectData.includes(i)}
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
                  onClick={() => {
                    addDelegateList();
                    handleClose();
                  }}
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
  locationSuccess: PropTypes.bool,
  locationMessage: PropTypes.string,
  handleBadgeData: PropTypes.func,
  handleBadgeSubmit: PropTypes.func,
  badgeUpdateData: PropTypes.object,
  verifyBadgeSuccess: PropTypes.bool,
  verifyBadgeMsg: PropTypes.string,
  handleSelectedNamesChange: PropTypes.object,
  handleCloseBtn: PropTypes.func,
  requestRemoveDelegateList: PropTypes.func,
  requestAddDelegateList: PropTypes.func,
  delegrateUsersList: PropTypes.object,
  badgeUpdateSuccess: PropTypes.bool,
  locationApiMessage: PropTypes.string,
  locationApiSuccess: PropTypes.bool,
};
export default Profile;
