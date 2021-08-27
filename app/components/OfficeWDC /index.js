/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { Card, Form, ListGroup, Badge } from 'react-bootstrap';
import Axios from 'axios';
import Office from '../../images/off.svg';
import Swiggy from '../../images/swiggy.png';
import Talabat from '../../images/talabat.png';
import Uber from '../../images/ubereats.png';

const OfficeWDC = () => {
  const [office, setOffice] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [floor, setFloor] = useState([]);
  const [finalFloor, setFinalFloor] = useState('Floor1');

  useEffect(() => {
    const url = `https://mocki.io/v1/0a505005-9da4-44c7-9000-0447e1dd3fb2`;
    Axios.get(url, {}).then(res => {
      setAllUser(res.data);
    });
  }, []);

  useEffect(() => {
    if (office.length) {
      setFloors(office);
    }
  }, [office]);

  const setFloors = () => {
    let Data = [];

    switch (office) {
      case 'Washington , DC':
        Data = ['Floor1', 'Floor 2', 'Floor 3', 'Floor 4', 'Floor 5'];
        break;
      case 'Richmond , VA':
        Data = ['Floor1', 'Floor 2', 'Floor 3'];
        break;
      case 'Birmigham , AL':
        Data = ['Floor1', 'Floor 2'];
        break;
      case 'Bloomington , MN':
        Data = ['Floor1', 'Floor 2', 'Floor 3', 'Floor 4'];
        break;

      default:
        Data = ['No Floor Found '];
    }
    setFloor(Data);
  };

  const Icon = () => {
    switch (office) {
      case 'Washington , DC':
        switch (finalFloor) {
          case 'Floor1':
            return Swiggy;
          case 'Floor 2':
            return Talabat;
        }
        break;
      case 'Richmond , VA':
        switch (finalFloor) {
          case 'Floor1':
            return Uber;
          case 'Floor 2':
            return Swiggy;
        }
        break;
      case 'Birmigham , AL':
        switch (finalFloor) {
          case 'Floor1':
            return Office;
          case 'Floor 2':
            return Talabat;
        }
        break;
      default:
    }
    return null;
  };

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col-6">
          <h2>Office Maps</h2>
        </div>
        <div className="col-6 d-flex">
          <Form.Group controlId="floatingSelect" className="d-flex">
            <Form.Control
              className="dropdown_list"
              as="select"
              value={office}
              onChange={e => {
                setOffice(e.target.value);
              }}
            >
              <option>----Open this select menu----</option>
              {allUser &&
                allUser.map(obj => (
                  <>
                    <option value={obj.name} key={obj.name}>
                      {obj.name}
                    </option>
                  </>
                ))}
            </Form.Control>
            <Form.Control
              className="dropdown_list"
              as="select"
              onChange={e => {
                setFinalFloor(e.target.value);
              }}
              onClick={() => setFloors(office)}
            >
              {floor && floor.length
                ? floor &&
                  floor.map(obj => (
                    <>
                      <option value={obj}>{obj}</option>
                    </>
                  ))
                : 'No Floor Found'}
            </Form.Control>
          </Form.Group>
        </div>
      </div>
      <Card>
        <div className="row">
          <div className="col-3">
            <ListGroup>
              <ListGroup.Item>
                {office}
                <br />
                <Badge pill bg="primary" className="bg-success">
                  {finalFloor}
                </Badge>
              </ListGroup.Item>
              <h5>Office resource</h5>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-9">
            <img src={Icon(office, finalFloor)} alt="office" />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default OfficeWDC;
