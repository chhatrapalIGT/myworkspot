import produce from 'immer';
import {
  REQUEST_GET_OFFICE_UPDATE_DATA,
  SUCCESS_GET_OFFICE_UPDATE_DATA,
  FAILED_GET_OFFICE_UPDATE_DATA,
  CLEAR_OFFICE,
  REQUEST_FILE_UPLOAD,
  SUCCESS_FILE_UPLOAD,
  FAILED_FILE_UPLOAD,
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
        break;
      case CLEAR_OFFICE:
        draft.getOfficeData.error = '';
        draft.getOfficeData.success = false;
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
        break;
      case FAILED_FILE_UPLOAD:
        draft.uploadCsv.loading = false;
        draft.uploadCsv.success = false;
        draft.uploadCsv.error = action.payload.Error;
        break;
    }
  });

export default OfficeReducer;
