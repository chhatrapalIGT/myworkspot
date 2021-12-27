import React from 'react';
import footerlogo from '../assets/images/footer-logo.svg';
import logo from '../../images/question.svg';

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
            <p>
              © {year} EAB. All Rights Reserved{' '}
              <a
                style={{ textDecoration: 'underline' }}
                target="_blank"
                className="w-50 stroke-2 mt-3"
                href="https://help.myeab.com/support/solutions/articles/8000081520"
              >
                <img
                  src={logo}
                  alt="warn"
                  style={{ height: '15px' }}
                  className="question"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
