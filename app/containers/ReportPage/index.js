/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PropTypes from 'prop-types';
import moment from 'moment';
import profile from '../../images/profileof.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Report from '../../components/Report';
import allImage from '../../images/Vectoruser.png';
import reducer from './reducer';
import saga from './saga';
import {
  requestGetTeamMember,
  requestAddTeamMember,
  clearAddTeamData,
} from './actions';
import { getMyTeamData } from './helpers';
import { requestGetOfficeLocation } from '../onBoardingPage/actions';
import {
  getStartEndDate,
  getWeekStartEndDate,
} from '../../components/Cal/helpers';

const zoomStep = 1;
const maxScale = 5;
const minScale = 1;
const defaultScale = minScale;
const defaultRotate = 0;
class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelected: 'week',
      selectedOption: [],
      scale: defaultScale,
      rotate: defaultRotate,
      version: 0,
      selectedNames: this.props.location.length
        ? this.props.location &&
          this.props.location[0] &&
          this.props.location[0].locationCode
        : 'DC',
      date: '',
      allUser: [],
      weekVal: true,
    };
  }

  handleChange = option => {
    this.setState(() => ({
      selectedOption: option,
    }));
  };

  handleModalClose = () => {
    const { date, selectedNames, selectedOption, textValue } = this.state;
    const { location } = this.props;
    const optionData = selectedOption.map(data => data.id);
    let optionAllValue = '';
    optionAllValue = selectedOption.find(
      data => data.value === 'All Team Member(s)',
    );

    const data = location.find(e =>
      e.locationCode === selectedNames ? e.id : '',
    );
    const locDate = date.split(', ');
    const finalValue =
      locDate && locDate.map(obj => moment(obj).format('YYYY-MM-DD'));

    const finalPayload = {
      inviteid: optionAllValue ? optionAllValue.value : optionData,
      employeeid: 239323,
      invitedate: finalValue,
      invitelocation: data.id,
      message: textValue || '',
    };

    if (selectedNames && selectedOption.length > 0 && date) {
      this.props.requestAddTeamMember(finalPayload);
    }
  };

  handleUserSelect = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleZoomIn = () => {
    this.setState(state => {
      const newScale = state.scale + zoomStep;
      return {
        scale: newScale <= maxScale ? newScale : maxScale,
      };
    });
  };

  onDateChange = event => {
    this.setState({ date: event.valueText });
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
    this.props.requestGetOfficeLocation();
    this.props.requestGetTeamMember();
    const { dateToDisplay } = getWeekStartEndDate(new Date());
    const { startDispDate, endDispDate } = getStartEndDate(
      dateToDisplay,
      'week',
    );
    this.getUserData(startDispDate, endDispDate);
  }

  getUserData = async (startDispDate, endDispDate) => {
    const newArr = [];

    const datas = await getMyTeamData(startDispDate, endDispDate);
    if (datas) {
      this.setState({ weekVal: false });
    }

    datas.data.map(obj => {
      const one = [];
      obj.data.map(arr => {
        one.push(arr);
      });
      obj = { ...obj, workspot: one };
      newArr.push(obj);
    });
    // }
    this.setState({ allUser: newArr });
  };

  getPlatformList = () => {
    const { memberData } = this.props;
    return (
      memberData &&
      memberData.map(obj => ({
        id: obj.employeeid,
        value: obj.firstname,
        label: obj.firstname,
        labelData: obj.lastname,
        flag: obj.photo ? allImage : profile,
      }))
    );
  };

  handleTextData = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleClearData = () => {
    const { location } = this.props;
    this.setState({
      date: '',
      selectedNames: location && location[0] && location[0].locationCode,
      selectedOption: [],
      textValue: '',
    });
  };

  componentDidUpdate() {
    const { reportApiMessage } = this.props;
    if (reportApiMessage) {
      setTimeout(() => {
        this.props.clearAddTeamData();
      }, 5000);
    }
  }

  render() {
    const {
      locationErrorHandle,
      location,
      memberData,
      reportApiMessage,
      reportApiSuccess,
      isLoading,
      myTeamSuccess,
    } = this.props;

    const imgStyle = {
      transform: `scale(${this.state.scale}) rotate(${this.state.rotate}deg)`,
    };
    return (
      <>
        <div id="content-wrap">
          <Header />
          <Report
            state={this.state}
            handleChange={this.handleChange}
            imgStyle={imgStyle}
            handleZoomIn={this.handleZoomIn}
            handleZoomOut={this.handleZoomOut}
            handleDefault={this.handleDefault}
            handleUserSelect={this.handleUserSelect}
            onDateChange={this.onDateChange}
            location={location}
            locationErrorHandle={locationErrorHandle}
            getWorkSpots={this.getUserData}
            memberData={memberData}
            dataList={this.getPlatformList()}
            handleModalClose={this.handleModalClose}
            handleTextData={this.handleTextData}
            reportApiSuccess={reportApiSuccess}
            reportApiMessage={reportApiMessage}
            isLoading={isLoading}
            handleClearData={this.handleClearData}
            myTeamSuccess={myTeamSuccess}
          />{' '}
        </div>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = state => {
  const { locationData, myTeam } = state;
  return {
    location:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation.location,
    locationErrorHandle:
      locationData &&
      locationData.getOfficeLocation &&
      locationData.getOfficeLocation,
    memberData:
      myTeam && myTeam.allTeamMemberList && myTeam.allTeamMemberList.member,
    reportApiMessage: myTeam && myTeam.reportApiMessage,
    reportApiSuccess: myTeam && myTeam.reportApiSuccess,
    isLoading: myTeam && myTeam.updateMember && myTeam.updateMember.loading,
    myTeamSuccess: myTeam && myTeam.updateMember && myTeam.updateMember,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeLocation: payload =>
      dispatch(requestGetOfficeLocation(payload)),
    requestGetTeamMember: payload => dispatch(requestGetTeamMember(payload)),
    requestAddTeamMember: payload => dispatch(requestAddTeamMember(payload)),
    clearAddTeamData: () => dispatch(clearAddTeamData()),
    dispatch,
  };
}

const withReducer = injectReducer({ key: 'myTeam', reducer });
const withSaga = injectSaga({ key: 'myTeam', saga });

ReportPage.propTypes = {
  requestGetOfficeLocation: PropTypes.func,
  requestGetTeamMember: PropTypes.func,
  requestAddTeamMember: PropTypes.func,
  reportApiSuccess: PropTypes.bool,
  reportApiMessage: PropTypes.string,
  clearAddTeamData: PropTypes.func,
  locationErrorHandle: PropTypes.string,
  location: PropTypes.object,
  memberData: PropTypes.object,
  myTeamSuccess: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ReportPage);
