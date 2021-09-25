import produce from 'immer';
import {
  REQUEST_GET_OFFICE_LOCATION,
  SUCCESS_GET_OFFICE_LOCATION,
  FAILED_GET_OFFICE_LOCATION,
  REQUEST_ADD_OFFICE_LOCATION,
  SUCCESS_ADD_OFFICE_LOCATION,
  FAILED_ADD_OFFICE_LOCATION,
  CLEAR_BOARD_DATA,
} from './constants';

// The initial state of the App
const initialState = {
  getOfficeLocation: {
    error: '',
    success: false,
    message: '',
    loading: false,
    location: [],
  },
  addOfficeLocation: {
    error: '',
    success: false,
    message: '',
    loading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const onBoardingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_GET_OFFICE_LOCATION:
        draft.getOfficeLocation.loading = true;
        draft.getOfficeLocation.error = '';
        break;
      case SUCCESS_GET_OFFICE_LOCATION:
        draft.getOfficeLocation.loading = false;
        draft.getOfficeLocation.success = true;
        draft.getOfficeLocation.location = action.payload;
        draft.getOfficeLocation.error = '';
        break;
      case FAILED_GET_OFFICE_LOCATION:
        draft.getOfficeLocation.loading = false;
        draft.getOfficeLocation.success = false;
        draft.getOfficeLocation.location = [];
        draft.getOfficeLocation.error = action.payload;
        break;

      case REQUEST_ADD_OFFICE_LOCATION:
        draft.addOfficeLocation.loading = true;
        draft.addOfficeLocation.error = '';
        break;
      case SUCCESS_ADD_OFFICE_LOCATION:
        draft.addOfficeLocation.loading = false;
        draft.addOfficeLocation = action.payload;
        draft.addOfficeLocation.error = '';
        break;
      case FAILED_ADD_OFFICE_LOCATION:
        draft.addOfficeLocation.loading = false;
        draft.addOfficeLocation.error = action.payload;
        break;
      case CLEAR_BOARD_DATA:
        draft.addOfficeLocation = {};
        draft.getOfficeLocation = {};
    }
  });

export default onBoardingReducer;
