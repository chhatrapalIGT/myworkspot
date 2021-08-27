import React, { useState, useRef, useEffect } from 'react';
import '../assets/css/style.scss';
import '../assets/css/style.css';
import Headerlogo from '../assets/images/logo_main.svg';
import Profile from '../assets/images/profileof.png';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const divRef = useRef();

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
              <a href="true">
                <img src={Headerlogo} alt="" />
              </a>
            </div>
            <div className={`${sidebar && 'show'} main-menu`}>
              <ul>
                <li>
                  <a className="active" href="true">
                    Home
                  </a>
                </li>
                <li>
                  <a href="true">My Team</a>
                </li>
                <li>
                  <a href="true">Office Maps</a>
                </li>
                <li>
                  <a href="true">Help</a>
                </li>
              </ul>
            </div>
            <div className="right-menus" ref={divRef}>
              <div
                aria-hidden="true"
                onClick={() => setEditProfile(!editProfile)}
                onHide={() => setEditProfile(false)}
                className={`username has-dropdown ${editProfile && 'toggled'}`}
              >
                <span>Alexander</span>{' '}
                <img src={Profile} className="user-img" alt="" />
              </div>
              <div className={`profile-inner ${editProfile && 'opened'}`}>
                <ul className="profile-menus">
                  <li>
                    <a href="true">Profile</a>
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
