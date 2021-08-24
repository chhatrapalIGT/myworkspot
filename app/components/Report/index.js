import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import MultipleDatePicker from 'react-multiple-datepicker';
import PropTypes from 'prop-types';

import '../FAQ/styles.scss';

const Report = props => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <h2>My Team</h2>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-2">
        <Button
          variant="primary"
          className="justify-content-md-end"
          onClick={() => setShow(true)}
        >
          Invite Team to the Office
        </Button>

        <Modal
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeIcon>
            <Modal.Title id="contained-modal-title-vcenter">
              Invite Team to the Office
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Centered Modal</h4>
            <p>
              <Form.Label>Select Team Members</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  console.log('e.target.value', e.target.value);
                }}
              >
                <option>--- Select ----</option>
                <option value="1">All Team Members</option>
                <option value="2">Jane Coper</option>
                <option value="3">Wade Warren</option>
                <option value="4">Alex ander</option>
              </Form.Control>

              <Form.Label>Select Office Area</Form.Label>
              <Form.Control
                as="select"
                onChange={e => {
                  console.log('e.target.value', e.target.value, e.target.name);
                }}
              >
                <option>--- Select ----</option>
                <option value="1" name="Richmon">
                  Richmon ,VA
                </option>
                <option value="2">Washington ,DC</option>
                <option value="3">Bloomington , MN</option>
              </Form.Control>
              <Form.Label>Select Date</Form.Label>

              <div className="date_pick">
                <MultipleDatePicker
                  disabled
                  calendarPosition="center"
                  onSubmit={props.handleSubmit}
                  style={{
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    width: '100px',
                  }}
                />
              </div>
              <Form.Label>Add a Message</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </p>
          </Modal.Body>
          <Modal.Footer className="footer_data">
            <Button onClick={() => setShow(false)}>Invite</Button>
            <Button variant="outline-dark" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

Report.propTypes = {
  handleSubmit: PropTypes.func,
};

export default Report;
