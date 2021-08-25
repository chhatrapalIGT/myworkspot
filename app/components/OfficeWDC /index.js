import React, { useState } from 'react';
import { Card, Form, ListGroup, Badge } from 'react-bootstrap';
import Office from '../../images/off.svg';
import Swiggy from '../../images/swiggy.png';
import Talabat from '../../images/talabat.png';
import Uber from '../../images/ubereats.png';

const OfficeWDC = () => {
  const Icon = (dataa, img) => {
    switch (dataa.toUpperCase() && img.toUpperCase()) {
      case 'ON':
        return Swiggy;
      case 'TW':
        return Talabat;
      case 'TH':
        return Uber;
      case 'ON' && 'ONE':
        return Office;
      default:
        return null;
    }
  };
  const [office, setOffice] = useState('');
  const [floor, setFloor] = useState('');
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
                console.log('e.target.value', e.target.value);
                setOffice(e.target.value);
              }}
            >
              <option>Open this select menu</option>
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="three">Three</option>
            </Form.Control>
            <Form.Control
              className="dropdown_list"
              as="select"
              value={floor}
              onChange={e => {
                console.log('e.target.value', e.target.value);
                setFloor(e.target.value);
              }}
            >
              <option>Open this select menu</option>
              <option value="on">Floor 1</option>
              <option value="tw">Floor 2</option>
              <option value="th">Floor Three</option>
            </Form.Control>
          </Form.Group>
        </div>
      </div>
      <Card>
        <div className="row">
          <div className="col-3">
            <ListGroup>
              <ListGroup.Item>
                Washington DC
                <br />
                <Badge pill bg="primary" className="bg-success">
                  Floor 3
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
            <img src={Icon(floor, office)} alt="office" />
          </div>
        </div>
      </Card>
    </div>
  );
};
export default OfficeWDC;
