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
import Select, { components } from 'react-select';
import createClass from 'create-react-class';
import Spinner from 'react-bootstrap/Spinner';
import Calender from '../Cal/Calender';
import profile from '../assets/images/profileof.png';
import success from '../../images/popup.png';
import checkedCircle from '../../images/check-circle-fill.svg';
import crossCircle from '../../images/x-circle-fill.svg';

import '../FAQ/styles.scss';
import MapComponent from '../Resource/map';

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
  handleModalClose,
  handleTextData,
  dataList,
  reportApiSuccess,
  reportApiMessage,
  isLoading,
  handleClearData,
  myTeamSuccess,
  fetchMoreData,
  monthData,
  clearAddTeamData,
  handlecloseReportDataIcon,
}) => {
  const [isdata, setData] = useState(false);
  const data = location && location.length && location[location.length - 1];
  const colourStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
      border: '1px solid #d1dce7',
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
        clearAddTeamData();
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

  const dateData = () => {
    const dates = [];
    // eslint-disable-next-line array-callback-return
    monthData.filter(ele => {
      const prevDate = moment(ele.date).isBefore(moment(), 'day');

      const getMonth = moment(ele.date).format('MM');
      const nextMonth = moment()
        .add(1, 'month')
        .format('MM');
      const currentMonth = getMonth !== nextMonth;
      const datas =
        ele && ele.data ? ele.data.find(obj => obj.locationCode !== 'PTO') : '';
      let obj = {};
      if (!prevDate && currentMonth) {
        if (
          ele.officetype === 'EAB Office' ||
          (datas.officetype === 'EAB Office' && ele.locationCode !== 'EAB')
        ) {
          obj = {
            date: ele.date,
            markCssClass: 'mbsc-calendar-marks1',
          };
        } else if (ele.locationCode === 'RW') {
          obj = {
            date: ele.date,
            markCssClass: 'mbsc-calendar-marks2',
          };
        } else if (ele.locationCode === 'PTO') {
          obj = {
            date: ele.date,
            markCssClass: 'mbsc-calendar-marks3',
          };
        }
      }

      dates.push(obj);
    });
    return dates;
  };

  const invalidDate = () => {
    const dates = [];
    // eslint-disable-next-line array-callback-return
    monthData.filter(ele => {
      // eslint-disable-next-line no-shadow
      let data = {};
      if (ele.locationCode === 'PTO') {
        data = {
          date: ele.date,
        };
      }

      dates.push(data);
    });
    return dates;
  };

  return (
    <>
      {(reportApiMessage ||
        (locationErrorHandle.error && !locationErrorHandle.success)) && (
        <div
          className={`"alert fade show w-25 mx-auto ${
            reportApiSuccess || locationErrorHandle.success
              ? 'alert alert-success '
              : 'alert alert-danger '
          } "`}
          style={{ marginTop: '20px', padding: '1rem' }}
        >
          <div>
            <img
              src={
                reportApiSuccess || locationErrorHandle.success
                  ? checkedCircle
                  : crossCircle
              }
              alt=""
              style={{ paddingRight: '5px', marginBottom: ' 4px' }}
            />

            {locationErrorHandle.error || reportApiMessage || ''}
          </div>
          <div
            style={{ float: 'right', fontSize: 'large' }}
            onClick={() => handlecloseReportDataIcon()}
            aria-hidden="true"
          >
            &#10006;
          </div>
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
                        marked={dateData()}
                        invalid={invalidDate()}
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
                      <img
                        src={profile}
                        alt=""
                        className="search-colleague-img"
                      />
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
                        <MapComponent
                          building={modalData.building}
                          floor={modalData.floor}
                          locationCode={modalData.locationCode}
                          state={state}
                          imgStyle={imgStyle}
                          handleZoomIn={handleZoomIn}
                          handleZoomOut={handleZoomOut}
                          handleDefault={handleDefault}
                          colorCode={modalData.colorcode}
                        />
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
          <div
            className="modal-content"
            // style={{ minHeight: 'calc(100vh - 555px)' }}
          >
            <div style={{ margin: 'auto', padding: '20%' }}>
              <img src={success} alt="Success" style={{ width: '140px' }} />
              {/* </div> */}
              {/* <div style={{ marginTop: '1rem' }}> */}
              <h4 className="text-center">Success!</h4>
              <p
                className="text-center"
                style={{ color: '#526E88', fontSize: '18px' }}
              >
                Your invite was sent
              </p>
            </div>
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
  dataList: PropTypes.object,
  reportApiSuccess: PropTypes.bool,
  reportApiMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  handleClearData: PropTypes.func,
  fetchMoreData: PropTypes.func,
  myTeamSuccess: PropTypes.object,
  monthData: PropTypes.object,
  clearAddTeamData: PropTypes.func,
  handlecloseReportDataIcon: PropTypes.func,
};

export default Report;
