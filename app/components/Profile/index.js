/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Fade,
  Button,
  Container,
  Modal,
  Form,
  ListGroup,
} from 'react-bootstrap';
import Axios from 'axios';

const Profile = props => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  // //for modal
  const [search, setSearch] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchName, setSearchName] = useState([]);
  const [userListData, setUserListData] = useState([]);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const url = `https://mocki.io/v1/11523d43-5f93-4a6f-adda-327ee52a8b1f`;
    Axios.get(url).then(res => {
      setAllUser(res.data);
      setSearchName(res.data);
    });
  }, []);

  const handleChange = event => {
    let newList = [];
    if (event.target.value !== '') {
      setSearch(true);
      newList = allUser.filter(({ userName }) => {
        const finalDataList = userName.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return finalDataList.includes(filter);
      });
    } else {
      setSearch(false);
      newList = allUser;
    }
    setSearchName(newList);
  };

  const selectData = [];
  let finalData = [];
  const handleUserSelect = username => {
    if (selectData.includes(username)) {
      const index = selectData.indexOf(username);
      selectData.splice(index, 1);
    } else {
      selectData.push(username);
    }
    finalData = selectData;
  };

  const handleClose = () => {
    setUserListData(finalData);
    setShow(false);
  };

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
                  <Button
                    onClick={() => {
                      setOpen(!open);
                    }}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                    type="button"
                  >
                    + Add My Badge
                  </Button>
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
                    <Button type="button" className="btn btn-primary ml-2">
                      Save
                    </Button>
                    <Button type="button" className="btn btn-primary">
                      Cancel
                    </Button>
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
          {userListData.map(i => (
            <h5>{i}</h5>
          ))}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button
              onClick={handleShow}
              className="btn border-primary text-primary bg-white"
              type="button"
            >
              Delegate My workspot Access
            </Button>
            <Modal
              size="md"
              show={show}
              onHide={handleClose}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Delegate My Workspot Access
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
                        onClick={() => handleUserSelect(i.userName)}
                        value={i.userName}
                        key={i}
                      >
                        <img
                          src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                          alt="data"
                          width="20px"
                        />
                        {i.userName}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose}>Save</Button>
                <Button onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <div className="card-body">
          <h5 className="text-muted">I can update my workspot for</h5>
          {userListData.map(i => (
            <h5>{i}</h5>
          ))}
        </div>
      </div>
    </Container>
  );
};

Profile.propTypes = {};
export default Profile;
