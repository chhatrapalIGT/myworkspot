import produce from 'immer';
import {
  REQUEST_GET_PROFILE_OFFICE_DATA,
  SUCCESS_GET_PROFILE_OFFICE_DATA,
  FAILED_GET_PROFILE_OFFICE_DATA,
} from './constants';

// The initial state of the App
const initialState = {
  getOffice: {
    error: '',
    success: false,
    message: '',
    loading: false,
    weeklyLocation: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_GET_PROFILE_OFFICE_DATA:
        draft.getOffice.loading = true;
        draft.getOffice.error = '';
        break;
      case SUCCESS_GET_PROFILE_OFFICE_DATA:
        draft.getOffice.loading = false;
        draft.getOffice.success = true;
        draft.getOffice.weeklyLocation = action.payload;
        draft.getOffice.error = '';
        break;
      case FAILED_GET_PROFILE_OFFICE_DATA:
        draft.getOffice.loading = false;
        draft.getOffice.success = false;
        draft.getOffice.weeklyLocation = [];
        draft.getOffice.error = action.payload;
        break;
    }
  });

export default profilePageReducer;
