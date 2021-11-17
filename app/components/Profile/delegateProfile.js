/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import ProfileImg from '../assets/images/myprofile.png';
import Edit from '../assets/images/edit.svg';
import {
  requestDelegateProfile,
  clearData,
} from '../../containers/ProfilePage/actions';
import crossCircle from '../../images/x-circle-fill.svg';

const DelegateProfile = props => {
  const location = useLocation();
  const path = location.pathname;
  let url = path.split('/');
  url = url[url.length - 1];

  useEffect(() => {
    props.requestDelegateProfile({ empId: url });
  }, [url]);

  useEffect(() => {
    if (props.delegateMessage) {
      setTimeout(() => {
        props.clearData();
      }, 5000);
    }
  }, [props.delegateMessage]);

  return (
    <Fragment>
      <>
        {!props.delegateSuccess && props.delegateMessage && (
          <div className="alert fade alert alert-danger show mx-auto">
            <div style={{ display: 'contents', lineHeight: '30px' }}>
              <img src={crossCircle} alt="" style={{ paddingRight: '5px' }} />
              <div>{props.delegateMessage}</div>
            </div>
            <div
              style={{ float: 'right', fontSize: 'large' }}
              onClick={() => props.clearData()}
              aria-hidden="true"
              className="day-pointer al_cross"
            >
              &#10006;
            </div>
          </div>
        )}
        <div className="wrapper_main">
          <div className="my-profile">
            <div className="container">
              <h4 className="common-title">My Profile</h4>

              {props.isLoading ? (
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  <Spinner
                    className="app-spinner profile"
                    animation="grow"
                    variant="dark"
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
                          <p>
                            {props.delegateUserProfile &&
                              props.delegateUserProfile.managerName}
                          </p>
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
                        {props.delegateUserProfile &&
                          props.delegateUserProfile.permanentdesk && (
                            <div className="attr_one">
                              <span>Assigned Space</span>
                              <p>
                                {props.delegateUserProfile &&
                                props.delegateUserProfile.permanentdesk
                                  ? props.delegateUserProfile.permanentdesk
                                  : ''}
                              </p>
                            </div>
                          )}
                      </div>
                      <div className="col_one">
                        <div className="attr_one">
                          <span>Badge Number</span>
                          <>
                            <p>
                              {props.delegateUserProfile &&
                                props.delegateUserProfile.badgeNumber}
                            </p>
                            <a className="replace delegate_profile" href>
                              <img src={Edit} alt="" />
                              Replace My Badge
                            </a>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="weekly-default onboarding-main m-40">
            <div className="container">
              <h4 className="common-title">Weekly Default</h4>
              <p className="stroke-2 mt-3 profile_desc">
                Your weekly default will pre-populate for each week unless you
                update <i>my</i>Workspot for a specific day.
                <br /> You can update <i>my</i>Workspot for a particular day on
                the homepage.
              </p>
              <div className="on-boarding-inner p-0">
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  {props.isLoading ? (
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
                                <label value={t.dayofweek}>
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
    isLoading:
      profile && profile.delegateProfile && profile.delegateProfile.loading,
    delegateSuccess: profile && profile.apiSuccess,
    delegateMessage: profile && profile.apiMessage,
  };
};
DelegateProfile.propTypes = {
  delegateUserProfile: PropTypes.object,
  delegateUserWeek: PropTypes.object,
  requestDelegateProfile: PropTypes.func,
  clearData: PropTypes.func,
  isLoading: PropTypes.bool,
  delegateMessage: PropTypes.string,
  delegateSuccess: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    requestDelegateProfile: payload =>
      dispatch(requestDelegateProfile(payload)),
    clearData: () => dispatch(clearData()),
    dispatch,
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DelegateProfile);
