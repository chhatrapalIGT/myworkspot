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
import { isEmpty } from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import Vector from '../assets/images/Vector.svg';
import floorLocation from '../assets/images/floor-location.png';
import profile from '../assets/images/profileof.png';
import ProfileImg from '../assets/images/myprofile.png';
import searchicon from '../assets/images/search-blue.svg';

import {
  getWeekStartEndDate,
  getMonthStartEndDate,
  getWeekTitle,
  getStartEndDate,
} from './helpers';

const Calender = ({
  defaultSelected,
  setModal,
  setEmployeeModal,
  setEmployee,
  handleEditModal,
  setVisible,
  setShow,
  handleRemove,
  allUser,
  setDate,
  setEmployeeLocationDetail,
  workSpotData = [],
  getWorkSpots,
  state,
  isLocUpdate,
  errSuccess,
  setCalData,
  weekVal,
}) => {
  const [period, setPeriod] = useState(defaultSelected);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [teamDate, setTeamDate] = useState(false);
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
      ? `${moment(days.startDate).format('MMMM')} ${'  '}  ${moment(
          days.startDate,
        ).year()}`
      : getWeekTitle(days);
  }, [period, days]);

  const callAPI = (datesArr, periodValue) => {
    const { startDispDate, endDispDate } = getStartEndDate(
      datesArr,
      periodValue,
    );
    getWorkSpots(startDispDate, endDispDate);
  };

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
      const newDays = getMonthStartEndDate(
        direction === 'prev' ? prevMonthEndDate : nextMonthStartDate,
        direction,
      );
      callAPI(newDays.dateToDisplay, period);
      setDays(newDays);
    } else {
      const newDays = getWeekStartEndDate(date, direction);
      callAPI(newDays.dateToDisplay, period);
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
    callAPI(newDays.dateToDisplay, periodType);
    setDays(newDays);
    periodType === 'week' && setSelectedWeek(newDays.startDate);
    setPeriod(periodType);
  };

  const handleToday = () => {
    const newDays =
      period === 'month'
        ? getMonthStartEndDate(new Date())
        : getWeekStartEndDate(new Date());
    callAPI(newDays.dateToDisplay, period);
    setDays(newDays);
    setSelectedWeek(new Date());
  };

  const isCurrentDate = useCallback(
    date => {
      return (
        date && date.startOf('day').isSame(days.currentDate.startOf('day'))
      );
    },
    [days.currentDate],
  );

  const getCorrespondingData = date => {
    const a = workSpotData.find(ele =>
      moment(ele.date, 'MM/D/YYYY').isSame(moment(date, 'MM/D/YYYY'), 'day'),
    );
    return a;
  };

  const getCorrespondingMyTeamData = (dateValue, employeeId) => {
    const user = allUser.find(
      ({ employeeid }) => employeeid.toString() === employeeId.toString(),
    );
    return user.data.find(
      ({ date }) =>
        moment(date).format('DD') === moment(dateValue).format('DD'),
    );
  };

  const getWeekWorkspotDataLoading = () => {
    const a = workSpotData.find(ele =>
      moment(ele.date, 'MM/D/YYYY').isSame(
        moment(days.dateToDisplay[0].date, 'MM/D/YYYY') ||
          moment(
            days.dateToDisplay.length[days.dateToDisplay.length - 1].date,
            'MM/D/YYYY',
          ),
        'day',
      ),
    );

    return a;
  };

  const getMonthWorkspotDataLoading = () => {
    const end = workSpotData.find(ele =>
      days.dateToDisplay[days.dateToDisplay.length - 1].find(e =>
        moment(ele.date, 'MM/D/YYYY').isSame(
          moment(e.date, 'MM/D/YYYY'),
          'day',
        ),
      ),
    );
    const start = workSpotData.find(ele =>
      days.dateToDisplay[0].find(d =>
        moment(ele.date, 'MM/D/YYYY').isSame(
          moment(d.date, 'MM/D/YYYY'),
          'day',
        ),
      ),
    );
    const b = !isEmpty(end) && !isEmpty(start);

    return b;
  };

  const locationClass = location => {
    let className;
    switch (location) {
      case 'RW':
        className = 'eab-home';
        break;
      case 'PTO':
        className = 'paid-time-off';
        break;
      case 'EAB':
        className = 'eab-firm-holiday';
        break;
      case location !== ('RW' || 'PTO' || 'EAB'):
        className = 'eab-office border-top-blue';
        break;
      default:
        className = 'eab-office border-top-blue';
    }
    return className;
  };

  return (
    <div className={!setVisible && 'myteam_wrapper'}>
      <div className="container">
        <div className={setVisible && 'update-office-workspot mt-40'}>
          {setVisible && <p className="week-range">{title}</p>}

          <div
            className="input-button-strip w-100 mt-4 d-flex align-items-center"
            style={{ marginTop: '25px' }}
          >
            <div className="change-log  me-4">
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
            {!setVisible && <p className="week-range mb-0">{title}</p>}
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
                  Update <i>my</i>Workspot
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
                    <div className="weekly-default-inner d-flex flex-wrap align-items-end hiren">
                      {!setVisible && weekVal ? (
                        <div style={{ margin: 'auto' }}>
                          <Spinner
                            className="app-spinner profile"
                            animation="grow"
                            variant="dark"
                          />
                        </div>
                      ) : (
                        !setVisible && (
                          <>
                            {allUser &&
                              allUser.map((user, userIdx) => (
                                <>
                                  <div className="my_team_member">
                                    <div className="d-flex align-items-center mb-1">
                                      <img src={ProfileImg} alt="" />
                                      <span className="member-name">
                                        {user.username || 'My Workspace'}
                                      </span>
                                    </div>
                                    <span className="designation">
                                      {/* UX/UI Designer */}
                                      {user && user.userRole}
                                    </span>
                                  </div>
                                  {days.dateToDisplay.map((item, itemIdx) => {
                                    const data = getCorrespondingMyTeamData(
                                      item.date,
                                      user.employeeid,
                                    );
                                    return (
                                      <>
                                        <div
                                          className={
                                            item.disable
                                              ? 'day_one disabled'
                                              : 'day_one'
                                          }
                                          onClick={() => {
                                            if (isCurrentDate(item.date)) {
                                              // setEmployeeLocationDetail(true);
                                              handleEditModal({
                                                ...data,
                                                user: user.userName,
                                              });
                                            }
                                          }}
                                          aria-hidden="true"
                                          key={`${item.value}`}
                                        >
                                          <p className="day-name">{item.day}</p>
                                          <p
                                            className="date"
                                            style={{
                                              background: isDateSelected(
                                                item.date,
                                              ),
                                            }}
                                          >
                                            {item.value}
                                          </p>

                                          <div className="day-one-wrapper work-from-office border-top-blue">
                                            <p className="work-station work-floor">
                                              {data && data.locationName}
                                            </p>
                                            <span className="floor-location">
                                              <img src={Vector} alt="" />
                                              {data && data.floor} -{' '}
                                              {data && data.color}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </>
                              ))}
                          </>
                        )
                      )}

                      {setVisible && !workSpotData.length ? (
                        <Spinner
                          className="app-spinner profile"
                          animation="grow"
                          variant="dark"
                        />
                      ) : setVisible && !getWeekWorkspotDataLoading() ? (
                        <Spinner
                          className="app-spinner profile"
                          animation="grow"
                          variant="dark"
                        />
                      ) : (
                        setVisible &&
                        workSpotData.length > 0 &&
                        days.dateToDisplay.map(item => {
                          const data = getCorrespondingData(item.date);
                          setCalData(workSpotData);

                          return (
                            <>
                              <div
                                className={
                                  item.disable ? 'day_one disabled' : 'day_one'
                                }
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
                                <div
                                  className={
                                    item.disable || isCurrentDate(item.date)
                                      ? `{ day-one-wrapper ${locationClass(
                                          data && data.locationCode,
                                        )} }`
                                      : `{ day-one-wrapper ${locationClass(
                                          data && data.locationCode,
                                        )} day-pointer }`
                                  }
                                  onClick={() => {
                                    !item.disable &&
                                      !isCurrentDate(item.date) &&
                                      handleEditModal(
                                        true,
                                        item.date,
                                        `${data && data.locationCode}`,
                                        'self',
                                        `${data && data.locationCode}`,
                                        `${data && data.locationName}`,
                                      );
                                    setDate(
                                      moment(item.date).format(
                                        'dddd, MMMM DD, YYYY',
                                      ),
                                    );
                                  }}
                                  aria-hidden="true"
                                >
                                  <p className="work-station work-floor">
                                    {moment(data.date, 'MM/D/YYYY').isSame(
                                      moment(
                                        state.updatingObject.date,
                                        'MM/D/YYYY',
                                      ),
                                      'day',
                                    ) && isLocUpdate
                                      ? state.updatingObject.work_area_name
                                      : data && data.locationName}
                                  </p>
                                  {(data && data.locationCode !== 'RW') ||
                                    (data && data.locationCode !== 'PTO') ||
                                    (data && data.locationCode !== 'EAB' && (
                                      <span className="floor-location">
                                        <img src={Vector} alt="" />
                                        {data && data.floor} -{' '}
                                        {data && data.color}
                                      </span>
                                    ))}
                                </div>
                              </div>
                            </>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
                {setVisible && allUser && allUser.length > 0 && (
                  <div className="mt-4">
                    Search results
                    <label className="weekly-remove" style={{ float: 'right' }}>
                      {' '}
                      Remove All
                    </label>
                    <hr />
                  </div>
                )}

                {setVisible &&
                  allUser &&
                  allUser.map((obj, userIdx) => (
                    <div
                      className="tab-pane fade show active"
                      id="nav-week-view"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div className="card weekly-default">
                        <div className="card mt-4 card-user-header">
                          <div
                            style={{
                              borderBottom: '1px solid #d1dce7',
                              padding: '0px 25px',
                            }}
                          >
                            <img
                              src={profile}
                              alt=""
                              style={{ padding: '0px 18px 12px 0px' }}
                            />
                            {'   '}
                            <label>
                              <b>{obj.userName}</b>
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
                          </div>
                          <div className="weekly-default-inner d-flex flex-wrap">
                            {days.dateToDisplay.map((item, itemIdx) => {
                              const data = allUser[userIdx].workspot[itemIdx];
                              return (
                                <div
                                  className={
                                    item.disable
                                      ? 'day_one disabled'
                                      : 'day_one'
                                  }
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

                                  <div
                                    className={
                                      isCurrentDate(item.date)
                                        ? 'day-one-wrapper work-from-office day-pointer border-top-blue'
                                        : 'day-one-wrapper work-from-office border-top-blue'
                                    }
                                    onClick={() => {
                                      isCurrentDate(item.date) &&
                                        setEmployee(true);
                                      setDate(
                                        moment(item.date).format(
                                          'dddd, MMMM DD, YYYY',
                                        ),
                                      );
                                    }}
                                    aria-hidden="true"
                                  >
                                    <p className="work-station work-floor">
                                      {data && data.locationName}
                                    </p>
                                    <span className="floor-location">
                                      <img src={Vector} alt="" />
                                      {data && data.floor} -{' '}
                                      {data && data.color}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div className="card weekly-default month-view-content month-spinner">
                {setVisible && !getMonthWorkspotDataLoading() ? (
                  <Spinner
                    className="app-spinner profile"
                    animation="grow"
                    variant="dark"
                  />
                ) : (
                  <div className="card mt-4 weekly-default-inner d-flex flex-wrap">
                    {days.dateToDisplay.map(items => (
                      <>
                        {items.map(item => {
                          const data = getCorrespondingData(item.date);

                          return (
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
                                className={
                                  item.disable ||
                                  (item.day === 'Saturday' ||
                                    item.day === 'Sunday' ||
                                    item.weekend) ||
                                  isCurrentDate(item.date)
                                    ? `{ day-one-wrapper ${locationClass(
                                        data && data.locationCode,
                                      )} }`
                                    : `{ day-one-wrapper ${locationClass(
                                        data && data.locationCode,
                                      )} day-pointer }`
                                }
                                onClick={() => {
                                  !item.disable &&
                                    !isCurrentDate(item.date) &&
                                    handleEditModal(
                                      true,
                                      item.date,
                                      `${data && data.locationCode}`,
                                      'self',
                                      `${data && data.locationCode}`,
                                      `${data && data.locationName}`,
                                    );
                                  setDate(
                                    moment(item.date).format(
                                      'dddd, MMMM DD, YYYY',
                                    ),
                                  );
                                }}
                                aria-hidden="true"
                              >
                                <p className="work-station">
                                  {moment(data.date, 'MM/D/YYYY').isSame(
                                    moment(
                                      state.updatingObject.date,
                                      'MM/D/YYYY',
                                    ),
                                    'day',
                                  ) && isLocUpdate
                                    ? state.updatingObject.work_area_name
                                    : data && data.locationName}
                                  {/* {data && data.locationName} */}
                                </p>
                                {(data && data.locationCode !== 'RW') ||
                                  (data && data.locationCode !== 'PTO') ||
                                  ((data && data.locationCode !== 'EAB') ||
                                    (((data && data.locationCode === 'DC') ||
                                      (data &&
                                        data.locationCode === 'VA' &&
                                        item.disable &&
                                        isCurrentDate(item.date))) && (
                                      <span className="floor-location">
                                        <img src={Vector} alt="" />
                                        {data && data.floor} -{' '}
                                        {data && data.color}
                                      </span>
                                    )))}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* {period === 'week' && setVisible && (
            <button
              type="submit"
              className="light-blue-bg-btn mt-4"
              onClick={() => setEmployeeModal(true)}
            >
              {' '}
              <img src={searchicon} alt="" /> Search for Colleagues
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

Calender.propTypes = {
  setModal: PropTypes.func,
  defaultSelected: PropTypes.string,
  setEmployeeModal: PropTypes.func,
  setEmployee: PropTypes.func,
  handleEditModal: PropTypes.func,
  setVisible: PropTypes.func,
  setShow: PropTypes.func,
  handleRemove: PropTypes.func,
  getWorkSpots: PropTypes.func,
  allUser: PropTypes.array,
  workSpotData: PropTypes.array,
  setDate: PropTypes.string,
  setEmployeeLocationDetail: PropTypes.bool,
  state: PropTypes.object,
  isLocUpdate: PropTypes.bool,
  errSuccess: PropTypes.bool,
  setCalData: PropTypes.object,
  weekVal: PropTypes.bool,
};

export default Calender;
