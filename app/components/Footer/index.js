import React from 'react';
import footerlogo from '../assets/images/footer-logo.svg';

const year = new Date().getFullYear();
const Footer = () => (
  <>
    <footer className="site-footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <img src={footerlogo} alt="" />
          </div>
          <div className="col-md-6">
            <p>© {year} EAB. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
