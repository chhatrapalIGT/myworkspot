/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import Vector from '../assets/images/Vector.svg';
import Space from '../../images/private.png';
import floorLocation from '../assets/images/floor-location.png';
import profile from '../assets/images/profileof.png';
import ProfileImg from '../assets/images/myprofile.png';
import searchicon from '../assets/images/search-blue.svg';
import eabVector from '../assets/images/eab-Vector.png';

import {
  getWeekStartEndDate,
  getMonthStartEndDate,
  getWeekTitle,
  getStartEndDate,
} from './helpers';

const Calender = ({
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
  setChange,
  colleagueWeeklyData,
  teamLoading,
  displayDefault,
  requestGetColleagueData,
  handleColleagueModal,
  colleagueDataLoader,
  handleDefault,
}) => {
  const [period, setPeriod] = useState(displayDefault);
  const [colleagueData, setColleagueData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [days, setDays] = useState(() =>
    displayDefault === 'week'
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
    const sDate = moment(startDispDate).format('YYYY-MM-DD');
    const eDate = moment(endDispDate).format('YYYY-MM-DD');

    periodValue !== 'month' &&
      setVisible &&
      requestGetColleagueData({ startdate: sDate, enddate: eDate });
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
    const a =
      workSpotData &&
      workSpotData.find(ele =>
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

  const getCorrespondingColleagueData = (dateValue, employeeId) => {
    const user = colleagueData.find(
      ({ employeeid }) => employeeid === employeeId,
    );
    const data =
      user.workspotdata.length > 0 &&
      user &&
      user.workspotdata &&
      // eslint-disable-next-line array-callback-return
      user.workspotdata.find(obj => {
        if (obj.unitsapproved) {
          if (
            moment(obj.date).format('DD') === moment(dateValue).format('DD')
          ) {
            return obj;
          }
        }

        return moment(obj.date).format('DD') === moment(dateValue).format('DD');
      });

    return data;
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

  const halfLocationClass = loc => {
    let className;
    switch (loc) {
      case 'RW':
        className = 'half-paid-off-remote';
        break;
      case 'EAB':
        className = 'has-half-paid-off';
        break;

      default:
        className = 'has-half-paid-off';
    }
    return className;
  };

  useEffect(() => {
    setColleagueData(colleagueWeeklyData);
  }, [colleagueWeeklyData]);

  const handleRemoveColleague = data => {
    const newArr = [...colleagueData];
    if (newArr.length === data.length) {
      newArr.splice(newArr);
    } else if (newArr.includes(data)) {
      const idx = newArr.indexOf(data);
      newArr.splice(idx, 1);
    }
    setColleagueData(newArr);
  };

  // eslint-disable-next-line consistent-return
  const modalColorCode = color => {
    if (color === '0072CE') {
      return 'Blue';
    } else if (color === 'ED8B00') {
      return 'Orange';
    } else if (color === '00B1B0') {
      return 'Teal';
    } else if (color === 'F7CA0F') {
      return 'Yellow';
    }
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
            {setVisible && workSpotData.length > 0 && (
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
                    {!setVisible && teamLoading ? (
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
                                <div className="weekly-default-inner weekly-default-inner-team d-flex flex-wrap align-items-end">
                                  <div className="my_team_member">
                                    <div className="d-flex align-items-center">
                                      <img src={ProfileImg} alt="" />
                                      <span className="member-name member-space text-decor">
                                        {' '}
                                        {user.username}
                                      </span>
                                    </div>
                                    <p
                                      className="designation text-decor"
                                      title={user.jobtitle}
                                    >
                                      {/* UX/UI Designer */}
                                      {user && user.jobtitle}
                                    </p>
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
                                              ? 'day_one day_one_myteam disabled'
                                              : 'day_one day_one_myteam'
                                          }
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
                                          {data &&
                                          data.unitsapproved === '0.5' ? (
                                            <>
                                              {data &&
                                                data.data.map(teamPart => (
                                                  <div
                                                    className={`day-one-wrapper ${
                                                      teamPart &&
                                                      teamPart.locationCode ===
                                                        'PTO'
                                                        ? 'half-paid-off mt-6'
                                                        : isCurrentDate(
                                                            item.date,
                                                          ) &&
                                                          ((teamPart &&
                                                            teamPart.locationCode ===
                                                              'RIC') ||
                                                            (teamPart &&
                                                              teamPart.locationCode ===
                                                                'DC'))
                                                        ? 'has-half-paid-off day-pointer'
                                                        : 'has-half-paid-off '
                                                    }`}
                                                    onClick={() => {
                                                      if (
                                                        isCurrentDate(
                                                          item.date,
                                                        ) &&
                                                        ((teamPart &&
                                                          teamPart.locationCode ===
                                                            'RIC') ||
                                                          (teamPart &&
                                                            teamPart.locationCode ===
                                                              'DC'))
                                                      ) {
                                                        setEmployeeLocationDetail(
                                                          true,
                                                        );
                                                        handleEditModal({
                                                          ...teamPart,
                                                          user: user.username,
                                                        });
                                                      }
                                                    }}
                                                    aria-hidden="true"
                                                    key={`${item.value}`}
                                                  >
                                                    <p className="work-station half-paid-off">
                                                      {teamPart.locationCode ===
                                                      'PTO'
                                                        ? teamPart &&
                                                          teamPart.timeofftype
                                                        : teamPart &&
                                                          teamPart.locationName}
                                                    </p>
                                                  </div>
                                                ))}
                                            </>
                                          ) : (
                                            <div
                                              className={
                                                isCurrentDate(item.date) &&
                                                ((data &&
                                                  data.locationCode ===
                                                    'RIC') ||
                                                  (data &&
                                                    data.locationCode === 'DC'))
                                                  ? `{ day-one-wrapper ${locationClass(
                                                      data && data.locationCode,
                                                    )} day-pointer }`
                                                  : `{ day-one-wrapper ${locationClass(
                                                      data && data.locationCode,
                                                    )}  }`
                                              }
                                              onClick={() => {
                                                if (
                                                  isCurrentDate(item.date) &&
                                                  ((data &&
                                                    data.locationCode ===
                                                      'RIC') ||
                                                    (data &&
                                                      data.locationCode ===
                                                        'DC'))
                                                ) {
                                                  setEmployeeLocationDetail(
                                                    true,
                                                  );
                                                  handleEditModal({
                                                    ...data,
                                                    user: user.username,
                                                  });
                                                }
                                              }}
                                              aria-hidden="true"
                                              key={`${item.value}`}
                                            >
                                              <p
                                                className={
                                                  data &&
                                                  data.locationCode === 'RW'
                                                    ? 'work-station remote-work work-floor'
                                                    : data &&
                                                      data.locationCode ===
                                                        'PTO'
                                                    ? 'work-station paid-time-off-text work-floor'
                                                    : data &&
                                                      data.locationCode ===
                                                        'EAB'
                                                    ? 'work-station eab-holiday work-floor'
                                                    : 'work-station work-floor'
                                                }
                                              >
                                                {data && data.timeofftype
                                                  ? data.timeofftype
                                                  : data && data.eabHolidayType
                                                  ? data.eabHolidayType
                                                  : data && data.locationName}
                                              </p>

                                              {data &&
                                                data.locationCode !== 'RW' &&
                                                (data &&
                                                  data.locationCode !==
                                                    'PTO') &&
                                                (data &&
                                                  data.locationCode !==
                                                    'EAB') && (
                                                  <span className="floor-location">
                                                    {((data &&
                                                      data.floor !== null) ||
                                                      (data &&
                                                        data.building !==
                                                          null) ||
                                                      (data &&
                                                        data.colorcode !==
                                                          '')) && (
                                                      <>
                                                        {data &&
                                                          data.building !==
                                                            undefined &&
                                                          (data &&
                                                            data.floor !==
                                                              undefined) && (
                                                            <>
                                                              <img
                                                                src={Vector}
                                                                alt=""
                                                              />
                                                              {data &&
                                                                data.building !==
                                                                  null &&
                                                                `Bldg ${data &&
                                                                  data.building} -`}{' '}
                                                              {data &&
                                                                data.floor !==
                                                                  null &&
                                                                `Fl ${data &&
                                                                  data.floor} -`}{' '}
                                                              {data &&
                                                                data.colorcode !==
                                                                  '' &&
                                                                modalColorCode(
                                                                  data &&
                                                                    data.colorcode,
                                                                )}
                                                            </>
                                                          )}
                                                      </>
                                                    )}
                                                  </span>
                                                )}

                                              {data &&
                                                data.locationCode === 'EAB' && (
                                                  <span
                                                    className="floor-location eab-holiday eab-holiday-name"
                                                    title={
                                                      data && data.locationName
                                                    }
                                                  >
                                                    <img
                                                      src={eabVector}
                                                      alt=""
                                                    />
                                                    {data && data.locationName}
                                                  </span>
                                                )}
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </>
                            ))}
                        </>
                      )
                    )}

                    {/* for week View calendar */}
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
                      workSpotData.length > 0 && (
                        <div className="weekly-default-inner d-flex flex-wrap align-items-end">
                          {days.dateToDisplay.map(item => {
                            const data = getCorrespondingData(item.date);

                            return (
                              <>
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

                                  {data && data.unitsapproved === '0.5' ? (
                                    <>
                                      {data.data.map(partially => {
                                        return (
                                          <div
                                            className={`day-one-wrapper 
                                            ${
                                              partially &&
                                              partially.locationCode === 'PTO'
                                                ? 'half-paid-off'
                                                : item.disable ||
                                                  isCurrentDate(item.date)
                                                ? `day-one-wrapper ${halfLocationClass(
                                                    partially &&
                                                      partially.locationCode,
                                                  )}`
                                                : `day-one-wrapper ${halfLocationClass(
                                                    partially &&
                                                      partially.locationCode,
                                                  )} day-pointer`
                                            }`}
                                            onClick={() => {
                                              !item.disable &&
                                                !isCurrentDate(item.date) &&
                                                (partially &&
                                                  partially.locationCode !==
                                                    'PTO') &&
                                                handleEditModal(
                                                  true,
                                                  item.date,
                                                  `${partially &&
                                                    partially.locationCode}`,
                                                  'self',
                                                  `${partially &&
                                                    partially.locationCode}`,
                                                  `${partially &&
                                                    partially.locationName}`,
                                                );
                                              setDate(
                                                moment(item.date).format(
                                                  'dddd, MMMM DD, YYYY',
                                                ),
                                              );
                                              setChange(false);
                                            }}
                                            aria-hidden="true"
                                          >
                                            <p className="work-station half-paid-off">
                                              {partially &&
                                              partially.locationCode === 'PTO'
                                                ? partially &&
                                                  partially.timeofftype
                                                : partially &&
                                                  partially.locationName}

                                              {((partially &&
                                                partially.building !== null) ||
                                                (partially &&
                                                  partially.floor !== null) ||
                                                (partially &&
                                                  partially.colorcode !==
                                                    '')) && (
                                                <span className="hover-data">
                                                  {partially &&
                                                    partially.building !==
                                                      null &&
                                                    `Bldg ${partially &&
                                                      partially.building} -`}{' '}
                                                  {partially &&
                                                    partially.floor !== null &&
                                                    `Fl ${partially &&
                                                      partially.floor} -`}{' '}
                                                  {partially &&
                                                    partially.colorcode !==
                                                      '' &&
                                                    modalColorCode(
                                                      partially &&
                                                        partially.colorcode,
                                                    )}
                                                </span>
                                              )}
                                            </p>
                                          </div>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <div
                                      className={
                                        item.disable ||
                                        isCurrentDate(item.date) ||
                                        ((data &&
                                          data.locationCode === 'PTO') ||
                                          (data && data.locationCode === 'EAB'))
                                          ? `day-one-wrapper ${locationClass(
                                              data && data.locationCode,
                                            )} `
                                          : `day-one-wrapper ${locationClass(
                                              data && data.locationCode,
                                            )} day-pointer`
                                      }
                                      onClick={() => {
                                        !item.disable &&
                                          !isCurrentDate(item.date) &&
                                          (data &&
                                            data.locationCode !== 'PTO') &&
                                          (data &&
                                            data.locationCode !== 'EAB') &&
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
                                        setChange(false);
                                      }}
                                      aria-hidden="true"
                                    >
                                      <p
                                        className={
                                          data && data.locationCode === 'RW'
                                            ? 'work-station remote-work work-floor'
                                            : data &&
                                              data.locationCode === 'PTO'
                                            ? 'work-station paid-time-off-text work-floor'
                                            : data &&
                                              data.locationCode === 'EAB'
                                            ? 'work-station eab-holiday work-floor'
                                            : 'work-station work-floor'
                                        }
                                      >
                                        {data && data.timeofftype
                                          ? data.timeofftype
                                          : data && data.eabHolidayType
                                          ? data.eabHolidayType
                                          : data && data.locationName}
                                      </p>

                                      {data &&
                                        data.locationCode !== 'RW' &&
                                        (data && data.locationCode !== 'PTO') &&
                                        (data &&
                                          data.locationCode !== 'EAB') && (
                                          <>
                                            <span className="floor-location">
                                              {((data && data.floor !== null) ||
                                                (data &&
                                                  data.building !== null) ||
                                                (data &&
                                                  data.colorcode !== '')) && (
                                                <>
                                                  {data &&
                                                    data.building !==
                                                      undefined &&
                                                    (data &&
                                                      data.floor !==
                                                        undefined) && (
                                                      <>
                                                        <img
                                                          src={Vector}
                                                          alt=""
                                                        />
                                                        {data &&
                                                          data.building !==
                                                            null &&
                                                          `Bldg ${data &&
                                                            data.building} -`}{' '}
                                                        {data &&
                                                          data.floor !== null &&
                                                          `Fl ${data &&
                                                            data.floor} -`}{' '}
                                                        {data &&
                                                          data.colorcode !==
                                                            '' &&
                                                          modalColorCode(
                                                            data &&
                                                              data.colorcode,
                                                          )}
                                                      </>
                                                    )}
                                                </>
                                              )}
                                            </span>
                                            <span>
                                              {data && data.isPrivateSpace && (
                                                <img
                                                  src={Space}
                                                  alt="space"
                                                  style={{
                                                    height: '30px',
                                                    width: '30px',
                                                    marginLeft: '116px',
                                                    marginTop: '15px',
                                                  }}
                                                />
                                              )}
                                            </span>
                                          </>
                                        )}

                                      {data && data.locationCode === 'EAB' && (
                                        <span
                                          className="floor-location eab-holiday eab-holiday-name"
                                          title={data && data.locationName}
                                        >
                                          <img src={eabVector} alt="" />
                                          {data && data.locationName}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      )
                    )}
                  </div>
                </div>
                {setVisible && colleagueData && colleagueData.length > 0 && (
                  <div className="mt-4">
                    Search results
                    <label
                      className="weekly-remove"
                      style={{ float: 'right' }}
                      aria-hidden="true"
                      onClick={() => {
                        handleRemove(colleagueData, true, null);
                        handleRemoveColleague(colleagueData);
                      }}
                    >
                      {' '}
                      Remove All
                    </label>
                    <hr />
                  </div>
                )}
                {/* {setVisible && colleagueDataLoader ? (
                  <div className=" tab-pane fade show active">
                    <div className="card weekly-default mt-4 ">
                      <Spinner
                        className="app-spinner profile"
                        animation="grow"
                        variant="dark"
                      />
                    </div>
                  </div>
                ) : ( */}
                {setVisible &&
                  colleagueData.length > 0 &&
                  colleagueData.map((obj, userIdx) => (
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
                              style={{
                                padding: '5px 12px 12px 0px',
                                height: ' 40px',
                              }}
                            />
                            {'   '}
                            <label style={{ paddingBottom: ' 18px' }}>
                              <b>
                                {obj.employeeidFirstname}{' '}
                                {obj.employeeidLastname}
                              </b>
                            </label>
                            <div
                              style={{ float: 'right' }}
                              className="weekly-remove"
                              aria-hidden="true"
                              onClick={() => {
                                handleRemove(obj.employeeid, false, obj);
                                handleRemoveColleague(obj);
                              }}
                            >
                              {' '}
                              Remove
                            </div>
                          </div>
                          <div className="weekly-default-inner d-flex flex-wrap">
                            {days.dateToDisplay.map((item, itemIdx) => {
                              const data = getCorrespondingColleagueData(
                                item.date,
                                obj.employeeid,
                              );

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
                                  {data && data.unitsapproved === '0.5' ? (
                                    <>
                                      {data.data.map(partially => (
                                        <div
                                          className={`day-one-wrapper ${
                                            partially &&
                                            partially.locationCode === 'PTO'
                                              ? 'half-paid-off'
                                              : item.disable ||
                                                isCurrentDate(item.date)
                                              ? 'has-half-paid-off day-pointer'
                                              : 'has-half-paid-off '
                                          }`}
                                          onClick={() => {
                                            handleColleagueModal({
                                              ...partially,
                                              firstName:
                                                obj.employeeidFirstname,
                                              lastName: obj.employeeidLastname,
                                            });
                                            isCurrentDate(item.date) &&
                                              partially &&
                                              partially.locationCode !== 'RW' &&
                                              partially &&
                                              partially.locationCode !==
                                                'PTO' &&
                                              partially &&
                                              partially.locationCode !==
                                                'EAB' &&
                                              setEmployee(true);
                                            setDate(
                                              moment(item.date).format(
                                                'dddd, MMMM DD, YYYY',
                                              ),
                                            );
                                            handleDefault();
                                          }}
                                          aria-hidden="true"
                                        >
                                          <p className="work-station half-paid-off">
                                            {partially &&
                                            partially.locationCode === 'PTO'
                                              ? partially &&
                                                partially.timeofftype
                                              : partially &&
                                                partially.locationName}
                                          </p>
                                        </div>
                                      ))}
                                    </>
                                  ) : (
                                    <div
                                      className={
                                        item.disable
                                          ? `{ day-one-wrapper ${locationClass(
                                              data && data.locationCode,
                                            )} }`
                                          : isCurrentDate(item.date) &&
                                            data &&
                                            data.locationCode !== 'RW' &&
                                            data &&
                                            data.locationCode !== 'PTO' &&
                                            data &&
                                            data.locationCode !== 'EAB'
                                          ? ` day-one-wrapper ${locationClass(
                                              data && data.locationCode,
                                            )} day-pointer `
                                          : ` day-one-wrapper ${locationClass(
                                              data && data.locationCode,
                                            )}`
                                      }
                                      onClick={() => {
                                        handleColleagueModal({
                                          ...data,
                                          firstName: obj.employeeidFirstname,
                                          lastName: obj.employeeidLastname,
                                        });
                                        isCurrentDate(item.date) &&
                                          data &&
                                          data.locationCode !== 'RW' &&
                                          data &&
                                          data.locationCode !== 'PTO' &&
                                          data &&
                                          data.locationCode !== 'EAB' &&
                                          setEmployee(true);
                                        setDate(
                                          moment(item.date).format(
                                            'dddd, MMMM D, YYYY',
                                          ),
                                        );
                                        handleDefault();
                                      }}
                                      aria-hidden="true"
                                    >
                                      <p
                                        className={
                                          data && data.locationCode === 'RW'
                                            ? 'work-station remote-work work-floor'
                                            : data &&
                                              data.locationCode === 'PTO'
                                            ? 'work-station paid-time-off-text work-floor'
                                            : data &&
                                              data.locationCode === 'EAB'
                                            ? 'work-station eab-holiday work-floor'
                                            : 'work-station work-floor'
                                        }
                                      >
                                        {data && data.timeofftype
                                          ? data.timeofftype
                                          : data && data.eabHolidayType
                                          ? data.eabHolidayType
                                          : data && data.locationName}
                                      </p>

                                      {data &&
                                        data.locationCode !== 'RW' &&
                                        (data && data.locationCode !== 'PTO') &&
                                        (data &&
                                          data.locationCode !== 'EAB') && (
                                          <span className="floor-location">
                                            {((data && data.floor !== null) ||
                                              (data &&
                                                data.building !== null) ||
                                              (data &&
                                                data.colorcode !== '')) && (
                                              <>
                                                {data &&
                                                  data.building !== undefined &&
                                                  (data &&
                                                    data.floor !==
                                                      undefined) && (
                                                    <>
                                                      <img
                                                        src={Vector}
                                                        alt=""
                                                      />
                                                      {data &&
                                                        data.building !==
                                                          null &&
                                                        `Bldg ${data &&
                                                          data.building} -`}{' '}
                                                      {data &&
                                                        data.floor !== null &&
                                                        `Fl ${data &&
                                                          data.floor} -`}{' '}
                                                      {data &&
                                                        data.colorcode !== '' &&
                                                        modalColorCode(
                                                          data &&
                                                            data.colorcode,
                                                        )}
                                                    </>
                                                  )}
                                              </>
                                            )}
                                          </span>
                                        )}

                                      {data && data.locationCode === 'EAB' && (
                                        <span
                                          className="floor-location eab-holiday eab-holiday-name"
                                          title={data && data.locationName}
                                        >
                                          <img src={eabVector} alt="" />
                                          {data && data.locationName}
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* // )} */}
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
                  <div className="mt-4 weekly-default-inner d-flex flex-wrap">
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

                              {data && data.unitsapproved === '0.5' ? (
                                <>
                                  {data.data.map(otherHalf => (
                                    <div
                                      className={`day-one-wrapper ${
                                        otherHalf &&
                                        otherHalf.locationCode === 'PTO'
                                          ? 'half-paid-off'
                                          : item.disable ||
                                            (item.day === 'Saturday' ||
                                              item.day === 'Sunday' ||
                                              item.weekend) ||
                                            isCurrentDate(item.date)
                                          ? `day-one-wrapper ${halfLocationClass(
                                              otherHalf &&
                                                otherHalf.locationCode,
                                            )}`
                                          : `day-one-wrapper ${halfLocationClass(
                                              otherHalf &&
                                                otherHalf.locationCode,
                                            )} day-pointer`
                                      }`}
                                      onClick={() => {
                                        !item.disable &&
                                          !isCurrentDate(item.date) &&
                                          (otherHalf &&
                                            otherHalf.locationCode !== 'PTO') &&
                                          handleEditModal(
                                            true,
                                            item.date,
                                            `${otherHalf &&
                                              otherHalf.locationCode}`,
                                            'self',
                                            `${otherHalf &&
                                              otherHalf.locationCode}`,
                                            `${otherHalf &&
                                              otherHalf.locationName}`,
                                          );

                                        setDate(
                                          moment(item.date).format(
                                            'dddd, MMMM DD, YYYY',
                                          ),
                                        );
                                        // handleLocDate(item.date);
                                      }}
                                      aria-hidden="true"
                                    >
                                      <p className="work-station half-paid-off">
                                        {otherHalf &&
                                        otherHalf.locationCode === 'PTO'
                                          ? otherHalf && otherHalf.timeofftype
                                          : otherHalf && otherHalf.locationName}

                                        {((otherHalf &&
                                          otherHalf.building !== null) ||
                                          (otherHalf &&
                                            otherHalf.floor !== null) ||
                                          (otherHalf &&
                                            otherHalf.colorcode !== '')) && (
                                          <span className="hover-data month-hover-data">
                                            {otherHalf &&
                                              otherHalf.building !== null &&
                                              `Bldg ${otherHalf &&
                                                otherHalf.building} -`}{' '}
                                            {otherHalf &&
                                              otherHalf.floor !== null &&
                                              `Fl ${otherHalf &&
                                                otherHalf.floor} -`}{' '}
                                            {otherHalf &&
                                              otherHalf.colorcode !== '' &&
                                              modalColorCode(
                                                otherHalf &&
                                                  otherHalf.colorcode,
                                              )}
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <div
                                  className={
                                    item.disable ||
                                    (item.day === 'Saturday' ||
                                      item.day === 'Sunday' ||
                                      item.weekend) ||
                                    isCurrentDate(item.date) ||
                                    (data && data.locationCode === 'PTO') ||
                                    (data && data.locationCode === 'EAB')
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
                                      (data && data.locationCode !== 'PTO') &&
                                      (data && data.locationCode !== 'EAB') &&
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
                                    // handleLocDate(item.date);
                                  }}
                                  aria-hidden="true"
                                >
                                  <p
                                    className={
                                      data && data.locationCode === 'RW'
                                        ? 'work-station remote-work work-floor'
                                        : data && data.locationCode === 'PTO'
                                        ? 'work-station paid-time-off-text work-floor'
                                        : data && data.locationCode === 'EAB'
                                        ? 'work-station eab-holiday work-floor'
                                        : 'work-station work-floor'
                                    }
                                  >
                                    {data && data.timeofftype
                                      ? data.timeofftype
                                      : data && data.eabHolidayType
                                      ? data.eabHolidayType
                                      : data && data.locationName}
                                  </p>

                                  {data &&
                                    data.locationCode !== 'RW' &&
                                    (data && data.locationCode !== 'PTO') &&
                                    (data && data.locationCode !== 'EAB') && (
                                      <>
                                        <span className="floor-location">
                                          {((data && data.floor !== null) ||
                                            (data && data.building !== null) ||
                                            (data &&
                                              data.colorcode !== '')) && (
                                            <>
                                              {data &&
                                                data.building !== undefined &&
                                                (data &&
                                                  data.floor !== undefined) && (
                                                  <>
                                                    <img src={Vector} alt="" />
                                                    {data &&
                                                      data.building !== null &&
                                                      `Bldg ${data &&
                                                        data.building} -`}{' '}
                                                    {data &&
                                                      data.floor !== null &&
                                                      `Fl ${data &&
                                                        data.floor} -`}{' '}
                                                    {data &&
                                                      data.colorcode !== '' &&
                                                      modalColorCode(
                                                        data && data.colorcode,
                                                      )}
                                                  </>
                                                )}
                                            </>
                                          )}
                                        </span>
                                        <span>
                                          {data && data.isPrivateSpace && (
                                            <img
                                              src={Space}
                                              alt=""
                                              style={{
                                                height: '30px',
                                                width: '30px',
                                                marginLeft: '116px',
                                                marginTop: '15px',
                                              }}
                                            />
                                          )}
                                        </span>
                                      </>
                                    )}

                                  {data && data.locationCode === 'EAB' && (
                                    <span
                                      className="floor-location eab-holiday eab-holiday-name"
                                      title={data && data.locationName}
                                    >
                                      <img src={eabVector} alt="" />
                                      {data && data.locationName}
                                    </span>
                                  )}
                                </div>
                              )}
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
          {period === 'week' && setVisible && (
            <button
              type="submit"
              className="light-blue-bg-btn mt-4"
              onClick={() => setEmployeeModal(true)}
            >
              {' '}
              <img src={searchicon} alt="" />
              Search for Colleagues
              {colleagueDataLoader && <div className="spinner-border" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Calender.propTypes = {
  setModal: PropTypes.func,
  displayDefault: PropTypes.string,
  setEmployeeModal: PropTypes.func,
  setEmployee: PropTypes.func,
  handleEditModal: PropTypes.func,
  setVisible: PropTypes.func,
  setShow: PropTypes.func,
  handleRemove: PropTypes.func,
  getWorkSpots: PropTypes.func,
  requestGetColleagueData: PropTypes.func,
  allUser: PropTypes.array,
  workSpotData: PropTypes.array,
  setDate: PropTypes.string,
  setEmployeeLocationDetail: PropTypes.bool,
  teamLoading: PropTypes.bool,
  setChange: PropTypes.bool,
  colleagueDataLoader: PropTypes.bool,
  colleagueWeeklyData: PropTypes.object,
  handleColleagueModal: PropTypes.object,
  handleDefault: PropTypes.func,
};

export default Calender;
