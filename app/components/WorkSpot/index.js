/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import PropTypes from 'prop-types';
import './custom.scss';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';
import { Datepicker } from '@mobiscroll/react';
import Axios from 'axios';
import Floormap from '../../images/floormap.png';
import location from '../../images/location.png';
import zoomin from '../../images/zoomin.png';
import zoomout from '../../images/zoomout.png';
import union from '../assets/images/Union.svg';
import editPen from '../assets/images/edit-pen.svg';
import ProfileImg from '../assets/images/myprofile.png';
import profile from '../assets/images/profileof.png';
import '../../../src/lib/mobiscroll/css/mobiscroll.react.scss';
import Calender from '../Cal/Calender';

const WorkSpot = ({
  onSubmit,
  state,
  onChange,
  onDateChange,
  handleUserSelect,
  handleChange,
  handleClose,
  handleRemove,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  imgStyle,
}) => {
  const isDraggable = state.scale > 1;
  const [isModal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isEmployeeModal, setEmployeeModal] = useState(false);
  const [isEmployee, setEmployee] = useState(false);
  const [isLocation, setLocation] = useState(false);
  const [locationName, setLocationName] = useState([]);
  const divRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });

  const handleClickOutside = event => {
    if (divRef && divRef.current && !divRef.current.contains(event.target)) {
      setModal(false);
      setEmployee(false);
      setLocation(false);
      setEmployeeModal(false);
    }
  };

  useEffect(() => {
    const url = `https://mocki.io/v1/0a505005-9da4-44c7-9000-0447e1dd3fb2`;
    Axios.get(url, {}).then(res => {
      // setAllUser(res.data);
      setLocationName(res.data);
    });
  }, []);

  return (
    <div className="wrapper_main">
      <div className="container">
        <div className="card building-block-head blue">
          <p className="stroke-2">
            Hi Alexander, your <span> DC </span> neighborhood today is
          </p>

          <div className="block-info d-flex flex-wrap">
            <h3 className="building-name">Building 2</h3>
            <h3 className="floor-name">Floor 3</h3>
            <h3 className="color-code">Blue</h3>
          </div>
          <div className="building-location-strip d-flex flex-wrap align-items-center">
            <div className="location d-flex align-items-center">
              <img src={union} alt="" /> 2445 M Street NW, Washington, DC 20037
            </div>
            <div className="change-workspot d-flex align-items-center">
              <img src={editPen} alt="" />{' '}
              <a
                href
                className="change-workspot"
                onClick={() => setModal(true)}
              >
                Change Today's Workspot
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="office-structure mt-4"
        style={{ height: 'calc(100vh - 400px)' }}
      >
        <div className="container" style={{ height: '100%' }}>
          <div
            className="card office-structure-inner"
            style={{ height: '100%' }}
          >
            <div className="left-panel" style={{ overflow: 'auto' }}>
              <div className="office-info">
                <p className="name">Washington, DC</p>
                <span className="floor">floor 3</span>
                <span className="floor">floor 4</span>
              </div>
              <div className="office-resource">
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
      <Calender
        defaultSelected="week"
        setModal={setModal}
        setLocation={setLocation}
        setEmployeeModal={setEmployeeModal}
        userListData={state.userListData}
        setEmployee={setEmployee}
        setVisible={setVisible}
        handleRemove={handleRemove}
      />

      <Modal
        className="modal fade test_modal"
        show={isModal}
        onHide={() => setModal(false)}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update My Workspot
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModal(false)}
              />
            </div>
            <div className="modal-body modal-view">
              <div className="calendarpop">
                <div className="selection">
                  <select name="location" id="" onChange={onChange}>
                    <option value="Washington, DC">Washington, DC</option>
                    <option value="Richmond, VA">Richmond, VA</option>
                    <option value="Birmingham, AL">Birmingham, AL</option>
                    <option value="Bloomingtom, MN">Bloomingtom, MN</option>
                    <option value="Remote Work">Remote Work</option>
                  </select>
                </div>
                <div className="calendar_main">
                  <Datepicker
                    controls={['calendar']}
                    display="inline"
                    name="date"
                    min={moment().toDate()}
                    onChange={onDateChange}
                    selectMultiple={true}
                    selectCounter={true}
                    dateFormat="MMM DD,YYYY"
                    // headerText="dates selected"
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
                  <div className="bottom">
                    <span className="eab-ofc">EAB Office</span>
                    <span className="remote">Remote Work</span>
                    <span className="paidoff">Paid Time Off</span>
                  </div>
                </div>
                <div className="checkbox-label">
                  <input type="checkbox" id="private-space" />
                  <label htmlFor="private-space">Private space requested</label>
                </div>
                <p className="notice">
                  If you would like to update your weekly default, you can
                  update this under{' '}
                  <Link to="profile" activeClassName="active">
                    <a className="active" href="true">
                      My Profile
                    </a>
                  </Link>
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn save-data"
                onClick={() => {
                  setModal(false);
                  onSubmit();
                }}
              >
                Update
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
        show={isEmployeeModal}
        onHide={() => setEmployeeModal(false)}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update My Workspot
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEmployeeModal(false)}
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
                {state.searchName &&
                  state.searchName.map(i => (
                    <div
                      aria-hidden="true"
                      className="form-group"
                      onClick={() => handleUserSelect(i.userName)}
                    >
                      <img src={ProfileImg} alt="" />
                      <input id="jane" type="checkbox" className="checkbox" />
                      <label htmlFor="jane">{i.userName}</label>
                    </div>
                  ))}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn save-data"
                onClick={() => {
                  setEmployeeModal(false);
                  // onSubmit();
                  handleClose();
                }}
              >
                Update
              </button>
              <button
                type="button"
                className="btn dismiss"
                data-bs-dismiss="modal"
                onClick={() => setEmployeeModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        className="modal fade test_modal test_modal-employee"
        show={isEmployee}
        onHide={() => setEmployee(false)}
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
                  Tuesday, June 15, 2021
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
                onClick={() => setEmployee(false)}
              />
            </div>
            <div className="modal-body">
              <div className="office-structure">
                <div
                  className="container p-0"
                  style={{ height: 'calc(100vh - 500px)', overflow: 'hidden' }}
                >
                  <div className="card office-structure-inner">
                    <div className="left-panel">
                      <div className="office-info">
                        <p className="name">Washington, DC</p>
                        <span className="floor">floor 3</span>
                        <span className="floor">floor 4</span>
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

      <Modal
        className="modal fade test_modal"
        show={isLocation}
        onHide={() => setLocation(false)}
        aria-labelledby="exampleModalLabel"
        style={{ maxWidth: 'calc(100% - 20rem)' }}
        aria-hidden="true"
        centered
        size="lg"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setLocation(false)}
              />
            </div>
            <div className="modal-body modal-view">
              <form className="delegate-workspot-access" action="submit">
                <span className="small-title stroke-2 d-block mb-2">
                  EAB Office
                </span>
                {locationName &&
                  locationName.map(i => (
                    <div className="form-group">
                      <input
                        id={i.name}
                        type="radio"
                        name="location"
                        className="checkbox"
                        value={i.name}
                        // onClick={() => handleUserSelect(i.name, true)}
                      />
                      <label htmlFor="jane" value={i.name}>
                        {i.name}
                      </label>
                    </div>
                  ))}
                <hr />
                <p className="notice">
                  If you would like to update your weekly default, you can
                  update this under {'   '}
                  <Link to="profile" activeClassName="active">
                    <a className="active" href="true">
                      My Profile
                    </a>
                  </Link>
                </p>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn save-data"
                onClick={() => {
                  setLocation(false);
                  // onSubmit();
                  handleClose();
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="btn dismiss"
                data-bs-dismiss="modal"
                onClick={() => setLocation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

WorkSpot.propTypes = {
  onSubmit: PropTypes.func,
  state: PropTypes.object,
  onChange: PropTypes.func,
  onDateChange: PropTypes.func,
  handleUserSelect: PropTypes.func,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  imgStyle: PropTypes.object,
  handleRemove: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleZoomIn: PropTypes.func,
  handleDefault: PropTypes.func,
};
export default WorkSpot;
