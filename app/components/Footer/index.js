import React from 'react';
import footerlogo from '../assets/images/footer-logo.svg';

const Footer = () => (
  <>
    <footer className="site-footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <img src={footerlogo} alt="" />
          </div>
          <div className="col-md-6">
            <p>© 2021 EAB. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
