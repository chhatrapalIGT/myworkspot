import React, { useState, useEffect } from 'react';
import { Modal, Form, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Axios from 'axios';

const ProfileModal = props => {
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchName, setSearchName] = useState([]);

  useEffect(() => {
    // const getUserList = () => {
    const url = `https://mocki.io/v1/11523d43-5f93-4a6f-adda-327ee52a8b1f`;
    Axios.get(url, {
      //   withCredentials: true,
    }).then(res => {
      console.log('res', res);
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
  const handleUserSelect = username => {
    const name = username;
    selectData.push(name);
    console.log('selectData', selectData);
    console.log('name', name);
    // return props.selectedData(selectData);
  };

  return (
    <Modal
      {...props}
      size="md"
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
        {/* <Button onClick={props.onHide}>Save</Button>
        <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
};
ProfileModal.protoTypes = {
  onHide: PropTypes.bool,
  handleChange: PropTypes.func,
  selectedData: PropTypes.array,
};

export default ProfileModal;
