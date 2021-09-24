import produce from 'immer';
import {
  REQUEST_GET_PROFILE_OFFICE_DATA,
  SUCCESS_GET_PROFILE_OFFICE_DATA,
  FAILED_GET_PROFILE_OFFICE_DATA,
  REQUEST_USERLIST_DATA,
  SUCCESS_USERLIST_DATA,
  FAILED_USERLIST_DATA,
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
  userList: {
    error: '',
    success: false,
    loading: false,
    message: '',
    user: {},
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
      case REQUEST_USERLIST_DATA:
        draft.userList.loading = true;
        draft.userList.error = '';
        break;
      case SUCCESS_USERLIST_DATA:
        draft.userList.loading = false;
        draft.userList.success = true;
        draft.userList.weeklyLocation = action.payload;
        draft.userList.error = '';
        break;
      case FAILED_USERLIST_DATA:
        draft.userList.loading = false;
        draft.userList.success = false;
        draft.userList.weeklyLocation = [];
        draft.userList.error = action.payload;
        break;
    }
  });

export default profilePageReducer;
