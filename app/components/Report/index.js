/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Datepicker } from '@mobiscroll/react';
import '../../../src/lib/mobiscroll/css/mobiscroll.react.scss';
import Axios from 'axios';
import Select from 'react-select';
import Draggable from 'react-draggable';
import Calender from '../Cal/Calender';
import profile from '../assets/images/profileof.png';
import Floormap from '../../images/Map_2.svg';
import location from '../../images/location.png';
import zoomin from '../../images/zoomin.png';
import zoomout from '../../images/zoomout.png';

import '../FAQ/styles.scss';

const options = [
  {
    value: 'All Team Members',
    label: 'All Team Members',
    flag:
      'https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=50&ext=jpg',
  },
  {
    value: 'jane cooper',
    label: 'jane cooper',
    flag:
      'https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=50&ext=jpg',
  },
  {
    value: 'Wade warren',
    label: 'Wade warren',
    flag:
      'https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=50&ext=jpg',
  },
  {
    value: 'cameron williamson',
    label: 'cameron williamson',
    flag:
      'https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=50&ext=jpg',
  },
];

const Report = ({
  handleChange,
  state,
  imgStyle,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  handleUserSelect,
  onDateChange,
}) => {
  const [show, setShow] = useState(false);
  const isDraggable = state.scale > 1;
  const [searchName, setSearchName] = useState([]);

  const [allUser, setAllUser] = useState([]);
  const [employeeLocationDetail, setEmployeeLocationDetail] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleModalClose = () => {
    if (
      state.date.length &&
      state.selectedNames.length &&
      state.selectedOption.length
    ) {
      setShow(false);
    }
  };
  useEffect(() => {
    const url = `https://mocki.io/v1/11523d43-5f93-4a6f-adda-327ee52a8b1f`;
    Axios.get(url).then(res => {
      setAllUser(res.data);
    });
  }, []);

  useEffect(() => {
    const url = `https://mocki.io/v1/947b4269-a50f-4e16-8157-30d04fb8879a`;
    Axios.get(url, {}).then(res => {
      setSearchName(res.data);
    });
  }, []);

  const updatedEmpData = options.map(item => {
    // eslint-disable-next-line no-param-reassign
    item.label = (
      <>
        <div className="drop_update">
          <img src={item.flag} alt="flag" />
          {item.value}
        </div>
      </>
    );
    return item;
  });

  return (
    <div className="wrapper_main">
      <div className="container">
        <h4 className="common-title" style={{ marginLeft: '20px' }}>
          My Team
        </h4>
        <Calender
          defaultSelected="week"
          setShow={setShow}
          allUser={allUser}
          setEmployeeLocationDetail={setEmployeeLocationDetail}
        />

        <Modal
          className="modal fade test_modal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          show={show}
          onHide={handleClose}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Invite Team to the Office
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
              <div className="modal-body modal-body_myteam">
                <Select
                  isMulti
                  value={state.selectedOption}
                  onChange={handleChange}
                  options={updatedEmpData}
                  className="mb-3 "
                  name="employee"
                  placeholder="Select Team Member(s)"
                />
                <div className="selection">
                  <select name="location" onChange={handleUserSelect}>
                    <optgroup label="EAB Office">
                      {searchName &&
                        searchName.map(i => (
                          <option
                            htmlFor="jane"
                            value={i.name}
                            id="location"
                            style={{ padding: '50px' }}
                          >
                            {i.name}
                          </option>
                        ))}
                    </optgroup>
                    <hr />
                    <option value="remote Work">Remote work</option>
                  </select>
                </div>
                <div className="invite-team-wrapp choose-date mt-3">
                  <div className="access-to">
                    <span className="material-icons-outlined">
                      calendar_today
                    </span>
                  </div>
                  <Datepicker
                    controls={['calendar']}
                    selectMultiple
                    min={moment().toDate()}
                    dateFormat="MMM DD,YYYY"
                    className="dataaaa"
                    selectCounter
                    onChange={onDateChange}
                    inputProps={{
                      placeholder: 'Select Date(s)',
                    }}
                    marked={[
                      {
                        date: new Date(2021, 8, 2),
                        markCssClass: 'mbsc-calendar-marks1',
                      },
                      {
                        date: new Date(2021, 8, 4),
                        markCssClass: 'mbsc-calendar-marks1',
                      },
                      {
                        date: new Date(2021, 8, 5),
                        markCssClass: 'mbsc-calendar-marks2',
                      },
                      {
                        date: new Date(2021, 8, 7),
                        markCssClass: 'mbsc-calendar-marks3',
                      },
                      {
                        date: new Date(2021, 8, 6),
                        markCssClass: 'mbsc-calendar-marks3',
                      },
                    ]}
                  />
                </div>
                <div className="description mt-3">
                  <textarea
                    name=""
                    id=""
                    placeholder="Add a Message"
                    cols="30"
                    rows="10"
                  />
                </div>
                <p className="notice mb-1 mt-2">
                  An email invitation will be sent to the selected team
                  member(s) once you click Invite.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn save-data"
                  onClick={handleModalClose}
                >
                  Invite
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

        <Modal
          className="modal fade test_modal test_modal-employee"
          show={employeeLocationDetail}
          onHide={() => setEmployeeLocationDetail(false)}
          aria-labelledby="exampleModalLabel"
          style={{ maxWidth: 'calc(100% - 10rem)' }}
          aria-hidden="true"
          centered
          size="lg"
        >
          <div className=" modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header myteam_header">
                <div className="left-panel myteam_card">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {moment().format('dddd MMMM Do YYYY')}
                  </h5>
                </div>
                <div className="myteam-user">
                  {' '}
                  <img src={profile} alt="" />
                  <label htmlFor="my-spot">Jane Cooper</label>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setEmployeeLocationDetail(false)}
                />
              </div>
              <div className="modal-body">
                <div className="office-structure office-structure-modal">
                  <div className="container p-0">
                    <div className="card office-structure-inner">
                      <div className="left-panel">
                        <div className="office-info">
                          <p className="name">Washington, DC</p>
                          <span className="floor">Floor 3</span>
                        </div>
                        <div className="office-resource myteam_res">
                          <p>Office Resources</p>
                          <div className="office-part-one yellow">
                            <span className="informer" />
                            <label htmlFor="my-spot">Yellow</label>
                          </div>
                          <div className="office-part-one teal">
                            <span className="informer" />
                            <label htmlFor="my-spot">Teal</label>
                          </div>
                          <div className="office-part-one orange">
                            <span className="informer" />
                            <label htmlFor="my-spot">Orange</label>
                          </div>
                          <div className="office-part-one blue">
                            <span className="informer" />
                            <label htmlFor="my-spot">Blue</label>
                          </div>
                          <div className="office-part-one teal">
                            <span className="informer">315</span>
                            <label htmlFor="my-spot">Bel-Air</label>
                          </div>
                          <div className="office-part-one teal">
                            <span className="informer">332</span>
                            <label htmlFor="my-spot">Walkerville</label>
                          </div>
                          <div className="office-part-one white">
                            <span className="informer">334</span>
                            <label htmlFor="my-spot">Common Room</label>
                          </div>
                          <div className="office-part-one black">
                            <span className="informer">359</span>
                            <label htmlFor="my-spot">The Post</label>
                          </div>
                          <div className="office-part-one heart pink">
                            <span className="informer">
                              <img src="./images/heart.png" alt="" />
                            </span>
                            <label htmlFor="my-spot">AED</label>
                          </div>
                        </div>
                      </div>
                      <div className="right-map">
                        <Draggable disabled={!isDraggable} key={state.version}>
                          <div
                            className="drag_image"
                            style={isDraggable ? { cursor: 'move' } : null}
                          >
                            <img
                              src={Floormap}
                              alt=""
                              style={imgStyle}
                              draggable="false"
                            />
                          </div>
                        </Draggable>
                        <div className="toolbar">
                          <button
                            className="location"
                            type="button"
                            onClick={() => handleDefault()}
                          >
                            <img src={location} alt="" />
                          </button>
                          <button
                            className="zoomin"
                            type="button"
                            onClick={() => handleZoomIn()}
                          >
                            <img src={zoomin} alt="" />
                          </button>
                          <button
                            className="zoomout"
                            type="button"
                            onClick={() => handleZoomOut()}
                          >
                            <img src={zoomout} alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

Report.propTypes = {
  handleChange: PropTypes.func,
  state: PropTypes.object,
  imgStyle: PropTypes.object,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleDefault: PropTypes.func,
  handleUserSelect: PropTypes.func,
  onDateChange: PropTypes.func,
};

export default Report;
