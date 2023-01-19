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
  requestGetManageExport,
} from './actions';
import Spaces from '../../components/Spaces';

class OfficeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNames: 'DC',
      page: 1,
      limit: 10,
      newExport: false,
      sortOrder: {
        building_floor: true,
        neighborhood: true,
        space: true,
        space_type: true,
        assigned: true,
        algorithm_status: true,
      },
    };
  }

  componentDidMount() {
    this.props.requestGetOfficeUpdateData({});
    this.props.requestGetManageSpace({});
  }

  handleSearcha = e => {
    const { name, value } = e.target;
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    const timeoutId = setTimeout(() => {
      this.setState({ [name]: value }, () => {
        this.props.requestGetManageSpace({
          search: this.state.searchVal,
          officeSearch: this.state.officeSearch,
          floor: this.state.floorSearch,
          neighbor: this.state.neighborhoodSearch,
          sortBy: this.state.sortBy,
          limit: this.state.limit,
        });
      });
    }, 1000);
    this.setState({
      typingTimeout: timeoutId,
    });
  };

  getManageData = (
    id,
    search,
    officeSearch,
    neighbor,
    floor,
    sortBy,
    page,
    limit,
    newExport,
  ) => {
    const finalPayload = {
      id,
      search,
      officeSearch,
      neighbor,
      floor,
      sortBy,
      page,
      limit,
      newExport,
    };
    this.props.requestGetManageSpace(finalPayload);
  };

  handleLimitChange = e => {
    this.setState({ limit: e, page: 1 });
    this.getManageData(
      '',
      this.state.searchVal,
      this.state.officeSearch,
      this.state.neighborhoodSearch,
      this.state.floorSearch,
      this.state.sortBy,
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
      this.state.officeSearch,
      this.state.neighborhoodSearch,
      this.state.floorSearch,
      this.state.sortBy,
      e,
      limit,
    );
  };

  handleClickSort = (key, val) => {
    this.setState(prev => ({
      sortOrder: { ...prev.sortOrder, [key]: !val },
    }));
    let sortBy;
    if (val) {
      sortBy = `${[key]}-ASC`;
    } else {
      sortBy = `${[key]}-DESC`;
    }
    this.setState({ sortBy });
    this.props.requestGetManageSpace({
      search: this.state.searchVal,
      officeSearch: this.state.officeSearch,
      neighbor: this.state.neighborhoodSearch,
      floor: this.state.floorSearch,
      sortBy,
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
      exportManage,
      exportLoading,
      manageLoading,
      manageSuccess,
      exportSuccess,
      dataCount,
    } = this.props;
    return (
      <>
        <div id="content-wrap">
          <Spaces
            manageSpace={manageSpace}
            exportManage={exportManage}
            exportLoading={exportLoading}
            manageLoading={manageLoading}
            manageSuccess={manageSuccess}
            exportSuccess={exportSuccess}
            dataCount={dataCount}
            state={this.state}
            officeLocation={officeLocation}
            handleLimitChange={this.handleLimitChange}
            handlePageChange={this.handlePageChange}
            handleClickSort={this.handleClickSort}
            handleUserSelect={this.handleUserSelect}
            handleCloseUpdate={this.handleCloseUpdate}
            handleSearcha={this.handleSearcha}
            requestGetManageSpace={this.props.requestGetManageSpace}
            requestGetManageExport={this.props.requestGetManageExport}
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
  return {
    dataCount:
      space && space.manageSpace && space.manageSpace.getWorkSpaceDataPage,
    manageSpace: space && space.manageSpace && space.manageSpace.data,
    manageLoading: space && space.manageSpace && space.manageSpace.loading,
    manageSuccess: space && space.manageSpace && space.manageSpace.success,
    exportManage: space && space.manageExport && space.manageExport.data,
    exportLoading: space && space.manageExport && space.manageExport.loading,
    exportSuccess: space && space.manageExport && space.manageExport.success,
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
    requestGetManageExport: payload =>
      dispatch(requestGetManageExport(payload)),
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
  requestGetManageExport: PropTypes.func,
  officeLocation: PropTypes.object,
  requestUpdateActiveStatus: PropTypes.func,
  clearUpdateStatus: PropTypes.func,
  clearMessage: PropTypes.func,
  spaceUpdate: PropTypes.object,
  manageSpace: PropTypes.object,
  exportManage: PropTypes.object,
  exportLoading: PropTypes.object,
  manageLoading: PropTypes.object,
  manageSuccess: PropTypes.object,
  exportSuccess: PropTypes.object,
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
