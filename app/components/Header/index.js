/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/style.scss';
import '../assets/css/style.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Headerlogo from '../assets/images/logo_mains.svg';
import Profile from '../assets/images/profileof.png';
import {
  requestUserlistData,
  clearData,
  requestDelegateProfile,
} from '../../containers/ProfilePage/actions';
import BadgeIcon from '../../images/badgeIcon.png';

const Header = props => {
  const [sidebar, setSidebar] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
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

  return (
    <div>
      <header className="site-header">
        <div className="container">
          <div className="header_wrapper d-flex align-items-center justify-content-between">
            <div className="logo_wrapper">
              {pathName === '/board' ? (
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
            {pathName !== '/board' && (
              <div className={`${sidebar && 'show'} main-menu`}>
                <ul>
                  <li>
                    <Link to="/" activeClassName="active">
                      <a className={pathName === '/' && 'active'} href="true">
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
                    <Link to="/board">
                      <a
                        className={pathName === '/board' && 'active'}
                        href="true"
                      >
                        OnBoarding
                      </a>
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/faq">
                      <a
                        href="true"
                        className={pathName === '/faq' && 'active'}
                      >
                        Help
                      </a>
                    </Link>
                  </li> */}
                </ul>
              </div>
            )}

            <div className="right-menus" ref={divRef}>
              {pathName !== '/board' &&
              pathName.includes('/profile/delegate') ? (
                <div
                  aria-hidden="true"
                  onClick={() => setEditProfile(!editProfile)}
                  onHide={() => setEditProfile(false)}
                  className={
                    pathName === '/board'
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
                    src={props.profileUser.photo || Profile}
                    className="user-img"
                    alt=""
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  onClick={() => setEditProfile(!editProfile)}
                  onHide={() => setEditProfile(false)}
                  className={
                    pathName === '/board'
                      ? `username ${editProfile && 'toggled'}`
                      : `username has-dropdown ${editProfile && 'toggled'}`
                  }
                >
                  <span>
                    {props.profileUser && props.profileUser.firstname}
                  </span>{' '}
                  <img
                    src={props.profileUser.photo || Profile}
                    className="user-img"
                    alt=""
                  />
                </div>
              )}
              {/* /* delegate profile */}
              {pathName !== '/board' &&
              pathName.includes('/profile/delegate') ? (
                <div className={`profile-inner ${editProfile && 'opened'}`}>
                  <div className="head del">
                    <span style={{ color: '#ed8b00' }}>On behalf of</span>
                  </div>
                  <div className="profile-popup-main">
                    <img src={Profile} alt="" />
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
                      >
                        View My Profile
                      </button>
                    </Link>
                  </div>
                  <div
                    aria-hidden="true"
                    className="popup-secondary-profile"
                    // onClick={() => userProfileData(obj.employeeid)}
                  >
                    <img src={props.profileUser.photo || Profile} alt="" />
                    <div className="sec-profile-info">
                      <h4>
                        {props.profileUser.firstname}{' '}
                        {props.profileUser.lastname}{' '}
                      </h4>
                      <span>{props.profileUser.email}</span>
                      <br />
                      You
                    </div>
                  </div>
                  {userList.map(obj => (
                    <div
                      aria-hidden="true"
                      className="popup-secondary-profile"
                      onClick={() => userProfileData(obj.employeeid)}
                    >
                      <img src={obj.delegateUserPhoto || Profile} alt="" />
                      <div className="sec-profile-info">
                        <h4>
                          {obj.delegateUserFistname} {obj.delegateUserLastname}{' '}
                        </h4>
                        <span>{obj.delegateUserEmail}</span>
                      </div>
                    </div>
                  ))}
                  <a href className="logout">
                    Log Out
                  </a>
                </div>
              ) : (
                pathName !== '/board' && (
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
                          className="popup-secondary-profile"
                          onClick={() => userProfileData(obj.employeeid)}
                        >
                          <img src={obj.delegateUserPhoto || Profile} alt="" />
                          <div className="sec-profile-info">
                            <h4>
                              {obj.delegateUserFistname}{' '}
                              {obj.delegateUserLastname}{' '}
                            </h4>
                            <span>{obj.delegateUserEmail}</span>
                          </div>
                        </div>
                      ))}
                    <a href className="logout">
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
          </div>
        </div>
      </header>
      {pathName !== '/board' &&
        !pathName.includes('/profile/delegate') &&
        (props.profileUser && props.profileUser.badgeNumber === '' && (
          <div className="badge_check">
            <img src={BadgeIcon} alt="bicon" /> You don't have a badge
            associated with your profile{' '}
            {pathName !== '/profile' && (
              <Link to="/profile">
                <button type="button" className="btn_badge">
                  {' '}
                  Add My Badge
                </button>
              </Link>
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
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestUserlistData: payload => dispatch(requestUserlistData(payload)),
    requestDelegateProfile: payload =>
      dispatch(requestDelegateProfile(payload)),
    clearData: () => dispatch(clearData()),
    dispatch,
  };
}

Header.propTypes = {
  profileUser: PropTypes.object,
  requestUserlistData: PropTypes.func,
  delegateHeaderProfile: PropTypes.object,
  clearData: PropTypes.func,
  profileSuccess: PropTypes.bool,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header);
