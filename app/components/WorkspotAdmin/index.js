/* eslint-disable spaced-comment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable indent */
/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import { Image, Button, Form, Modal } from 'react-bootstrap';
import { Datepicker } from '@mobiscroll/react';
import { CSVLink } from 'react-csv';
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

const WorkspotAdmin = ({
  getCapacity,
  requestLocationCapacity,
  capacityLoading,
  apiSuccess,
  apiMessage,
  handleClearCal,
  getWarningData,
  capacitySuccess,
  exportCapacitySuccess,
  requestExportLocationCapacity,
  getExportData,
  exportCapacityLoading,
}) => {
  const [open, setOpen] = useState(false);
  const [excelDataOpen, setExcelDataOpen] = useState(false);
  const [officeCapacity, setOfficeCapacity] = useState(false);
  const [expectedCapacity, setExpectedCapacity] = useState(false);
  const [confirmCapacity, setConfirmCapacity] = useState(false);
  const [wholeDataExport, setWholeDataExport] = useState(false);

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
          moment(date).format('YYYY-MM-DD') ===
            item.date.format('YYYY-MM-DD') ||
          dateValue === item.date.format('YYYY-MM-DD'),
      )
      .data.find(({ id }) => id === obj.id);
  };

  const handleExportCSV = () => {
    const startdate = moment(
      dateValue && dateValue.length && dateValue && dateValue[0],
    ).format('YYYY-MM-DD');
    const enddate = moment(
      dateValue && dateValue.length && dateValue && dateValue[1],
    ).format('YYYY-MM-DD');
    requestExportLocationCapacity({ startdate, enddate });
  };

  const selectedChange = ev => {
    const dateSplit = ev.valueText.split(' - ');
    setDateValue(dateSplit);
  };

  useEffect(() => {
    if (
      getExportData &&
      getExportData.length > 0 &&
      exportCapacitySuccess &&
      officeCapacity &&
      !expectedCapacity &&
      !confirmCapacity
    ) {
      const finaldata = [];
      getExportData.filter(obj => {
        obj &&
          obj.data &&
          obj.data.length > 0 &&
          obj.data.map(arr => {
            const objData = {
              officeId: arr.id,
              Date: obj.date,
              officeCapacity: `${parseFloat(
                Math.floor(arr && arr.officeCapacity),
              ).toFixed()}%`,
              worksStationSpaceCapacity: `${parseFloat(
                Math.floor(arr && arr.workstationsSpacesOfficeCapacity),
              ).toFixed()}%`,
              privateSpaceCapacity: `${parseFloat(
                Math.floor(arr && arr.privateSpacesOfficeCapacity),
              ).toFixed()}%`,
            };
            finaldata.push(objData);
          });
      });
      let header = [
        { id: 'Office Id' },
        { id: 'Date' },
        { id: 'Office Capacity' },
        { id: 'Workstation Capacity' },
        { id: 'Private Spaces Capacity' },
      ];

      header = Object.keys(finaldata[0]);
      if (excelDataOpen) {
        generateCSV('CSV', header, finaldata, 'WorkspotData');
      } else {
        exportToSpreadsheet(finaldata);
      }
      setOpen(false);
    }
    if (
      getExportData &&
      getExportData.length > 0 &&
      exportCapacitySuccess &&
      expectedCapacity &&
      !officeCapacity &&
      !confirmCapacity
    ) {
      const finaldata = [];
      getExportData.filter(obj => {
        obj &&
          obj.data &&
          obj.data.length > 0 &&
          obj.data.map(arr => {
            const objData = {
              officeId: arr.id,
              Date: obj.date,
              expectedAttendance: arr.expectedAttendance,
            };
            finaldata.push(objData);
          });
      });
      let header = [
        { id: 'Office Id' },
        { id: 'Date' },
        { id: 'Office Capacity' },
        { id: 'Workstation Capacity' },
        { id: 'Private Spaces Capacity' },
      ];

      header = Object.keys(finaldata[0]);
      if (excelDataOpen) {
        generateCSV('CSV', header, finaldata, 'WorkspotData');
      } else {
        exportToSpreadsheet(finaldata);
      }
      setOpen(false);
    }
    if (
      getExportData &&
      getExportData.length > 0 &&
      exportCapacitySuccess &&
      confirmCapacity &&
      !expectedCapacity &&
      !officeCapacity
    ) {
      const finaldata = [];
      getExportData.filter(obj => {
        obj &&
          obj.data &&
          obj.data.length > 0 &&
          obj.data.map(arr => {
            const objData = {
              officeId: arr.id,
              Date: obj.date,
              confirmAttendance: arr.confirmAttendance,
            };
            finaldata.push(objData);
          });
      });

      let header = [
        { id: 'Office Id' },
        { id: 'Date' },
        { id: 'Office Capacity' },
        { id: 'Workstation Capacity' },
        { id: 'Private Spaces Capacity' },
      ];

      header = Object.keys(finaldata[0]);
      if (excelDataOpen) {
        generateCSV('CSV', header, finaldata, 'WorkspotData');
      } else {
        exportToSpreadsheet(finaldata);
      }
      setOpen(false);
    }
  }, [getExportData, exportCapacitySuccess]);

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
                    {floorCapacity &&
                      floorCapacity.data &&
                      floorCapacity.data.map(
                        obj =>
                          obj.locationname === 'Washington, DC' && (
                            <div className="chart-para">
                              Today, {moment(obj.date).format('LL')}
                            </div>
                          ),
                      )}

                    <div className="col-lg-4 pl-0">
                      <div className="bg-w">
                        <div className="align-items-center mb-1">
                          <span className="office-title-capacity">
                            Expected Attendance
                          </span>
                          <span className="ps-1 ml-1">
                            <Image
                              src={GreyInfo}
                              className="ml_img expected_img"
                            />
                            <span
                              className="hover-data expected_hover"
                              style={{
                                background: '#01213A',
                                height: 'auto',
                                zIndex: '999',
                                padding: '10px',
                                top: '170px',
                                left: '137px',
                                fontSize: '12px',
                              }}
                            >
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
                        {floorCapacity &&
                          floorCapacity.data &&
                          floorCapacity.data.map(obj =>
                            obj.locationname === 'Washington, DC' ? (
                              <>
                                <div className="Expectd-title-capacity">
                                  {obj.locationname === 'Washington, DC'
                                    ? 'Washington, DC'
                                    : obj.locationname}
                                </div>
                                <h1
                                  style={{
                                    color: '#0072CE',
                                    fontSize: '60px',
                                  }}
                                >
                                  {obj.expectedAttendance}
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
                                  <h1
                                    style={{
                                      color: '#0072CE',
                                      fontSize: '60px',
                                    }}
                                  >
                                    {obj.expectedAttendance}
                                  </h1>
                                </>
                              )
                            ),
                          )}
                      </div>
                    </div>
                    <div className="col-lg-8 pl-0">
                      <div className="d-flex">
                        <div className="capacity_title w-50">
                          {floorCapacity &&
                            floorCapacity.data &&
                            floorCapacity.data.map(
                              obj =>
                                obj.locationname === 'Washington, DC' && (
                                  <div className="bg-w">
                                    <div className="align-items-center mb-1">
                                      <span className="office-title-capacity">
                                        Office Capacity
                                      </span>
                                      <span className="ps-1 ml-1">
                                        <Image
                                          src={GreyInfo}
                                          className="ml_img expected_img"
                                        />
                                        <span
                                          className="hover-data expected_hover"
                                          style={{
                                            background: '#01213A',
                                            height: 'auto',
                                            zIndex: '999',
                                            padding: '10px',
                                            top: '193px',
                                            left: '660px',
                                            fontSize: '12px',
                                          }}
                                        >
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
                                        obj.officeCapacity,
                                      ).toFixed()}%`}
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
                                                }}
                                              >
                                                <div
                                                  className="bar bar_hover d-flex"
                                                  style={{
                                                    width: '80%',
                                                  }}
                                                >
                                                  <p
                                                    className="bar bar_hover"
                                                    style={{
                                                      backgroundColor:
                                                        '#FF8D62',
                                                      height: '20px',
                                                      width: `${
                                                        fl.workstationsSpacesOfficeCapacity
                                                      }%`,
                                                    }}
                                                  >
                                                    <span
                                                      className="hover-data"
                                                      style={{
                                                        background: '#01213A',
                                                        minWidth: '159px',
                                                        height: 'auto',
                                                        zIndex: '999',
                                                        padding: '10px',
                                                        top: '-67px',
                                                        fontSize: '12px',
                                                      }}
                                                    >
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Workstations
                                                          <Image
                                                            className="d-block w-100"
                                                            src={Workstation}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.floor(
                                                            fl &&
                                                              fl.workstationsSpacesOfficeCapacity,
                                                          )}/100`}
                                                        </span>
                                                      </div>
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Private Spaces
                                                          <Image
                                                            className="d-block w-100"
                                                            src={PrivateSpace}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.floor(
                                                            fl &&
                                                              fl.privateSpacesOfficeCapacity,
                                                          )}/100`}
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
                                                    {`${parseFloat(
                                                      Math.floor(
                                                        fl &&
                                                          fl.workstationsSpacesOfficeCapacity,
                                                      ),
                                                    ).toFixed()}%`}
                                                  </div>
                                                </div>
                                                <div
                                                  className="bar bar_hover d-flex"
                                                  style={{
                                                    width: '80%',
                                                  }}
                                                >
                                                  <p
                                                    className="bar bar_hover"
                                                    style={{
                                                      backgroundColor:
                                                        '#00B1B0',
                                                      height: '20px',
                                                      width: `${
                                                        fl.privateSpacesOfficeCapacity
                                                      }%`,
                                                    }}
                                                  >
                                                    <span
                                                      className="hover-data"
                                                      style={{
                                                        background: '#01213A',
                                                        minWidth: '159px',
                                                        height: 'auto',
                                                        zIndex: '999',
                                                        padding: '10px',
                                                        top: '-67px',
                                                        fontSize: '12px',
                                                      }}
                                                    >
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Workstations
                                                          <Image
                                                            className="d-block w-100"
                                                            src={Workstation}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.floor(
                                                            fl &&
                                                              fl.workstationsSpacesOfficeCapacity,
                                                          )}/100`}
                                                        </span>
                                                      </div>
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Private Spaces
                                                          <Image
                                                            className="d-block w-100"
                                                            src={PrivateSpace}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.floor(
                                                            fl &&
                                                              fl.privateSpacesOfficeCapacity,
                                                          )}/100`}
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
                                                    {`${parseFloat(
                                                      Math.floor(
                                                        fl &&
                                                          fl.privateSpacesOfficeCapacity,
                                                      ),
                                                    ).toFixed()}%`}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}

                                        <div className="per-line1">
                                          <div
                                            className="test d-flex"
                                            style={{ width: '100%' }}
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
                          {floorCapacity &&
                            floorCapacity.data &&
                            floorCapacity.data.map(
                              obj =>
                                obj.locationname === 'Richmond, VA' && (
                                  <div className="bg-w">
                                    <div className="chart-title capacity_top">
                                      {obj.locationname === 'Richmond, VA'
                                        ? 'Richmond, VA'
                                        : obj.locationname}
                                      &nbsp;-&nbsp;
                                      {`${parseFloat(
                                        obj.officeCapacity,
                                      ).toFixed()}%`}
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
                                                }}
                                              >
                                                <div
                                                  className="bar bar_hover d-flex"
                                                  style={{
                                                    width: '80%',
                                                  }}
                                                >
                                                  <p
                                                    className="bar bar_hover"
                                                    style={{
                                                      backgroundColor:
                                                        '#FF8D62',
                                                      height: '20px',
                                                      width: `${
                                                        fl.workstationsSpacesOfficeCapacity
                                                      }%`,
                                                    }}
                                                  >
                                                    <span
                                                      className="hover-data"
                                                      style={{
                                                        background: '#01213A',
                                                        minWidth: '159px',
                                                        height: 'auto',
                                                        zIndex: '999',
                                                        padding: '10px',
                                                        top: '-67px',
                                                        fontSize: '12px',
                                                      }}
                                                    >
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Workstations
                                                          <Image
                                                            className="d-block w-100"
                                                            src={Workstation}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.floor(
                                                            fl &&
                                                              fl.workstationsSpacesOfficeCapacity,
                                                          )}/100`}
                                                        </span>
                                                      </div>
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Private Spaces
                                                          <Image
                                                            className="d-block w-100"
                                                            src={PrivateSpace}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.floor(
                                                            fl &&
                                                              fl.privateSpacesOfficeCapacity,
                                                          )}/100`}
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
                                                    {`${parseFloat(
                                                      Math.floor(
                                                        fl &&
                                                          fl.workstationsSpacesOfficeCapacity,
                                                      ),
                                                    ).toFixed()}%`}
                                                  </div>
                                                </div>
                                                <div
                                                  className="bar bar_hover d-flex"
                                                  style={{
                                                    width: '80%',
                                                  }}
                                                >
                                                  <p
                                                    className="bar bar_hover"
                                                    style={{
                                                      backgroundColor:
                                                        '#00B1B0',
                                                      height: '20px',
                                                      width: `${
                                                        fl.privateSpacesOfficeCapacity
                                                      }%`,
                                                    }}
                                                  >
                                                    <span
                                                      className="hover-data"
                                                      style={{
                                                        background: '#01213A',
                                                        minWidth: '159px',
                                                        height: 'auto',
                                                        zIndex: '999',
                                                        padding: '10px',
                                                        top: '-67px',
                                                        fontSize: '12px',
                                                      }}
                                                    >
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Workstations
                                                          <Image
                                                            className="d-block w-100"
                                                            src={Workstation}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.floor(
                                                            fl &&
                                                              fl.workstationsSpacesOfficeCapacity,
                                                          )}/100`}
                                                        </span>
                                                      </div>
                                                      <div className="d-flex justify-content-around">
                                                        <span>
                                                          Private Spaces
                                                          <Image
                                                            className="d-block w-100"
                                                            src={PrivateSpace}
                                                          />
                                                        </span>
                                                        <span className="digit">
                                                          {`${Math.floor(
                                                            fl &&
                                                              fl.privateSpacesOfficeCapacity,
                                                          )}/100`}
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
                                                    {`${parseFloat(
                                                      Math.floor(
                                                        fl &&
                                                          fl.privateSpacesOfficeCapacity,
                                                      ),
                                                    ).toFixed()}%`}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}

                                        <div className="per-line1">
                                          <div
                                            className="test d-flex"
                                            style={{ width: '100%' }}
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
                <div className="input-button-strip mt-4 w-100 d-flex align-items-center justify-content-between">
                  <div>
                    <h4 className="common-title">Weekly Report</h4>
                  </div>

                  <div className="d-flex align-items-center">
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
                    <Button
                      variant="primary"
                      className="export_btn"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Export Report
                    </Button>
                  </div>
                </div>

                {/*Office Attendance */}

                <div className="d-flex align-items-center mt-3">
                  <span className="common-title-capacity">Office Capacity</span>
                  <span className="common-img ps-1">
                    <Image src={info} />
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
                          {(obj.id === 'DC' || obj.id === 'RIC') && (
                            <>
                              <td className="admin-loc-name">
                                {obj.locationname}
                              </td>
                              {days.dateToDisplay.map(item => {
                                const data = spaces(item, obj);
                                return (
                                  <>
                                    {console.log('data>>>>', data)}
                                    <td
                                      className={
                                        data && data.id !== 'RW'
                                          ? 'data-63 day-pointer'
                                          : 'data-64'
                                      }
                                      style={
                                        data && data.officeCapacity >= '80%'
                                          ? { color: 'red' }
                                          : { color: '' }
                                      }
                                    >
                                      {`${parseFloat(
                                        data && data.officeCapacity,
                                      ).toFixed(2)}%`}
                                      {data &&
                                      data.id !== 'RW' &&
                                      item.date > new Date() ? (
                                        <span className="hover-data">
                                          Spaces Occupied{' '}
                                          <sapn className="digit">
                                            {`${data &&
                                              data.expectedAttendance}/${data &&
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

                <div className="input-button-strip mt-4 w-100 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center mt-3">
                    <span className="common-title-capacity">
                      Expected Attendance
                    </span>
                    <div className="common-img ps-1">
                      <Image src={info} />
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
                          {(obj.id === 'DC' || obj.id === 'RIC') && (
                            <>
                              <td className="admin-loc-name">
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
                                        data && data.expectedAttendance,
                                      ).toFixed(2)}
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
                  <div className="d-flex align-items-center mt-3">
                    <span className="common-title-capacity">
                      Confirmed Attendance
                    </span>
                    <span className="common-img ps-1">
                      <Image src={info} />
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
                          {(obj.id === 'DC' || obj.id === 'RIC') && (
                            <>
                              <td className="admin-loc-name">
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
                                        data && data.confirmAttendance,
                                      ).toFixed(2)}
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
          <div>
            <h5 className="modal-title date_range" id="exampleModalLabel">
              Export Report
            </h5>
          </div>
          <span className="mycheckbox">Select date range</span>
          <div className="invite-team-wrapp choose-date mt-2 w-75">
            <div className="access-to">
              <span className="material-icons-outlined">calendar_today</span>
            </div>
            <Datepicker
              controls={['calendar']}
              select="range"
              dateFormat="MMM D YYYY"
              value={dateValue}
              onChange={selectedChange}
            />
          </div>

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
                  setOfficeCapacity(true);
                  setExpectedCapacity(false);
                  setConfirmCapacity(false);
                }}
              />
              <Form.Check
                className="mt-2 checkedBox"
                label="Weekly Expected Attendance"
                name="group1"
                onClick={() => {
                  setOfficeCapacity(false);
                  setExpectedCapacity(true);
                  setConfirmCapacity(false);
                }}
              />
              {!officeCapacity && !expectedCapacity ? (
                <Form.Check
                  className="mt-2 checkedBox"
                  label="Weekly Confirmed Attendance"
                  name="group1"
                  onClick={() => {
                    setOfficeCapacity(true);
                    setExpectedCapacity(true);
                    setConfirmCapacity(true);
                  }}
                />
              ) : (
                <Form.Check
                  className="mt-2 checkedBox"
                  label="Weekly Confirmed Attendance"
                  name="group1"
                  onClick={() => {
                    setOfficeCapacity(false);
                    setExpectedCapacity(false);
                    setConfirmCapacity(true);
                  }}
                />
              )}
            </>
          </form>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <div className="modal-footer justify-content-between border-0 mypadlr mypb-3 pt-0">
          <Button
            variant="primary"
            className="btn csv-modal"
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
            className="btn csv-modal"
            data-bs-dismiss="mo dal"
            onClick={() => {
              handleExportCSV();
              setExcelDataOpen(false);
            }}
          >
            .XLSX Export
          </Button>
          <Button
            variant="outline-secondary"
            className="btn dismiss csv-modal"
            data-bs-dismiss="modal"
            onClick={() => setOpen(false)}
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
  getCapacity: PropTypes.object,
  requestLocationCapacity: PropTypes.func,
  requestExportLocationCapacity: PropTypes.func,
  handleClearCal: PropTypes.func,
  capacityLoading: PropTypes.bool,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.bool,
  capacitySuccess: PropTypes.bool,
  exportCapacitySuccess: PropTypes.bool,
  exportCapacityLoading: PropTypes.bool,
  getWarningData: PropTypes.object,
  getExportData: PropTypes.object,
};

export default WorkspotAdmin;
