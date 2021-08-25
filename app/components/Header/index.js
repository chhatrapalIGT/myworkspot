import React from 'react';
import '../assets/css/style.scss';
import Headerlogo from '../assets/images/logo_main.svg';

const Header = () => (
  <div>
    <header className="site-header">
      <div className="container">
        <div className="header_wrapper d-flex align-items-center justify-content-between">
          <div className="logo_wrapper">
            <a href>
              <img src={Headerlogo} alt="" />
            </a>
          </div>
          <div className="main-menu">
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
            <div className="username has-dropdown">
              <span>Alexander</span>{' '}
              <img src="./images/profileof.png" className="user-img" alt="" />
            </div>
            <div className="profile-inner">
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
            <button type="button" className="mobile-menu-toggler">
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  </div>
);

export default Header;
