import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import './styles.scss';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

const FAQ = () => {
  const [helpData, setHelpData] = useState();
  const [error, setError] = useState();

  const handlecolor = () => {};

  const requestGetData = () => {
    let token = sessionStorage.getItem('AccessToken');
    token = JSON.parse(token);
    const url = `${API_URL}/Help/GetData`;
    Axios.get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    })
      .then(res => {
        setHelpData(res.data.locationdata);
      })
      .catch(err => {
        setError(err.response.data.message);
      });
  };

  // const htmlDecode = content => {
  //   const e = document.createElement('div');
  //   e.innerHTML = content;
  //   return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  // };

  useEffect(() => {
    if (!helpData) {
      requestGetData();
    }
  }, []);
  return (
    <>
      {error && error && (
        <div
          className="popup_err alert-dismissible fade show popup_err"
          role="alert"
        >
          <p className="text-center m-auto">{error}</p>
        </div>
      )}

      {!helpData ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
        <>
          <div
            id="content-wrap"
            style={{
              backgroundColor: '#dde7fa4f',
            }}
          >
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
                            <Card.Body
                            // dangerouslySetInnerHTML={{
                            //   __html: htmlDecode(data.shortdesc),
                            // }}
                            >
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
        </>
      )}
    </>
  );
};

export default FAQ;
