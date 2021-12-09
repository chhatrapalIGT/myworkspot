/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable indent */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useMemo, useCallback } from 'react';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import {
  getWeekStartEndDate,
  getWeekTitle,
  getStartEndDate,
} from '../Cal/helpers';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';
import BadgeIcon from '../../images/badgeIcon.png';

const WorkspotAdmin = ({
  getCapacity,
  requestLocationCapacity,
  capacityLoading,
  apiSuccess,
  apiMessage,
  handleClearCal,
  getWarningData,
}) => {
  const uniqueLocation = [];
  getCapacity &&
    Array.isArray(getCapacity) &&
    getCapacity.forEach(obj =>
      obj.data.forEach(({ id, locationname }) => {
        if (uniqueLocation.length === 0) {
          uniqueLocation.push({
            id,
            locationname,
          });
        } else if (!uniqueLocation.some(e => e.id === id)) {
          uniqueLocation.push({
            id,
            locationname,
          });
        }
      }),
    );
  const [period, setPeriod] = useState('week');
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [days, setDays] = useState(() => getWeekStartEndDate(new Date()));

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
    const startdate = moment(startDispDate).format('YYYY-MM-DD');
    const enddate = moment(endDispDate).format('YYYY-MM-DD');
    requestLocationCapacity({ startdate, enddate });
  };

  const handlePrevNext = direction => {
    const { startDate, endDate } = days;
    const date = direction === 'prev' ? startDate : endDate;

    const newDays = getWeekStartEndDate(date, direction);
    callAPI(newDays.dateToDisplay, period);
    setDays(newDays);
    setSelectedWeek(newDays.startDate);
  };

  const handleToday = () => {
    const newDays = getWeekStartEndDate(new Date());
    callAPI(newDays.dateToDisplay, period);
    setDays(newDays);
    setSelectedWeek(new Date());
  };

  let floorCapacity;
  getCapacity.length > 0 &&
    getCapacity.find(ele => {
      if (
        moment(ele.date).format('MM/DD/YYYY') === moment().format('MM/DD/YYYY')
      ) {
        floorCapacity = ele;
      }
    });

  const spaces = (item, obj) => {
    return getCapacity
      .find(
        ({ date }) =>
          moment(date).format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD'),
      )
      .data.find(({ id }) => id === obj.id);
  };

  const barColor = (fl, bldg) => {
    let floorBuilding;
    const floor = fl && fl.toString();
    const building = bldg && bldg.toString();
    if (floor !== null && building !== null) {
      floorBuilding = building.concat(floor);
    } else if (floor === null) {
      floorBuilding = `building ${building}`;
    } else if (building === null) {
      floorBuilding = `floor ${floor}`;
    }

    let color;
    switch (floorBuilding) {
      case 'floor 2':
        color = '#80D8D7';
        break;
      case 'floor 3':
        color = '#FBE487';
        break;
      case 'floor 4':
        color = '#B18BFC';
        break;
      case 'floor 8':
        color = '#F6C580';
        break;
      case 'building 1':
        color = '#80D8D7';
        break;
      case 'building 2':
        color = '#FBE487';
        break;
      case '31':
        color = '#B18BFC';
        break;
      case '32':
        color = '#F6C580';
        break;
      default:
        color = '';
    }

    return color;
  };

  return (
    <>
      {apiMessage && (
        <div
          className={`alert fade show mx-auto ${
            apiSuccess ? 'alert alert-success' : 'alert alert-danger'
          }`}
        >
          <div style={{ display: 'contents', lineHeight: '30px' }}>
            <img
              src={apiSuccess ? checkedCircle : crossCircle}
              alt=""
              style={{ paddingRight: '5px' }}
            />
            <div>{apiMessage || ''}</div>
          </div>
          <div
            style={{ float: 'right', fontSize: 'large' }}
            onClick={() => handleClearCal()}
            className="day-pointer al_cross"
          >
            &#10006;
          </div>
        </div>
      )}

      {capacityLoading ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : (
        <>
          {getWarningData &&
            getWarningData.length > 0 &&
            getWarningData.map(
              obj =>
                obj.dates.length !== 0 && (
                  <div className="badge_check" style={{ fontSize: '16px' }}>
                    <img src={BadgeIcon} alt="" />{' '}
                    <span>
                      Capacity Warning:{' '}
                      {obj.locationID === 'RIC' ? 'Richmond' : obj.locationID}{' '}
                      office on
                      {obj && obj.dates && obj.dates.length === 1
                        ? moment(obj && obj.dates[0]).format('LL')
                        : obj &&
                          obj.dates &&
                          obj.dates.map(ele => `${moment(ele).format('LL')}; `)}
                    </span>
                  </div>
                ),
            )}

          <div className="wrapper_main cal_wrapper">
            <div className="myteam_wrapper">
              <div className="container">
                <div className="input-button-strip mt-4 w-100 d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="common-title">Office Capacity</h4>
                  </div>
                  <div className="d-flex align-items-center">
                    {/* <div>
                      <button
                        type="submit"
                        className="disable-btn opa2"
                        onClick={handleToday}
                      >
                        {' '}
                        Show current week
                      </button>
                    </div> */}
                    <p className="week-range m-auto admin-week">{title}</p>
                    <div className="change-log">
                      <button
                        type="submit"
                        className="prev disable"
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
                  </div>
                </div>

                <div className="table1">
                  <table>
                    <tr>
                      <td />
                      {days.dateToDisplay.map(item => {
                        return (
                          <>
                            <td className="admin-day-name">
                              <p
                                style={{
                                  textAlign: 'right',
                                  marginBottom: '5px',
                                  marginTop: '13px',
                                  fontSize: '14px',
                                }}
                              >
                                {item.day}{' '}
                              </p>
                              <span
                                className={
                                  item.disable ? 'c-date disabled' : 'c-date'
                                }
                                style={{
                                  background: isDateSelected(item.date),
                                  fontSize: '12px',
                                }}
                              >
                                {item.value}
                              </span>
                            </td>
                          </>
                        );
                      })}
                    </tr>
                    {uniqueLocation.length > 0 &&
                      uniqueLocation.map(obj => (
                        <tr>
                          <td className="admin-loc-name">{obj.locationname}</td>
                          {days.dateToDisplay.map(item => {
                            const data = spaces(item, obj);
                            return (
                              <>
                                <td
                                  className="data-63 "
                                  style={
                                    data.LocationPercentage >= '80%'
                                      ? { color: 'red' }
                                      : { color: '' }
                                  }
                                >
                                  {`${parseFloat(
                                    data && data.LocationPercentage,
                                  ).toFixed(2)}%`}
                                  <span className="hover-data">
                                    Spaces Available{' '}
                                    <sapn className="digit">
                                      {`${data &&
                                        data.LocationFillCapacity}/100`}
                                    </sapn>
                                  </span>
                                </td>
                              </>
                            );
                          })}
                        </tr>
                      ))}
                  </table>
                </div>

                <div className="chart-data">
                  <div className="row">
                    {floorCapacity &&
                      floorCapacity.data &&
                      floorCapacity.data.map(
                        obj =>
                          (obj.id === 'DC' || obj.id === 'RIC') && (
                            <div className="col-lg-6 pl-0">
                              <div className="bg-w">
                                <div className="chart-title">
                                  {obj.id === 'RIC' ? 'Richmond' : obj.id}{' '}
                                  Office Capacity -{' '}
                                  {`${parseFloat(
                                    obj.LocationPercentage,
                                  ).toFixed(2)}%`}
                                </div>
                                <div className="chart-para">
                                  Today, {moment(obj.date).format('LL')}
                                </div>
                                <div className="bar-chart">
                                  <div className="bar-graph bar-graph-horizontal bar-graph-one">
                                    {obj.FloorBuilding &&
                                      obj.FloorBuilding.map(fl => (
                                        <div className="bar-one d-flex">
                                          <div
                                            className="year"
                                            style={{
                                              width: '18%',
                                            }}
                                          >
                                            {fl.building === null &&
                                              `Floor ${fl.floor}`}
                                            {fl.floor === null &&
                                              `Building ${fl.building}`}
                                            {fl.building !== null &&
                                              fl.floor !== null &&
                                              `Bldg ${fl.building}, Floor ${
                                                fl.floor
                                              }`}
                                          </div>
                                          <div
                                            className="bar"
                                            style={{
                                              width: '75%',
                                            }}
                                          >
                                            <p
                                              className="bar"
                                              style={{
                                                backgroundColor: barColor(
                                                  fl.floor,
                                                  fl.building,
                                                ),
                                                width: `${fl.percentage}%`,
                                              }}
                                            >
                                              {/* <span className="hover-data">
                                                Spaces available{' '}
                                                <span className="digit">
                                                  {`${fl && fl.percentage}/100`}
                                                </span>
                                              </span> */}
                                            </p>
                                            <div
                                              className="persantage"
                                              // style={{
                                              //   width: '7%',
                                              // }}
                                            >
                                              {`${parseFloat(
                                                fl && fl.percentage,
                                              ).toFixed(2)}%`}
                                            </div>
                                          </div>
                                        </div>
                                      ))}

                                    <div className="per-line1">
                                      <div className="d1" />
                                      <div
                                        className="test d-flex"
                                        style={{ width: '75%' }}
                                      >
                                        <div className="per-bar">20%</div>
                                        <div className="per-bar">40%</div>
                                        <div className="per-bar">60%</div>
                                        <div className="per-bar">80%</div>
                                        <div className="per-bar">100%</div>
                                      </div>
                                      <div className="d2" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ),
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

WorkspotAdmin.propTypes = {
  getCapacity: PropTypes.object,
  requestLocationCapacity: PropTypes.func,
  handleClearCal: PropTypes.func,
  capacityLoading: PropTypes.bool,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.bool,
  getWarningData: PropTypes.object,
};

export default WorkspotAdmin;
