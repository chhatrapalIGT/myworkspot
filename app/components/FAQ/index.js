import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import './styles.scss';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

const FAQ = () => {
  const [helpData, setHelpData] = useState();
  const handlecolor = () => {};

  const requestGetData = () => {
    const url = `${API_URL}/Help/GetData`;
    Axios.get(url, {
      withCredentials: true,
    }).then(res => {
      setHelpData(res.data.locationdata);
    });
  };

  useEffect(() => {
    requestGetData();
  }, []);
  return (
    <>
      <div
        id="content-wrap"
        style={{
          backgroundColor: '#dde7fa4f',
        }}
      >
        <Header />
        <div className="wrapper_main pb-4">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="mar-btm">
                  <h5>How can we help you today ?</h5>
                  {helpData &&
                    helpData.map(obj => (
                      <div className="list-group bg-trans">
                        <a
                          className="list-group-item Faq-content"
                          href={`#${obj.id}`}
                          onClick={handlecolor}
                        >
                          {obj.topic}
                        </a>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-md-9">
                <div className="panel border-radius-10">
                  {helpData &&
                    helpData.map(data => (
                      <Card className="mt-3" id={data.id}>
                        <Card.Body>
                          <h5>{data.topic}</h5>
                          {data.longdesc}
                        </Card.Body>
                      </Card>
                    ))}
                </div>
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
