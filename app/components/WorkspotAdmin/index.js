/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef-init */
/* eslint-disable spaced-comment */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import { Image, Button, Form, Modal } from 'react-bootstrap';
import { Datepicker } from '@mobiscroll/react';
import axios from 'axios';
import {
  getWeekStartEndDate,
  getWeekTitle,
  getStartEndDate,
} from '../Cal/helpers';
import checkedCircle from '../../images/check-circle-fill.svg';
import { generateCSV, exportToSpreadsheet } from '../Common/generateCSV';
import crossCircle from '../../images/x-circle-fill.svg';
import BadgeIcon from '../../images/badgeIcon.png';
import info from '../../images/InfoOne.png';
import Workstation from '../../images/Workstation.png';
import PrivateSpace from '../../images/PrivateSpace.png';
import GreyInfo from '../../images/GreyInfo.png';
import Calender from '../../images/Calender.png';
import { CONSTANT } from '../../enum';
import { X_API_KEY } from '../../config/env';

const { API_URL } = CONSTANT;

const WorkspotAdmin = ({
  getCapacity,
  requestLocationCapacity,
  capacityLoading,
  apiSuccess,
  apiMessage,
  handleClearCal,
  getWarningData,
}) => {
  const [open, setOpen] = useState(false);
  const [excelDataOpen, setExcelDataOpen] = useState(false);
  const [officeCapacity, setOfficeCapacity] = useState(false);
  const [expectedCapacity, setExpectedCapacity] = useState(false);
  const [confirmCapacity, setConfirmCapacity] = useState(false);
  const [capacitySuccess, setCapacitySuccess] = useState(false);

  const uniqueLocation = [];
  getCapacity &&
    Array.isArray(getCapacity) &&
    getCapacity.forEach(
      obj =>
        obj &&
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
  const [dateValue, setDateValue] = useState([]);
  const [errorData, setErrorData] = useState(false);
  const [checkedError, setCheckedError] = useState(false);
  const [newExportData, setNewExportData] = useState([]);
  const [floorCapacityData, setFloorCapacityData] = useState();
  const [floorBuildings, setFloorBuildings] = useState([]);
  const [loaidng, setLoading] = useState(false);
  const datepickerRef = useRef(null);

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
        sessionStorage.setItem('floorCapacity', JSON.stringify(floorCapacity));
      }
    });
  useEffect(() => {
    if (
      sessionStorage.getItem('floorCapacity') &&
      sessionStorage.getItem('floorCapacity') !== '' &&
      sessionStorage.getItem('floorCapacity') !== undefined
    ) {
      setFloorCapacityData(JSON.parse(sessionStorage.getItem('floorCapacity')));
    }
  }, [sessionStorage.getItem('floorCapacity')]);

  const spaces = (item, obj) => {
    const foundCapacity = getCapacity.find(
      ({ date }) =>
        moment(date).format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD') ||
        dateValue === item.date.format('YYYY-MM-DD'),
    );

    if (foundCapacity) {
      const foundData = foundCapacity.data.find(({ id }) => id === obj.id);

      if (foundData) {
        return foundData;
      }
    }
    return false;

    // return getCapacity
    //   .find(
    //     ({ date }) =>
    //       moment(date).format('YYYY-MM-DD') ===
    //         item.date.format('YYYY-MM-DD') ||
    //       dateValue === item.date.format('YYYY-MM-DD'),
    //   )
    //   .data.find(({ id }) => id === obj.id);
  };

  useEffect(() => {
    if (dateValue.length > 0) {
      setErrorData(false);
    }
  }, [dateValue]);

  const apiCall = dateObj => {
    let token = sessionStorage.getItem('AccessToken');
    token = JSON.parse(token);

    return new Promise((resolve, reject) => {
      axios
        .get(
          `${API_URL}/adminPanel/locationCapacity/LocationCapacity?startdate=${
            dateObj.startdate
          }&enddate=${dateObj.enddate}`,
          {
            headers: {
              Authorization: `Bearer ${token.idtoken}`,
              'x-api-key': X_API_KEY,
            },
          },
        )
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };

  let finalResponse = undefined;
  const handleExportCSV = () => {
    if (
      dateValue.length === 0 &&
      !officeCapacity &&
      !expectedCapacity &&
      !confirmCapacity
    ) {
      setCheckedError(true);
      setErrorData(true);
    } else if (
      (dateValue.length === 0 && officeCapacity) ||
      (dateValue.length === 0 && expectedCapacity) ||
      (dateValue.length === 0 && confirmCapacity)
    ) {
      setErrorData(true);
    } else if (
      dateValue.length > 0 &&
      !officeCapacity &&
      !expectedCapacity &&
      !confirmCapacity
    ) {
      setCheckedError(true);
    } else {
      const startDate = moment(
        dateValue && dateValue.length && dateValue && dateValue[0],
      ).format('YYYY-MM-DD');
      const endDate = moment(
        dateValue && dateValue.length && dateValue && dateValue[1],
      ).format('YYYY-MM-DD');
      const dateRangeArr = [];
      const startdate = moment(startDate);
      const enddate = moment(endDate);
      let startdateLoop = startdate;
      while (startdateLoop <= enddate) {
        const endDateLoop = moment(startdateLoop, 'DD-MM-YYYY').add(
          enddate.diff(startdateLoop, 'days') >= 15
            ? 15
            : enddate.diff(startdateLoop, 'days') === 0
            ? 0
            : enddate.diff(startdateLoop, 'days') % 15,
          'days',
        );
        dateRangeArr.push({
          startDateData: moment(startdateLoop).format('YYYY-MM-DD'),
          endDateData: moment(endDateLoop).format('YYYY-MM-DD'),
        });
        startdateLoop = moment(endDateLoop, 'DD-MM-YYYY').add(1, 'days');
      }
      setLoading(true);
      dateRangeArr &&
        dateRangeArr.length > 0 &&
        Promise.allSettled(
          dateRangeArr.map(ele =>
            apiCall({
              startdate: ele.startDateData,
              enddate: ele.endDateData,
            }),
          ),
        ).then(results => {
          const allRes = results
            .filter(res => res.status === 'fulfilled')
            .map(res => res.value);

          if (allRes.length) {
            const returnData = [];
            finalResponse = allRes[0];
            for (let i = 0; i < allRes.length; i++) {
              const element = allRes[i]['data']['returndata'];
              returnData.push(...element);
            }
            finalResponse['data']['returndata'] = returnData;
            const allFinalData =
              finalResponse.data && finalResponse.data.returndata;
            setLoading(false);
            setNewExportData(allFinalData);
            const exportSuccess =
              finalResponse.data && finalResponse.data.success;
            setCapacitySuccess(exportSuccess);
          }
        });
      setCheckedError(false);
      setErrorData(false);
      setDateValue([]);
    }
  };

  const selectedChange = ev => {
    const dateSplit = ev.valueText.split(' - ');
    setDateValue(dateSplit);
  };

  useEffect(() => {
    if (
      floorCapacityData &&
      floorCapacityData.data &&
      floorCapacityData.data.length > 0
    )
      floorCapacityData.data.filter(arr => {
        const data =
          arr &&
          arr.FloorBuilding &&
          arr.FloorBuilding.length > 0 &&
          arr.FloorBuilding.filter(ele => ele.floor === 3 || ele.floor === 8);
        if (data && data.length > 0) {
          setFloorBuildings(data);
        }
      });
  }, [floorCapacityData]);

  useEffect(() => {
    if (
      newExportData &&
      newExportData.length > 0 &&
      capacitySuccess &&
      officeCapacity
    ) {
      const finaldataOffice = [];
      newExportData.filter(obj => {
        const data =
          obj &&
          obj.data &&
          obj.data.length > 0 &&
          obj.data.filter(arr => arr.id === 'DC' || arr.id === 'RIC');
        data;
        data.length > 0 &&
          data.map(arr => {
            const objData = {
              officeId: arr.id,
              Date: obj.date,
              officeCapacity: `${parseFloat(
                arr && arr.officeCapacity,
              ).toFixed()}%`,
              worksStationSpaceCapacity: `${parseFloat(
                Math.round((arr && arr.workstationsSpacesOfficeCapacity) || 0),
              ).toFixed()}%`,
              privateSpaceCapacity: `${parseFloat(
                Math.round((arr && arr.privateSpacesOfficeCapacity) || 0),
              ).toFixed()}%`,
            };
            finaldataOffice.push(objData);
          });
      });

      const header = Object.keys(finaldataOffice[0]);
      if (excelDataOpen) {
        generateCSV('CSV', header, finaldataOffice, 'Office Capacity');
      } else {
        exportToSpreadsheet(finaldataOffice, 'Office Capacity');
      }
      setOpen(false);
    }
    if (
      newExportData &&
      newExportData.length > 0 &&
      capacitySuccess &&
      expectedCapacity
    ) {
      const finaldataExpected = [];
      newExportData.filter(obj => {
        const data =
          obj &&
          obj.data &&
          obj.data.length > 0 &&
          obj.data.filter(arr => arr.id === 'DC' || arr.id === 'RIC');
        data;
        data.length > 0 &&
          data.map(arr => {
            const objData = {
              officeId: arr.id,
              Date: obj.date,
              expectedAttendance: arr.expectedAttendance || 0,
            };
            finaldataExpected.push(objData);
          });
      });

      const header = Object.keys(finaldataExpected[0]);
      if (excelDataOpen) {
        generateCSV('CSV', header, finaldataExpected, 'Expected Attendance');
        setOpen(false);
      } else {
        exportToSpreadsheet(finaldataExpected, 'Expected Attendance');
        setOpen(false);
      }
    }
    if (
      newExportData &&
      newExportData.length > 0 &&
      capacitySuccess &&
      confirmCapacity
    ) {
      const finaldataConfirmed = [];
      newExportData.filter(obj => {
        const data =
          obj &&
          obj.data &&
          obj.data.length > 0 &&
          obj.data.filter(arr => arr.id === 'DC' || arr.id === 'RIC');
        data;
        data.length > 0 &&
          data.map(arr => {
            const objData = {
              officeId: arr.id,
              Date: obj.date,
              confirmAttendance: arr.confirmAttendance || 0,
            };
            finaldataConfirmed.push(objData);
          });
      });

      const header = Object.keys(finaldataConfirmed[0]);
      if (excelDataOpen) {
        generateCSV('CSV', header, finaldataConfirmed, 'Confirmed Attendance');
      } else {
        exportToSpreadsheet(finaldataConfirmed, 'Confirmed Attendance');
      }
      setOpen(false);
    }
  }, [newExportData, capacitySuccess]);

  // const barColor = (fl, bldg) => {
  //   let floorBuilding;
  //   const floor = fl && fl.toString();
  //   const building = bldg && bldg.toString();
  //   if (floor !== null && building !== null) {
  //     floorBuilding = building.concat(floor);
  //   } else if (floor === null) {
  //     floorBuilding = `building ${building}`;
  //   } else if (building === null) {
  //     floorBuilding = `floor ${floor}`;
  //   }

  //   let color;
  //   switch (floorBuilding) {
  //     case 'floor 2':
  //       color = '#80D8D7';
  //       break;
  //     case 'floor 3':
  //       color = '#FBE487';
  //       break;
  //     case 'floor 4':
  //       color = '#B18BFC';
  //       break;
  //     case 'floor 8':
  //       color = '#F6C580';
  //       break;
  //     case 'building 1':
  //       color = '#80D8D7';
  //       break;
  //     case 'building 2':
  //       color = '#FBE487';
  //       break;
  //     case '31':
  //       color = '#B18BFC';
  //       break;
  //     case '32':
  //       color = '#F6C580';
  //       break;
  //     default:
  //       color = '';
  //   }

  //   return color;
  // };

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
            aria-hidden
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
                      office on{' '}
                      {obj && obj.dates && obj.dates.length === 1
                        ? moment(obj && obj.dates[0]).format('LL')
                        : obj &&
                          obj.dates &&
                          obj.dates.map(ele => `${moment(ele).format('LL')}; `)}
                    </span>
                  </div>
                ),
            )}
          <div className="wrapper_main_head cal_wrapper">
            <div className="myteam_wrapper">
              <div className="container">
                <div className="chart-data">
                  <div className="row">
                    {/*Today's Drafts*/}
                    {floorCapacityData &&
                      floorCapacityData.data &&
                      floorCapacityData.data.map(
                        obj =>
                          obj.locationname === 'Washington, DC' && (
                            <div className="chart-para">
                              Today, {moment(obj.date).format('LL')}
                            </div>
                          ),
                      )}

                    <div className="col-lg-4">
                      <div className="bg-w width_exp">
                        <div className="align-items-center mb-1">
                          <span className="office-title-capacity">
                            Expected Attendance
                          </span>
                          <span className="ps-1 ml-1">
                            &nbsp;
                            <Image
                              src={GreyInfo}
                              className="ml_img expected_img hover-data-cursor"
                            />
                            <span className="hover-data expected_hover expected_upper">
                              <div className="d-flex justify-content-around">
                                <span>
                                  Number of employees who have selected an
                                  office <br />
                                  via their intent or weekly default.
                                </span>
                              </div>
                            </span>
                          </span>
                        </div>
                        {floorCapacityData &&
                          floorCapacityData.data &&
                          floorCapacityData.data.map(obj =>
                            obj.locationname === 'Washington, DC' ? (
                              <>
                                <div className="Expectd-title-capacity">
                                  {obj.locationname === 'Washington, DC'
                                    ? 'Washington, DC'
                                    : obj.locationname}
                                </div>
                                <h1 className="heading_exp">
                                  {obj.expectedAttendance || 0}
                                </h1>
                              </>
                            ) : (
                              obj.locationname === 'Richmond, VA' && (
                                <>
                                  <div className="Expectd-title-capacity">
                                    {obj.locationname === 'Richmond, VA'
                                      ? 'Richmond, VA'
                                      : obj.locationname}
                                  </div>
                                  <h1 className="heading_exp">
                                    {obj.expectedAttendance || 0}
                                  </h1>
                                </>
                              )
                            ),
                          )}
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="d-md-flex" style={{ height: '100%' }}>
                        <div className="capacity_title w-50">
                          {floorCapacityData &&
                            floorCapacityData.data &&
                            floorCapacityData.data.map(
                              obj =>
                                obj.locationname === 'Washington, DC' && (
                                  <div className="bg-w">
                                    <div className="align-items-center mb-1">
                                      <span className="office-title-capacity">
                                        Office Capacity
                                      </span>
                                      <span className="ps-1 ml-1">
                                        &nbsp;
                                        <Image
                                          src={GreyInfo}
                                          className="ml_img expected_img hover-data-cursor"
                                        />
                                        <span className="hover-data expected_hover office_upper">
                                          <div className="d-flex justify-content-around">
                                            <span>
                                              Office capacity for flex spaces.
                                            </span>
                                          </div>
                                        </span>
                                      </span>
                                    </div>
                                    <div className="chart-title">
                                      {obj.locationname === 'Washington, DC'
                                        ? 'Washington, DC'
                                        : obj.locationname}
                                      &nbsp;-&nbsp;
                                      {`${parseFloat(
                                        obj.officeCapacity || 0,
                                      ).toFixed()}%`}
                                    </div>
                                    <div style={{ height: '100%' }}>
                                      <div
                                        className="bar-graph bar-graph-horizontal bar-graph-one"
                                        style={{
                                          height: '86%',
                                          display: 'flex',
                                          flexDirection: 'column',
                                        }}
                                      >
                                        {floorBuildings &&
                                          floorBuildings.map(fl => (
                                            <div className="bar-one d-flex">
                                              <div
                                                className="year"
                                                style={{
                                                  width: '18%',
                                                  margin: 'auto',
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
                                                style={{
                                                  width: '100%',
                                                  marginLeft: '10px',
                                                }}
                                              >
                                                <div
                                                  className="bar bar_hover d-flex"
                                                  style={{
                                                    width: '80%',
                                                  }}
                                                >
                                                  <p
                                                    className="bar bar_hover hover-data-cursor"
                                                    style={{
                                                      backgroundColor:
                                                        '#FF8D62',
                                                      height: '20px',
                                                      width: `${
                                                        fl.workstationsSpacesOfficeCapacity
                                                      }%`,
                                                    }}
                                                  >
                                                    <span className="hover-data hover_pop-up">
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Workstations
                                                          <Image
                                                            className="d-block w-100 hover-data-cursor"
                                                            src={Workstation}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.round(
                                                            fl &&
                                                              fl.workstationsAssignment,
                                                          )}/${Math.round(
                                                            fl &&
                                                              fl.workstationsSpaces,
                                                          )}`}
                                                        </span>
                                                      </div>
                                                      <div className="d-flex justify-content-around">
                                                        <span className="mg_pop">
                                                          Private Spaces
                                                          <Image
                                                            className="d-block w-100 hover-data-cursor"
                                                            src={PrivateSpace}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.round(
                                                            fl &&
                                                              fl.privateAssignment,
                                                          )}/${Math.round(
                                                            fl &&
                                                              fl.privateSpaces,
                                                          )}`}
                                                        </span>
                                                      </div>
                                                    </span>
                                                  </p>
                                                  <div
                                                    className="persantage"
                                                    style={{
                                                      width: '30%',
                                                    }}
                                                  >
                                                    {`${Math.round(
                                                      fl &&
                                                        fl.workstationsSpacesOfficeCapacity,
                                                    )}%`}
                                                  </div>
                                                </div>
                                                <div
                                                  className="bar bar_hover d-flex"
                                                  style={{
                                                    width: '80%',
                                                  }}
                                                >
                                                  <p
                                                    className="bar bar_hover hover-data-cursor"
                                                    style={{
                                                      backgroundColor:
                                                        '#00B1B0',
                                                      height: '20px',
                                                      width: `${
                                                        fl.privateSpacesOfficeCapacity
                                                      }%`,
                                                    }}
                                                  >
                                                    <span className="hover-data hover_pop-up">
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Workstations
                                                          <Image
                                                            className="d-block w-100 hover-data-cursor"
                                                            src={Workstation}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.round(
                                                            fl &&
                                                              fl.workstationsAssignment,
                                                          )}/${Math.round(
                                                            fl &&
                                                              fl.workstationsSpaces,
                                                          )}`}
                                                        </span>
                                                      </div>
                                                      <div className="d-flex justify-content-around">
                                                        <span className="mg_pop">
                                                          Private Spaces
                                                          <Image
                                                            className="d-block w-100 hover-data-cursor"
                                                            src={PrivateSpace}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.round(
                                                            fl &&
                                                              fl.privateAssignment,
                                                          )}/${Math.round(
                                                            fl &&
                                                              fl.privateSpaces,
                                                          )}`}
                                                        </span>
                                                      </div>
                                                    </span>
                                                  </p>
                                                  <div
                                                    className="persantage"
                                                    style={{
                                                      width: '30%',
                                                    }}
                                                  >
                                                    {`${Math.round(
                                                      fl &&
                                                        fl.privateSpacesOfficeCapacity,
                                                    )}%`}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}

                                        <div
                                          className="per-line1"
                                          style={{ marginTop: 'auto' }}
                                        >
                                          <div
                                            className="test d-flex"
                                            style={{
                                              width: '100%',
                                              marginLeft: '21px',
                                            }}
                                          >
                                            <div className="per-bar">0</div>
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
                                ),
                            )}
                        </div>
                        <div className="capacity_title w-50">
                          {floorCapacityData &&
                            floorCapacityData.data &&
                            floorCapacityData.data.map(
                              obj =>
                                obj.locationname === 'Richmond, VA' && (
                                  <div className="bg-w">
                                    <div className="chart-title capacity_top">
                                      {obj.locationname === 'Richmond, VA'
                                        ? 'Richmond, VA'
                                        : obj.locationname}
                                      &nbsp;-&nbsp;
                                      {`${parseFloat(
                                        obj.officeCapacity || 0,
                                      ).toFixed()}%`}
                                    </div>
                                    <div style={{ height: '100%' }}>
                                      <div
                                        className="bar-graph bar-graph-horizontal bar-graph-one"
                                        style={{
                                          height: '86%',
                                          display: 'flex',
                                          flexDirection: 'column',
                                        }}
                                      >
                                        {obj.FloorBuilding &&
                                          obj.FloorBuilding.map(fl => (
                                            <div className="bar-one d-flex">
                                              <div
                                                className="month"
                                                style={{
                                                  width: '18%',
                                                  margin: 'auto',
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
                                                style={{
                                                  width: '100%',
                                                  marginLeft: '10px',
                                                }}
                                              >
                                                <div
                                                  className="bar bar_hover d-flex"
                                                  style={{
                                                    width: '80%',
                                                  }}
                                                >
                                                  <p
                                                    className="bar bar_hover hover-data-cursor"
                                                    style={{
                                                      backgroundColor:
                                                        '#FF8D62',
                                                      height: '20px',
                                                      width: `${
                                                        fl.workstationsSpacesOfficeCapacity
                                                      }%`,
                                                    }}
                                                  >
                                                    <span className="hover-data hover_pop-up">
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Workstations
                                                          <Image
                                                            className="d-block w-100 hover-data-cursor"
                                                            src={Workstation}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.round(
                                                            fl &&
                                                              fl.workstationsAssignment,
                                                          )}/${Math.round(
                                                            fl &&
                                                              fl.workstationsSpaces,
                                                          )}`}
                                                        </span>
                                                      </div>
                                                      <div className="d-flex justify-content-around">
                                                        <span className="mg_pop">
                                                          Private Spaces
                                                          <Image
                                                            className="d-block w-100 hover-data-cursor"
                                                            src={PrivateSpace}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.round(
                                                            fl &&
                                                              fl.privateAssignment,
                                                          )}/${Math.round(
                                                            fl &&
                                                              fl.privateSpaces,
                                                          )}`}
                                                        </span>
                                                      </div>
                                                    </span>
                                                  </p>
                                                  <div
                                                    className="persantage"
                                                    style={{
                                                      width: '30%',
                                                    }}
                                                  >
                                                    {`${Math.round(
                                                      fl &&
                                                        fl.workstationsSpacesOfficeCapacity,
                                                    )}%`}
                                                  </div>
                                                </div>
                                                <div
                                                  className="bar bar_hover d-flex"
                                                  style={{
                                                    width: '80%',
                                                  }}
                                                >
                                                  <p
                                                    className="bar bar_hover hover-data-cursor"
                                                    style={{
                                                      backgroundColor:
                                                        '#00B1B0',
                                                      height: '20px',
                                                      width: `${
                                                        fl.privateSpacesOfficeCapacity
                                                      }%`,
                                                    }}
                                                  >
                                                    <span className="hover-data hover_pop-up">
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Workstations
                                                          <Image
                                                            className="d-block w-100 hover-data-cursor"
                                                            src={Workstation}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.round(
                                                            fl &&
                                                              fl.workstationsAssignment,
                                                          )}/${Math.round(
                                                            fl &&
                                                              fl.workstationsSpaces,
                                                          )}`}
                                                        </span>
                                                      </div>
                                                      <div className="d-flex justify-content-around">
                                                        <span className="mg_pop">
                                                          Private Spaces
                                                          <Image
                                                            className="d-block w-100 hover-data-cursor"
                                                            src={PrivateSpace}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.round(
                                                            fl &&
                                                              fl.privateAssignment,
                                                          )}/${Math.round(
                                                            fl &&
                                                              fl.privateSpaces,
                                                          )}`}
                                                        </span>
                                                      </div>
                                                    </span>
                                                  </p>
                                                  <div
                                                    className="persantage"
                                                    style={{
                                                      width: '30%',
                                                    }}
                                                  >
                                                    {`${Math.round(
                                                      fl &&
                                                        fl.privateSpacesOfficeCapacity,
                                                    )}%`}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}

                                        <div
                                          className="per-line1"
                                          style={{ marginTop: 'auto' }}
                                        >
                                          <div
                                            className="test d-flex"
                                            style={{
                                              width: '100%',
                                              marginLeft: '21px',
                                            }}
                                          >
                                            <div className="per-bar">0</div>
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
                                ),
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*Weekly Report*/}
                <div className="input-button-strip w-100 d-md-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="common-title">Weekly Report</h4>
                  </div>

                  <div className="d-md-flex align-items-center">
                    <p className="week-range m-auto admin-week">{title}</p>
                    <div className="change-log mt-2 mb-3 mt-md-0 mb-md-0">
                      <button
                        type="submit"
                        className="prev disable"
                        onClick={() => handlePrevNext('prev')}
                      >
                        &lsaquo;
                      </button>
                      <span
                        aria-hidden
                        className="what-day"
                        onClick={handleToday}
                      >
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
                    <Button
                      variant="primary"
                      className="export_btn ms-0 ms-md-1"
                      onClick={() => {
                        setOpen(true);
                        setOfficeCapacity(false);
                        setExpectedCapacity(false);
                        setConfirmCapacity(false);
                      }}
                    >
                      Export Report
                    </Button>
                  </div>
                </div>

                {/*Office Attendance */}

                <div
                  className="d-flex align-items-center mt-3"
                  style={{ position: 'relative' }}
                >
                  <span className="common-title-capacity">Office Capacity</span>
                  <span className="common-img ps-1">
                    &nbsp;
                    <Image
                      src={info}
                      className="expected_img_office hover-data-cursor"
                    />
                    <span className="hover-data expected_hover office_lower">
                      <div className="d-flex justify-content-around">
                        <span>Office capacity for flex spaces.</span>
                      </div>
                    </span>
                  </span>
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
                                  textAlign: 'center',
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
                          {(obj.id === 'DC' || obj.id === 'RIC') && (
                            <>
                              <td className="admin-loc-name table1_color">
                                {obj.locationname}
                              </td>
                              {days.dateToDisplay.map(item => {
                                const data = spaces(item, obj);
                                return (
                                  <>
                                    <td
                                      className={
                                        data && data.id !== 'RW'
                                          ? 'data-63 day-pointer'
                                          : 'data-64'
                                      }
                                      style={
                                        data && data.officeCapacity >= 85
                                          ? { color: 'red' }
                                          : { color: '' }
                                      }
                                    >
                                      {`${parseFloat(
                                        (data && data.officeCapacity) || 0,
                                      ).toFixed()}%`}
                                      {data &&
                                      data.id !== 'RW' &&
                                      item.date > new Date() ? (
                                        <span className="hover-data">
                                          Spaces Occupied{' '}
                                          <sapn className="digit">
                                            {`${(data &&
                                              data.expectedAttendance) ||
                                              0}/${(data &&
                                              data.LocationCapacity) ||
                                              0}`}
                                          </sapn>
                                        </span>
                                      ) : (
                                        <span className="hover-data">
                                          Spaces Occupied{' '}
                                          <sapn className="digit">
                                            {`${(data &&
                                              data.totalAssignment) ||
                                              0}/${(data &&
                                              data.LocationCapacity) ||
                                              0}`}
                                          </sapn>
                                        </span>
                                      )}
                                    </td>
                                  </>
                                );
                              })}
                            </>
                          )}
                        </tr>
                      ))}
                  </table>
                </div>

                {/*Expected Attendance */}

                <div className="input-button-strip mt-4 w-100 d-flex align-items-center justify-content-between position">
                  <div className="d-flex align-items-center mt-3">
                    <span className="common-title-capacity">
                      Expected Attendance
                    </span>
                    <span className="ps-1 ml-1">
                      &nbsp;
                      <Image
                        src={info}
                        className="ml_img expected_img hover-data-cursor"
                      />
                      <span className="hover-data expected_hover expected_lower">
                        <div className="d-flex justify-content-around">
                          <span>
                            Number of employees who have selected an office{' '}
                            <br />
                            via their intent or weekly default.
                          </span>
                        </div>
                      </span>
                    </span>
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
                                  textAlign: 'center',
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
                          {(obj.id === 'DC' || obj.id === 'RIC') && (
                            <>
                              <td className="admin-loc-name table1_color">
                                {obj.locationname}
                              </td>
                              {days.dateToDisplay.map(item => {
                                const data = spaces(item, obj);
                                return (
                                  <>
                                    <td
                                      className={
                                        data && data.id !== 'RW'
                                          ? 'data-63 day-pointer'
                                          : 'data-64'
                                      }
                                      style={
                                        data && data.expectedAttendance >= '80%'
                                          ? { color: 'red' }
                                          : { color: '' }
                                      }
                                    >
                                      {parseFloat(
                                        (data && data.expectedAttendance) || 0,
                                      ).toFixed()}
                                      {/* {data &&
                                      data.id !== 'RW' &&
                                      item.date > days.startDate ? (
                                        <span className="hover-data">
                                          Spaces Occupied{' '}
                                          <sapn className="digit">
                                            {`${data &&
                                              data.confirmAttendance}/${data &&
                                              data.LocationCapacity}`}
                                          </sapn>
                                        </span>
                                      ) : (
                                        <span className="hover-data">
                                          Spaces Occupied{' '}
                                          <sapn className="digit">
                                            {`${data &&
                                              data.totalAssignment}/${data &&
                                              data.LocationCapacity}`}
                                          </sapn>
                                        </span>
                                      )} */}
                                    </td>
                                  </>
                                );
                              })}
                            </>
                          )}
                        </tr>
                      ))}
                  </table>
                </div>

                {/*Confirmed Attendance */}

                <div className="input-button-strip mt-4 w-100 d-flex align-items-center justify-content-between">
                  <div
                    className="d-flex align-items-center mt-3"
                    style={{ position: 'relative' }}
                  >
                    <span className="common-title-capacity">
                      Confirmed Attendance
                    </span>
                    <span className="common-img ps-1">
                      &nbsp;
                      <Image
                        src={info}
                        className="expected_img_confirmed hover-data-cursor"
                      />
                      <span className="hover-data expected_hover confirm_lower">
                        <div className="d-flex justify-content-around">
                          <span>
                            Number of employees who badged into the office.
                          </span>
                        </div>
                      </span>
                    </span>
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
                                  textAlign: 'center',
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
                          {(obj.id === 'DC' || obj.id === 'RIC') && (
                            <>
                              <td className="admin-loc-name table1_color">
                                {obj.locationname}
                              </td>
                              {days.dateToDisplay.map(item => {
                                const data = spaces(item, obj);
                                return (
                                  <>
                                    <td
                                      className={
                                        data && data.id !== 'RW'
                                          ? 'data-63 day-pointer'
                                          : 'data-64'
                                      }
                                      style={
                                        data && data.confirmAttendance >= '80%'
                                          ? { color: 'red' }
                                          : { color: '' }
                                      }
                                    >
                                      {parseFloat(
                                        (data && data.confirmAttendance) || 0,
                                      ).toFixed()}
                                      {/* {data &&
                                      data.id !== 'RW' &&
                                      item.date > days.startDate ? (
                                        <span className="hover-data">
                                          Spaces Occupied{' '}
                                          <sapn className="digit">
                                            {`${data &&
                                              data.officeCapacity}/${data &&
                                              data.LocationCapacity}`}
                                          </sapn>
                                        </span>
                                      ) : (
                                        <span className="hover-data">
                                          Spaces Occupied{' '}
                                          <sapn className="digit">
                                            {`${data &&
                                              data.totalAssignment}/${data &&
                                              data.LocationCapacity}`}
                                          </sapn>
                                        </span>
                                      )} */}
                                    </td>
                                  </>
                                );
                              })}
                            </>
                          )}
                        </tr>
                      ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* {exportCapacityLoading ? (
        <Spinner className="app-spinner" animation="grow" variant="dark" />
      ) : ( */}
      <Modal
        className="modal fade test_modal_pins"
        show={open}
        onHide={() => {
          setOpen(false);
        }}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-header d-block mypadlr mypt-3">
          {loaidng ? (
            <Spinner className="app-spinner" animation="grow" variant="dark" />
          ) : (
            <>
              <div>
                <h5 className="modal-title date_range" id="exampleModalLabel">
                  Export Report
                </h5>
                {errorData && (
                  <p
                    style={{
                      color: 'red',
                      marginTop: '10px',
                      marginBottom: '10px',
                    }}
                  >
                    Please Select Date
                  </p>
                )}
              </div>
              <span className="mycheckbox">Select date range</span>
              <div
                className="invite-team-wrapp choose-date mt-2"
                style={{ width: '85%', height: '48px' }}
              >
                <label
                  htmlFor="Date"
                  style={{
                    width: '100%',
                    marginLeft: '12px',
                    marginTop: '2px',
                  }}
                >
                  <Datepicker
                    ref={datepickerRef}
                    controls={['calendar']}
                    select="range"
                    dateFormat="MMM D YYYY"
                    value={dateValue}
                    onChange={selectedChange}
                    theme="ios"
                    themeVariant="light"
                  />
                  <Image
                    src={Calender}
                    className="material-icons-outlined-image"
                    onClick={() => datepickerRef.current?.open?.()}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  />
                </label>
              </div>

              {checkedError && (
                <p
                  style={{
                    color: 'red',
                    marginTop: '10px',
                    marginBottom: '10px',
                  }}
                >
                  Please Checked Any One Data
                </p>
              )}

              <form
                className="delegate-workspot-access mycheckbox mt-3 ml-2"
                action="submit"
              >
                <span>What data do you want to export?</span>
                <>
                  <Form.Check
                    className="mt-2 checkedBox"
                    label="Weekly Office Capacity"
                    name="group1"
                    onClick={() => {
                      setOfficeCapacity(!officeCapacity);
                      setCheckedError(false);
                    }}
                  />
                  <Form.Check
                    className="mt-2 checkedBox"
                    label="Weekly Expected Attendance"
                    name="group2"
                    onClick={() => {
                      setExpectedCapacity(!expectedCapacity);
                      setCheckedError(false);
                    }}
                  />
                  <Form.Check
                    className="mt-2 checkedBox"
                    label="Weekly Confirmed Attendance"
                    name="group3"
                    onClick={() => {
                      setConfirmCapacity(!confirmCapacity);
                      setCheckedError(false);
                    }}
                  />
                </>
              </form>
            </>
          )}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setOpen(false);
              setErrorData(false);
              setCheckedError(false);
              setDateValue([]);
            }}
          />
        </div>
        <div className="modal-footer justify-content-between border-0 mypadlr mypb-3 pt-0">
          <Button
            variant="primary"
            className="btn csv-btn-modal"
            data-bs-dismiss="modal"
            onClick={() => {
              handleExportCSV();
              setExcelDataOpen(true);
            }}
            color="blue"
          >
            <span className="ml-8">.CSV Export</span>
          </Button>
          <Button
            variant="primary"
            className="btn csv-btn-modal"
            data-bs-dismiss="mo dal"
            onClick={() => {
              handleExportCSV();
              setExcelDataOpen(false);
            }}
          >
            .XLSX Export
          </Button>
          <Button
            className="dismiss-cancle"
            data-bs-dismiss="modal"
            onClick={() => {
              setOpen(false);
              setErrorData(false);
              setCheckedError(false);
              setDateValue([]);
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      {/* )} */}
    </>
  );
};

WorkspotAdmin.propTypes = {
  getCapacity: PropTypes.array,
  requestLocationCapacity: PropTypes.func,
  handleClearCal: PropTypes.func,
  capacityLoading: PropTypes.bool,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.bool,
  getWarningData: PropTypes.array,
};

export default WorkspotAdmin;
