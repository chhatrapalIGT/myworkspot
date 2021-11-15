/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import { useHistory } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import './styles.scss';
import { CONSTANT } from '../../enum';
import crossCircle from '../../images/x-circle-fill.svg';

const { API_URL } = CONSTANT;

const FAQ = () => {
  const [helpData, setHelpData] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const requestGetData = () => {
    let token = sessionStorage.getItem('AccessToken');
    token = JSON.parse(token);
    const url = `${API_URL}/help/getHelpData`;
    Axios.get(url, {
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    })
      .then(res => {
        setHelpData(res.data.locationdata);
      })
      .catch(err => {
        if (err.response.status === 403) {
          sessionStorage.clear();
          history.push('/auth');
        }
        setError(err.response.data.message);
      });
  };

  const htmlDecode = content => {
    const e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  };

  useEffect(() => {
    if (!helpData) {
      requestGetData();
    }
  }, []);
  return (
    <>
      {error && error && (
        <div className="alert fade alert alert-danger show mx-auto">
          <div>
            <img
              src={crossCircle}
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />

            {error}
          </div>
          <div
            style={{ float: 'right', fontSize: 'large', marginLeft: '10px' }}
            onClick={() => setError('')}
            aria-hidden="true"
            className="day-pointer"
          >
            &#10006;
          </div>
        </div>
      )}

      {!helpData ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
        <>
          <div
            // id="content-wrap"
            style={{
              backgroundColor: '#dde7fa4f',
            }}
          >
            <div className="wrapper_main _faq">
              <div className="container">
                <div className="row">
                  <div
                    className="col-md-3"
                    style={{ maxHeight: '80vh', overflow: 'scroll' }}
                  >
                    <div className="mar-btm">
                      <h5>How can we help you today ?</h5>
                      {helpData &&
                        helpData.map(obj => (
                          <div className="list-group bg-trans">
                            <a
                              key={obj.id}
                              className="list-group-item Faq-content"
                              href={`#${obj.id}`}
                              dangerouslySetInnerHTML={{
                                __html: htmlDecode(obj.topic),
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    className="col-md-9"
                    style={{ maxHeight: '80vh', overflow: 'scroll' }}
                  >
                    <div className="panel border-radius-10">
                      {helpData &&
                        helpData.map(data => (
                          <Card className="mt-3" id={data.id} key={data.id}>
                            <Card.Body>
                              <h5
                                dangerouslySetInnerHTML={{
                                  __html: htmlDecode(data.topic),
                                }}
                              />

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: htmlDecode(
                                    data.shortdesc === ''
                                      ? data.longdesc
                                      : data.shortdesc,
                                  ),
                                }}
                              />
                            </Card.Body>
                          </Card>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FAQ;
