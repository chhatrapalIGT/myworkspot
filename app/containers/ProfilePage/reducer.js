/* eslint-disable no-param-reassign */
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
  REQUEST_ADD_DELEGATE_LIST,
  SUCCESS_ADD_DELEGATE_LIST,
  FAILED_ADD_DELEGATE_LIST,
  REQUEST_REMOVE_DELEGATE_LIST,
  SUCCESS_REMOVE_DELEGATE_LIST,
  FAILED_REMOVE_DELEGATE_LIST,
  REQUEST_GET_DELEGATE_LIST,
  SUCCESS_GET_DELEGATE_LIST,
  FAILED_GET_DELEGATE_LIST,
  REQUEST_GET_SPIN_ICON,
  SUCCESS_GET_SPIN_ICON,
  FAILED_GET_SPIN_ICON,
  REQUEST_ADD_SPIN_ICON,
  SUCCESS_ADD_SPIN_ICON,
  FAILED_ADD_SPIN_ICON,
  REQUEST_GET_SELECT_ICON,
  SUCCESS_GET_SELECT_ICON,
  FAILED_GET_SELECT_ICON,
  REQUEST_REMOVE_DELEGATE_USER,
  SUCCESS_REMOVE_DELEGATE_USER,
  FAILED_REMOVE_DELEGATE_USER,
  REQUEST_REMOVE_SPIN_ICON,
  SUCCESS_REMOVE_SPIN_ICON,
  FAILED_REMOVE_SPIN_ICON,
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
    loading: true,
    message: '',
    user: [],
  },
  delegateList: {
    error: '',
    success: false,
    loading: false,
    message: '',
    delegate: [],
    totalPage: '',
  },
  getUpdatedelegateListData: {
    error: '',
    success: false,
    loading: false,
    message: '',
    delegateUpdate: [],
  },
  badgeUpdate: {
    error: '',
    success: false,
    badgeSuccess: false,
    loading: false,
    message: '',
  },
  delegateAddMember: {
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

  removeDelegateMember: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },
  removeDelegateUser: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },
  spinIcon: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },
  selectEmpIcon: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },

  removeSpinIcon: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },
  addSpinIcon: {
    error: '',
    success: false,
    loading: false,
    message: '',
  },

  apiSuccess: false,
  apiMessage: '',
};

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
        // draft.getOffice.weeklyLocation = [];
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
        // draft.userList.user = [];
        draft.userList.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_DELEGATE_DATA:
        draft.delegateList.loading = true;
        draft.delegateList.error = '';
        draft.delegateList.delegate = [];
        break;
      case SUCCESS_DELEGATE_DATA:
        draft.delegateList.loading = false;
        draft.delegateList.success = true;
        draft.delegateList.delegate = action.payload.userData;
        draft.delegateList.totalPage = action.payload.totalPages;
        draft.delegateList.error = '';

        break;
      case FAILED_DELEGATE_DATA:
        draft.delegateList.loading = false;
        draft.delegateList.success = false;
        // draft.delegateList.delegate = [];
        draft.delegateList.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case CLEAR_DATA:
        draft.apiMessage = '';
        draft.apiSuccess = false;
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
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        draft.badgeUpdate.badgeSuccess = true;

        break;
      case FAILED_BADGE_DATA:
        draft.badgeUpdate.loading = false;
        draft.badgeUpdate.success = action.payload.success;
        draft.badgeUpdate.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
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

        break;
      case FAILED_DELEGATE_PROFILE:
        draft.delegateProfile.loading = false;
        draft.delegateProfile.success = false;
        // draft.delegateProfile.delegateProfileList = [];
        draft.delegateProfile.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_ADD_DELEGATE_LIST:
        draft.delegateAddMember.loading = true;
        draft.delegateAddMember.error = '';
        draft.delegateAddMember.success = false;
        break;
      case SUCCESS_ADD_DELEGATE_LIST:
        draft.delegateAddMember.loading = false;
        draft.delegateAddMember.success = action.payload.success;
        draft.delegateAddMember.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_ADD_DELEGATE_LIST:
        draft.delegateAddMember.loading = false;
        draft.delegateAddMember.success = action.payload.success;
        draft.delegateAddMember.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_REMOVE_DELEGATE_LIST:
        draft.removeDelegateMember.loading = true;
        draft.removeDelegateMember.error = '';
        draft.removeDelegateMember.success = false;
        break;
      case SUCCESS_REMOVE_DELEGATE_LIST:
        draft.removeDelegateMember.loading = false;
        draft.removeDelegateMember.success = action.payload.success;
        draft.removeDelegateMember.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_REMOVE_DELEGATE_LIST:
        draft.removeDelegateMember.loading = false;
        draft.removeDelegateMember.success = action.payload.success;
        draft.removeDelegateMember.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_GET_DELEGATE_LIST:
        draft.getUpdatedelegateListData.loading = true;
        draft.getUpdatedelegateListData.error = '';
        break;
      case SUCCESS_GET_DELEGATE_LIST:
        draft.getUpdatedelegateListData.loading = false;
        draft.getUpdatedelegateListData.success = action.payload.success;
        draft.getUpdatedelegateListData.delegateUpdate = action.payload;
        draft.getUpdatedelegateListData.error = '';
        break;
      case FAILED_GET_DELEGATE_LIST:
        draft.getUpdatedelegateListData.loading = false;
        draft.getUpdatedelegateListData.success = false;
        // draft.getUpdatedelegateListData.delegateUpdate = [];
        draft.getUpdatedelegateListData.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_GET_SPIN_ICON:
        draft.spinIcon.loading = true;
        break;
      case SUCCESS_GET_SPIN_ICON:
        draft.spinIcon.loading = false;
        draft.spinIcon.success = true;
        draft.spinIcon = action.payload.data;
        draft.spinIcon.message = action.payload.message;
        break;
      case FAILED_GET_SPIN_ICON:
        draft.spinIcon.loading = false;
        draft.spinIcon.success = false;
        draft.spinIcon.error = action.payload.message;
        break;

      case REQUEST_ADD_SPIN_ICON:
        draft.addSpinIcon.loading = true;
        break;
      case SUCCESS_ADD_SPIN_ICON:
        draft.addSpinIcon.loading = false;
        draft.addSpinIcon.success = action.payload.success;
        draft.addSpinIcon = action.payload;
        draft.addSpinIcon.message = action.payload.message;
        break;
      case FAILED_ADD_SPIN_ICON:
        draft.addSpinIcon.loading = false;
        draft.addSpinIcon.success = action.payload.success;
        draft.addSpinIcon.error = action.payload.message;
        break;

      case REQUEST_GET_SELECT_ICON:
        draft.selectEmpIcon.loading = true;
        break;
      case SUCCESS_GET_SELECT_ICON:
        draft.selectEmpIcon.loading = false;
        draft.selectEmpIcon.success = true;
        draft.selectEmpIcon = action.payload.data;
        draft.selectEmpIcon.message = action.payload.message;
        break;
      case FAILED_GET_SELECT_ICON:
        draft.selectEmpIcon.loading = false;
        draft.selectEmpIcon.success = false;
        draft.selectEmpIcon.error = action.payload.message;
        break;

      case REQUEST_REMOVE_DELEGATE_USER:
        draft.removeDelegateUser.loading = true;
        draft.removeDelegateUser.error = '';
        draft.removeDelegateUser.success = false;
        break;
      case SUCCESS_REMOVE_DELEGATE_USER:
        draft.removeDelegateUser.loading = false;
        draft.removeDelegateUser.success = action.payload.success;
        draft.removeDelegateUser.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_REMOVE_DELEGATE_USER:
        draft.removeDelegateUser.loading = false;
        draft.removeDelegateUser.success = action.payload.success;
        draft.removeDelegateUser.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_REMOVE_SPIN_ICON:
        draft.removeSpinIcon.loading = true;
        break;
      case SUCCESS_REMOVE_SPIN_ICON:
        draft.removeSpinIcon.loading = false;
        draft.removeSpinIcon.success = true;
        draft.apiSuccess = true;
        draft.removeSpinIcon = action.payload;
        draft.removeSpinIcon.message = action.payload.message;
        break;
      case FAILED_REMOVE_SPIN_ICON:
        draft.removeSpinIcon.loading = false;
        draft.removeSpinIcon.success = false;
        draft.apiSuccess = false;
        draft.removeSpinIcon.error = action.payload.message;
        break;
      default:
    }
  });

export default profilePageReducer;
