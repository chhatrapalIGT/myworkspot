/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import ProfileImg from '../assets/images/myprofile.png';
import Edit from '../assets/images/edit.svg';
import Header from '../Header';
import { requestDelegateProfile } from '../../containers/ProfilePage/actions';

const DelegateProfile = props => {
  const location = useLocation();
  const path = location.pathname;
  let url = path.split('/');
  url = url[url.length - 1];

  const [deleCall, setDeleCall] = useState(true);

  useEffect(() => {
    if (deleCall) {
      props.requestDelegateProfile({ empId: url });
      setDeleCall(false);
    }
  }, [deleCall]);
  return (
    <Fragment>
      <>
        <Header />
        {/* {(apiMessage || locationMessage) && (
          <div
            className={`"alert-dismissible fade show ${
              apiSuccess || locationSuccess ? 'popup_success' : 'popup_err'
            } "`}
            role="alert"
          >
            <p className="text-center m-auto">
              {apiMessage || locationMessage || ''}
            </p>
          </div>
        )} */}
        <div className="wrapper_main">
          <div className="my-profile">
            <div className="container">
              <h4 className="common-title">My Profile</h4>

              {/* <div className="card my-profile-inner"> */}
              {isEmpty(props.delegateUserProfile) ? (
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  <Spinner
                    className="app-spinner profile"
                    animation="grow"
                    variant="dark"
                    // style={{ width: '0%' }}
                  />
                </div>
              ) : (
                <>
                  <div className="card my-profile-inner">
                    <div className="left-aside d-flex align-items-center justify-content-center">
                      <div className="wrapper">
                        <div className="profile-picture">
                          <img
                            src={
                              (props.delegateUserProfile &&
                                props.delegateUserProfile.photo) ||
                              ProfileImg
                            }
                            alt=""
                          />
                        </div>
                        <h3 className="profile-username">
                          {' '}
                          {props.delegateUserProfile &&
                            props.delegateUserProfile.firstname}{' '}
                          {props.delegateUserProfile &&
                            props.delegateUserProfile.lastname}
                        </h3>
                        <span className="designation">
                          {props.delegateUserProfile &&
                            props.delegateUserProfile.jobtitle}
                        </span>
                      </div>
                    </div>
                    <div className="right-content">
                      <div className="col_one">
                        <div className="attr_one">
                          <span>Employee ID</span>
                          <p>
                            {' '}
                            {props.delegateUserProfile &&
                              props.delegateUserProfile.employeeid}
                          </p>
                        </div>
                        <div className="attr_one">
                          <span>Manager</span>
                          <p>Cameron Williamson</p>
                        </div>
                      </div>
                      <div className="col_one">
                        <div className="attr_one">
                          <span>Primary Office</span>
                          <p>
                            {props.delegateUserProfile &&
                              props.delegateUserProfile.primaryofficelocation}
                          </p>
                        </div>
                        <div className="attr_one">
                          <span>Assigned Space</span>
                          <p>1435</p>
                        </div>
                      </div>
                      <div className="col_one">
                        <div className="attr_one">
                          <span>Badge Number</span>
                          {/* {!openBadge && ( */}
                          <>
                            {/* {userData.badgeNumber ? ( */}
                            <>
                              <p>
                                {/* {state.badgedata
                                      ? `BB ${state.badge.concat(
                                          state.badgedata,
                                        )}`
                                      : finalBadges} */}
                                {props.delegateUserProfile &&
                                  props.delegateUserProfile.badgeNumber}
                              </p>
                              <a
                                className="replace delegate_profile"
                                href
                                // onClick={() => setOpenBadge(true)}
                              >
                                <img src={Edit} alt="" />
                                Replace My Badge
                              </a>
                            </>
                          </>
                          {/* )} */}
                        </div>
                        {/* )} */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="weekly-default onboarding-main mt-40">
            <div className="container">
              <h4 className="common-title">Weekly Default</h4>
              <p className="stroke-2 mt-3 profile_desc">
                Your weekly default will pre-populate for each week unless you
                update <i>my</i>Workspot for a specific day. You can update{' '}
                <i>my</i>Workspot for a particular day on the homepage.
              </p>
              <div className="on-boarding-inner p-0">
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  {props.delegateUserWeek && !props.delegateUserWeek.length ? (
                    <Spinner
                      className="app-spinner profile"
                      animation="grow"
                      variant="dark"
                    />
                  ) : (
                    <>
                      {props.delegateUserWeek &&
                        props.delegateUserWeek.map(t => (
                          <div className="day_one delegate_profile">
                            <p className="day-name">{t.dayofweek}</p>

                            <a
                              href
                              data-bs-toggle="modal"
                              data-bs-target="#set_location"
                            >
                              <div
                                //   onClick={() => handleChangeDay(t.day, t.name)}
                                className={`day-one-wrapper ${
                                  t.locationName === ''
                                    ? 'add-location'
                                    : t.locationName !== 'Remote Work'
                                    ? 'work-from-office border-top-blue'
                                    : t.locationName === 'Remote Work'
                                    ? 'work-from-home'
                                    : 'add-location'
                                }`}
                              >
                                <label
                                  value={t.dayofweek}
                                  onClick={() => {
                                    //   handleButtonData(t.day);
                                  }}
                                >
                                  {t.locationName}
                                </label>
                              </div>
                            </a>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Fragment>
  );
};

const mapStateToProps = state => {
  const { profile } = state;
  return {
    delegateUserProfile:
      profile &&
      profile.delegateProfile &&
      profile.delegateProfile.delegateProfileList &&
      profile.delegateProfile.delegateProfileList.profile,
    delegateUserWeek:
      profile &&
      profile.delegateProfile &&
      profile.delegateProfile.delegateProfileList &&
      profile.delegateProfile.delegateProfileList.weeklydefaults,
  };
};
DelegateProfile.propTypes = {
  delegateUserProfile: PropTypes.object,
  delegateUserWeek: PropTypes.object,
  requestDelegateProfile: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    requestDelegateProfile: payload =>
      dispatch(requestDelegateProfile(payload)),
    dispatch,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DelegateProfile);
