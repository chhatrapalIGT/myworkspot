/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/style.scss';
import '../assets/css/style.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Headerlogo from '../assets/images/logo_mains.svg';
import Profile from '../assets/images/profileof.png';
import { requestUserlistData } from '../../containers/ProfilePage/actions';

const Header = props => {
  const [sidebar, setSidebar] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [visible, setVisible] = useState(true);
  const divRef = useRef();
  const location = useLocation();
  const pathName = location.pathname;
  useEffect(() => {
    if (visible) {
      props.requestUserlistData();
      setVisible(false);
    }
    if (visible) {
      props.requestUserlistData();
      setVisible(false);
    }
    document.addEventListener('mousedown', handleClickOutside, false);
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });
  const handleClickOutside = event => {
    if (divRef && divRef.current && !divRef.current.contains(event.target)) {
      setEditProfile(false);
    }
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
                <span>{props.profileUser && props.profileUser.firstname}</span>{' '}
                <img
                  src={props.profileUser.photo || Profile}
                  className="user-img"
                  alt=""
                />
              </div>
              {pathName !== '/board' && (
                <div className={`profile-inner ${editProfile && 'opened'}`}>
                  <div className="head">
                    <span>This is your account</span>
                  </div>
                  <div className="profile-popup-main">
                    <img src={Profile} alt="" />
                    <h3>
                      {' '}
                      {props.profileUser.firstname} {props.profileUser.lastname}
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
                  <div className="popup-secondary-profile">
                    <img src={Profile} alt="" />
                    <div className="sec-profile-info">
                      <h4>Jane Cooper</h4>
                      <span>janeсooper@eab.com</span>
                    </div>
                  </div>
                  <a href className="logout">
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
          </div>
        </div>
      </header>
      {props.profileUser && props.profileUser.badgeNumber === '' && (
        <div className="badge_check">
          You don't have a badge associated with your profile{' '}
          <Link to="/profile">
            <button type="button" className="btn_badge">
              {' '}
              Add My Badge
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  const { profile } = state;
  return {
    profile,
    profileUser: profile && profile.userList && profile.userList.user,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestUserlistData: payload => dispatch(requestUserlistData(payload)),
    dispatch,
  };
}

Header.propTypes = {
  profileUser: PropTypes.object,
  requestUserlistData: PropTypes.func,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header);
