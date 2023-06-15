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
  REQUEST_GET_ADMIN_OWNER,
  SUCCESS_GET_ADMIN_OWNER,
  FAILED_GET_ADMIN_OWNER,
  CLEAR_ADMIN_OWNER,
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
  userList: [],
  delegateList: [],
  getUpdatedelegateListData: [],
  badgeUpdate: {},
  delegateAddMember: {},
  delegateProfile: [],
  removeDelegateMember: {},
  removeDelegateUser: {},
  spinIcon: {},
  selectEmpIcon: {},
  removeSpinIcon: {},
  addSpinIcon: {},
  // getOwner: {},
  error: '',
  success: false,
  loading: false,
  delegateLoading: false,
  message: '',
  totalPage: '',
  apiSuccess: false,
  empSuccess: false,
  badgeSuccess: false,
  apiMessage: '',
  getOwner: {
    error: '',
    success: false,
    message: '',
    loading: '',
  },
};

const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_GET_PROFILE_OFFICE_DATA:
        draft.loading = true;
        break;
      case SUCCESS_GET_PROFILE_OFFICE_DATA:
        draft.loading = false;
        draft.success = true;
        draft.getOffice.weeklyLocation = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_GET_PROFILE_OFFICE_DATA:
        draft.loading = false;
        draft.success = false;
        draft.error = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_USERLIST_DATA:
        draft.loading = true;
        draft.error = '';
        break;
      case SUCCESS_USERLIST_DATA:
        draft.loading = false;
        draft.success = true;
        draft.userList = action.payload.userData;
        draft.error = '';
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_USERLIST_DATA:
        draft.loading = false;
        draft.success = false;
        draft.error = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_DELEGATE_DATA:
        draft.loading = true;
        break;
      case SUCCESS_DELEGATE_DATA:
        draft.loading = false;
        draft.success = true;
        draft.delegateList = action.payload.userData;
        draft.totalPage = action.payload.totalPages;
        draft.message = '';

        break;
      case FAILED_DELEGATE_DATA:
        draft.loading = false;
        draft.success = false;
        draft.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case CLEAR_DATA:
        draft.apiMessage = '';
        draft.apiSuccess = false;
        draft.empSuccess = false;
        draft.message = '';
        draft.success = false;
        draft.loading = false;
        break;

      case REQUEST_BADGE_DATA:
        draft.loading = true;
        draft.badgeSuccess = false;
        draft.error = '';
        break;
      case SUCCESS_BADGE_DATA:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        draft.badgeSuccess = true;

        break;
      case FAILED_BADGE_DATA:
        draft.loading = false;
        draft.badgeSuccess = false;
        draft.success = action.payload.success;
        draft.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_DELEGATE_PROFILE:
        draft.loading = true;
        draft.error = '';
        break;
      case SUCCESS_DELEGATE_PROFILE:
        draft.loading = false;
        draft.success = true;
        draft.delegateProfile = action.payload;
        draft.error = '';

        break;
      case FAILED_DELEGATE_PROFILE:
        draft.loading = false;
        draft.success = false;
        draft.error = action.payload.error;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_ADD_DELEGATE_LIST:
        draft.loading = true;
        draft.error = '';
        draft.success = false;
        break;
      case SUCCESS_ADD_DELEGATE_LIST:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_ADD_DELEGATE_LIST:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.error = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_REMOVE_DELEGATE_LIST:
        draft.loading = true;
        draft.error = '';
        draft.success = false;
        break;
      case SUCCESS_REMOVE_DELEGATE_LIST:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_REMOVE_DELEGATE_LIST:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.error = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_GET_DELEGATE_LIST:
        draft.loading = true;
        draft.error = '';
        break;
      case SUCCESS_GET_DELEGATE_LIST:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.getUpdatedelegateListData = action.payload;
        draft.error = '';
        break;
      case FAILED_GET_DELEGATE_LIST:
        draft.loading = false;
        draft.success = false;
        draft.error = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;

      case REQUEST_GET_SPIN_ICON:
        draft.loading = true;
        break;
      case SUCCESS_GET_SPIN_ICON:
        draft.loading = false;
        draft.success = true;
        draft.spinIcon = action.payload.data;
        draft.message = action.payload.message;
        break;
      case FAILED_GET_SPIN_ICON:
        draft.loading = false;
        draft.success = false;
        draft.error = action.payload.message;
        break;

      case REQUEST_ADD_SPIN_ICON:
        draft.loading = true;
        break;
      case SUCCESS_ADD_SPIN_ICON:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.addSpinIcon = action.payload;
        draft.message = action.payload.message;
        break;
      case FAILED_ADD_SPIN_ICON:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.error = action.payload.message;
        break;

      case REQUEST_GET_SELECT_ICON:
        draft.loading = true;
        break;
      case SUCCESS_GET_SELECT_ICON:
        draft.loading = false;
        draft.success = true;
        draft.selectEmpIcon = action.payload;
        draft.message = action.payload.message;
        break;
      case FAILED_GET_SELECT_ICON:
        draft.loading = false;
        draft.success = false;
        draft.error = action.payload.message;
        break;

      case REQUEST_REMOVE_DELEGATE_USER:
        draft.delegateLoading = true;
        draft.error = '';
        draft.empSuccess = false;
        break;
      case SUCCESS_REMOVE_DELEGATE_USER:
        draft.delegateLoading = false;
        draft.empSuccess = true;
        draft.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        break;
      case FAILED_REMOVE_DELEGATE_USER:
        draft.delegateLoading = false;
        draft.empSuccess = false;
        draft.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        break;

      case REQUEST_REMOVE_SPIN_ICON:
        draft.loading = true;
        break;
      case SUCCESS_REMOVE_SPIN_ICON:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.apiSuccess = true;
        draft.removeSpinIcon = action.payload;
        draft.message = action.payload.message;
        break;
      case FAILED_REMOVE_SPIN_ICON:
        draft.loading = false;
        draft.success = action.payload.success;
        draft.apiSuccess = false;
        draft.error = action.payload.message;
        break;

      case REQUEST_GET_ADMIN_OWNER:
        draft.getOwner.loading = true;
        draft.getOwner.error = '';
        draft.getOwner.success = false;
        break;
      case SUCCESS_GET_ADMIN_OWNER:
        draft.getOwner.loading = false;
        draft.getOwner.success = true;
        draft.getOwner = action.payload;
        break;
      case FAILED_GET_ADMIN_OWNER:
        draft.getOwner.loading = false;
        draft.getOwner.success = false;
        draft.getOwner.error = action.payload.message;
        draft.getOwner = action.payload;
        break;
      case CLEAR_ADMIN_OWNER:
        draft.getOwner.message = '';
        draft.getOwner.success = false;
        draft.getOwner.error = '';
        break;
      default:
    }
  });

export default profilePageReducer;
