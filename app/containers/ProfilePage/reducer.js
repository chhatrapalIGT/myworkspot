import produce from 'immer';
import {
  REQUEST_GET_PROFILE_OFFICE_DATA,
  SUCCESS_GET_PROFILE_OFFICE_DATA,
  FAILED_GET_PROFILE_OFFICE_DATA,
  REQUEST_USERLIST_DATA,
  SUCCESS_USERLIST_DATA,
  FAILED_USERLIST_DATA,
  REQUEST_DELEGATE_DATA,
  SUCCESS_DELEGATE_DATA,
  FAILED_DELEGATE_DATA,
  CLEAR_DATA,
  REQUEST_BADGE_DATA,
  SUCCESS_BADGE_DATA,
  FAILED_BADGE_DATA,
  REQUEST_DELEGATE_PROFILE,
  SUCCESS_DELEGATE_PROFILE,
  FAILED_DELEGATE_PROFILE,
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
    user: [],
  },
  delegateList: {
    error: '',
    success: false,
    loading: false,
    message: '',
    delegate: [],
  },
  badgeUpdate: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },
  delegateProfile: {
    error: '',
    success: false,
    loading: true,
    message: '',
    delegateProfileList: [],
  },
  apiSuccess: false,
  apiMessage: '',
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
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_GET_PROFILE_OFFICE_DATA:
        draft.getOffice.loading = false;
        draft.getOffice.success = false;
        draft.getOffice.weeklyLocation = [];
        draft.getOffice.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_USERLIST_DATA:
        draft.userList.loading = true;
        draft.userList.error = '';
        break;
      case SUCCESS_USERLIST_DATA:
        draft.userList.loading = false;
        draft.userList.success = true;
        draft.userList.user = action.payload.userData;
        draft.userList.error = '';
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_USERLIST_DATA:
        draft.userList.loading = false;
        draft.userList.success = false;
        draft.userList.user = [];
        draft.userList.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_DELEGATE_DATA:
        draft.delegateList.loading = true;
        draft.delegateList.error = '';
        break;
      case SUCCESS_DELEGATE_DATA:
        draft.delegateList.loading = false;
        draft.delegateList.success = true;
        draft.delegateList.delegate = action.payload.userData;
        draft.delegateList.error = '';
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_DELEGATE_DATA:
        draft.delegateList.loading = false;
        draft.delegateList.success = false;
        draft.delegateList.delegate = [];
        draft.delegateList.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case CLEAR_DATA:
        draft.apiMessage = '';
        draft.delegateList = {};
        draft.badgeUpdate.message = '';
        draft.badgeUpdate.success = false;
        draft.delegateProfile.success = false;
        draft.userList.success = false;
        draft.delegateProfile.loading = false;
        break;

      case REQUEST_BADGE_DATA:
        draft.badgeUpdate.loading = true;
        draft.badgeUpdate.error = '';
        break;
      case SUCCESS_BADGE_DATA:
        draft.badgeUpdate.loading = false;
        draft.badgeUpdate.success = action.payload.success;
        draft.badgeUpdate.message = action.payload.message;

        break;
      case FAILED_BADGE_DATA:
        draft.badgeUpdate.loading = false;
        draft.badgeUpdate.success = action.payload.success;
        draft.badgeUpdate.message = action.payload.message;
        break;

      case REQUEST_DELEGATE_PROFILE:
        draft.delegateProfile.loading = true;
        draft.delegateProfile.error = '';
        break;
      case SUCCESS_DELEGATE_PROFILE:
        draft.delegateProfile.loading = false;
        draft.delegateProfile.success = true;
        draft.delegateProfile.delegateProfileList = action.payload;
        draft.delegateProfile.error = '';
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_DELEGATE_PROFILE:
        draft.delegateProfile.loading = false;
        draft.delegateProfile.success = false;
        draft.delegateProfile.delegateProfileList = [];
        draft.delegateProfile.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
    }
  });

export default profilePageReducer;
