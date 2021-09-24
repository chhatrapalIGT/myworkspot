/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import injectReducer from 'utils/injectReducer';
import PropTypes from 'prop-types';
// import moment from 'moment';
import Axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Workspot from '../../components/WorkSpot';
import reducer from './reducer';
import { requestGetLocation, requestUpdateWorkspot } from './actions';
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
      work_place: '',
      // work_place: [
      //   {
      //     date: '',
      //     work_area: '',
      //   },
      // ],
      workSpotData: [],
      userList: [],
      selectedColleagues: [],
      selectedDateRange: {},
      updatingObject: {},
      editModal: false,
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

  handleUserSelect = username => {
    const { selectedColleagues } = this.state;
    const newArr = [...selectedColleagues];
    if (newArr.includes(username)) {
      const index = newArr.indexOf(username);
      newArr.splice(index, 1);
    } else {
      newArr.push(username);
    }
    this.setState({ selectedColleagues: newArr });
  };

  handleRemove = name => {
    const { allUser } = this.state;
    const newArr = [...allUser];
    if (newArr.includes(name)) {
      const idx = newArr.indexOf(name);
      newArr.splice(idx, 1);
    }
    this.setState({ allUser: newArr });
  };

  handleChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleChangeWorkPlace = (value, idx, name) => {
    // eslint-disable-next-line camelcase
    const { work_place } = this.state;
    const newplatformdata = work_place.map((pdata, sidx) => {
      // pdata.date = this.state.d;
      if (idx !== sidx) return pdata;
      return { ...pdata, [name]: value };
    });
    this.setState({ work_place: newplatformdata }, () => {});
  };

  handleuserLocation = d => {
    this.setState({ d });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onDateChange = event => {
    const { date } = this.state;
    this.setState({ date: event.valueText });
    console.log(`date>>>>`, date);
  };

  onSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    // const { locationData } = this.props;
    const { updatingObject, selectedDateRange } = this.state;
    console.log(`updatingObject`, updatingObject);

    console.log(`payload`, updatingObject, selectedDateRange);
    //   const a =
    //   locationData && locationData.find(obj => obj.locationname === work_place);
    // const payload = {
    //   data: {
    //     // eslint-disable-next-line radix
    //     locationid: parseInt(a.id),
    //     weekofday: locDate,
    //   },
    //   employeeid: 239321,
    // };
    // console.log(`payload`, payload);
    // this.props.requestUpdateWorkspot(payload);
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
        locationid: parseInt(a.id),
        weekofday: locDate,
      },
      employeeid: 239321,
    };
    this.props.requestUpdateWorkspot(payload);
  };

  handleClose = () => {};

  handleColleageUpdate = () => {
    const {
      selectedColleagues,
      selectedDateRange: { startDate, endDate },
    } = this.state;
    const newArr = [];
    for (let i = 0; i < selectedColleagues.length; i += 1) {
      const name = selectedColleagues[i];
      const data = getWorkSpotData(startDate, endDate);
      newArr.push({ workspot: data, userName: name });
    }
    this.setState({ allUser: newArr });
  };

  getWorkSpots = async (startDate, endDate) => {
    const workSpotData = await getWorkSpotData(startDate, endDate);

    this.setState({
      selectedDateRange: { startDate, endDate },
      workSpotData,
    });
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
    const { locationData, workspotSuccess, workspotMessage } = this.props;
    return (
      <>
        <div id="content-wrap">
          <Header />
          <Workspot
            onSubmit={this.onSubmit}
            handleUserSelect={this.handleUserSelect}
            handleChange={this.handleChange}
            handleColleageUpdate={this.handleColleageUpdate}
            handleClose={this.handleClose}
            state={this.state}
            onChange={this.onChange}
            onDateChange={this.onDateChange}
            handleRemove={this.handleRemove}
            imgStyle={imgStyle}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
            handleChangeWorkPlace={this.handleChangeWorkPlace}
            handleuserLocation={this.handleuserLocation}
            locationData={locationData}
            getWorkSpots={this.getWorkSpots}
            handleEditModal={this.handleEditModal}
            handleUpdatingModalData={this.handleUpdatingModalData}
            onUpdateWorkspot={this.onUpdateWorkspot}
            workspotSuccess={workspotSuccess}
            workspotMessage={workspotMessage}
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
    workspotSuccess:
      Workspot && Workspot.updateWorkspot && Workspot.updateWorkspot.success,
    workspotMessage:
      Workspot && Workspot.updateWorkspot && Workspot.updateWorkspot.message,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetLocation: payload => dispatch(requestGetLocation(payload)),
    requestUpdateWorkspot: payload => dispatch(requestUpdateWorkspot(payload)),
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
};

export default compose(
  withReducer,
  //   withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WorkSpotPage);
