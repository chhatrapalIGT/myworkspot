/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';
import moment from 'moment';
import Axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

class WorkSpotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelected: 'week',
      searchValue: '',
      allUser: [],
      date: '',
      location: 'Washington, DC',
      scale: defaultScale,
      rotate: defaultRotate,
      version: 0,
      d: '',
      work_place: 'Washington, DC',
      work_area: '',
      // work_place: [
      //   {
      //     date: '',
      //     work_area: '',
      //   },
      // ],
      workSpotData: [],
      userList: [],
      selectedColleagues: [],
      selectedColleaguesId: [],
      selectedDateRange: {},
      updatingObject: {
        work_area: 'Washington, DC',
      },
      editModal: false,
      errMessage: '',
      errSuccess: false,
      updateVal: true,
    };
  }

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
    const { dateToDisplay } =
      defaultSelected === 'week'
        ? getWeekStartEndDate(new Date())
        : getMonthStartEndDate(new Date());
    const { startDispDate, endDispDate } = getStartEndDate(
      dateToDisplay,
      defaultSelected,
    );

    this.getWorkSpots(startDispDate, endDispDate);
    this.setState({
      selectedDateRange: { startDate: startDispDate, endDate: endDispDate },
    });
    const url = `https://mocki.io/v1/503b1d85-b034-466b-af55-fc5ae262e848`;
    Axios.get(url).then(res => {
      this.setState({ userList: res.data });
    });
  }

  componentDidUpdate() {
    const { selectedDateRange } = this.state;
    const { workspotSuccess, workspotMessage } = this.props;

    if (workspotSuccess && workspotMessage) {
      this.props.resetWorkspot();
      this.getWorkSpots(
        selectedDateRange && selectedDateRange.startDate,
        selectedDateRange && selectedDateRange.endDate,
      );

      setTimeout(() => {
        this.handleClearModal();
      }, 3000);
    }
  }

  handledata = () => {
    this.setState({ updateVal: false });
  };

  handleClearModal = () => {
    const { workspotMessage, workspotSuccess } = this.props;
    if (workspotSuccess && workspotMessage) {
      this.setState({
        updatingObject: {},
      });
    }
    this.setState({ work_place: '' });
  };

  handleUserSelect = (username, id) => {
    const { selectedColleagues, selectedColleaguesId } = this.state;
    const newArr = [...selectedColleagues];
    const newId = [...selectedColleaguesId];
    if (newId.includes(id)) {
      // const index = newArr.indexOf(username);
      // newArr.splice(index, 1);
      const index = newId.indexOf(id);
      newId.splice(index, 1);
    } else {
      newArr.push(username);
      newId.push(id);
    }

    this.setState({ selectedColleaguesId: newId });
    this.setState({ selectedColleagues: newArr });
  };

  handleRemove = (id, removeAll) => {
    const {
      selectedColleaguesId,
      selectedDateRange: { startDate, endDate },
    } = this.state;
    const newArr = [...selectedColleaguesId];
    if (newArr.includes(id)) {
      const idx = newArr.indexOf(id);
      newArr.splice(idx, 1);
    }
    this.setState({ selectedColleaguesId: newArr });
    const sDate = moment(startDate).format('YYYY-MM-DD');
    const eDate = moment(endDate).format('YYYY-MM-DD');
    const payload = {
      employeeid: newArr,
      startdate: sDate,
      enddate: eDate,
    };

    const finalPayload = {
      employeeid: [],
      startdate: sDate,
      enddate: eDate,
    };
    if (removeAll) {
      this.props.requestGetColleagueData(finalPayload);
    } else {
      this.props.requestGetColleagueData(payload);
    }
  };

  handleChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleuserLocation = d => {
    this.setState({ d });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onDateChange = event => {
    this.setState({ date: event.valueText });
  };

  onSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { updatingObject } = this.state;
    const { locationData } = this.props;
    const a =
      locationData &&
      locationData.find(
        obj => obj.locationname === updatingObject.work_area_name,
      );
    const payload = {
      data: {
        // eslint-disable-next-line radix
        locationid: a ? a.id : 'WDC',
        weekofday: [moment(updatingObject.date).format('YYYY-MM-DD')],
      },

      employeeid: 239323,
    };
    this.props.requestUpdateWorkspot(payload);
  };

  onUpdateWorkspot = () => {
    const { work_place, date } = this.state;
    const locDate = date.split(',');
    const { locationData } = this.props;

    const a =
      locationData && locationData.find(obj => obj.locationname === work_place);
    const payload = {
      data: {
        // eslint-disable-next-line radix
        locationid: a ? a.id : 'WDC',
        weekofday: locDate,
      },
      employeeid: 239323,
    };
    this.props.requestUpdateWorkspot(payload);
  };

  handleColleageUpdate = () => {
    const {
      selectedDateRange: { startDate, endDate },
      selectedColleaguesId,
    } = this.state;

    const sDate = moment(startDate).format('YYYY-MM-DD');
    const eDate = moment(endDate).format('YYYY-MM-DD');
    const payload = {
      employeeid: selectedColleaguesId,
      startdate: sDate,
      enddate: eDate,
    };
    this.props.requestGetColleagueData(payload);
  };

  getWorkSpots = async (startDate, endDate) => {
    const { success, data, message } = await getWorkSpotData(
      startDate,
      endDate,
    );

    if (success) {
      this.setState({
        selectedDateRange: { startDate, endDate },
        workSpotData: data,
      });
    } else {
      this.setState({ errMessage: message });
      this.setState({ errSuccess: success });
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
    const {
      locationData,
      neighborhoodData,
      location,
      neighborhood,
      // workspotSuccess,

      apiMessage,
      colleaguesData,
      apiSuccess,
      colleagueWeeklyData,
      colleagueDataLoader,
      colleagueListData,
    } = this.props;
    const { errMessage, errSuccess } = this.state;

    return (
      <>
        <div id="content-wrap">
          <Header />
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
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
            handleuserLocation={this.handleuserLocation}
            locationData={locationData}
            getWorkSpots={this.getWorkSpots}
            handleEditModal={this.handleEditModal}
            handleUpdatingModalData={this.handleUpdatingModalData}
            onUpdateWorkspot={this.onUpdateWorkspot}
            // workspotSuccess={workspotSuccess}
            apiMessage={apiMessage}
            apiSuccess={apiSuccess}
            // workspotMessage={workspotMessage}
            neighborhoodData={neighborhoodData}
            errMessage={errMessage}
            errSuccess={errSuccess}
            location={location}
            neighborhood={neighborhood}
            colleaguesData={colleaguesData}
            colleagueWeeklyData={colleagueWeeklyData}
            colleagueDataLoader={colleagueDataLoader}
            colleagueListData={colleagueListData}
            // locationSuccess={locationSuccess}
            // locationMsg={locationMsg}
            // neighborhoodSuccess={neighborhoodSuccess}
            // neighborhoodMsg={neighborhoodMsg}
            // neighborhoodLoad={neighborhoodLoad}
          />
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { workspot } = state;
  return {
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
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'workspot', reducer });

WorkSpotPage.propTypes = {
  requestGetLocation: PropTypes.func,
  requestUpdateWorkspot: PropTypes.func,
  locationData: PropTypes.object,
  workspotSuccess: PropTypes.bool,
  workspotMessage: PropTypes.string,
  // requestGetWeeklyDefault: PropTypes.func,
  resetWorkspot: PropTypes.func,
  requestGetNeighborhood: PropTypes.func,
  neighborhoodData: PropTypes.object,
  location: PropTypes.object,
  neighborhood: PropTypes.object,
  apiMessage: PropTypes.string,

  apiSuccess: PropTypes.bool,
  requestGetColleague: PropTypes.func,
  colleaguesData: PropTypes.object,
  requestGetColleagueData: PropTypes.func,
  colleagueWeeklyData: PropTypes.object,
  colleagueDataLoader: PropTypes.bool,
  colleagueListData: PropTypes.object,
  // locationSuccess: PropTypes.bool,
  // locationMsg: PropTypes.string,
  // neighborhoodSuccess: PropTypes.bool,
  // neighborhoodMsg: PropTypes.string,
  // neighborhoodLoad: PropTypes.bool,
};

export default compose(
  withReducer,
  //   withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WorkSpotPage);
