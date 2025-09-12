import { produce } from 'immer';
import {
  REQUEST_GET_OFFICE_DATA,
  SUCCESS_GET_OFFICE_DATA,
  FAILED_GET_OFFICE_DATA,
  CLEAR_OFFICE,
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
};

/* eslint-disable default-case, no-param-reassign */
const OfficeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REQUEST_GET_OFFICE_DATA:
        draft.getOfficeData.loading = true;
        draft.getOfficeData.error = '';
        break;
      case SUCCESS_GET_OFFICE_DATA:
        draft.getOfficeData.loading = false;
        draft.getOfficeData.success = true;
        draft.getOfficeData.masterData = action.payload;
        draft.getOfficeData.error = '';
        break;
      case FAILED_GET_OFFICE_DATA:
        draft.getOfficeData.loading = false;
        draft.getOfficeData.success = false;
        draft.getOfficeData.masterData = [];
        draft.getOfficeData.error = action.payload;
        break;
      case CLEAR_OFFICE:
        draft.getOfficeData.error = '';
        draft.getOfficeData.success = false;
    }
  });

export default OfficeReducer;
