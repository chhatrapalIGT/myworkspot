import produce from 'immer';
import {
  REQUEST_GET_OFFICE_LOCATION,
  SUCCESS_GET_OFFICE_LOCATION,
  FAILED_GET_OFFICE_LOCATION,
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
    }
  });

export default onBoardingReducer;
