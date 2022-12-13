/* eslint-disable no-unused-vars */
/* eslint-disable no-lonely-if */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router';
import { Modal } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ProfileImg from '../assets/images/myprofile.png';
import Edit from '../assets/images/edit.svg';
import Add from '../../images/Vectorplus.png';
import Warnning from '../../images/officeImage/Warnning.png';
import Close from '../assets/images/close.svg';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
import externalLink from '../assets/images/externalLink.png';
import { CONSTANT } from '../../enum';
const { SPIN_IMAGE_URL_LIVE } = CONSTANT;

const Profile = ({
  handleButtonData,
  state,
  handleCheckbox,
  handleUserSelectData,
  handleSubmit,
  userData,
  delegateList,
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
  handlecloseDataIcon,
  verifyBadgeLoading,
  validateBadge,
  badgeUpdateLoading,
  verifyBadgeChk,
  handleManageFirstBox,
  spinIcon,
  requestAddSpinIcon,
  selectEmpIcon,
  requestRemoveDelegateUser,
  requestRemoveSpinIcon,
  isLoading,
}) => {
  const [show, setShow] = useState(false);
  const [openBadge, setOpenBadge] = useState(false);
  const [replace, setReplace] = useState(true);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [empOpen, setEmpOpen] = useState(false);
  const [searchName, setSearchName] = useState([]);
  const [userListData, setUserListData] = useState([]);
  const [delegateListData, setdelegateListData] = useState([]);
  const [selectData, setselectData] = useState([]);
  const [demoData, setDemoData] = useState([]);
  const [employee, setemployee] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [search, setSearch] = useState(false);
  const [inputSet, setInputSet] = useState('');
  const [inputSet2, setInputSet2] = useState('');
  const history = useHistory();
  const demo = [];
  const newDemo = [];
  const empData = [];
  useEffect(() => {
    setDemoData(
      Array.from(selectEmpIcon).map(key => {
        demo.push(key.id);
        return key.id;
      }),
    );
    setemployee(
      Array.from(selectEmpIcon).map(key => {
        newDemo.push(key);
        return key;
      }),
    );

    if (selectEmpIcon && selectEmpIcon.length > 0) {
      setemployee(selectEmpIcon);
    }
  }, [selectEmpIcon]);

  const inputval =
    userData && userData.badgeNumber && userData.badgeNumber.slice(3, 6);
  const inputval2 =
    userData && userData.badgeNumber && userData.badgeNumber.slice(7, 11);
  useEffect(() => {
    if (show && searchName.length) {
      setSearchName([]);
    }

    if (badgeVerify === badgeConfirmVerify) {
      handleBadgeData();
    }
  }, [show]);
  useEffect(() => {
    if (validateBadge) {
      setOpenBadge(true);
      history.replace({ pathname: '/profile', state: { badge: false } });
    }
    if (
      badgeUpdateData &&
      badgeUpdateData.success &&
      badgeUpdateData.message &&
      openBadge
    ) {
      setOpenBadge(false);
    }

    if (delegrateUsersList && delegrateUsersList.length > 0) {
      setUserListData(delegrateUsersList);
      setselectData(delegrateUsersList);
    }

    if (
      userData &&
      userData.delegateUserList &&
      userData.delegateUserList.length
    ) {
      setdelegateListData(userData.delegateUserList);
    }

    if (verifyBadgeChk && verifyBadgeChk.update) {
      setInputSet2('');
      setInputSet('');
    }
  }, [badgeUpdateData, delegrateUsersList, verifyBadgeChk, userData]);

  const handleSpinSelect = name => {
    const dataName = [...employee];
    const tempDemo = demoData;
    if (dataName.includes(name) || tempDemo.includes(name.id)) {
      const index = dataName.indexOf(name);
      const indexOne = tempDemo.indexOf(name.id);
      dataName.splice(index, 1);
      tempDemo.splice(indexOne, 1);
      setEmpOpen(false);
    } else {
      if (dataName.length !== 2 || tempDemo.length !== 2) {
        dataName.push(name);
        tempDemo.push(name.id);
        setEmpOpen(false);
      } else {
        setEmpOpen(true);
      }
    }
    setemployee(dataName);
    setDemoData(tempDemo);
  };

  const handleUserSelect = firstname => {
    const dataName = [...selectData];
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

  const handleDelegateRemove = name => {
    const newArr = userData.delegateUserList;
    const dataVal =
      userData &&
      userData.delegateUserList &&
      userData.delegateUserList.filter(ele => ele.employeeid === name);
    if (dataVal[0].employeeid) {
      const idx = newArr.findIndex(val => val.employeeid === name);
      newArr.splice(idx, 1);
      setdelegateListData(newArr);
    }

    requestRemoveDelegateUser({ delegateid: dataVal[0].employeeid });
  };

  const handleSpinRemove = name => {
    const newArr = employee;
    const dataVal =
      selectEmpIcon &&
      selectEmpIcon.length > 0 &&
      selectEmpIcon.filter(ele => ele.id === name);

    if (dataVal[0].id) {
      const idx = newArr.findIndex(val => val.id === name);
      newArr.splice(idx, 1);
    }
    setemployee(prestate => prestate.filter(ele => ele.id !== dataVal[0].id));
    // setDemoData(prestate => prestate.filter(ele => ele !== dataVal[0].pinId));
    requestRemoveSpinIcon({ pinId: [dataVal[0].id] });
  };
  const handleAddSpinIcon = () => {
    requestAddSpinIcon({ pin: demoData });
  };

  const handleCancle = () => {
    setOpen(false);
    setEmpOpen(false);
    setemployee(
      Array.from(selectEmpIcon).map(key => {
        empData.push(key);
        return key;
      }),
    );
    setDemoData(
      Array.from(selectEmpIcon).map(key => {
        empData.push(key.id);
        return key.id;
      }),
    );
  };

  const badgeVerify = inputSet.concat(inputSet2);
  const badgeConfirmVerify =
    state.badgedata !== undefined &&
    state.badge &&
    state.badge.concat(state.badgedata && state.badgedata);

  return (
    <Fragment>
      <div>
        {(apiMessage || locationMessage || locationApiMessage) && (
          <div
            className={`alert fade show mx-auto ${
              apiSuccess || locationSuccess || locationApiSuccess
                ? 'alert alert-success'
                : 'alert alert-danger'
            }`}
          >
            <div style={{ display: 'contents', lineHeight: '30px' }}>
              <img
                src={
                  apiSuccess || locationSuccess || locationApiSuccess
                    ? checkedCircle
                    : crossCircle
                }
                alt=""
                style={{ paddingRight: '5px' }}
              />
              <div>
                {apiMessage || locationMessage || locationApiMessage || ''}
              </div>
            </div>
            <div
              style={{ float: 'right', fontSize: 'large' }}
              onClick={() => handlecloseDataIcon()}
              className="day-pointer al_cross"
            >
              &#10006;
            </div>
          </div>
        )}
        <div
          className={`${
            userData && userData.badgeNumber !== ''
              ? 'manage_width wrapper_main'
              : 'wrapper_main'
          }`}
        >
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
                              <p>
                                {state.badgedata
                                  ? `BB- ${state.badge}-
                                      ${state.badgedata}`
                                  : userData.badgeNumber}
                              </p>
                              {userData.badgeNumber ? (
                                <>
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
                                  {replace ? (
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
                                  ${badgeConfirmVerify !== '' &&
                                    badgeConfirmVerify &&
                                    badgeConfirmVerify.length >= 6 &&
                                    badgeConfirmVerify !== undefined &&
                                    badgeVerify !== badgeConfirmVerify &&
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
                                    id="badgeNumVal1"
                                    name="badge1"
                                    value={inputSet}
                                    type="text"
                                    className="put-value badge_val"
                                    placeholder={inputval || 'XXX'}
                                    maxLength="3"
                                    onChange={e => {
                                      setInputSet(e.target.value);
                                      handleManageFirstBox();
                                    }}
                                  />
                                  <span>−</span>
                                  <input
                                    id="badgeNumVal2"
                                    className="put-value badge_val"
                                    name="badgedata1"
                                    value={inputSet2}
                                    type="text"
                                    placeholder={inputval2 || 'XXX'}
                                    maxLength="3"
                                    onChange={e => {
                                      setInputSet2(e.target.value);
                                      handleManageFirstBox();
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="attr_one">
                          {openBadge && (
                            <>
                              <span>Confirm Badge Number</span>
                              <div className="edit-badge-number opened">
                                <div
                                  className={`input-taker
                                  ${!verifyBadgeSuccess &&
                                    verifyBadgeSuccess !== '' &&
                                    'badge_err_profile'}
                                    ${badgeConfirmVerify !== '' &&
                                      badgeConfirmVerify &&
                                      badgeConfirmVerify.length >= 6 &&
                                      badgeConfirmVerify !== undefined &&
                                      badgeVerify !== badgeConfirmVerify &&
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
                                      value={state.badge}
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
                                      value={state.badgedata}
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
                                      setReplace(false);
                                      handleBadgeSubmit();
                                    }}
                                  >
                                    Save
                                    {(verifyBadgeLoading ||
                                      badgeUpdateLoading) && (
                                      <div className="spinner-border" />
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    href
                                    onClick={() => {
                                      setOpenBadge(false);
                                      handleCloseBtn();
                                      setInputSet('');
                                      setInputSet2('');
                                    }}
                                    className="cancel"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>

                              {badgeConfirmVerify !== '' &&
                              badgeConfirmVerify &&
                              badgeConfirmVerify.length >= 6 &&
                              badgeConfirmVerify !== undefined &&
                              badgeVerify !== badgeConfirmVerify ? (
                                <span>
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
                                      The badge numbers you entered do not
                                      match.
                                    </div>
                                  </div>
                                </span>
                              ) : (
                                verifyBadgeMsg &&
                                !verifyBadgeSuccess && (
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
                                )
                              )}
                            </>
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
                                  aria-hidden
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
              <h4 className="common-title">Name Plate Pins</h4>
              <p className="w-50 stroke-2 mt-3">
                You can select up to 2 pins to display on your name plate.
              </p>
              {isLoading ? (
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  <Spinner
                    className="app-spinner profile"
                    animation="grow"
                    variant="dark"
                  />
                </div>
              ) : (
                <div className="card mt-4 work-access-inner">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <h5>My Pins</h5>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(true);
                      }}
                      className="btn blue-color-btn"
                    >
                      Select Pins
                    </button>
                  </div>
                  <div className="access-to">
                    {selectEmpIcon &&
                      selectEmpIcon.length > 0 &&
                      selectEmpIcon.map(i => (
                        <div className="access-one">
                          <img
                            src={`${SPIN_IMAGE_URL_LIVE +
                              i.imageUrl}?bust=${new Date().getTime()}`}
                            alt=""
                          />
                          {i.name}&nbsp;<span className="head_eab">@</span>
                          &nbsp;EAB
                          <a
                            className="close_btn"
                            href
                            onClick={() => handleSpinRemove(i.pinId)}
                          >
                            <img src={Close} alt="" />
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              )}
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
                <div className="access-to">
                  {delegateListData &&
                    delegateListData.map(i => (
                      <div className="access-one">
                        <img src={i.delegateUserPhoto || ProfileImg} alt="" />
                        {i.delegateUserFistname} {i.delegateUserLastname}
                        <a
                          className="close_btn"
                          href
                          onClick={() => handleDelegateRemove(i.employeeid)}
                        >
                          <img src={Close} alt="" />
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="workspot-access mt-40">
            <div className="container">
              <h4 className="common-title">Office Access</h4>
              <p className="stroke-2 mt-3">
                After submitting an office access form, the request will be sent
                to the office manager's team. It may take up to 48 business
                hours to process the request.
              </p>
              <a
                style={{ textDecoration: 'underline' }}
                target="_blank"
                className="w-50 stroke-2 mt-3"
                href="https://forms.eab.com/s3/Fitness-Center-Waiver-DC-Office"
              >
                Fitness Center Waiver - DC Office{'   '}
                <img
                  src={externalLink}
                  alt="warn"
                  style={{
                    margin: '4px 5px 9px 8px',
                    height: '14px',
                  }}
                />
              </a>{' '}
              <br />
              <a
                style={{ textDecoration: 'underline' }}
                target="_blank"
                className="w-50 stroke-2 mt-3"
                href="https://forms.eab.com/s3/Bike-Waiver-for-DC-Office"
              >
                Bike Room Waiver - DC Office
                <img
                  src={externalLink}
                  alt="warn"
                  style={{
                    margin: '4px 5px 9px 8px',
                    height: '14px',
                  }}
                />
              </a>
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
        <Modal
          className="modal fade test_modal_pins"
          show={open}
          onHide={() => setOpen(false)}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-header d-block">
            <h5 className="modal-title" id="exampleModalLabel">
              My Pins
            </h5>
            {empOpen && (
              <span style={{ color: 'red' }}>
                You can only select up to 2 pins.
              </span>
            )}
            <div
              className="modal-body modal-update margin_spin"
              id="data_update"
            >
              <form className="delegate-workspot-access" action="submit">
                <>
                  <div>
                    {spinIcon &&
                      spinIcon.length &&
                      spinIcon.map(elec => (
                        <>
                          <div
                            aria-hidden="true"
                            className={`${demoData.includes(elec.id) &&
                              'checked_item'} form-group`}
                            onClick={() => handleSpinSelect(elec)}
                          >
                            <img
                              src={`${SPIN_IMAGE_URL_LIVE +
                                elec.imageUrl}?bust=${new Date().getTime()}`}
                              alt=""
                            />
                            <input
                              id={elec.id}
                              type="radio"
                              className="checkbox"
                              checked={demoData.includes(elec.id)}
                            />

                            <label htmlFor="jane">
                              {elec.name}&nbsp;
                              <span className="head_eab">@</span>&nbsp;EAB
                            </label>
                          </div>
                        </>
                      ))}
                  </div>
                </>
              </form>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCancle}
            />
          </div>
          <div className="modal-footer">
            <button
              loading
              type="button"
              className="btn save-data"
              onClick={() => {
                handleAddSpinIcon();
                setOpen(false);
              }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn dismiss"
              data-bs-dismiss="modal"
              onClick={handleCancle}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  handleButtonData: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleCheckbox: PropTypes.func,
  state: PropTypes.object,
  handleUserSelectData: PropTypes.func,
  userData: PropTypes.object,
  delegateList: PropTypes.object,
  location: PropTypes.object,
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
  requestRemoveDelegateUser: PropTypes.func,
  requestRemoveSpinIcon: PropTypes.func,
  requestAddDelegateList: PropTypes.func,
  delegrateUsersList: PropTypes.object,
  locationApiMessage: PropTypes.string,
  locationApiSuccess: PropTypes.bool,
  handlecloseDataIcon: PropTypes.func,
  validateBadge: PropTypes.bool,
  verifyBadgeLoading: PropTypes.bool,
  badgeUpdateLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
  verifyBadgeChk: PropTypes.object,
  spinIcon: PropTypes.array,
  selectEmpIcon: PropTypes.array,
  handleManageFirstBox: PropTypes.func,
  requestAddSpinIcon: PropTypes.func,
};
export default Profile;
