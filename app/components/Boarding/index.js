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
import Warnning from '../../images/officeImage/Warnning.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
const Boarding = ({
  handleButtonData,
  state,
  handleCheckbox,
  handleUserSelect,
  handleSubmit,
  handleSubmitData,
  handleBadgeData,
  locationErrorHandle,
  addErrorLocation,
  location,
  addErrorLocationMsg,
  locationErrorHandleMsg,
  isLoading,
  badgeUpdateData,
  badgeUpdateSuccess,
  badgeUpdateMsg,
  verifyBadgeSuccess,
  verifyBadgeMsg,
  userName,
  profileUserLoading,
  handleData,
  badgeData,
  handleManageFirstBox,
}) => {
  // eslint-disable-next-line no-unused-vars

  const [modal, setModal] = useState(false);
  const [btn, setBtn] = useState(false);
  const history = useHistory();

  const handleChange = name => {
    setModal(true);
    handleButtonData(name);
  };

  const final = state.timings.filter(data => data.name !== '');

  const data = location && location.length && location[location.length - 1];

  const finalLocation =
    location && location.length
      ? location.filter(obj => obj && obj.locationCode !== 'RW')
      : '';

  const [inputSet, setInputSet] = useState('');
  const [inputSet2, setInputSet2] = useState('');
  const badgeVerify = inputSet.concat(inputSet2);

  const badgeConfirmVerify =
    state.badgedata !== undefined &&
    state.badge &&
    state.badge.concat(state.badgedata && state.badgedata);

  const firstInput1 = document.getElementById('badgeNumVal2');
  const secondValue2 = document.getElementById('badgeNumber');

  return (
    <>
      {(addErrorLocationMsg || locationErrorHandleMsg) && (
        <div
          className={`"alert fade show mx-auto ${
            addErrorLocation ? 'alert alert-success ' : 'alert alert-danger '
          } "`}
        >
          <div style={{ display: 'contents', lineHeight: '30px' }}>
            <img
              src={addErrorLocation ? checkedCircle : crossCircle}
              alt=""
              style={{ paddingRight: '5px' }}
            />
            <div>{addErrorLocationMsg || locationErrorHandleMsg || ''}</div>
          </div>
          <div
            style={{ float: 'right', fontSize: 'large' }}
            onClick={() => handleData()}
            className="day-pointer al_cross"
          >
            &#10006;
          </div>
        </div>
      )}

      {location && !location.length && profileUserLoading ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
        <>
          <div
            className={`${
              badgeData && badgeData.badgeNumber !== ''
                ? 'manage_width wrapper_main'
                : 'wrapper_main'
            }`}
          >
            <div className="onboarding-main">
              <div className="container">
                <div className="top-illustration">
                  <div className="imaage-wrapper">
                    <img src={logo} alt="" />
                  </div>
                  <div className="welcome">
                    <h2>Hello, {userName} </h2>
                    <p>
                      Lets complete your <i>my</i>Workspot profile
                    </p>
                  </div>
                </div>
              </div>

              <div className="weekly-default mt-40">
                <div className="container">
                  <div className="card on-boarding-inner">
                    <h4 className="common-title">Weekly Default</h4>
                    <p className="stroke-2 mt-3 profile_desc">
                      Your weekly default will pre-populate for each week unless
                      you update <i>my</i>Workspot for a specific day. <br />
                      You can update <i>my</i>Workspot for a particular day on
                      the homepage.
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
                    <div className="badge-number col-md-6">
                      <p className="title">
                        Badge Number <span>(Optional)</span>
                      </p>
                      <div className="badge-number-inner">
                        <input type="text" disabled value="BB" />
                        <input
                          name="badge1"
                          type="text"
                          id="badgeNumVal1"
                          placeholder="XXX"
                          value={inputSet}
                          onChange={e => {
                            setInputSet(e.target.value);
                            handleManageFirstBox();
                          }}
                          maxLength="3"
                          className={`${!verifyBadgeSuccess &&
                            verifyBadgeSuccess !== '' &&
                            'badge_err'}
                            ${badgeConfirmVerify !== '' &&
                              badgeConfirmVerify &&
                              badgeConfirmVerify.length >= 6 &&
                              badgeConfirmVerify !== undefined &&
                              badgeVerify !== badgeConfirmVerify &&
                              'badge_err'}`}
                        />
                        <span>−</span>
                        <input
                          name="badgedata1"
                          id="badgeNumVal2"
                          type="text"
                          value={inputSet2}
                          placeholder="XXX"
                          maxLength="3"
                          className={`${!verifyBadgeSuccess &&
                            verifyBadgeSuccess !== '' &&
                            'badge_err'}
                            ${badgeConfirmVerify !== '' &&
                              badgeConfirmVerify &&
                              badgeConfirmVerify.length >= 6 &&
                              badgeConfirmVerify !== undefined &&
                              badgeVerify !== badgeConfirmVerify &&
                              'badge_err'}`}
                          onChange={e => {
                            setInputSet2(e.target.value);
                            handleManageFirstBox();
                          }}
                        />
                      </div>
                    </div>
                    <div className="badge-number col-md-6">
                      <p className="title">Confirm Badge Number</p>
                      <div className="badge-number-inner">
                        <input type="text" disabled value="BB" />
                        <input
                          id="badgeNumber"
                          name="badge"
                          type="text"
                          placeholder="XXX"
                          onChange={handleBadgeData}
                          maxLength="3"
                          value={state.badge}
                          className={`${!verifyBadgeSuccess &&
                            verifyBadgeSuccess !== '' &&
                            'badge_err'}
                            ${badgeConfirmVerify !== '' &&
                              badgeConfirmVerify &&
                              badgeConfirmVerify.length >= 6 &&
                              badgeConfirmVerify !== undefined &&
                              badgeVerify !== badgeConfirmVerify &&
                              'badge_err'}`}
                        />
                        <span>−</span>
                        <input
                          id="badgeValue"
                          name="badgedata"
                          type="text"
                          placeholder="XXX"
                          maxLength="3"
                          value={state.badgedata}
                          className={`${!verifyBadgeSuccess &&
                            verifyBadgeSuccess !== '' &&
                            'badge_err'}
                            ${badgeConfirmVerify !== '' &&
                              badgeConfirmVerify &&
                              badgeConfirmVerify.length >= 6 &&
                              badgeConfirmVerify !== undefined &&
                              badgeVerify !== badgeConfirmVerify &&
                              'badge_err'}`}
                          onChange={handleBadgeData}
                        />
                      </div>
                    </div>
                    {badgeConfirmVerify !== '' &&
                    badgeConfirmVerify &&
                    badgeConfirmVerify.length >= 6 &&
                    badgeConfirmVerify !== undefined &&
                    badgeVerify !== badgeConfirmVerify ? (
                      <span>
                        <div className="d-flex" style={{ marginTop: '10px' }}>
                          <img
                            src={Warnning}
                            alt="warn"
                            style={{
                              margin: '4px 5px 0px 0px',
                              height: '14px',
                            }}
                          />
                          <div style={{ color: 'red' }}>
                            The badge numbers you entered did not match.
                          </div>
                        </div>
                      </span>
                    ) : (
                      verifyBadgeMsg &&
                      !verifyBadgeSuccess && (
                        <div className="d-flex" style={{ marginTop: '10px' }}>
                          <img
                            src={Warnning}
                            alt="warn"
                            style={{ margin: 'auto 5px' }}
                          />
                          <div style={{ color: 'red' }}>{verifyBadgeMsg}</div>
                        </div>
                      )
                    )}

                    {firstInput1 &&
                    firstInput1.value &&
                    secondValue2 &&
                    secondValue2.value === '' &&
                    btn ? (
                      <span>
                        <div className="d-flex" style={{ marginTop: '10px' }}>
                          <div style={{ color: 'red' }}>
                            Please enter the badge number again.
                          </div>
                        </div>
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>

              <div className="container">
                {!isLoading ? (
                  <button
                    type="button"
                    className={final.length >= 5 ? 'change_btn' : 'action-btn'}
                    onClick={() => {
                      handleSubmitData();
                      setBtn(true);
                    }}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    type="button"
                    className={final.length >= 5 ? 'change_btn' : 'action-btn'}
                  >
                    <div className="spinner-border" />
                    Confirm
                  </button>
                )}
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
  locationErrorHandle: PropTypes.object,
  location: PropTypes.object,
  addErrorLocation: PropTypes.object,
  addErrorLocationMsg: PropTypes.string,
  locationErrorHandleMsg: PropTypes.string,
  isLoading: PropTypes.bool,
  badgeUpdateData: PropTypes.object,
  badgeUpdateSuccess: PropTypes.bool,
  badgeUpdateMsg: PropTypes.string,
  verifyBadgeSuccess: PropTypes.bool,
  verifyBadgeMsg: PropTypes.string,
  userName: PropTypes.string,
  profileUserLoading: PropTypes.bool,
  handleData: PropTypes.func,
  badgeData: PropTypes.object,
  handleManageFirstBox: PropTypes.func,
};

export default Boarding;
