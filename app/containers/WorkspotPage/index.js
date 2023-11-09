/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import Workspot from '../../components/WorkSpot';
import reducer from './reducer';
import {
  requestGetLocation,
  requestUpdateWorkspot,
  // requestGetWeeklyDefault,
  resetWorkspot,
  requestGetNeighborhood,
  requestGetColleague,
  requestGetColleagueData,
  requestSearchColleagueData,
  requestDeleteColleagueData,
  resetWorkspotMessage,
  requestGetMonthData,
} from './actions';
import { getWorkSpotData } from './helpers';
import {
  getMonthStartEndDate,
  getStartEndDate,
  getWeekStartEndDate,
} from '../../components/Cal/helpers';

const zoomStep = 1;
const maxScale = 5;
const minScale = 1;
const defaultScale = minScale;
const defaultRotate = 0;
let datas;
let isIntervalWorking = false;

class WorkSpotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelected: 'month',
      displayDefault: 'week',
      // searchValue: '',
      allUser: [],
      date: '',
      location: 'Washington, DC',
      scale: defaultScale,
      rotate: defaultRotate,
      version: 0,
      d: '',
      work_place: 'Washington, DC',
      work_area: '',
      workSpotData: [],
      userList: [],
      selectedColleagues: [],
      selectedColleaguesId: [],
      selectedDateRange: {},
      updatingObject: {
        work_area: 'Washington, DC',
      },
      editModal: false,
      search: false,
      errMessage: '',
      errSuccess: false,
      updateVal: true,
      onSuccess: false,
      colleagueWeekly: [],
      loading: true,
      colleaguesId: [],
      updatedlistArray: [],
      success: false,
      workspotLoading: false,
      activePage: 1,
      loc_date: '',
      listArray: [],
      removeColleague: [],
      privateSpace: false,
      tempLocation: '',
    };
  }

  changeInterval = intValue => {
    isIntervalWorking = intValue;
  };

  handleClear = () => {
    this.setState({ date: '' });
  };

  handleZoomIn = () => {
    this.setState(state => {
      const newScale = state.scale + zoomStep;
      return {
        scale: newScale <= maxScale ? newScale : maxScale,
      };
    });
  };

  handleZoomOut = () => {
    this.setState(state => {
      const newScale = state.scale - zoomStep;
      return {
        scale: newScale >= minScale ? newScale : minScale,
      };
    });
  };

  handleDefault = () => {
    this.setState(state => ({
      scale: defaultScale,
      rotate: 0,
      version: state.version + 1,
    }));
  };

  componentDidMount() {
    const { defaultSelected } = this.state;

    this.props.requestGetLocation();
    this.props.requestGetNeighborhood();
    this.props.requestGetColleague();
    this.props.requestGetMonthData();

    const { dateToDisplay } =
      defaultSelected === 'week'
        ? getWeekStartEndDate(new Date())
        : getMonthStartEndDate(new Date());
    const { startDispDate, endDispDate } = getStartEndDate(
      dateToDisplay,
      defaultSelected,
    );
    const sDate = moment(startDispDate).format('YYYY-MM-DD');
    const eDate = moment(endDispDate).format('YYYY-MM-DD');
    this.props.requestGetColleagueData({
      startdate: sDate,
      enddate: eDate,
    });

    this.getWorkSpots(startDispDate, endDispDate);
    this.setState({
      selectedDateRange: { startDate: startDispDate, endDate: endDispDate },
    });
  }

  componentWillUnmount() {
    clearInterval(datas);
  }

  clearState = () => {
    this.setState({ updatingObject: { work_area: '' } });
  };

  unique = (dataVal, key) => [
    ...new Map(dataVal.map(x => [key(x), x])).values(),
  ];

  updateState = newArr => {
    this.setState({ updatedlistArray: newArr });
  };

  componentDidUpdate() {
    const { selectedDateRange } = this.state;
    const {
      workspotSuccess,
      workspotMessage,
      searchColleague,
      deleteSearchColleague,
      apiMessage,
      colleagueListData,
      neighborhoodData,
    } = this.props;
    if (workspotSuccess && workspotMessage) {
      this.props.requestGetMonthData();
      this.props.requestGetNeighborhood();
      this.getWorkSpots(
        selectedDateRange && selectedDateRange.startDate,
        selectedDateRange && selectedDateRange.endDate,
      );
      // this.handleEditModal(false);
      this.props.resetWorkspot();

      setTimeout(() => {
        this.handleClearModal();
      }, 5000);
    }

    if (neighborhoodData && neighborhoodData.isAssignmentUpdate) {
      clearInterval(datas);
      this.changeInterval(false);
    } else if (
      neighborhoodData &&
      neighborhoodData.locationCode !== 'PTO' &&
      neighborhoodData.locationCode !== 'EAB' &&
      !neighborhoodData.isAssignmentUpdate
    ) {
      if (!isIntervalWorking) {
        datas = setInterval(() => {
          this.props.requestGetNeighborhood();
          this.getWorkSpots(
            selectedDateRange && selectedDateRange.startDate,
            selectedDateRange && selectedDateRange.endDate,
          );
        }, 60000);
        this.changeInterval(true);
      }
    }

    if (apiMessage) {
      setTimeout(() => {
        this.props.resetWorkspotMessage();
      }, 5000);
    }
    const sDate = moment(selectedDateRange.startDate).format('YYYY-MM-DD');
    const eDate = moment(selectedDateRange.endDate).format('YYYY-MM-DD');
    if (
      (searchColleague && searchColleague.success) ||
      (deleteSearchColleague && deleteSearchColleague.success)
    ) {
      this.props.requestGetColleagueData({
        startdate: sDate,
        enddate: eDate,
      });
      this.handleRemoveUserSelect();
      this.props.resetWorkspot();
    }

    if (colleagueListData && colleagueListData.success) {
      this.props.resetWorkspot();
      this.handleColleagues();
    }
  }

  handleClearCal = () => {
    this.props.resetWorkspotMessage();
  };

  handleColleagues = () => {
    const newArr = [...this.props.colleagueWeeklyData];

    this.setState({ colleagueWeeklyData: newArr });
  };

  handleLocDate = date => {
    this.setState({ loc_date: date });
  };

  handledata = () => {
    this.setState({ updateVal: false });
  };

  handleClearModal = () => {
    setTimeout(() => {
      this.setState({
        updatingObject: {},
        tempLocation: '',
      });
      this.props.requestGetNeighborhood();
    }, 300000);

    this.setState({ errSuccess: false, errMessage: '', success: false });

    this.setState({ work_place: '' });
  };

  handleUserSelect = data => {
    const { selectedColleagues } = this.state;
    const newArr = [...selectedColleagues];
    if (newArr.includes(data)) {
      const index = newArr.indexOf(data);
      newArr.splice(index, 1);
    } else {
      newArr.push(data);
    }

    this.setState({ selectedColleagues: newArr });
  };

  handleRemoveUserSelect = () => {
    this.setState({ selectedColleagues: [] });
  };

  handleRemove = (id, removeAll, data) => {
    this.setState({ removeColleague: data });
    if (removeAll) {
      this.props.requestDeleteColleagueData({ colleaguesid: 'Remove All' });
    } else {
      this.props.requestDeleteColleagueData({ colleaguesid: id });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      // eslint-disable-next-line no-unused-expressions
      this.state.searchValue !== ''
        ? this.setState({ search: true })
        : this.setState({ search: false });
      this.setState({ updatedlistArray: [], listArray: [] });
    });
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    const timeoutId = setTimeout(() => {
      this.setState({ activePage: 1 }, () =>
        this.props.requestGetColleague({
          page: this.state.activePage,
          searchUser: this.state.searchValue || '',
        }),
      );
    }, 1000);
    this.setState({
      typingTimeout: timeoutId,
    });
  };

  handleuserLocation = d => {
    this.setState({ d });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckbox = () => {
    this.setState({ privateSpace: true });
  };

  onDateChange = event => {
    this.setState({ date: event.valueText });
  };

  // for instant update calendar location
  updateWorkspotData = (locationCode, date, locationName) => {
    const { workSpotData } = this.state;
    const index = workSpotData.findIndex(
      obj =>
        moment(obj.date).format('MM/DD/YYYY') ===
        moment(date).format('MM/DD/YYYY'),
    );

    const partialIndex =
      workSpotData[index] &&
      workSpotData[index].data &&
      workSpotData[index].data.findIndex(
        obj =>
          moment(obj.date).format('MM/DD/YYYY') ===
          moment(date).format('MM/DD/YYYY'),
      );

    const data = workSpotData.map((obj, idx) => {
      if (obj.unitsapproved && idx === index) {
        const arr = [];
        obj.data.find((ele, id) => {
          if (id === partialIndex) {
            // eslint-disable-next-line no-unused-expressions
            ele = [
              {
                ...ele,
                locationName,
                locationCode,
              },
              {
                ...obj.data[1],
              },
            ];
            arr.push(...ele);
          }

          obj = { ...obj, data: arr };
          return obj;
        });
      }
      //  else {
      if (idx === index) {
        return {
          ...obj,
          locationName,
          locationCode,
        };
        // eslint-disable-next-line no-else-return
      } else {
        return obj;
      }
      // }
    });
    this.setState({ workSpotData: data });
  };

  onSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { updatingObject, privateSpace } = this.state;
    const { locationData, employeeId } = this.props;
    const a =
      locationData &&
      locationData.find(
        obj => obj.locationname === updatingObject.work_area_name,
      );
    this.setState({
      tempLocation: updatingObject.work_area_name
        ? updatingObject.work_area_name
        : this.props.neighborhoodData &&
          this.props.neighborhoodData.locationCode,
    });
    const payload = {
      data: {
        // eslint-disable-next-line radix
        locationid: a ? a.id : 'BLM',
        weekofday: [moment(updatingObject.date).format('YYYY-MM-DD')],
      },
      privateSpace,
      employeeid: employeeId,
    };
    this.props.requestUpdateWorkspot(payload);
    this.updateWorkspotData(
      a && a.locationCode,
      moment(updatingObject.date).format('YYYY-MM-DD'),
      updatingObject.work_area_name,
    );
  };

  onUpdateWorkspot = () => {
    const { work_place, date, privateSpace } = this.state;
    const locDate = date.split(',');
    const { locationData, employeeId } = this.props;

    const a =
      locationData && locationData.find(obj => obj.locationname === work_place);
    const payload = {
      data: {
        // eslint-disable-next-line radix
        locationid: a ? a.id : 'BLM',
        weekofday: locDate,
      },
      employeeid: employeeId,
      privateSpace,
    };
    this.props.requestUpdateWorkspot(payload);
    this.setState({ privateSpace: false });
  };

  handleColleageUpdate = () => {
    const { selectedColleagues } = this.state;
    // eslint-disable-next-line arrow-body-style
    const data = selectedColleagues.map(({ employeeid }) => {
      return employeeid;
    });
    const payload = {
      colleaguesid: data,
    };
    this.props.requestSearchColleagueData(payload);
  };

  getWorkSpots = async (startDate, endDate) => {
    const { history } = this.props;
    this.setState({ workspotLoading: true });
    const { success, data, message, tokenExp } = await getWorkSpotData(
      startDate,
      endDate,
    );

    if (success) {
      this.setState({
        selectedDateRange: { startDate, endDate },
        workSpotData: data,
        // isLoading,
      });
      this.setState({ success });
      this.setState({ workspotLoading: false });
    } else {
      this.setState({ errMessage: message });
      this.setState({ errSuccess: success });
      this.setState({ workspotLoading: false });
      if (tokenExp.status === 403) {
        sessionStorage.clear();
        history.push('/auth');
      }
    }
  };

  handleEditModal = val => {
    this.setState({ editModal: val });
  };

  handleUpdatingModalData = (key, val) => {
    if (!key) {
      this.setState({ updatingObject: {} });
    } else {
      this.setState(prevState => ({
        updatingObject: { ...prevState.updatingObject, [key]: val },
      }));
    }
  };

  render() {
    const imgStyle = {
      transform: `scale(${this.state.scale}) rotate(${this.state.rotate}deg)`,
    };
    const dataStyle = {
      display: 'inline-block',
      transform: 'translate(16.5151px, 8.15472px) scale(0.940591)',
      transformOrigin: ' -50px 362px',
      height: ' 40vh',
      cursor: 'pointer',
    };
    const {
      locationData,
      neighborhoodData,
      neighborhood,
      apiMessage,
      apiSuccess,
      colleagueWeeklyData,
      colleagueDataLoader,
      profileUserLoading,
      colleaguesData,
      monthData,
      leadersCommittee,
      badgeData,
    } = this.props;
    const { errSuccess } = this.state;

    return (
      <>
        <div id="content-wrap">
          <Workspot
            onSubmit={this.onSubmit}
            handleUserSelect={this.handleUserSelect}
            handleChange={this.handleChange}
            handleColleageUpdate={this.handleColleageUpdate}
            state={this.state}
            onChange={this.onChange}
            onDateChange={this.onDateChange}
            handleRemove={this.handleRemove}
            imgStyle={imgStyle}
            dataStyle={dataStyle}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
            handleuserLocation={this.handleuserLocation}
            locationData={locationData}
            getWorkSpots={this.getWorkSpots}
            handleEditModal={this.handleEditModal}
            handleUpdatingModalData={this.handleUpdatingModalData}
            handleClearCal={this.handleClearCal}
            onUpdateWorkspot={this.onUpdateWorkspot}
            apiMessage={apiMessage}
            apiSuccess={apiSuccess}
            neighborhoodData={neighborhoodData}
            errSuccess={errSuccess}
            neighborhood={neighborhood}
            colleaguesData={colleaguesData}
            colleagueWeeklyData={colleagueWeeklyData}
            colleagueDataLoader={colleagueDataLoader}
            profileUserLoading={profileUserLoading}
            requestGetColleagueData={this.props.requestGetColleagueData}
            monthData={monthData}
            leadersCommittee={leadersCommittee}
            handleCheckbox={this.handleCheckbox}
            handleRemoveUserSelect={this.handleRemoveUserSelect}
            handleClear={this.handleClear}
            badgeData={badgeData}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { workspot, profile } = state;

  return {
    badgeData: profile && profile.userList,

    locationData:
      workspot &&
      workspot.getLocationData &&
      workspot.getLocationData.locationList,
    locationSuccess:
      workspot && workspot.getLocationData && workspot.getLocationData.success,
    locationMsg:
      workspot && workspot.getLocationData && workspot.getLocationData.message,
    apiMessage: workspot && workspot.apiMessage,

    apiSuccess: workspot && workspot.apiSuccess,
    workspotSuccess:
      workspot && workspot.updateWorkspot && workspot.updateWorkspot.success,
    workspotMessage:
      workspot && workspot.updateWorkspot && workspot.updateWorkspot.message,
    neighborhoodData:
      workspot &&
      workspot.neighborhood &&
      workspot.neighborhood.neighborhoodData,
    neighborhoodSuccess:
      workspot && workspot.neighborhood && workspot.neighborhood.success,
    neighborhoodMsg:
      workspot && workspot.neighborhood && workspot.neighborhood.message,
    neighborhoodLoad:
      workspot && workspot.neighborhood && workspot.neighborhood.isloading,
    location: workspot && workspot.getLocationData,
    neighborhood: workspot && workspot.neighborhood,
    colleaguesData:
      workspot &&
      workspot.colleagueData &&
      workspot.colleagueData.colleagueList,
    colleagueWeeklyData:
      workspot &&
      workspot.getColleagueData &&
      workspot.getColleagueData.colleagueData,
    colleagueDataLoader:
      workspot &&
      workspot.getColleagueData &&
      workspot.getColleagueData.isloading,
    colleagueListData: workspot && workspot.getColleagueData,
    searchColleague: workspot && workspot.searchColleague,
    deleteSearchColleague: workspot && workspot.deleteSearchColleague,
    profileUserLoading: profile && profile.loading,
    monthData:
      workspot && workspot.getMonthData && workspot.getMonthData.monthData,
    leadersCommittee:
      profile && profile.userList && profile.userList.leaderscommittee,
    employeeId: profile && profile.userList && profile.userList.employeeid,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetLocation: payload => dispatch(requestGetLocation(payload)),
    requestUpdateWorkspot: payload => dispatch(requestUpdateWorkspot(payload)),
    // requestGetWeeklyDefault: payload =>
    //   dispatch(requestGetWeeklyDefault(payload)),
    resetWorkspot: () => dispatch(resetWorkspot()),
    requestGetNeighborhood: payload =>
      dispatch(requestGetNeighborhood(payload)),
    requestGetColleague: payload => dispatch(requestGetColleague(payload)),
    requestGetColleagueData: payload =>
      dispatch(requestGetColleagueData(payload)),
    requestSearchColleagueData: payload =>
      dispatch(requestSearchColleagueData(payload)),
    requestDeleteColleagueData: payload =>
      dispatch(requestDeleteColleagueData(payload)),
    requestGetMonthData: payload => dispatch(requestGetMonthData(payload)),
    resetWorkspotMessage: () => dispatch(resetWorkspotMessage()),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'workspot', reducer });

WorkSpotPage.propTypes = {
  requestGetLocation: PropTypes.func,
  requestUpdateWorkspot: PropTypes.func,
  locationData: PropTypes.array,
  workspotSuccess: PropTypes.bool,
  workspotMessage: PropTypes.string,
  // requestGetWeeklyDefault: PropTypes.func,
  resetWorkspot: PropTypes.func,
  requestGetNeighborhood: PropTypes.func,
  neighborhoodData: PropTypes.object,
  neighborhood: PropTypes.object,
  apiMessage: PropTypes.string,
  apiSuccess: PropTypes.bool,
  requestGetColleague: PropTypes.func,
  colleaguesData: PropTypes.array,
  requestGetColleagueData: PropTypes.func,
  requestGetMonthData: PropTypes.func,
  colleagueWeeklyData: PropTypes.array,
  colleagueDataLoader: PropTypes.bool,
  colleagueListData: PropTypes.object,
  requestSearchColleagueData: PropTypes.func,
  searchColleague: PropTypes.object,
  requestDeleteColleagueData: PropTypes.func,
  history: PropTypes.object,
  profileUserLoading: PropTypes.bool,
  leadersCommittee: PropTypes.bool,
  resetWorkspotMessage: PropTypes.func,
  monthData: PropTypes.array,
  deleteSearchColleague: PropTypes.object,
  employeeId: PropTypes.number,
  badgeData: PropTypes.object,
};

export default compose(
  withReducer,
  //   withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WorkSpotPage);
