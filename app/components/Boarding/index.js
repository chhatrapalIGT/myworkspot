/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import '../FAQ/styles.scss';
import Axios from 'axios';
import logo from '../../images/Illustration.svg';
import plus from '../../images/plus.svg';

const Boarding = ({
  handleButtonData,
  state,
  handleCheckbox,
  handleUserSelect,
  handleSubmit,
  handleSubmitData,
  handleBadgeData,
  locationErrorHandle,
  location,
}) => {
  // eslint-disable-next-line no-unused-vars

  const [modal, setModal] = useState(false);
  const history = useHistory();

  const handleChange = name => {
    setModal(true);
    handleButtonData(name);
  };

  const final = state.timings.filter(data => data.name !== '');

  const data = location && location.length && location[location.length - 1];

  const finalLocation =
    location && location.length
      ? location.filter(obj => obj && obj.locationname !== 'Remote Work')
      : '';

  return (
    <>
      {locationErrorHandle &&
        !locationErrorHandle.success &&
        locationErrorHandle.error && (
          <div className="alert-dismissible fade show popup_err" role="alert">
            <p className="text-center m-auto">
              {locationErrorHandle && !locationErrorHandle.success
                ? locationErrorHandle.error
                : ''}
            </p>
          </div>
        )}
      {location && !location.length ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
        <>
          <div className="wrapper_main">
            <div className="onboarding-main">
              <div className="container">
                <div className="top-illustration">
                  <div className="imaage-wrapper">
                    <img src={logo} alt="" />
                  </div>
                  <div className="welcome">
                    <h2>Hello, Alexander</h2>
                    <p>Lets complete your My Workspot profile</p>
                  </div>
                </div>
              </div>

              <div className="weekly-default mt-40">
                <div className="container">
                  <div className="card on-boarding-inner">
                    <h4 className="common-title">Weekly Default</h4>
                    <p className="desc stroke-2 mt-3">
                      Your weekly default will pre-populate for each week unless
                      you update My Workspot for a specific day. You can update
                      My Workspot for a particular day on the homepage.
                    </p>
                    <div className="mt-4 weekly-default-inner px-0 d-flex flex-wrap">
                      {state.timings.map(t => (
                        <div className="day_one">
                          <p className="day-name">{t.day}</p>

                          <a
                            href
                            data-bs-toggle="modal"
                            data-bs-target="#set_location"
                          >
                            <div
                              onClick={() => handleChange(t.day)}
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

                    <div className="badge-number">
                      <p className="title">
                        Badge Number <span>(Optional)</span>
                      </p>
                      <div className="badge-number-inner">
                        <input type="text" disabled value="BB" />
                        <input
                          name="badge"
                          type="text"
                          placeholder="XXX"
                          onChange={handleBadgeData}
                          maxLength="3"
                        />
                        <span>−</span>
                        <input
                          name="badgedata"
                          type="text"
                          placeholder="XXX"
                          maxLength="3"
                          onChange={handleBadgeData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <button
                  type="button"
                  className={final.length >= 5 ? 'change_btn' : 'action-btn'}
                  onClick={() => {
                    handleSubmitData();
                  }}
                >
                  Confirm
                </button>
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
                    Choose a place where you usually work on this day <br /> of
                    the week
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
                    <div className="selection">
                      <select name="location" onChange={handleUserSelect}>
                        <optgroup label="EAB Office">
                          {finalLocation &&
                            finalLocation.map(i => (
                              <option
                                htmlFor="jane"
                                value={i.locationname}
                                id="location"
                                style={{ padding: '50px' }}
                              >
                                {i.locationname}
                              </option>
                            ))}
                        </optgroup>
                        <hr />
                        <option value={data && data.locationname}>
                          {data && data.locationname}
                        </option>
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
        </>
      )}
    </>
  );
};

Boarding.propTypes = {
  handleButtonData: PropTypes.func,
  handleUserSelect: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleCheckbox: PropTypes.func,
  handleSubmitData: PropTypes.func,
  handleBadgeData: PropTypes.func,
  state: PropTypes.object,
  locationErrorHandle: PropTypes.string,
  location: PropTypes.object,
};

export default Boarding;
