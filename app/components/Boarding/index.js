import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Container, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';
import '../FAQ/styles.scss';
import Axios from 'axios';

const Boarding = ({
  handleButtonData,
  state,
  handleCheckbox,
  handleUserSelect,
  handleSubmit,
}) => {
  const [show, setShow] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState(false);
  const [searchName, setSearchName] = useState([]);
  const [allUser, setAllUser] = useState([]);

  const handleChange = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);
      newList = allUser.filter(({ name }) => {
        const finalDataList = name.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return finalDataList.includes(filter);
      });
    } else {
      setSearch(false);
      newList = allUser;
    }
    setSearchName(newList);
  };

  useEffect(() => {
    const url = `https://mocki.io/v1/0a505005-9da4-44c7-9000-0447e1dd3fb2`;
    Axios.get(url, {}).then(res => {
      setAllUser(res.data);
      setSearchName(res.data);
    });
  }, []);

  return (
    <Container>
      <div className="m-4">
        <h3> Hello User </h3>
      </div>
      <div className="card m-4">
        <div className="card-body">
          <div className="row">
            <div className="mb-4">
              <div className="m-4">
                <h3> Weekly Default </h3>
                <p>
                  Hello this is weekly default ... Hello this is weekly default
                  ... Hello this is weekly default
                </p>
              </div>
              <hr className="solid" />
            </div>
            <div className="card-group">
              {state.timings.map(t => (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{t.day.toUpperCase()}</h5>
                    <Button
                      className="set_icon fa fa-plus-square "
                      id="day"
                      value={t.day}
                      onClick={() => {
                        handleButtonData(t.day);
                        setShow(true);
                      }}
                    />
                    <br />
                    {(t && t.name && t.name) || (
                      <p style={{ marginLeft: '20%', marginTop: '10px' }}>
                        To Schedule
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Modal
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              onHide={() => setShow(false)}
            >
              <Modal.Header closeIcon>
                <Modal.Title id="contained-modal-title-vcenter">
                  Set {state.selectedDay.toUpperCase()} Schedule
                  <h6>Choose Your Place</h6>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  onChange={handleChange}
                  className="mb-3"
                />
                <ListGroup>
                  {searchName &&
                    searchName.map(i => (
                      <ListGroup.Item
                        onClick={() => handleUserSelect(i.name)}
                        value={i.name}
                        key={i}
                        className="fa fa-building"
                      >
                        {' '}
                        {i.name}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
                <p>Remote work</p>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    onClick={() => handleCheckbox()}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>Apply to all days of the week</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>Private space requested</label>
                </div>
              </Modal.Body>
              <Modal.Footer className="footer_data">
                <Button
                  onClick={() => {
                    handleSubmit();
                    setShow(false);
                  }}
                >
                  Save
                </Button>
                <Button variant="outline-dark" onClick={() => setShow(false)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </Container>
  );
};

Boarding.propTypes = {
  handleButtonData: PropTypes.func,
  handleUserSelect: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleCheckbox: PropTypes.func,
  state: PropTypes.object,
};

export default Boarding;
