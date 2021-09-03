import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/style.scss';
import '../assets/css/style.css';
import { Link, useLocation } from 'react-router-dom';
import Headerlogo from '../assets/images/logo_main.svg';
import Profile from '../assets/images/profileof.png';

const Header = () => {
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
              <Link to="/" activeClassName="active">
                <a href="true">
                  <img src={Headerlogo} alt="" />
                </a>
              </Link>
            </div>
            {pathName !== '/' && (
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
                    <Link to="/workspot">
                      <a
                        className={pathName === '/workspot' && 'active'}
                        href="true"
                      >
                        Office Maps With Header
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" activeClassName="active">
                      <a href="true">Help</a>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <div className="right-menus" ref={divRef}>
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
                <span>Alexander</span>{' '}
                <img src={Profile} className="user-img" alt="" />
              </div>
              {pathName !== '/' && (
                <div className={`profile-inner ${editProfile && 'opened'}`}>
                  <ul className="profile-menus">
                    <li>
                      <Link to="/profile" activeClassName="active">
                        <a
                          className={pathName === '/profile' && 'active'}
                          href="true"
                        >
                          Profile
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a href="true">Options</a>
                    </li>
                    <li>
                      <a href="true">Change password</a>
                    </li>
                    <li>
                      <a href="true">Logout</a>
                    </li>
                  </ul>
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
    </div>
  );
};

export default Header;
