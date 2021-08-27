/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './custom.scss';
import { CloseButton } from 'react-bootstrap';
// import Axios from 'axios';

const WorkSpot = () => {
  const [isModal, setModal] = useState(false);
  const [type, setType] = useState('Remote Work');
  const [value, onChange] = useState(new Date());
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const url = `https://mocki.io/v1/2884f5b8-f4c0-428e-947e-a0aa339ffaa5 `;

  //   Axios.get(url).then(res => {
  //     setData(res.data);

  //     // setSearchName(res.data);
  //   });
  // }, []);

  const onSubmit = () => {
    const payload = {
      date: value.valueText,
      work: type,
    };
    console.log(`payload`, payload);
  };

  return (
    <div className="container wrapper">
      <div>
        <div className="row">
          {/* <Card.Body> */}
          <Card className="col-4">
            <Card.Title>Office Maps</Card.Title>
            <Card.Header>Washington, DC</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>floor 3</ListGroup.Item>
            </ListGroup>

            <Card.Header>Office Resources</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Yellow</ListGroup.Item>
              <ListGroup.Item>Teal</ListGroup.Item>
              <ListGroup.Item>Orange</ListGroup.Item>
              <ListGroup.Item>Blue</ListGroup.Item>
              <ListGroup.Item>Bel-Air</ListGroup.Item>
              <ListGroup.Item>walkervile</ListGroup.Item>
              <ListGroup.Item>Common Room</ListGroup.Item>
              <ListGroup.Item>The Post</ListGroup.Item>
              <ListGroup.Item>AED</ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className="col-8">
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>

            <Button onClick={() => setModal(true)} className="float-right">
              {' '}
              Update My WorkSpot
            </Button>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card content.
            </Card.Text>

            <Modal
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={isModal}
              className="modal"
            >
              <CloseButton onClick={() => setModal(false)} />
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Update My WorkSpot
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form.Group controlId="formBasicSelect">
                  <Form.Control
                    className="dropdown_list"
                    as="select"
                    value={type}
                    onChange={e => {
                      setType(e.target.value);
                    }}
                  >
                    <option value="Washington, DC">Washington, DC</option>
                    <option value="Bloomington, MN">Bloomington, MN</option>
                    <option value="Birmingham, AL">Birmingham, AL</option>
                    <option value="Remote Work">Remote Work</option>
                    <option value="Richmond, VA">Richmond, VA</option>
                    <option value="Paid Time Off">Paid Time Off</option>
                  </Form.Control>
                </Form.Group>

                <div className="calendar">
                  <div className="mb-4 react-calendar">
                    {/* <Datepicker
                      controls={['calendar']}
                      display="inline"
                      onChange={date => {
                        onChange(date);
                      }}
                      selectMultiple={true}
                      selectCounter={true}
                      // marked={[
                      //   {
                      //     date: data && data.date,
                      //     color: '#46c4f3',
                      //     markCssClass: 'square-mark',
                      //   },
                      // ]}
                    /> */}

                    <div className="mt-0 react-calendar">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4 my-auto">
                            <div className="d-flex calendar-footer">
                              <p />
                              <span style={{ fontSize: '12px' }}>
                                Washington, DC
                              </span>
                            </div>
                            <div className="d-flex calendar-footer">
                              <p />
                              <span style={{ fontSize: '12px' }}>
                                Bloomington, MN
                              </span>
                            </div>
                          </div>

                          <div className="col-4 my-auto">
                            <div className="d-flex calendar-footer">
                              <p />
                              <span style={{ fontSize: '12px' }}>
                                Birmingham, AL
                              </span>
                            </div>
                            <div className="d-flex calendar-footer">
                              <p />
                              <span style={{ fontSize: '12px' }}>
                                Remote Work
                              </span>
                            </div>
                          </div>

                          <div className="col-4 my-auto">
                            <div className="d-flex calendar-footer">
                              <p />
                              <span style={{ fontSize: '12px' }}>
                                Richmond, VA
                              </span>
                            </div>
                            <div className="d-flex calendar-footer">
                              <p />
                              <span style={{ fontSize: '12px' }}>
                                Paid Time Off
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p>
                  If you would like to update your weekly default, you can
                  update this under <a href="/profile">My Propfile</a>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => {
                    onSubmit();
                    setModal(false);
                  }}
                >
                  Update
                </Button>
                <Button onClick={() => setModal(false)}>Cancel</Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkSpot;
