/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Vector from '../assets/images/Vector.svg';
import floorLocation from '../assets/images/floor-location.png';
import profile from '../assets/images/profileof.png';
import ProfileImg from '../assets/images/myprofile.png';

import {
  getWeekStartEndDate,
  getMonthStartEndDate,
  getWeekTitle,
} from './helpers';

const Calender = ({
  defaultSelected,
  setModal,
  userListData,
  setEmployeeModal,
  setEmployee,
  setLocation,
  setVisible,
  setShow,
  handleRemove,
  allUser,
}) => {
  const [period, setPeriod] = useState(defaultSelected);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [days, setDays] = useState(() =>
    defaultSelected === 'week'
      ? getWeekStartEndDate(new Date())
      : getMonthStartEndDate(new Date()),
  );
  const isDateSelected = useCallback(
    date => {
      return date && date.startOf('day').isSame(days.currentDate.startOf('day'))
        ? 'lightblue'
        : 'white';
    },
    [days.currentDate],
  );

  const title = useMemo(() => {
    return period === 'month'
      ? `${moment(days.startDate).format('MMMM')} ${moment(
          days.startDate,
        ).year()}`
      : getWeekTitle(days);
  }, [period, days]);

  const handlePrevNext = direction => {
    const { startDate, endDate } = days;
    const date = direction === 'prev' ? startDate : endDate;
    if (period === 'month') {
      const nextMonthStartDate = moment(endDate)
        .add(1, 'days')
        .toDate();
      const prevMonthEndDate = moment(startDate)
        .subtract(1, 'days')
        .toDate();
      setDays(
        getMonthStartEndDate(
          direction === 'prev' ? prevMonthEndDate : nextMonthStartDate,
          direction,
        ),
      );
    } else {
      const newDays = getWeekStartEndDate(date, direction);
      setDays(newDays);
      setSelectedWeek(newDays.startDate);
    }
  };

  const handleTimePeriod = periodType => {
    const { startDate } = days;
    const newDays =
      periodType === 'month'
        ? getMonthStartEndDate(startDate)
        : getWeekStartEndDate(selectedWeek);
    setDays(newDays);
    periodType === 'week' && setSelectedWeek(newDays.startDate);
    setPeriod(periodType);
  };

  const handleToday = () => {
    period === 'month'
      ? setDays(getMonthStartEndDate(new Date()))
      : setDays(getWeekStartEndDate(new Date()));
    setSelectedWeek(new Date());
  };
  return (
    <div className={!setVisible && 'myteam_wrapper'}>
      <div className="container">
        <div className={setVisible && 'update-office-workspot mt-40'}>
          {setVisible && <p className="week-range">{title}</p>}

          <div className="input-button-strip w-100 d-flex align-items-center">
            {!setVisible && <p className="week-range mb-0 me-4">{title}</p>}
            <div className="change-log">
              <button
                type="submit"
                className="prev"
                onClick={() => handlePrevNext('prev')}
              >
                &lsaquo;
              </button>
              <span className="what-day" onClick={handleToday}>
                Today
              </span>
              <button
                type="submit"
                className="next"
                onClick={() => handlePrevNext('next')}
              >
                &rsaquo;
              </button>
            </div>
            {setVisible && (
              <div
                className="week-month-toggle nav nav-tabs"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className="nav-link week-view active"
                  id="nav-week-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-week-view"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  onClick={() => handleTimePeriod('week')}
                >
                  Week
                </button>
                <button
                  className="nav-link week-view"
                  id="nav-month-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-month-view"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  onClick={() => handleTimePeriod('month')}
                >
                  Month
                </button>
              </div>
            )}

            {setVisible ? (
              <div className="updatespot">
                <button
                  type="submit"
                  className="blue-bg-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#showCalendar"
                  onClick={() => setModal(true)}
                >
                  Update My Workspot
                </button>
              </div>
            ) : (
              <div className="updatespot">
                <button
                  type="submit"
                  className="blue-bg-btn d-flex align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#invite_team"
                  onClick={() => setShow(true)}
                >
                  <span className="material-icons me-2">add</span>Invite Team to
                  the Office
                </button>
              </div>
            )}
          </div>

          <div className="tab-content" id="nav-tabContent">
            {period === 'week' ? (
              <>
                <div
                  className="tab-pane fade show active"
                  id="nav-week-view"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div
                    className={
                      setVisible
                        ? 'card weekly-default mt-4 '
                        : 'card weekly-default mt-4 month-view-content'
                    }
                  >
                    <div className="weekly-default-inner d-flex flex-wrap align-items-end">
                      {!setVisible && (
                        <>
                          {allUser &&
                            allUser.map(user => (
                              <>
                                <div className="my_team_member">
                                  <div className="d-flex align-items-center mb-1">
                                    <img src={ProfileImg} alt="" />
                                    <span className="member-name">
                                      My Workspace
                                    </span>
                                  </div>
                                  <span className="designation">
                                    UX/UI Designer
                                  </span>
                                </div>
                                {days.dateToDisplay.map(item => (
                                  <>
                                    <div
                                      className="day_one"
                                      onClick={() => setLocation(true)}
                                      aria-hidden="true"
                                      key={`${item.value}`}
                                    >
                                      <p className="day-name">{item.day}</p>
                                      <p
                                        className="date"
                                        style={{
                                          background: isDateSelected(item.date),
                                        }}
                                      >
                                        {' '}
                                        {item.value}
                                      </p>
                                      <div className="day-one-wrapper work-from-office border-top-blue">
                                        <p className="work-station work-floor">
                                          Washington, DC
                                        </p>
                                        <span className="floor-location">
                                          <img src={Vector} alt="" />
                                          Fl 4-Blue
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </>
                            ))}
                        </>
                      )}

                      {setVisible &&
                        days.dateToDisplay.map(item => (
                          <>
                            <div
                              className="day_one"
                              onClick={() => setLocation(true)}
                              aria-hidden="true"
                              key={`${item.value}`}
                            >
                              <p className="day-name">{item.day}</p>
                              <p
                                className="date"
                                style={{
                                  background: isDateSelected(item.date),
                                }}
                              >
                                {' '}
                                {item.value}
                              </p>
                              <div className="day-one-wrapper work-from-office border-top-blue">
                                <p className="work-station work-floor">
                                  Washington, DC
                                </p>
                                <span className="floor-location">
                                  <img src={Vector} alt="" />
                                  Fl 4-Blue
                                </span>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
                {userListData && userListData.length > 0 && (
                  <div className="mt-4">
                    Search results
                    <label className="weekly-remove" style={{ float: 'right' }}>
                      {' '}
                      Remove All
                    </label>
                  </div>
                )}

                {userListData &&
                  userListData.map(obj => (
                    <div
                      className="tab-pane fade show active"
                      id="nav-week-view"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div className="card weekly-default">
                        <div className="card mt-4 card-user-header">
                          <img
                            src={profile}
                            alt=""
                            style={{ padding: '0px 18px 12px 0px' }}
                          />
                          {'   '}
                          <label>
                            <b>{obj}</b>
                          </label>
                          <div
                            style={{ float: 'right' }}
                            className="weekly-remove"
                            aria-hidden="true"
                            onClick={() => handleRemove(obj)}
                          >
                            {' '}
                            Remove
                          </div>
                          <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                            {days.dateToDisplay.map(item => (
                              <div className="day_one" key={`${item.value}`}>
                                <p className="day-name">{item.day}</p>
                                <p
                                  className="date"
                                  style={{
                                    background: isDateSelected(item.date),
                                  }}
                                >
                                  {' '}
                                  {item.value}
                                </p>
                                <div
                                  className="day-one-wrapper work-from-office border-top-blue"
                                  onClick={() => setEmployee(true)}
                                  aria-hidden="true"
                                >
                                  <p className="work-station work-floor">
                                    Washington, DC
                                  </p>
                                  <span className="floor-location">
                                    <img src={Vector} alt="" />
                                    Fl 4-Blue
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div className="card weekly-default month-view-content">
                <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                  {days.dateToDisplay.map(items => (
                    <>
                      {items.map(item => (
                        <div
                          className={`${
                            item.disable &&
                            (item.day === 'Saturday' ||
                              item.day === 'Sunday' ||
                              item.weekend)
                              ? 'day_one disabled weekend'
                              : item.disable
                              ? 'day_one disabled'
                              : 'day_one'
                          }`}
                          key={`${item.value}`}
                        >
                          <p className="day-name">{item.day}</p>
                          <p
                            className="date"
                            style={{
                              background: isDateSelected(item.date),
                            }}
                          >
                            {item.value}
                          </p>
                          <div
                            className={`${
                              item.disable &&
                              (item.day === 'Saturday' ||
                                item.day === 'Sunday' ||
                                item.weekend)
                                ? 'day-one-wrapper'
                                : 'day-one-wrapper work-from-office border-top-blue'
                            }`}
                          >
                            <p className="work-station">Washington, DC</p>
                            <span className="floor-location">
                              <img src={floorLocation} alt="" />
                              Fl 4-Blue
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
          {period === 'week' && setVisible && (
            <button
              type="submit"
              className="light-blue-bg-btn mt-4"
              onClick={() => setEmployeeModal(true)}
            >
              {' '}
              <img src="./images/search-blue.svg" alt="" /> Search for
              Colleagues
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Calender.propTypes = {
  setModal: PropTypes.func,
  defaultSelected: PropTypes.string,
  userListData: PropTypes.object,
  setEmployeeModal: PropTypes.func,
  setEmployee: PropTypes.func,
  setLocation: PropTypes.func,
  setVisible: PropTypes.func,
  setShow: PropTypes.func,
  handleRemove: PropTypes.func,
  allUser: PropTypes.object,
};

export default Calender;
