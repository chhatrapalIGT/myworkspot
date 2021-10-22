/* eslint-disable react/no-this-in-sfc */
/* eslint-disable default-case */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Datepicker } from '@mobiscroll/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../../src/lib/mobiscroll/css/mobiscroll.react.scss';
import Axios from 'axios';
import Select, { components } from 'react-select';
import createClass from 'create-react-class';
import Spinner from 'react-bootstrap/Spinner';
import Draggable from 'react-draggable';
import Calender from '../Cal/Calender';
import locationMap from '../../images/location.png';
import profile from '../assets/images/profileof.png';
import Floormap from '../../images/Map_2.svg';
import zoomin from '../../images/zoomin.png';
import zoomout from '../../images/zoomout.png';
import success from '../../images/Message.png';
import WF2 from '../Resource/WF2';
import WF3 from '../Resource/WF3';
import WF4 from '../Resource/WF4';
import WF8 from '../Resource/WF8';
import RB1 from '../Resource/RB1';
import RB2 from '../Resource/RB2';
import RB3F1 from '../Resource/RB3F1';
import RB3F2 from '../Resource/RB3F2';
import BLB1 from '../Resource/BLB1';
import BRB1 from '../Resource/BRB1';

import map1 from '../../images/Map_1.svg';
import map2 from '../../images/MapWF2.svg';
import map3 from '../../images/Map_3.svg';
import map4 from '../../images/Map_4.svg';
import map5 from '../../images/Map_5.svg';
import map6 from '../../images/Map_6.svg';
import map7 from '../../images/Map_7.svg';
import map8 from '../../images/Map_8.svg';
import map9 from '../../images/Map_9.svg';
import map10 from '../../images/Map_10.svg';

import '../FAQ/styles.scss';

