import { produce } from 'immer';
import {
  REQUEST_UPDATE_ACTIVE_STATUS,
  SUCCESS_UPDATE_ACTIVE_STATUS,
  FAILED_UPDATE_ACTIVE_STATUS,
  REQUEST_GET_MANAGE_SPACE,
  SUCCESS_GET_MANAGE_SPACE,
  FAILED_GET_MANAGE_SPACE,
  REQUEST_GET_MANAGE_EXPORT,
  SUCCESS_GET_MANAGE_EXPORT,
  FAILED_GET_MANAGE_EXPORT,
  REQUEST_GET_LOCK_SPACE,
  SUCCESS_GET_LOCK_SPACE,
  FAILED_GET_LOCK_SPACE,
  REQUEST_GET_NEIGBOR_NAME,
  SUCCESS_GET_NEIGBOR_NAME,
  FAILED_GET_NEIGBOR_NAME,
  REQUEST_GET_OFFICES_TYPE,
  SUCCESS_GET_OFFICES_TYPE,
  FAILED_GET_OFFICES_TYPE,
  REQUEST_GET_FLOOR_BY_NAME,
  SUCCESS_GET_FLOOR_BY_NAME,
  FAILED_GET_FLOOR_BY_NAME,
  CLEAR_UPDATE_STATUS,
  CLEAR_MESSAGE,
  REQUEST_MANAGE_UPDATE_SPACE,
  SUCCESS_MANAGE_UPDATE_SPACE,
  FAILED_MANAGE_UPDATE_SPACE,
} from './constants';

// The initial state of the App
const initialState = {
  updateStatus: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  manageSpace: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  manageExport: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  lockSpace: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  neighborName: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  officesType: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  floorByName: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  updateManageSpace: {
    loading: false,
    error: '',
    message: '',
    success: false,
  },
  showUpdateStatusSuccess: false,
  showUpdateStatusMessage: '',
};

/* eslint-disable default-case, no-param-reassign */
const spaceReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_UPDATE_ACTIVE_STATUS:
        draft.updateStatus.loading = true;
        draft.updateStatus.error = '';
        break;
      case SUCCESS_UPDATE_ACTIVE_STATUS:
        draft.updateStatus.loading = false;
        draft.updateStatus.success = action.payload.success;
        draft.updateStatus.message = action.payload.message;
        draft.showUpdateStatusSuccess = action.payload.success;
        draft.showUpdateStatusMessage = action.payload.message;
        break;
      case FAILED_UPDATE_ACTIVE_STATUS:
        draft.updateStatus.loading = false;
        draft.updateStatus.success = false;
        draft.updateStatus.error = action.payload.Error;
        draft.showUpdateStatusSuccess = action.payload.success;
        draft.showUpdateStatusMessage = action.payload.Error;
        break;
      case REQUEST_GET_MANAGE_SPACE:
        draft.manageSpace.loading = true;
        draft.manageSpace.error = '';
        draft.manageSpace.success = false;
        break;
      case SUCCESS_GET_MANAGE_SPACE:
        draft.manageSpace.loading = false;
        draft.manageSpace.success = true;
        draft.manageSpace = action.payload;
        draft.manageSpace.message = action.payload.message;
        break;
      case FAILED_GET_MANAGE_SPACE:
        draft.manageSpace.loading = false;
        draft.manageSpace.success = false;
        draft.manageSpace.error = action.payload.Error;
        break;
      case REQUEST_GET_MANAGE_EXPORT:
        draft.manageExport.loading = true;
        draft.manageExport.error = '';
        break;
      case SUCCESS_GET_MANAGE_EXPORT:
        draft.manageExport.loading = false;
        draft.manageExport = action.payload;
        draft.manageExport.message = action.payload.message;
        break;
      case FAILED_GET_MANAGE_EXPORT:
        draft.manageExport.loading = false;
        draft.manageExport.success = false;
        draft.manageExport.error = action.payload.Error;
        break;
      case REQUEST_GET_LOCK_SPACE:
        draft.lockSpace.loading = true;
        draft.lockSpace.error = '';
        break;
      case SUCCESS_GET_LOCK_SPACE:
        draft.lockSpace.loading = false;
        draft.lockSpace.success = action.payload.success;
        draft.lockSpace = action.payload;
        draft.lockSpace.message = action.payload.message;
        break;
      case FAILED_GET_LOCK_SPACE:
        draft.lockSpace.loading = false;
        draft.lockSpace.success = false;
        draft.lockSpace.error = action.payload.Error;
        break;
      case REQUEST_GET_NEIGBOR_NAME:
        draft.neighborName.loading = true;
        draft.neighborName.error = '';
        break;
      case SUCCESS_GET_NEIGBOR_NAME:
        draft.neighborName.loading = false;
        draft.neighborName.success = action.payload.success;
        draft.neighborName = action.payload;
        draft.neighborName.message = action.payload.message;
        break;
      case FAILED_GET_NEIGBOR_NAME:
        draft.neighborName.loading = false;
        draft.neighborName.success = false;
        draft.neighborName.error = action.payload.Error;
        break;
      case REQUEST_GET_OFFICES_TYPE:
        draft.officesType.loading = true;
        draft.officesType.error = '';
        break;
      case SUCCESS_GET_OFFICES_TYPE:
        draft.officesType.loading = false;
        draft.officesType.success = action.payload.success;
        draft.officesType = action.payload;
        draft.officesType.message = action.payload.message;
        break;
      case FAILED_GET_OFFICES_TYPE:
        draft.officesType.loading = false;
        draft.officesType.success = false;
        draft.officesType.error = action.payload.Error;
        break;
      case REQUEST_GET_FLOOR_BY_NAME:
        draft.floorByName.loading = true;
        draft.floorByName.error = '';
        break;
      case SUCCESS_GET_FLOOR_BY_NAME:
        draft.floorByName.loading = false;
        draft.floorByName.success = action.payload.success;
        draft.floorByName = action.payload;
        draft.floorByName.message = action.payload.message;
        break;
      case FAILED_GET_FLOOR_BY_NAME:
        draft.floorByName.loading = false;
        draft.floorByName.success = false;
        draft.floorByName.error = action.payload.Error;
        break;
      case REQUEST_MANAGE_UPDATE_SPACE:
        draft.updateManageSpace.loading = true;
        draft.updateManageSpace.error = '';
        break;
      case SUCCESS_MANAGE_UPDATE_SPACE:
        draft.updateManageSpace.loading = false;
        draft.updateManageSpace.success = true;
        draft.updateManageSpace = action.payload;
        draft.updateManageSpace.message = action.payload.message;
        break;
      case FAILED_MANAGE_UPDATE_SPACE:
        draft.updateManageSpace.loading = false;
        draft.updateManageSpace.success = false;
        draft.updateManageSpace.message = action.payload.message;
        break;
      case CLEAR_UPDATE_STATUS:
        draft.updateStatus.success = false;
        draft.updateStatus.message = '';
        break;
      case CLEAR_MESSAGE:
        draft.showUpdateStatusSuccess = false;
        draft.showUpdateStatusMessage = '';
        draft.updateManageSpace.success = false;
        draft.updateManageSpace.message = '';
    }
  });

export default spaceReducer;
