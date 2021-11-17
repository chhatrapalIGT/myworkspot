import produce from 'immer';
import {
  REQUEST_GET_OFFICE_LOCATION,
  SUCCESS_GET_OFFICE_LOCATION,
  FAILED_GET_OFFICE_LOCATION,
  REQUEST_ADD_OFFICE_LOCATION,
  SUCCESS_ADD_OFFICE_LOCATION,
  FAILED_ADD_OFFICE_LOCATION,
  CLEAR_BOARD_DATA,
  REQUEST_VERIFY_BADGE,
  SUCCESS_VERIFY_BADGE,
  FAILED_VERIFY_BADGE,
  CLEAR_BADGE_SUCCESS,
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
  verifyBadge: {
    err: '',
    success: '',
    message: '',
    loading: false,
    update: '',
  },
  apiMessage: '',
  apiSuccess: false,
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
        draft.getOfficeLocation.location = [];
        draft.getOfficeLocation.success = action.payload.success;
        draft.getOfficeLocation.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = false;

        break;

      case REQUEST_ADD_OFFICE_LOCATION:
        draft.addOfficeLocation.loading = true;
        draft.addOfficeLocation.error = '';
        break;
      case SUCCESS_ADD_OFFICE_LOCATION:
        draft.addOfficeLocation.loading = false;
        draft.addOfficeLocation.message = action.payload.message;
        draft.addOfficeLocation.success = action.payload.success;

        break;
      case FAILED_ADD_OFFICE_LOCATION:
        draft.addOfficeLocation.loading = false;
        draft.addOfficeLocation.message = action.payload.message;
        draft.addOfficeLocation.success = action.payload.success;
        break;
      case CLEAR_BOARD_DATA:
        draft.addOfficeLocation.message = '';
        draft.addOfficeLocation.success = false;
        draft.getOfficeLocation.success = false;
        draft.getOfficeLocation.message = '';
        draft.verifyBadge.message = '';
        draft.verifyBadge.success = '';
        draft.apiMessage = '';
        draft.apiSuccess = false;
        break;

      case CLEAR_BADGE_SUCCESS:
        draft.verifyBadge.update = '';
        break;
      case REQUEST_VERIFY_BADGE:
        draft.verifyBadge.loading = true;
        draft.verifyBadge.error = '';
        break;
      case SUCCESS_VERIFY_BADGE:
        draft.verifyBadge.loading = false;
        draft.verifyBadge.message = action.payload.message;
        draft.verifyBadge.success = action.payload.success;

        break;
      case FAILED_VERIFY_BADGE:
        draft.verifyBadge.loading = false;
        draft.verifyBadge.message = action.payload.message;
        draft.verifyBadge.success = action.payload.success;
        draft.verifyBadge.update = 'Badge update failed';

        break;
    }
  });

export default onBoardingReducer;
