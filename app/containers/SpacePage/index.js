/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import saga from './saga';
import reducer from './reducer';
import { requestGetOfficeUpdateData } from '../UploadMapPage/actions';
import {
  requestUpdateActiveStatus,
  clearUpdateStatus,
  clearMessage,
  requestGetManageSpace,
} from './actions';
import Spaces from '../../components/Spaces';

class OfficeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNames: 'DC',
      page: 1,
      limit: 10,
      sortOrder: {
        floor: true,
        neighborhood: true,
        space: true,
        type: true,
        assigned: true,
        status: true,
      },
    };
  }

  componentDidMount() {
    this.props.requestGetOfficeUpdateData({});
    this.props.requestGetManageSpace({});
  }

  getManageData = (id, search, value, space, sortOrder, page, limit) => {
    const finalPayload = {
      id,
      search,
      value,
      space,
      sortOrder,
      page,
      limit,
    };
    this.props.requestGetManageSpace(finalPayload);
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 });
    this.getManageData(
      '',
      this.state.searchVal,
      this.state.strVal,
      this.state.strSpace,
      this.state.sortOrder,
      1,
      e,
    );
  };

  handlePageChange = e => {
    const { limit } = this.state;
    this.setState({ page: e });
    this.getManageData(
      '',
      this.state.searchVal,
      this.state.strVal,
      this.state.strSpace,
      this.state.sortOrder,
      e,
      limit,
    );
  };

  handleClickSort = (key, val) => {
    this.setState(prev => ({
      sortOrder: { ...prev.sortOrder, [key]: !val },
    }));
    let sortOrder;
    if (val) {
      sortOrder = `${[key]} ASC`;
    } else {
      sortOrder = `${[key]} DESC`;
    }
    this.setState({ sortOrder });
    this.props.requestGetManageSpace({
      search: this.state.searchVal,
      value: this.state.strVal,
      space: this.state.strSpace,
      sortOrder,
      limit: this.state.limit,
      page: this.state.page,
    });
  };

  handleUserSelect = event => {
    const { value } = event.target;
    this.setState({ selectedNames: value });
  };

  handleCloseUpdate = () => {
    this.props.clearMessage();
  };

  componentDidUpdate() {
    const { spaceUpdate, setSpaceUpdate } = this.props;
    if (spaceUpdate && spaceUpdate.success && spaceUpdate.message) {
      this.props.requestGetOfficeUpdateData({});
      this.props.clearUpdateStatus();
    }
    if (setSpaceUpdate && setSpaceUpdate.showUpdateStatusMessage) {
      setTimeout(() => {
        this.props.clearMessage();
      }, 5000);
    }
  }

  render() {
    const {
      officeLocation,
      spaceUpdate,
      officeSuccess,
      setSpaceUpdate,
      manageSpace,
      dataCount,
    } = this.props;
    return (
      <>
        <div id="content-wrap">
          <Spaces
            manageSpace={manageSpace}
            dataCount={dataCount}
            state={this.state}
            officeLocation={officeLocation}
            handleLimitChange={this.handleLimitChange}
            handlePageChange={this.handlePageChange}
            handleClickSort={this.handleClickSort}
            handleUserSelect={this.handleUserSelect}
            handleCloseUpdate={this.handleCloseUpdate}
            requestUpdateActiveStatus={this.props.requestUpdateActiveStatus}
            spaceUpdate={spaceUpdate}
            setSpaceUpdate={setSpaceUpdate}
            officeSuccess={officeSuccess}
          />{' '}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { uploadOffice, space } = state;
  console.log('state:::', state);
  return {
    dataCount:
      space && space.manageSpace && space.manageSpace.getWorkSpaceDataPage,
    manageSpace: space && space.manageSpace && space.manageSpace.data,
    officeLocation:
      uploadOffice &&
      uploadOffice.getOfficeData &&
      uploadOffice.getOfficeData.masterData,
    officeSuccess:
      uploadOffice && uploadOffice.getOfficeData && uploadOffice.getOfficeData,
    spaceUpdate: space && space.updateStatus,
    setSpaceUpdate: space && space,
  };
};

export function mapDispatchToProps(dispatch) {
  return {
    requestGetOfficeUpdateData: payload =>
      dispatch(requestGetOfficeUpdateData(payload)),
    requestUpdateActiveStatus: payload =>
      dispatch(requestUpdateActiveStatus(payload)),
    requestGetManageSpace: payload => dispatch(requestGetManageSpace(payload)),
    clearUpdateStatus: () => dispatch(clearUpdateStatus()),
    clearMessage: () => dispatch(clearMessage()),
    dispatch,
  };
}
const withReducer = injectReducer({ key: 'space', reducer });
const withSaga = injectSaga({ key: 'space', saga });

OfficeMap.propTypes = {
  requestGetOfficeUpdateData: PropTypes.func,
  requestGetManageSpace: PropTypes.func,
  officeLocation: PropTypes.object,
  requestUpdateActiveStatus: PropTypes.func,
  clearUpdateStatus: PropTypes.func,
  clearMessage: PropTypes.func,
  spaceUpdate: PropTypes.object,
  manageSpace: PropTypes.object,
  dataCount: PropTypes.object,
  officeSuccess: PropTypes.object,
  setSpaceUpdate: PropTypes.object,
};

export default compose(
  withReducer,
  withSaga,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(OfficeMap);
