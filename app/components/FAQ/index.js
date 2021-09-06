import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import './styles.scss';

const FAQ = () => {
  const handlecolor = () => {};
  return (
    <>
      <Header />
      <div className="pt-5 main">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="mar-btm">
                <h5>How can we help you today ?</h5>

                <div className="list-group bg-trans">
                  <a className="list-group-item Faq-content" href>
                    What is my Workspot ?
                  </a>
                  <a className="list-group-item Faq-content" href>
                    How Do i update my weekly default ?
                  </a>
                  <a className="list-group-item Faq-content" href>
                    What is my Workspot ?
                  </a>
                  <a className="list-group-item Faq-content" href>
                    How Do i update my weekly default ?
                  </a>
                  <a className="list-group-item Faq-content" href>
                    What is my Workspot ?
                  </a>
                  <a
                    className="list-group-item Faq-content"
                    href="#last"
                    onClick={handlecolor}
                  >
                    How Do i update my weekly default ?
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="panel border-radius-10">
                <Card>
                  <Card.Body>
                    <h5> What is my Workspot ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Integer posuere erat a ante.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{' '}
                    <Link to="profile" active>
                      <a href="true">View my Profile</a>
                    </Link>
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante. adipiscing elit. Integer
                    posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante. adipiscing elit. Integer
                    posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante. adipiscing elit. Integer
                    posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
                <Card className="mt-3">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante. adipiscing elit. Integer
                    posuere erat a ante. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
                <Card className="mt-3" id="last">
                  <Card.Body>
                    <h5>How Do i update my weekly default ?</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.{' '}
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
