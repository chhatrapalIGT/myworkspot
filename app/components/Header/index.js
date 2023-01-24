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
import Headerlogo from '../assets/images/logo_mains.svg';
import Profile from '../assets/images/profileof.png';
import {
  clearData,
  requestDelegateProfile,
  requestUserlistData,
} from '../../containers/ProfilePage/actions';
import BadgeIcon from '../../images/badgeIcon.png';

import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

const Header = props => {
  // eslint-disable-next-line no-unused-vars
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
  useEffect(() => {
    if (!defaultapick) {
      props.requestUserlistData({
        empdelegatedata: sessionStorage.getItem('delegateId'),
      });
      setDefaultapick(true);
    }

    const getAdmin = sessionStorage.getItem('Admin');
    const getDelegate = sessionStorage.getItem('delegate');
    const empId = sessionStorage.getItem('empid');
    !getAdmin && sessionStorage.setItem('Admin', false);
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
    <div>
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
                                className={pathName === '/employee' && 'active'}
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
                              {props.profileUser && props.profileUser.firstname}
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
                            sessionStorage.getItem('Admin_Owner') === 'false' &&
                            sessionStorage.getItem('Admin') === 'true' ? (
                            <>
                              <span style={{ color: '#ED8B00' }}>Admin </span>
                              {props.profileUser && props.profileUser.firstname}
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
                            sessionStorage.getItem('Admin_Owner') === 'false' &&
                            sessionStorage.getItem('Admin') === 'false' ? (
                            <>
                              {' '}
                              <span style={{ color: '#ed8b00' }}>
                                On behalf of{' '}
                              </span>
                              {props.profileUser && props.profileUser.firstname}{' '}
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
                              {props.profileUser && props.profileUser.firstname}
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
                            <span style={{ color: '#FF8D62' }}>
                              Admin Access
                            </span>
                          </div>
                        ) : sessionStorage.getItem('manageAdmin') === 'true' &&
                          sessionStorage.getItem('delegate') === 'false' &&
                          sessionStorage.getItem('Admin') === 'true' ? (
                          <div className="head deladmin">
                            <span style={{ color: '#FF8D62' }}>
                              Admin Access
                            </span>
                          </div>
                        ) : sessionStorage.getItem('delegate') === 'true' ? (
                          <div className="head del">
                            <span style={{ color: '#ed8b00' }}>
                              On behalf of
                            </span>
                          </div>
                        ) : (
                          <div className="head">
                            <span>This is your account</span>
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
                          {sessionStorage.getItem('Admin_Owner') === 'true' &&
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
                                'Admin_Owner',
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
                                className={pathName === '/profile' && 'active'}
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
                        props.profileUser.role === 'Admin_Owner' &&
                        sessionStorage.getItem('Admin_Owner') === 'false' ? (
                          <div
                            aria-hidden="true"
                            className="popup-secondary-profile day-pointer"
                            onClick={() => {
                              setIsAdminOwner(true);
                              setEditProfile(false);
                              sessionStorage.setItem('Admin_Owner', true);
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
                              sessionStorage.setItem('Admin_Owner', false);
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
                                props.profileUser.role === 'Admin_Owner'))) && (
                            <div
                              aria-hidden="true"
                              className="popup-secondary-profile day-pointer"
                              onClick={() => {
                                setEditProfile(false);
                                setIsAdmin(false);
                                sessionStorage.setItem('Admin', false);
                                sessionStorage.setItem('Admin_Owner', false);
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

                        {/* logout template */}
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
          neighborData.flor}/${neighborData && neighborData.neighborhood}` && (
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
  );
};

const mapStateToProps = state => {
  const { profile } = state;
  return {
    profile,
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
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestDelegateProfile: payload =>
      dispatch(requestDelegateProfile(payload)),
    clearData: () => dispatch(clearData()),
    requestUserlistData: payload => dispatch(requestUserlistData(payload)),

    dispatch,
  };
}

Header.propTypes = {
  profileUser: PropTypes.object,
  profileUserLoading: PropTypes.bool,
  clearData: PropTypes.func,
  profileSuccess: PropTypes.bool,
  requestUserlistData: PropTypes.func,
  badgeUpdateSuccess: PropTypes.object,
  requestDelegateProfile: PropTypes.func,
  delegateHeaderProfileSuccess: PropTypes.bool,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header);
