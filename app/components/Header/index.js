import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/style.scss';
import '../assets/css/style.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import { Link, useLocation } from 'react-router-dom';
import Headerlogo from '../assets/images/logo_mains.svg';
import Profile from '../assets/images/profileof.png';
import reducer from '../../containers/ProfilePage/reducer';

const Header = props => {
  const [sidebar, setSidebar] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const divRef = useRef();
  const location = useLocation();
  const pathName = location.pathname;
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
              <div className={`profile-inner ${editProfile && 'opened'}`}>
                <div className="head">
                  <span>This is your account</span>
                </div>
                <div className="profile-popup-main">
                  <img src={Profile} alt="" />
                  <h3>
                    {props.profileUser && props.profileUser.firstname}{' '}
                    {props.profileUser && props.profileUser.lastname}
                  </h3>
                  <p>{props.profileUser && props.profileUser.email}</p>
                  <Link
                    className={pathName === '/profile' && 'active'}
                    to="/profile"
                    activeClassName="active"
                  >
                    <button type="button" className="w-100 blue-color-btn">
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
                  Log out
                </a>
              </div>

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

const withReducer = injectReducer({ key: 'profile', reducer });

Header.propTypes = {
  profileUser: PropTypes.object,
};

export default compose(
  withReducer,
  //   withSaga,
  connect(
    mapStateToProps,
    null,
  ),
)(Header);
