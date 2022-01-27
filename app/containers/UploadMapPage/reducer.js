import produce from 'immer';
import {
  REQUEST_GET_OFFICE_UPDATE_DATA,
  SUCCESS_GET_OFFICE_UPDATE_DATA,
  FAILED_GET_OFFICE_UPDATE_DATA,
  CLEAR_OFFICE_DATA,
  REQUEST_FILE_UPLOAD,
  SUCCESS_FILE_UPLOAD,
  FAILED_FILE_UPLOAD,
  CLEAR_UPLOAD_SUCCESS,
  REQUEST_ADD_UPDATE_RESOURCE,
  SUCCESS_ADD__UPDATE_RESOURCE,
  FAILED_ADD__UPDATE_RESOURCE,
  REQUEST_REMOVE_RESOURCE,
  SUCCESS_REMOVE_RESOURCE,
  FAILED_REMOVE_RESOURCE,
} from './constants';

// The initial state of the App
const initialState = {
  getOfficeData: {
    error: '',
    success: false,
    message: '',
    loading: false,
    masterData: [],
  },
  uploadCsv: {
    loading: false,
    error: '',
    file: {},
    message: '',
    success: false,
  },
  addUpdateOfficeResource: {
    error: '',
    data: {},
    success: false,
    message: '',
    loading: false,
  },
  removeResource: {
    error: '',
    success: false,
    message: '',
    loading: false,
  },
  officeUpdateSuccess: false,
  officeUpdateMessage: '',
};

/* eslint-disable default-case, no-param-reassign */
const OfficeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_GET_OFFICE_UPDATE_DATA:
        draft.getOfficeData.loading = true;
        draft.getOfficeData.error = '';
        break;
      case SUCCESS_GET_OFFICE_UPDATE_DATA:
        draft.getOfficeData.loading = false;
        draft.getOfficeData.success = true;
        draft.getOfficeData.masterData = action.payload;
        draft.getOfficeData.error = '';
        break;
      case FAILED_GET_OFFICE_UPDATE_DATA:
        draft.getOfficeData.loading = false;
        draft.getOfficeData.success = false;
        draft.getOfficeData.masterData = [];
        draft.getOfficeData.error = action.payload;
        draft.officeUpdateSuccess = action.payload.success;
        draft.officeUpdateMessage = action.payload.message;

        break;
      case CLEAR_OFFICE_DATA:
        draft.officeUpdateSuccess = false;
        draft.officeUpdateMessage = '';
        break;

      case REQUEST_FILE_UPLOAD:
        draft.uploadCsv.loading = true;
        draft.uploadCsv.error = '';
        draft.uploadCsv.file = {};
        break;
      case SUCCESS_FILE_UPLOAD:
        draft.uploadCsv.loading = false;
        draft.uploadCsv.success = action.payload.success;
        draft.uploadCsv.message = action.payload.message;
        draft.officeUpdateSuccess = action.payload.success;
        draft.officeUpdateMessage = action.payload.message;
        break;
      case FAILED_FILE_UPLOAD:
        draft.uploadCsv.loading = false;
        draft.uploadCsv.success = false;
        draft.uploadCsv.error = action.payload.Error;
        draft.officeUpdateSuccess = action.payload.success;
        draft.officeUpdateMessage = action.payload.message;
        break;

      case CLEAR_UPLOAD_SUCCESS:
        draft.uploadCsv.success = false;
        draft.removeResource = {};
        draft.addUpdateOfficeResource = {};
        break;
      case REQUEST_ADD_UPDATE_RESOURCE:
        draft.addUpdateOfficeResource.loading = true;
        draft.addUpdateOfficeResource.data = {};
        draft.addUpdateOfficeResource.error = '';
        break;
      case SUCCESS_ADD__UPDATE_RESOURCE:
        draft.addUpdateOfficeResource.loading = false;
        draft.addUpdateOfficeResource.success = action.payload.success;
        draft.addUpdateOfficeResource.message = action.payload.message;
        draft.officeUpdateSuccess = action.payload.success;
        draft.officeUpdateMessage = action.payload.message;
        break;
      case FAILED_ADD__UPDATE_RESOURCE:
        draft.addUpdateOfficeResource.loading = false;
        draft.addUpdateOfficeResource.success = false;
        draft.addUpdateOfficeResource.error = action.payload.message;
        draft.officeUpdateSuccess = false;
        draft.officeUpdateMessage = action.payload.message;
        break;

      case REQUEST_REMOVE_RESOURCE:
        draft.removeResource.loading = true;
        draft.removeResource.error = '';
        break;
      case SUCCESS_REMOVE_RESOURCE:
        draft.removeResource.loading = false;
        draft.removeResource.success = action.payload.success;
        draft.removeResource = action.payload;
        draft.officeUpdateSuccess = action.payload.success;
        draft.officeUpdateMessage = action.payload.message;
        break;
      case FAILED_REMOVE_RESOURCE:
        draft.removeResource.loading = false;
        draft.removeResource.success = false;
        draft.removeResource.error = action.payload.error;
        draft.officeUpdateSuccess = false;
        draft.officeUpdateMessage = action.payload.error;
        break;
    }
  });

export default OfficeReducer;
