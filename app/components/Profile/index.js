/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { Modal } from 'react-bootstrap';
import ProfileImg from '../assets/images/myprofile.png';
import Edit from '../assets/images/edit.svg';
import plus from '../../images/plus.svg';

import Close from '../assets/images/close.svg';
import Work from '../assets/images/workspot1.png';

const Profile = ({
  handleButtonData,
  state,
  handleCheckbox,
  handleUserSelectData,
  handleSubmit,
  handleSubmitData,
}) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);

  const [search, setSearch] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [searchName, setSearchName] = useState([]);
  const [userListData, setUserListData] = useState([]);
  const [boardingData, setBoardingData] = useState([]);
  useEffect(() => {
    const url = `https://mocki.io/v1/11523d43-5f93-4a6f-adda-327ee52a8b1f`;
    Axios.get(url).then(res => {
      setAllUser(res.data);
      setSearchName(res.data);
    });
    const urlData = `https://mocki.io/v1/0a505005-9da4-44c7-9000-0447e1dd3fb2`;
    Axios.get(urlData, {}).then(res => {
      setBoardingData(res.data);
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

  const handleChangeDay = name => {
    setModal(true);
    handleButtonData(name);
  };

  // const handleRemove = i => {
  //   userListData.splice(i, 1);
  //   setUserListData(userListData);
  // };

  return (
    <Fragment>
      <div className="wrapper_main">
        <div className="my-profile">
          <div className="container">
            <h4 className="common-title">My Profile</h4>
            <div className="card my-profile-inner">
              <div className="left-aside d-flex align-items-center justify-content-center">
                <div className="wrapper">
                  <div className="profile-picture">
                    <img src={ProfileImg} alt="" />
                  </div>
                  <h3 className="profile-username">Alexander Doe</h3>
                  <span className="designation">UX / UI Designer</span>
                </div>
              </div>
              <div className="right-content">
                <div className="col_one">
                  <div className="attr_one">
                    <span>Employee ID</span>
                    <p>237561</p>
                  </div>
                  <div className="attr_one">
                    <span>Manager</span>
                    <p>Cameron Williamson</p>
                  </div>
                </div>
                <div className="col_one">
                  <div className="attr_one">
                    <span>Primary Office</span>
                    <p>Birmingham, AL</p>
                  </div>
                  <div className="attr_one">
                    <span>Assigned Space</span>
                    <p>1435</p>
                  </div>
                </div>
                <div className="col_one">
                  <div className="attr_one">
                    <span>Badge Number</span>
                    <p>BB 4878 999</p>
                    <a className="replace" href>
                      <img src={Edit} alt="" />
                      Replace My Badge
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="weekly-default onboarding-main mt-40">
          <div className="container">
            <h4 className="common-title">Weekly Default</h4>
            <p className="w-50 stroke-2 mt-3">
              Your weekly default will pre-populate for each week unless you
              update My Workspot for a specific day. You can update My Workspot
              for a particular day on the homepage.
            </p>
            <div className="on-boarding-inner p-0">
              <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                {state.timings.map(t => (
                  <div className="day_one">
                    <p className="day-name">{t.day}</p>

                    <a
                      href
                      data-bs-toggle="modal"
                      data-bs-target="#set_location"
                    >
                      {/* <div
                        onClick={() => handleChangeDay(t.day)}
                        className={classNames(
                          ` day-one-wrapper  ${
                            t.name === ''
                              ? 'add-location'
                              : t.name !== 'Remote Work'
                              ? `work-from-office ${allTabColor(t.name)}`
                              : t.name === 'Remote Work'
                              ? 'work-from-home'
                              : 'add-location'
                          } `,
                        )}
                      > */}

                      <div
                        onClick={() => handleChangeDay(t.day)}
                        className={`day-one-wrapper ${
                          t.name === ''
                            ? 'add-location'
                            : t.name !== 'Remote Work'
                            ? 'work-from-office border-top-blue'
                            : t.name === 'Remote Work'
                            ? 'work-from-home'
                            : 'add-location'
                        }`}
                      >
                        {t.name ? (
                          <label
                            value={t.day}
                            onClick={() => {
                              handleButtonData(t.day);
                            }}
                          >
                            {t.name}
                          </label>
                        ) : (
                          <img
                            className="plus-icon"
                            src={plus}
                            alt=""
                            id="day"
                            value={t.day}
                            onClick={() => {
                              handleButtonData(t.day);
                            }}
                          />
                        )}
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="workspot-access mt-40">
          <div className="container">
            <h4 className="common-title">My Workspot Access</h4>
            <p className="w-50 stroke-2 mt-3">
              You can delegate My Workspot access to other colleagues at EAB.
            </p>
            <div className="card mt-4 work-access-inner">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5>Delegate My Workspot Access to</h5>
                <button
                  type="button"
                  onClick={() => setShow(true)}
                  className="btn blue-color-btn"
                >
                  Delegate My Workspot Access
                </button>
              </div>
              <div className="access-to">
                {userListData &&
                  userListData.map(i => (
                    <div className="access-one">
                      <img src={ProfileImg} alt="" />
                      {i}
                      <a className="close_btn" href>
                        <img src={Close} alt="" />
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="workspot-access mt-4">
          <div className="container">
            <div className="card work-access-inner">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5>I Can Update My Workspot for</h5>
              </div>
              <div className="access-to update-workshop">
                <div className="access-one">
                  <img src={ProfileImg} alt="" />
                  Wade Warren
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="modal fade test_modal"
        show={modal}
        onHide={() => setModal(false)}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-block">
              <h5 className="modal-title" id="exampleModalLabel">
                Set {state.selectedDay && state.selectedDay} Schedule
              </h5>
              <p className="mb-0 mt-2 stroke-2">
                Choose a place where you usually work on this day <br /> of the
                week
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModal(false)}
              />
            </div>
            <div className="modal-body">
              <form className="delegate-workspot-access" action="submit">
                <span className="small-title stroke-2 d-block mb-2">
                  EAB Office
                </span>

                <div className="selection">
                  <select name="location" onChange={handleUserSelectData}>
                    {boardingData &&
                      boardingData.map(i => (
                        <option htmlFor="jane" value={i.name} id="location">
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="applyall d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="apply-all"
                    onClick={() => handleCheckbox()}
                  />
                  <label htmlFor="apply-all" className="stroke-2">
                    Apply to all days of the week
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn save-data"
                onClick={() => {
                  handleSubmit();
                  setModal(false);
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn dismiss"
                data-bs-dismiss="modal"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className="modal fade test_modal"
        show={show}
        onHide={() => handleClose()}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delegate My Workspot Access
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setShow(false);
                }}
              />
            </div>
            <div className="modal-body">
              <form className="delegate-workspot-access" action="submit">
                <input
                  type="search"
                  placeholder="Search..."
                  className="searchbox"
                  onChange={handleChange}
                />
                {searchName &&
                  searchName.map(i => (
                    <div
                      aria-hidden="true"
                      className="form-group"
                      onClick={() => handleUserSelect(i.userName)}
                    >
                      <img src={ProfileImg} alt="" />
                      <input id="jane" type="radio" className="checkbox" />
                      <label htmlFor="jane">{i.userName}</label>
                    </div>
                  ))}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={handleClose}
                className="btn save-data"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="btn dismiss"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

Profile.propTypes = {
  handleButtonData: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleCheckbox: PropTypes.func,
  handleSubmitData: PropTypes.func,
  state: PropTypes.object,
  handleUserSelectData: PropTypes.func,
};
export default Profile;
