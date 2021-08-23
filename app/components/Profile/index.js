import React, { useState } from 'react';
import { Fade, Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProfileModal from './ProfileModal';

const Profile = props => {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [userListData, setUserListData] = useState([]);
  return (
    <Container>
      <div className="m-4">
        <h3> My Profile </h3>
      </div>
      <div className="card m-4">
        <div className="card-body">
          <div className="row">
            <div className="col-3">
              <img
                src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                className="rounded-circle"
                alt="img_profile"
                width="200px"
              />
            </div>
            <div className="col-2 my-auto">
              <div className="row">
                <p className="text-muted"> Employee ID</p>
                <p> 132545</p>
              </div>
              <div className="row">
                <p className="text-muted"> Manager </p>
                <p> 132545</p>
              </div>
            </div>
            <div className="col-2 my-auto">
              <div className="row">
                <p className="text-muted"> Primary Office</p>
                <p> 132545</p>
              </div>
              <div className="row">
                <p className="text-muted"> Assigned Space </p>
                <p> 132545</p>
              </div>
            </div>
            <div className="col-5 mt-3">
              <div className="row">
                <p className="text-muted"> Badge Number</p>
                {!open && (
                  <button
                    onClick={() => {
                      setOpen(!open);
                    }}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                    type="button"
                  >
                    + Add My Badge
                  </button>
                )}
                <Fade in={open}>
                  <div
                    className="input-group mb-3 collapse"
                    id="example-fade-text"
                  >
                    <span className="input-group-text" id="basic-addon1">
                      BB
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="223-423"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                    <button type="button" className="btn btn-primary ml-2">
                      Save
                    </button>
                    <button type="button" className="btn btn-primary">
                      Cancel
                    </button>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3> Weekly Default Calender Section </h3>
      <div className="card m-4">
        <div className="card-body" />
      </div>
      <h3> My Workspot Access </h3>
      <h6 className="text-muted">
        You can delegate My Workspot access to other colleagues at EAB
      </h6>
      <div className="card m-4">
        <div className="card-body">
          <h6 className="text-muted">
            You can delegate My Workspot access to other colleagues at EAB
          </h6>
          {userListData}
          Notifications {console.log('userListData', userListData)}
          <Button bg="light" text="dark">
            <span className="badge bg-white text-dark rounded-circle">4</span>
          </Button>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              onClick={() => setModalShow(true)}
              className="btn border-primary text-primary bg-white"
              type="button"
            >
              Delegate My workspot Access
            </button>
            <ProfileModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              handleSelectChange={props.handleSelectChange()}
              selectedData={setUserListData}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

Profile.propTypes = {
  handleSelectChange: PropTypes.func,
};
export default Profile;
