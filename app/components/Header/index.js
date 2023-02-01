/* eslint-disable no-constant-condition */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/style.scss';
import '../assets/css/adminStyle.css';
import '../assets/css/style.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import Headerlogo from '../assets/images/logo_mains.svg';
import Profile from '../assets/images/profileof.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
import {
  clearData,
  requestDelegateProfile,
  requestUserlistData,
  requestgetAdminOwner,
  requestDelegateData,
  clearAdminOwner,
} from '../../containers/ProfilePage/actions';
import ProfileImg from '../assets/images/myprofile.png';
import BadgeIcon from '../../images/badgeIcon.png';
import searchicon from '../assets/images/search-blue.svg';

import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

const Header = props => {
  // eslint-disable-next-line no-unused-vars
  const [showMessage, setShowMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchName, setSearchName] = useState([]);
  const [selectData, setselectData] = useState([]);
  const [apiCall, setApiCall] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminOwner, setIsAdminOwner] = useState(false);
  const [neighborData, setneighborData] = useState('');
  const [delecatecallchk, setDelecatecallchk] = useState(false);
  const divRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const [userList, setUserList] = useState(
    (props.profileUser && props.profileUser.delegateUserList) || [],
  );
  const [defaultapick, setDefaultapick] = useState(false);

  const handleClose = () => {
    const data = [...selectData];
    function unique(dataVal, key) {
      return [...new Map(dataVal.map(x => [key(x), x])).values()];
    }
    setShow(false);
  };
  useEffect(() => {
    if (props.getOwnerSuccess.success === true) {
      props.requestUserlistData({});
    }
  }, [props.getOwnerSuccess]);

  const addDelegateList = () => {
    const finalValue = selectData.map(data => data.employeeid);
    const finalDataPayload = {
      delegateid: finalValue,
    };
    props.requestgetAdminOwner(finalDataPayload);
    // props.requestUserlistData({});
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
    if (event.target.value !== '' && props.delegateList.length) {
      setSearch(true);
      newList = props.delegateList.filter(({ firstname, lastname }) => {
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
  useEffect(() => {
    if (!defaultapick) {
      props.requestUserlistData({
        empdelegatedata: sessionStorage.getItem('delegateId'),
      });
      setDefaultapick(true);
    }

    const getAdmin = sessionStorage.getItem('Admin');
    const getAdminOwner = sessionStorage.getItem('Admin Owner');
    const getDelegate = sessionStorage.getItem('delegate');
    const empId = sessionStorage.getItem('empid');
    !getAdmin && sessionStorage.setItem('Admin', false);
    !getAdminOwner && sessionStorage.setItem('Admin Owner', false);
    !getDelegate && sessionStorage.setItem('delegate', false);
    !empId &&
      sessionStorage.setItem('empid', props.profileUser.employeeid || '');

    if (props.delegateHeaderProfileSuccess && !delecatecallchk) {
      props.requestUserlistData({
        empdelegatedata: sessionStorage.getItem('delegateId'),
      });
      setDelecatecallchk(true);
      window.location.reload();
    }
  }, [props.delegateHeaderProfileSuccess, props.profileUser.employeeid]);

  useEffect(() => {
    if (sessionStorage.getItem('neighborData')) {
      setneighborData(JSON.parse(sessionStorage.getItem('neighborData')));
    }
  }, [sessionStorage.getItem('neighborData')]);

  useEffect(() => {
    if (props.profileSuccess) {
      const delPro =
        props.profileUser.delegateUserList &&
        props.profileUser.delegateUserList.filter(
          i => i.employeeid.toString() !== url.toString(),
        );
      setUserList(delPro);
      props.clearData();
      props.clearAdminOwner();
    }
    document.addEventListener('mousedown', handleClickOutside, false);
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  }, [props.profileSuccess]);

  const handleClickOutside = event => {
    if (divRef && divRef.current && !divRef.current.contains(event.target)) {
      setEditProfile(false);
    }
  };
  const pathName = location.pathname;
  let url = pathName.split('/');
  url = url[url.length - 1];
  const userProfileData = async id => {
    if (id === sessionStorage.getItem('empid')) {
      sessionStorage.removeItem('delegateId');
      sessionStorage.setItem('delegate', false);
      props.requestUserlistData({
        employeeid: sessionStorage.getItem('empid'),
        // empdelegatedata: sessionStorage.getItem('delegateId'),
      });
    } else {
      props.requestUserlistData({
        // employeeid: sessionStorage.getItem('empId'),
        empdelegatedata: sessionStorage.getItem('delegateId'),
        employeeid: sessionStorage.getItem('empid'),
      });
    }

    sessionStorage.setItem('delegateId', id);
    const delPro = props.profileUser.delegateUserList.filter(
      i => i.employeeid.toString() !== id.toString(),
    );
    setUserList(delPro);
    props.requestDelegateProfile({
      empId: id,
      // eslint-disable-next-line no-unneeded-ternary
      subb: id === sessionStorage.getItem('empid') ? false : true,
    });
    // window.location.reload();
  };

  const handleBadgeRedirect = () => {
    history.push(`/profile`, { badge: true });
  };

  const logout = () => {
    let token = sessionStorage.getItem('AccessToken');
    token = JSON.parse(token);
    setApiCall(true);
    const urls = `${API_URL}/authenticate/logout`;
    axios
      .post(
        urls,
        {},
        {
          headers: {
            Authorization: `Bearer ${token.idtoken}`,
          },
        },
      )
      // eslint-disable-next-line consistent-return
      .then(res => {
        setApiCall(false);
        if (res.data) {
          window.location.replace(res.data.urls);
          sessionStorage.clear();
        }
      })
      .catch(err => {
        // err;
        console.log('err', err);
        setApiCall(false);
      });
  };

  return (
    <>
      {props.getOwnerSuccess.message && (
        <div
          className={`"alert fade show mx-auto ${
            props.getOwnerSuccess.success === true
              ? 'alert alert-success'
              : 'alert alert-danger '
          } "`}
          style={{ position: 'revert' }}
        >
          <div>
            <img
              src={
                props.getOwnerSuccess.success === true
                  ? checkedCircle
                  : crossCircle
              }
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />
            {props.getOwnerSuccess.message}
          </div>
          <div
            style={{
              float: 'right',
              fontSize: 'large',
              marginLeft: '10px',
            }}
            onClick={props.handleData}
            className="day-pointer"
            aria-hidden="true"
          >
            &#10006;
          </div>
        </div>
      )}
      <div>
        {showMessage && <p>hello</p>}
        <header className="site-header">
          <div className="custom-container">
            <div className="header_wrapper d-flex align-items-center justify-content-between">
              <div className="logo_wrapper">
                {pathName === '/' ? (
                  <a href>
                    <img src={Headerlogo} alt="" />
                  </a>
                ) : sessionStorage.getItem('manageAdmin') === 'true' ? (
                  <Link to="/home" activeClassName="active">
                    <a href="true">
                      <img src={Headerlogo} alt="" />
                    </a>
                  </Link>
                ) : (
                  <Link to="/workspot" activeClassName="active">
                    <a href="true">
                      <img src={Headerlogo} alt="" />
                    </a>
                  </Link>
                )}
              </div>
              {pathName !==
              `/NeighBorhoodLocation/${neighborData &&
                neighborData.locId}/${neighborData &&
                neighborData.flor}/${neighborData &&
                neighborData.neighborhood}` ? (
                <>
                  {((pathName !== '/' && pathName !== '/auth') ||
                    (props.profileUser &&
                      props.profileUser.isFirstTime === false &&
                      pathName !== '/auth')) && (
                    <div className={`${sidebar && 'show'} main-menu`}>
                      <ul>
                        {sessionStorage.getItem('manageAdmin') === 'true' ? (
                          <>
                            {' '}
                            <li
                              onClick={() => setSidebar(false)}
                              aria-hidden="true"
                            >
                              <Link to="/home" activeClassName="active">
                                <a
                                  className={pathName === '/home' && 'active'}
                                  href="true"
                                >
                                  Home
                                </a>
                              </Link>
                            </li>
                            <li
                              onClick={() => setSidebar(false)}
                              aria-hidden="true"
                            >
                              <Link to="/space" activeClassName="active">
                                <a
                                  className={pathName === '/space' && 'active'}
                                  href="true"
                                >
                                  Spaces
                                </a>
                              </Link>
                            </li>
                            <li
                              onClick={() => setSidebar(false)}
                              aria-hidden="true"
                            >
                              <Link to="/employee" activeClassName="active">
                                <a
                                  className={
                                    pathName === '/employee' && 'active'
                                  }
                                  href="true"
                                >
                                  Employees
                                </a>
                              </Link>
                            </li>
                            <li
                              onClick={() => setSidebar(false)}
                              aria-hidden="true"
                            >
                              <Link to="/officemap" activeClassName="active">
                                <a
                                  className={
                                    pathName === '/officemap' && 'active'
                                  }
                                  href="true"
                                >
                                  Office Maps
                                </a>
                              </Link>
                            </li>
                            <li
                              onClick={() => setSidebar(false)}
                              aria-hidden="true"
                            >
                              <Link to="/assignments" activeClassName="active">
                                <a
                                  className={
                                    pathName === '/assignments' && 'active'
                                  }
                                  href="true"
                                >
                                  Assignments
                                </a>
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li
                              onClick={() => setSidebar(false)}
                              aria-hidden="true"
                            >
                              <Link to="/workspot" activeClassName="active">
                                <a
                                  className={
                                    (pathName === '/workspot' ||
                                      pathName === '/') &&
                                    'active'
                                  }
                                  href="true"
                                >
                                  Home
                                </a>
                              </Link>
                            </li>
                            <li
                              onClick={() => setSidebar(false)}
                              aria-hidden="true"
                            >
                              <Link to="/report" activeClassName="active">
                                <a
                                  className={pathName === '/report' && 'active'}
                                  href="true"
                                >
                                  My Team
                                </a>
                              </Link>
                            </li>
                            <li
                              onClick={() => setSidebar(false)}
                              aria-hidden="true"
                            >
                              <Link to="/office" activeClassName="active">
                                <a
                                  className={pathName === '/office' && 'active'}
                                  href="true"
                                >
                                  Office Maps
                                </a>
                              </Link>
                            </li>
                            <li>
                              {/* <Link to="/faq">
                          <a
                            href="true"
                            className={pathName === '/faq' && 'active'}
                          >
                            Help
                          </a>
                        </Link> */}
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  {neighborData && neighborData.locId === 'DC' ? (
                    <h2 className="heading">DC Office</h2>
                  ) : (
                    ''
                  )}
                  {neighborData && neighborData.locId === 'RIC' ? (
                    <h2 className="heading">Richmond Office</h2>
                  ) : (
                    ''
                  )}
                  {neighborData && neighborData.locId === 'BLM' ? (
                    <h2 className="heading">Bloomington Office</h2>
                  ) : (
                    ''
                  )}
                </div>
              )}
              {pathName !==
                `/NeighBorhoodLocation/${neighborData &&
                  neighborData.locId}/${neighborData &&
                  neighborData.flor}/${neighborData &&
                  neighborData.neighborhood}` && (
                <>
                  {pathName !== '/auth' && (
                    <div className="right-menus" ref={divRef}>
                      {props.profileUserLoading ? (
                        <div className="spinner-border" />
                      ) : (
                        <div
                          aria-hidden="true"
                          onClick={() => setEditProfile(!editProfile)}
                          onHide={() => setEditProfile(false)}
                          className={
                            // eslint-disable-next-line no-nested-ternary
                            props.profileUser &&
                            props.profileUser.isFirstTime === true &&
                            pathName !== '/'
                              ? `username has-dropdown ${editProfile &&
                                  'toggled'}`
                              : props.profileUser &&
                                props.profileUser.isFirstTime === true
                              ? `username ${editProfile && 'toggled'}`
                              : `username has-dropdown ${editProfile &&
                                  'toggled'}`
                          }
                        >
                          <span>
                            {sessionStorage.getItem('manageAdmin') === 'true' &&
                            sessionStorage.getItem('delegate') === 'false' &&
                            sessionStorage.getItem('Admin') === 'false' ? (
                              <>
                                <span style={{ color: '#ED8B00' }}>Admin </span>
                                {props.profileUser &&
                                  props.profileUser.firstname}
                                <img
                                  src={
                                    (props.profileUser &&
                                      props.profileUser.photo) ||
                                    Profile
                                  }
                                  className="user-img"
                                  alt=""
                                />
                              </>
                            ) : sessionStorage.getItem('manageAdmin') ===
                                'true' &&
                              sessionStorage.getItem('delegate') === 'false' &&
                              sessionStorage.getItem('Admin Owner') ===
                                'false' &&
                              sessionStorage.getItem('Admin') === 'true' ? (
                              <>
                                <span style={{ color: '#ED8B00' }}>Admin </span>
                                {props.profileUser &&
                                  props.profileUser.firstname}
                                <img
                                  src={
                                    (props.profileUser &&
                                      props.profileUser.photo) ||
                                    Profile
                                  }
                                  className="user-img"
                                  alt=""
                                />
                              </>
                            ) : sessionStorage.getItem('delegate') === 'true' &&
                              sessionStorage.getItem('Admin Owner') ===
                                'false' &&
                              sessionStorage.getItem('Admin') === 'false' ? (
                              <>
                                {' '}
                                <span>On behalf of </span>
                                {props.profileUser &&
                                  props.profileUser.firstname}{' '}
                                <img
                                  src={
                                    (props.profileUser &&
                                      props.profileUser.photo) ||
                                    Profile
                                  }
                                  className="user-img"
                                  alt=""
                                />
                              </>
                            ) : (
                              <>
                                {props.profileUser &&
                                  props.profileUser.firstname}
                                <img
                                  src={
                                    (props.profileUser &&
                                      props.profileUser.photo) ||
                                    Profile
                                  }
                                  className="user-img"
                                  alt=""
                                />
                              </>
                            )}
                          </span>
                        </div>
                      )}

                      {((props.profileUser &&
                        props.profileUser.isFirstTime === false) ||
                        (props.profileUser &&
                          props.profileUser.isFirstTime === true &&
                          pathName !== '/')) && (
                        <div
                          className={`profile-inner ${editProfile && 'opened'}`}
                        >
                          {/* head template */}
                          {sessionStorage.getItem('manageAdmin') === 'true' &&
                          sessionStorage.getItem('delegate') === 'false' &&
                          sessionStorage.getItem('Admin') === 'false' ? (
                            <div className="head deladmin">
                              <span>Admin Access</span>
                            </div>
                          ) : sessionStorage.getItem('manageAdmin') ===
                              'true' &&
                            sessionStorage.getItem('delegate') === 'false' &&
                            sessionStorage.getItem('Admin') === 'true' ? (
                            <div className="head deladmin">
                              <span>Admin Access</span>
                            </div>
                          ) : sessionStorage.getItem('delegate') === 'true' ? (
                            <div
                              className="head"
                              style={{
                                backgroundColor: '#7FCFCF',
                                color: '#000',
                              }}
                            >
                              <span>On behalf of</span>
                            </div>
                          ) : (
                            <div className="head">
                              <span>Your Account</span>
                            </div>
                          )}

                          {/* profile template */}
                          <div className="profile-popup-main">
                            <img src={Profile} alt="" />
                            <h3>
                              {' '}
                              {props.profileUser.firstname}{' '}
                              {props.profileUser.lastname}
                            </h3>
                            {sessionStorage.getItem('Admin Owner') === 'true' &&
                            props.profileUser &&
                            props.profileUser.role ? (
                              <p
                                style={{
                                  color: '#FF8D62',
                                  fontSize: '16px',
                                  marginBottom: '0px',
                                }}
                                aria-hidden="true"
                                onClick={sessionStorage.setItem(
                                  'Admin Owner',
                                  true,
                                )}
                              >
                                Admin Owner
                              </p>
                            ) : (sessionStorage.getItem('Admin') === 'true' &&
                                props.profileUser &&
                                props.profileUser.role) ||
                              isAdmin ? (
                              <p
                                style={{
                                  color: '#FF8D62',
                                  fontSize: '16px',
                                  marginBottom: '0px',
                                }}
                                aria-hidden="true"
                                onClick={sessionStorage.setItem('Admin', true)}
                              >
                                Admin
                              </p>
                            ) : (
                              <>
                                <p>{props.profileUser.email}</p>

                                <Link
                                  className={
                                    pathName === '/profile' && 'active'
                                  }
                                  to="/profile"
                                  activeClassName="active"
                                >
                                  <button
                                    type="button"
                                    className="w-100 blue-color-btn profile-btn"
                                    onClick={() => {
                                      setIsAdmin(false);
                                      setEditProfile(false);
                                      sessionStorage.setItem('Admin', false);
                                    }}
                                  >
                                    View My Profile
                                  </button>
                                </Link>
                              </>
                            )}
                          </div>

                          {props.profileUser &&
                            props.profileUser.delegateUserList &&
                            props.profileUser.delegateUserList.map(obj => (
                              <>
                                <div
                                  aria-hidden="true"
                                  className="popup-secondary-profile day-pointer"
                                  onClick={() => {
                                    sessionStorage.setItem('delegate', true);
                                    sessionStorage.setItem('Admin', false);
                                    userProfileData(obj.employeeid);
                                    setEditProfile(false);

                                    sessionStorage.setItem('Admin', false);
                                  }}
                                >
                                  <img
                                    src={
                                      (obj && obj.delegateUserPhoto) || Profile
                                    }
                                    alt=""
                                    style={{ marginBottom: '10px' }}
                                  />
                                  <div className="sec-profile-info">
                                    <h4>
                                      {obj && obj.delegateUserFistname}{' '}
                                      {obj && obj.delegateUserLastname}{' '}
                                    </h4>
                                    <span>{obj && obj.delegateUserEmail}</span>
                                  </div>
                                </div>
                              </>
                            ))}
                          {props.profileUser &&
                          props.profileUser.role === 'Admin Owner' &&
                          sessionStorage.getItem('Admin Owner') === 'false' ? (
                            <div
                              aria-hidden="true"
                              className="popup-secondary-profile day-pointer"
                              onClick={() => {
                                setIsAdminOwner(true);
                                setEditProfile(false);
                                sessionStorage.setItem('Admin Owner', true);
                                sessionStorage.setItem('Admin', false);
                                sessionStorage.setItem('manageAdmin', true);
                                history.replace('/home');
                                props.requestUserlistData(
                                  props.profileUser &&
                                    props.profileUser.employeeid,
                                );
                              }}
                            >
                              <img
                                src={
                                  (props.profileUser &&
                                    props.profileUser.photo) ||
                                  Profile
                                }
                                alt=""
                                style={{ marginBottom: '10px' }}
                              />
                              <div className="sec-profile-info">
                                <h4>
                                  {props.profileUser &&
                                    props.profileUser.firstname}{' '}
                                  {props.profileUser &&
                                    props.profileUser.lastname}
                                </h4>
                                <span style={{ color: '#FF8D62' }}>
                                  {props.profileUser && props.profileUser.role}
                                </span>
                              </div>
                            </div>
                          ) : props.profileUser &&
                            props.profileUser.role === 'Admin' &&
                            sessionStorage.getItem('Admin') === 'false' ? (
                            <div
                              aria-hidden="true"
                              className="popup-secondary-profile day-pointer"
                              onClick={() => {
                                setIsAdmin(true);
                                setEditProfile(false);
                                sessionStorage.setItem('Admin', true);
                                sessionStorage.setItem('Admin Owner', false);
                                sessionStorage.setItem('manageAdmin', true);
                                history.replace('/home');
                                props.requestUserlistData(
                                  props.profileUser &&
                                    props.profileUser.employeeid,
                                );
                              }}
                            >
                              <img
                                src={
                                  (props.profileUser &&
                                    props.profileUser.photo) ||
                                  Profile
                                }
                                alt=""
                                style={{ marginBottom: '10px' }}
                              />
                              <div className="sec-profile-info">
                                <h4>
                                  {props.profileUser &&
                                    props.profileUser.firstname}{' '}
                                  {props.profileUser &&
                                    props.profileUser.lastname}
                                </h4>
                                <span style={{ color: '#FF8D62' }}>
                                  {props.profileUser && props.profileUser.role}
                                </span>
                              </div>
                            </div>
                          ) : (
                            (sessionStorage.getItem('empid') ===
                              sessionStorage.getItem('delegateId') ||
                              (props.profileUser &&
                                (props.profileUser.role === 'Admin' ||
                                  props.profileUser.role ===
                                    'Admin Owner'))) && (
                              <div
                                aria-hidden="true"
                                className="popup-secondary-profile day-pointer"
                                onClick={() => {
                                  setEditProfile(false);
                                  setIsAdmin(false);
                                  sessionStorage.setItem('Admin', false);
                                  sessionStorage.setItem('Admin Owner', false);
                                  sessionStorage.setItem('manageAdmin', false);
                                  history.replace('/workspot');
                                  props.requestUserlistData(
                                    props.profileUser &&
                                      props.profileUser.employeeid,
                                  );
                                }}
                              >
                                <img
                                  src={
                                    (props.profileUser &&
                                      props.profileUser.photo) ||
                                    Profile
                                  }
                                  alt=""
                                  style={{ marginBottom: '10px' }}
                                />
                                <div className="sec-profile-info">
                                  <h4>
                                    {props.profileUser &&
                                      props.profileUser.firstname}{' '}
                                    {props.profileUser &&
                                      props.profileUser.lastname}{' '}
                                  </h4>
                                  <span>{props.profileUser.email}</span>
                                </div>
                              </div>
                            )
                          )}
                          {props.profileUser &&
                            props.profileUser.role === 'Admin Owner' && (
                              <div
                                onClick={() => {
                                  props.requestDelegateData({});
                                  setShow(true);
                                }}
                                aria-hidden="true"
                                className="popup-secondary-profile day-pointer"
                              >
                                <img
                                  src={searchicon}
                                  alt=""
                                  style={{
                                    marginBottom: '2px',
                                    background: '#C8E9FF',
                                    objectFit: 'none',
                                  }}
                                  color="blue"
                                />
                                <div className="sec-profile-info">
                                  <h4>Search for User</h4>
                                </div>
                              </div>
                            )}
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
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Search of User
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
                                <div
                                  className="modal-body modal-update"
                                  id="data_update"
                                >
                                  <form
                                    className="delegate-workspot-access"
                                    action="submit"
                                  >
                                    {searchName &&
                                      searchName.map(i => (
                                        <div
                                          aria-hidden="true"
                                          className={`${selectData.includes(
                                            i,
                                          ) && 'checked_item'}  form-group`}
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
                                    Log In
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
                          <a
                            href
                            className="logout day-pointer"
                            onClick={() => {
                              logout();
                              setEditProfile(false);
                            }}
                          >
                            Log Out
                          </a>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setSidebar(!sidebar)}
                        className="mobile-menu-toggler"
                      >
                        <span className={`${sidebar && 'close-btn'}`} />
                        <span className={`${sidebar && 'close-btn'}`} />
                        <span className={`${sidebar && 'close-btn'}`} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </header>
        {pathName !==
          `/NeighBorhoodLocation/${neighborData &&
            neighborData.locId}/${neighborData &&
            neighborData.flor}/${neighborData &&
            neighborData.neighborhood}` && (
          <>
            {props.profileUser &&
              props.profileUser.badgeNumber === '' &&
              !props.badgeUpdateSuccess &&
              (props.profileUser &&
                props.profileUser.isFirstTime === false &&
                !pathName.includes('/profile/delegate') &&
                !pathName.includes('/home') &&
                !pathName.includes('/space') &&
                !pathName.includes('/employee') &&
                !pathName.includes('/officemap') &&
                !pathName.includes('/assignments') &&
                props.profileUser &&
                props.profileUser.badgeNumber === '' && (
                  <div className="badge_check">
                    <img src={BadgeIcon} alt="bicon" />{' '}
                    <span>
                      You don't have a badge associated with your profile
                    </span>
                    {!pathName.includes('/profile') && (
                      <button
                        type="button"
                        className="btn_badge"
                        onClick={() => handleBadgeRedirect()}
                      >
                        {' '}
                        Add My Badge
                      </button>
                    )}
                  </div>
                ))}
          </>
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  const { profile } = state;
  return {
    profile,
    delegateList: profile && profile.delegateList && profile.delegateList,
    profileUser: profile && profile.userList,
    profileUserLoading: profile && profile.loading,
    profileSuccess: profile && profile.success,
    delegateHeaderProfile:
      profile && profile.delegateProfile && profile.delegateProfile.profile,
    delegateHeaderWeek:
      profile &&
      profile.delegateProfile &&
      profile.delegateProfile.weeklydefaults,
    delegateHeaderProfileSuccess:
      profile && profile.delegateProfile && profile.delegateProfile.success,
    badgeUpdateSuccess: profile && profile.badgeUpdate.badgeSuccess,
    getOwnerSuccess: profile && profile.getOwner,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestDelegateProfile: payload =>
      dispatch(requestDelegateProfile(payload)),
    clearData: () => dispatch(clearData()),
    clearAdminOwner: () => dispatch(clearAdminOwner()),
    requestUserlistData: payload => dispatch(requestUserlistData(payload)),
    requestgetAdminOwner: payload => dispatch(requestgetAdminOwner(payload)),
    requestDelegateData: payload => dispatch(requestDelegateData(payload)),

    dispatch,
  };
}

Header.propTypes = {
  profileUser: PropTypes.object,
  profileUserLoading: PropTypes.bool,
  // success: PropTypes.bool,
  getOwnerSuccess: PropTypes.object,
  clearData: PropTypes.func,
  clearAdminOwner: PropTypes.func,
  profileSuccess: PropTypes.bool,
  requestUserlistData: PropTypes.func,
  badgeUpdateSuccess: PropTypes.object,
  delegateList: PropTypes.array,
  requestDelegateProfile: PropTypes.func,
  delegateHeaderProfileSuccess: PropTypes.bool,
  requestgetAdminOwner: PropTypes.func,
  requestDelegateData: PropTypes.array,
  handleData: PropTypes.func,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header);
