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
  const divRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const [userList, setUserList] = useState(
    props.profileUser.delegateUserList || [],
  );
  const pathName = location.pathname;
  let url = pathName.split('/');
  url = url[url.length - 1];
  useEffect(() => {
    props.requestUserlistData();
  }, []);
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

  const userProfileData = id => {
    const delPro = props.profileUser.delegateUserList.filter(
      i => i.employeeid.toString() !== id.toString(),
    );
    setUserList(delPro);
    history.push(`/profile/delegate/${id}`);
  };

  const handleBadgeRedirect = () => {
    history.push(`/profile`, { badge: true });
  };

  const logout = () => {
    console.log('callllllllll');
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
        <div className="container">
          <div className="header_wrapper d-flex align-items-center justify-content-between">
            <div className="logo_wrapper">
              {pathName === '/' ? (
                <a href>
                  <img src={Headerlogo} alt="" />
                </a>
              ) : (
                <Link to="/" activeClassName="active">
                  <a href="true">
                    <img src={Headerlogo} alt="" />
                  </a>
                </Link>
              )}
            </div>
            {((pathName !== '/' && pathName !== '/auth') ||
              (props.profileUser &&
                props.profileUser.isFirstTime === false &&
                pathName !== '/auth')) && (
              <div className={`${sidebar && 'show'} main-menu`}>
                <ul>
                  {!isAdmin ? (
                    <>
                      <li>
                        <Link to="/workspot" activeClassName="active">
                          <a
                            className={
                              (pathName === '/workspot' || pathName === '/') &&
                              'active'
                            }
                            href="true"
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/report" activeClassName="active">
                          <a
                            className={pathName === '/report' && 'active'}
                            href="true"
                          >
                            My Team
                          </a>
                        </Link>
                      </li>
                      <li>
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
                        <Link to="/faq">
                          <a
                            href="true"
                            className={pathName === '/faq' && 'active'}
                          >
                            Help
                          </a>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      {' '}
                      <li>
                        <Link to="/home" activeClassName="active">
                          <a
                            className={pathName === '/home' && 'active'}
                            href="true"
                          >
                            Home
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/space" activeClassName="active">
                          <a
                            className={pathName === '/space' && 'active'}
                            href="true"
                          >
                            Spaces
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/employee" activeClassName="active">
                          <a
                            className={pathName === '/employee' && 'active'}
                            href="true"
                          >
                            Employees
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link to="/officemap" activeClassName="active">
                          <a
                            className={pathName === '/officemap' && 'active'}
                            href="true"
                          >
                            Office Maps
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}

            {pathName !== '/auth' && (
              <div className="right-menus" ref={divRef}>
                {pathName !== '/' && pathName.includes('/profile/delegate') ? (
                  <div
                    aria-hidden="true"
                    onClick={() => setEditProfile(!editProfile)}
                    onHide={() => setEditProfile(false)}
                    className={
                      pathName === '/'
                        ? `username ${editProfile && 'toggled'}`
                        : `username has-dropdown ${editProfile && 'toggled'}`
                    }
                  >
                    <span style={{ color: '#ed8b00' }}>
                      On behalf of{' '}
                      <span>
                        {props.delegateHeaderProfile &&
                          props.delegateHeaderProfile.firstname}
                      </span>
                    </span>{' '}
                    <img
                      src={
                        (props.profileUser && props.profileUser.photo) ||
                        Profile
                      }
                      className="user-img"
                      alt=""
                    />
                  </div>
                ) : (
                  !props.profileUserLoading && (
                    <div
                      aria-hidden="true"
                      onClick={() => setEditProfile(!editProfile)}
                      onHide={() => setEditProfile(false)}
                      className={
                        // eslint-disable-next-line no-nested-ternary
                        props.profileUser &&
                        props.profileUser.isFirstTime === true &&
                        pathName !== '/'
                          ? `username has-dropdown ${editProfile && 'toggled'}`
                          : props.profileUser &&
                            props.profileUser.isFirstTime === true
                          ? `username ${editProfile && 'toggled'}`
                          : `username has-dropdown ${editProfile && 'toggled'}`
                      }
                    >
                      <span>
                        {isAdmin && (
                          <span style={{ color: '#ED8B00' }}> Admin </span>
                        )}
                        {props.profileUser && props.profileUser.firstname}
                      </span>{' '}
                      <img
                        src={
                          (props.profileUser && props.profileUser.photo) ||
                          Profile
                        }
                        className="user-img"
                        alt=""
                      />
                    </div>
                  )
                )}
                {pathName !== '/' && pathName.includes('/profile/delegate') ? (
                  <div className={`profile-inner ${editProfile && 'opened'}`}>
                    <div className="head del">
                      <span style={{ color: '#ed8b00' }}>On behalf of</span>
                    </div>
                    <div className="profile-popup-main">
                      <img
                        src={
                          (props.delegateHeaderProfile &&
                            props.delegateHeaderProfile.photo) ||
                          Profile
                        }
                        alt=""
                      />
                      <h3>
                        {' '}
                        {props.delegateHeaderProfile &&
                          props.delegateHeaderProfile.firstname}{' '}
                        {props.delegateHeaderProfile &&
                          props.delegateHeaderProfile.lastname}
                        {/* {props.profileUser.firstname} {props.profileUser.lastname} */}
                      </h3>
                      <p>
                        {props.delegateHeaderProfile &&
                          props.delegateHeaderProfile.email}
                      </p>
                      <Link
                        className={pathName === '/profile' && 'active'}
                        to="/profile"
                        activeClassName="active"
                      >
                        <button
                          type="button"
                          className="w-100 blue-color-btn profile-btn"
                          onClick={() => {
                            setEditProfile(false);
                            setIsAdmin(false);
                          }}
                        >
                          View Profile
                        </button>
                      </Link>
                    </div>
                    <Link to="/profile">
                      <div
                        aria-hidden="true"
                        className="popup-secondary-profile"
                        onClick={() => setEditProfile(false)}
                      >
                        <img
                          src={
                            (props.profileUser && props.profileUser.photo) ||
                            Profile
                          }
                          alt=""
                          style={{ marginBottom: '30px' }}
                        />
                        <div className="sec-profile-info">
                          <h4>
                            {props.profileUser && props.profileUser.firstname}{' '}
                            {props.profileUser && props.profileUser.lastname}{' '}
                          </h4>
                          <span>{props.profileUser.email}</span>
                          <br />
                          <span>You</span>
                        </div>
                      </div>
                    </Link>
                    {userList.map(obj => (
                      <div
                        aria-hidden="true"
                        className="popup-secondary-profile"
                        onClick={() => userProfileData(obj.employeeid)}
                      >
                        <img
                          src={(obj && obj.delegateUserPhoto) || Profile}
                          alt=""
                        />
                        <div className="sec-profile-info">
                          <h4>
                            {obj && obj.delegateUserFistname}{' '}
                            {obj && obj.delegateUserLastname}{' '}
                          </h4>
                          <span>{obj && obj.delegateUserEmail}</span>
                        </div>
                      </div>
                    ))}
                    <a
                      href
                      className="logout day-pointer"
                      onClick={() => logout()}
                    >
                      Log Out
                    </a>
                  </div>
                ) : (
                  ((props.profileUser &&
                    props.profileUser.isFirstTime === false) ||
                    (props.profileUser &&
                      props.profileUser.isFirstTime === true &&
                      pathName !== '/')) && (
                    <div className={`profile-inner ${editProfile && 'opened'}`}>
                      <div className="head">
                        <span>This is your account</span>
                      </div>
                      <div className="profile-popup-main">
                        <img src={Profile} alt="" />
                        <h3>
                          {' '}
                          {props.profileUser.firstname}{' '}
                          {props.profileUser.lastname}
                        </h3>
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
                            }}
                          >
                            View My Profile
                          </button>
                        </Link>
                      </div>
                      {props.profileUser &&
                        props.profileUser.delegateUserList &&
                        props.profileUser.delegateUserList.map(obj => (
                          <div
                            aria-hidden="true"
                            className="popup-secondary-profile day-pointer"
                            onClick={() => {
                              userProfileData(obj.employeeid);
                              setEditProfile(false);
                            }}
                          >
                            <img
                              src={(obj && obj.delegateUserPhoto) || Profile}
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
                        ))}
                      {props.profileUser && props.profileUser.role === 'Admin' && (
                        <div
                          aria-hidden="true"
                          className="popup-secondary-profile day-pointer"
                          onClick={() => {
                            // userProfileData(obj.employeeid);
                            setIsAdmin(true);
                          }}
                        >
                          <img
                            src={
                              (props.profileUser && props.profileUser.photo) ||
                              Profile
                            }
                            alt=""
                            style={{ marginBottom: '10px' }}
                          />
                          <div className="sec-profile-info">
                            <h4>
                              {props.profileUser && props.profileUser.firstname}{' '}
                              {props.profileUser && props.profileUser.lastname}
                            </h4>
                            <span style={{ color: '#FF8D62' }}>
                              {props.profileUser && props.profileUser.role}
                            </span>
                          </div>
                        </div>
                      )}
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
                  )
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
          </div>
        </div>
      </header>
      {props.profileUser &&
        props.profileUser.badgeNumber === '' &&
        !props.badgeUpdateSuccess &&
        (props.profileUser &&
          props.profileUser.isFirstTime === false &&
          !pathName.includes('/profile/delegate') &&
          props.profileUser &&
          props.profileUser.badgeNumber === '' && (
            <div className="badge_check">
              <img src={BadgeIcon} alt="bicon" />{' '}
              <span>You don't have a badge associated with your profile</span>
              {pathName !== '/profile' && (
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
    </div>
  );
};

const mapStateToProps = state => {
  const { profile } = state;
  return {
    profile,
    profileUser: profile && profile.userList && profile.userList.user,
    profileUserLoading: profile && profile.userList && profile.userList.loading,
    profileSuccess: profile && profile.userList && profile.userList.success,
    delegateHeaderProfile:
      profile &&
      profile.delegateProfile &&
      profile.delegateProfile.delegateProfileList &&
      profile.delegateProfile.delegateProfileList.profile,
    delegateHeaderWeek:
      profile &&
      profile.delegateProfile &&
      profile.delegateProfile.delegateProfileList &&
      profile.delegateProfile.delegateProfileList.weeklydefaults,
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
  delegateHeaderProfile: PropTypes.object,
  clearData: PropTypes.func,
  profileSuccess: PropTypes.bool,
  requestUserlistData: PropTypes.func,
  badgeUpdateSuccess: PropTypes.object,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header);
