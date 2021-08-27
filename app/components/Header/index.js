import React, { useState } from 'react';
import '../assets/css/style.scss';
import '../assets/css/style.css';
import Headerlogo from '../assets/images/logo_main.svg';
import Profile from '../assets/images/profileof.png';

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  return (
    <div>
      <header className="site-header">
        <div className="container">
          <div className="header_wrapper d-flex align-items-center justify-content-between">
            <div className="logo_wrapper">
              <a href>
                <img src={Headerlogo} alt="" />
              </a>
            </div>
            <div className={`${sidebar && 'show'} main-menu`}>
              <ul>
                <li>
                  <a className="active" href="./">
                    Home
                  </a>
                </li>
                <li>
                  <a href="./MyTeam.html">My Team</a>
                </li>
                <li>
                  <a href>Office Maps</a>
                </li>
                <li>
                  <a href>Help</a>
                </li>
              </ul>
            </div>
            <div className="right-menus">
              <div
                aria-hidden="true"
                onClick={() => setEditProfile(!editProfile)}
                className={`username has-dropdown ${editProfile && 'toggled'}`}
              >
                <span>Alexander</span>{' '}
                <img src={Profile} className="user-img" alt="" />
              </div>
              <div className={`profile-inner ${editProfile && 'opened'}`}>
                <ul className="profile-menus">
                  <li>
                    <a href="/profilepage.html">Profile</a>
                  </li>
                  <li>
                    <a href>Options</a>
                  </li>
                  <li>
                    <a href>Change password</a>
                  </li>
                  <li>
                    <a href>Logout</a>
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