const Report = ({
  handleChange,
  state,
  imgStyle,
  handleZoomIn,
  handleZoomOut,
  handleDefault,
  handleUserSelect,
  onDateChange,
  location,
  locationErrorHandle,
  getWorkSpots,
  memberData,
  handleModalClose,
  handleTextData,
  dataList,
  reportApiSuccess,
  reportApiMessage,
  isLoading,
  handleClearData,
  myTeamSuccess,
  fetchMoreData,
}) => {
  const [finalImg, setFinalImg] = useState('');
  const [officeRest, setOfficeRest] = useState('');
  const [call, setCall] = useState(true);
  const [isdata, setData] = useState(false);
  const [calData, setCalData] = useState([]);
  const data = location && location.length && location[location.length - 1];
  const colourStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
    }),

    option: (styles, { isFocused, isSelected, isVisited }) => ({
      ...styles,
      cursor: isFocused ? 'pointer' : '',

      backgroundColor: isSelected
        ? '#f8f8f8'
        : '' || isFocused
        ? '#EbEEF1'
        : '' || isVisited
        ? '#f8f8f8'
        : '',

      color: '#000',
    }),
  };

  const [now, setNow] = React.useState();
  const nowButtons = React.useMemo(
    () => [
      {
        text: 'Done',
        handler: () => {
          now.close();
        },
      },
    ],
    [now],
  );

  const finalLocation =
    location && location.length
      ? location.filter(obj => obj && obj.locationCode !== 'RW')
      : '';

  const [show, setShow] = useState(false);
  const isDraggable = state.scale > 1;

  const [allUser, setAllUser] = useState([]);
  const [modalData, setModalData] = useState({});
  const [employeeLocationDetail, setEmployeeLocationDetail] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleCloseData = () => {
    if (state.selectedNames && state.selectedOption.length > 0 && state.date) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (myTeamSuccess && myTeamSuccess.success) {
      handleClearData();
      setData(true);
      setTimeout(() => {
        setData(false);
      }, 3000);
    }
  }, [myTeamSuccess.success]);

  const updatedEmpData = dataList.map(item => {
    // eslint-disable-next-line no-param-reassign
    item.label = (
      <>
        <div className="drop_update">
          <img src={item.flag} alt="flag" style={{ height: '22px' }} />
          {item.value} {''}
          {item.labelData}
        </div>
      </>
    );
    return item;
  });

  const Option = createClass({
    render() {
      return (
        <components.Option {...this.props}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}>
              <img
                src={this.props.data.flag}
                alt="flag"
                style={{ height: '20px', marginBottom: '5px' }}
              />{' '}
              <label>
                {`${this.props.data.value} ${this.props.data.labelData || ''}`}{' '}
              </label>
              <input
                className="select_checkbox"
                type="checkbox"
                checked={this.props.isSelected}
                onChange={e => null}
              />{' '}
            </div>
            <div className={this.props.isSelected ? 'selected_val' : ''} />
          </div>
        </components.Option>
      );
    },
  });
  useEffect(() => {
    // calData.map(obj => setData(obj));
    if (call && Object.keys(modalData).length > 0) {
      if (
        modalData &&
        modalData.building !== null &&
        (modalData && modalData.floor !== null)
      ) {
        imgData(
          modalData && modalData.locationCode,

          modalData &&
            modalData.building &&
            modalData.building.concat(modalData && modalData.floor),
        );
      } else if (modalData && modalData.floor === null) {
        imgData(
          modalData && modalData.locationCode,

          modalData && modalData.building,
        );
      } else if (modalData && modalData.building === null) {
        imgData(
          modalData && modalData.locationCode,

          modalData && modalData.floor,
        );
      }
    }
  }, [call, modalData]);

  const imgData = async (neighborhoodImg, neighborhoodBuild) => {
    let imageSrc = '';
    let officeRes = '';
    switch (neighborhoodImg) {
      case 'DC':
        switch (neighborhoodBuild) {
          case '2':
            imageSrc = map2;
            officeRes = WF2;
            break;
          case '3':
            imageSrc = map1;
            officeRes = WF3;
            break;
          case '4':
            imageSrc = map3;
            officeRes = WF4;
            break;
          case '8':
            imageSrc = map4;
            officeRes = WF8;
            break;
        }
        break;
      case 'RIC':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map5;
            officeRes = RB1;
            break;
          case '2':
            imageSrc = map6;
            officeRes = RB2;
            break;
          // building 3 , floor 1
          case '31':
            imageSrc = map7;
            officeRes = RB3F1;
            break;
          case '32':
            imageSrc = map8;
            officeRes = RB3F2;
            break;
        }
        break;
      case 'BAL':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map10;
            officeRes = BRB1;
            break;
        }
        break;

      case 'BMN':
        switch (neighborhoodBuild) {
          case '1':
            imageSrc = map9;
            officeRes = BLB1;
            break;
        }
        break;

      default:
    }
    setFinalImg(imageSrc);

    setOfficeRest(officeRes);
    setCall(false);
  };

  // const dateData = () => {
  //   const dates = [];
  //   calData.filter(ele => {
  //     const prevDate = moment(ele.date).isBefore(moment(), 'day');

  //     const getMonth = moment(ele.date).format('MM');
  //     const nextMonth = moment()
  //       .add(1, 'month')
  //       .format('MM');
  //     const currentMonth = getMonth !== nextMonth;

  //     let obj = {};
  //     if (!prevDate && currentMonth) {
  //       if (ele.officetype === 'EAB Office') {
  //         obj = {
  //           date: ele.date,
  //           markCssClass: 'mbsc-calendar-marks1',
  //         };
  //       } else if (ele.officetype === 'Remote Work') {
  //         obj = {
  //           date: ele.date,
  //           markCssClass: 'mbsc-calendar-marks2',
  //         };
  //       } else if (ele.officetype === 'Paid Time Off') {
  //         obj = {
  //           date: ele.date,
  //           markCssClass: 'mbsc-calendar-marks3',
  //         };
  //       }
  //     }

  //     dates.push(obj);
  //   });
  //   return dates;
  // };

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

      {reportApiMessage && (
        <div
          className={`"alert-dismissible fade show ${
            reportApiSuccess ? 'popup_success' : 'popup_err'
          } "`}
          role="alert"
        >
          <p className="text-center m-auto">{reportApiMessage}</p>
        </div>
      )}

      <div className="wrapper_main">
        {myTeamSuccess && myTeamSuccess.loading && !isdata ? (
          <div className="mt-4 weekly-default-inner d-flex flex-wrap">
            <Spinner
              className="app-spinner"
              animation="grow"
              variant="dark"
              // style={{ width: '0%' }}
            />
          </div>
        ) : (
          <div className="container">
            <h4
              className="common-title"
              style={{ marginLeft: '20px', marginBottom: ' 38px' }}
            >
              My Team
            </h4>

            <InfiniteScroll
              dataLength={state.allUser.length}
              next={() => fetchMoreData()}
              style={{ display: 'flex', flexDirection: 'column-reverse' }}
              // inverse={true} //
              // eslint-disable-next-line react/jsx-boolean-value
              hasMore={true}
              // loader={<h4>Loading...</h4>}
              // scrollableTarget="scrollableDiv"
            >
              <Calender
                defaultSelected="week"
                setShow={setShow}
                allUser={state.allUser}
                setEmployeeLocationDetail={setEmployeeLocationDetail}
                getWorkSpots={getWorkSpots}
                handleEditModal={datas => setModalData(datas)}
                weekVal={state.weekVal}
                teamLoading={state.teamLoading}
                displayDefault={state.displayDefault}
              />
            </InfiniteScroll>

            <Modal
              className="modal fade test_modal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              show={show}
              onHide={handleClose}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Invite Team to the Office
                    </h5>
                    <button
                      type="button"
                      className="btn-close "
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        handleClearData();
                        setShow(false);
                      }}
                    />
                  </div>
                  <div className="modal-body modal-body_myteam">
                    <Select
                      components={{ Option }}
                      isMulti
                      isClearable={false}
                      value={state.selectedOption}
                      onChange={handleChange}
                      options={updatedEmpData}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      onMenuClose={false}
                      className="mb-3"
                      name="employee"
                      placeholder="Select Team Member(s)"
                      styles={colourStyles}
                      theme={theme => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary: '#d1dce7',
                        },
                      })}
                    />
                    <div className="selection">
                      <select name="location" onChange={handleUserSelect}>
                        <optgroup label="EAB Office">
                          {finalLocation &&
                            finalLocation.map(i => (
                              <option
                                htmlFor="jane"
                                value={i.locationCode}
                                id="location"
                                style={{ padding: '50px' }}
                              >
                                {i.locationname}
                              </option>
                            ))}
                        </optgroup>
                        <hr />
                        <option value={data && data.locationCode}>
                          {data && data.locationname}
                        </option>
                      </select>
                    </div>
                    <div className="invite-team-wrapp choose-date mt-3">
                      <div className="access-to">
                        <span className="material-icons-outlined">
                          calendar_today
                        </span>
                      </div>

                      <Datepicker
                        controls={['calendar']}
                        dateFormat="MMM D,YYYY"
                        selectMultiple
                        min={moment().toDate()}
                        selectCounter
                        placeholder="Select Date(s)"
                        buttons={nowButtons}
                        ref={setNow}
                        onChange={onDateChange}
                      />
                    </div>

                    <div className="description mt-3">
                      <textarea
                        name="textValue"
                        onChange={handleTextData}
                        id=""
                        placeholder="Add a Message"
                        cols="30"
                        rows="10"
                      />
                    </div>
                    <p className="notice mb-1 mt-2">
                      An email invitation will be sent to the selected team
                      member(s) once you click Invite.
                    </p>
                  </div>
                  <div className="modal-footer">
                    {!isLoading ? (
                      <button
                        type="button"
                        className={
                          state.selectedNames &&
                          state.selectedOption.length > 0 &&
                          state.date
                            ? 'btn save-data'
                            : 'btn disable-data'
                        }
                        onClick={() => {
                          handleModalClose();
                          handleCloseData();
                        }}
                      >
                        Invite
                      </button>
                    ) : (
                      <button type="button" className="btn save-data">
                        <div
                          className="spinner-border"
                          style={{ marginRight: '2px' }}
                        />
                        Invite
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        handleClearData();
                        setShow(false);
                      }}
                      className="btn dismiss"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal
              className="modal fade test_modal test_modal-employee"
              show={employeeLocationDetail}
              onHide={() => setEmployeeLocationDetail(false)}
              aria-labelledby="exampleModalLabel"
              style={{ maxWidth: 'calc(100% - 10rem)' }}
              aria-hidden="true"
              centered
              size="lg"
            >
              <div className=" modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header myteam_header">
                    <div className="left-panel myteam_card">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {moment().format('dddd, MMMM DD YYYY')}
                      </h5>
                    </div>
                    <div className="myteam-user">
                      {' '}
                      <img src={profile} alt="" />
                      <label htmlFor="my-spot">
                        {modalData && modalData.user}
                      </label>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setEmployeeLocationDetail(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <div className="office-structure office-structure-modal">
                      <div className="container" style={{ height: '100%' }}>
                        <>
                          <div
                            className="card office-structure-inner"
                            style={{ height: '100%' }}
                          >
                            {officeRest || ''}
                            <div className="right-map">
                              <Draggable
                                disabled={!isDraggable}
                                key={state.version}
                              >
                                <div
                                  className="drag_image"
                                  style={
                                    isDraggable ? { cursor: 'move' } : null
                                  }
                                >
                                  <img
                                    src={finalImg}
                                    alt=""
                                    style={imgStyle}
                                    draggable="false"
                                  />
                                </div>
                              </Draggable>
                              <div className="toolbar">
                                <button
                                  className="location"
                                  type="button"
                                  onClick={() => handleDefault()}
                                >
                                  <img src={locationMap} alt="" />
                                </button>
                                <button
                                  className="zoomin"
                                  type="button"
                                  onClick={() => handleZoomIn()}
                                >
                                  <img src={zoomin} alt="" />
                                </button>
                                <button
                                  className="zoomout"
                                  type="button"
                                  onClick={() => handleZoomOut()}
                                >
                                  <img src={zoomout} alt="" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                      <div className="container" style={{ height: '100%' }}>
                        <div className="right-map" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
      <Modal
        className="modal fade test_modal"
        show={isdata}
        onHide={() => setData(false)}
        aria-labelledby="exampleModalLabel"
        style={{ maxWidth: 'calc(100% - 0rem)' }}
        aria-hidden="true"
        centered
      >
        <div className=" modal-dialog-centered">
          <div className="modal-content">
            <img
              src={success}
              alt="Success"
              style={{ width: '165px', margin: '70px auto' }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

Report.propTypes = {
  handleChange: PropTypes.func,
  state: PropTypes.object,
  imgStyle: PropTypes.object,
  handleZoomIn: PropTypes.func,
  handleZoomOut: PropTypes.func,
  handleDefault: PropTypes.func,
  handleUserSelect: PropTypes.func,
  onDateChange: PropTypes.func,
  locationErrorHandle: PropTypes.string,
  location: PropTypes.object,
  getWorkSpots: PropTypes.func,
  handleModalClose: PropTypes.func,
  handleTextData: PropTypes.func,
  memberData: PropTypes.object,
  dataList: PropTypes.object,
  reportApiSuccess: PropTypes.bool,
  reportApiMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  handleClearData: PropTypes.func,
  fetchMoreData: PropTypes.func,
  myTeamSuccess: PropTypes.object,
};

export default Report;
