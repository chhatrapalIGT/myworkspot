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
  SUCCESS_DELEGATE_PROFILE,
  REQUEST_DELEGATE_PROFILE,
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
  SUCCESS_REMOVE_SPIN_ICON,
  REQUEST_REMOVE_SPIN_ICON,
  FAILED_REMOVE_SPIN_ICON,
  REQUEST_GET_ADMIN_OWNER,
  SUCCESS_GET_ADMIN_OWNER,
  FAILED_GET_ADMIN_OWNER,
  CLEAR_ADMIN_OWNER,
} from './constants';

export const requestGetProfileOfficeData = payload => ({
  type: REQUEST_GET_PROFILE_OFFICE_DATA,
  payload,
});

export const getProfileOfficeDataSuccess = payload => ({
  type: SUCCESS_GET_PROFILE_OFFICE_DATA,
  payload,
});

export const getProfileOfficeDataFailed = error => ({
  type: FAILED_GET_PROFILE_OFFICE_DATA,
  payload: error,
});

export const requestUserlistData = payload => ({
  type: REQUEST_USERLIST_DATA,
  payload,
});

export const getUserlistSuccess = payload => ({
  type: SUCCESS_USERLIST_DATA,
  payload,
});

export const getUserlistFailed = error => ({
  type: FAILED_USERLIST_DATA,
  payload: error,
});

export const requestDelegateData = payload => ({
  type: REQUEST_DELEGATE_DATA,
  payload,
});

export const getDelegateSuccess = payload => ({
  type: SUCCESS_DELEGATE_DATA,
  payload,
});

export const getDelegateFailed = error => ({
  type: FAILED_DELEGATE_DATA,
  payload: error,
});

export const clearData = () => ({
  type: CLEAR_DATA,
});
export const requestBadgeData = payload => ({
  type: REQUEST_BADGE_DATA,
  payload,
});

export const getBadgeSuccess = payload => ({
  type: SUCCESS_BADGE_DATA,
  payload,
});

export const getBadgeFailed = error => ({
  type: FAILED_BADGE_DATA,
  payload: error,
});
export const requestDelegateProfile = payload => ({
  type: REQUEST_DELEGATE_PROFILE,
  payload,
});

export const delegateProfileSuccess = payload => ({
  type: SUCCESS_DELEGATE_PROFILE,
  payload,
});

export const delegateProfileFailed = error => ({
  type: FAILED_DELEGATE_PROFILE,
  payload: error,
});

export const requestAddDelegateList = payload => ({
  type: REQUEST_ADD_DELEGATE_LIST,
  payload,
});

export const addDelegateListSuccess = payload => ({
  type: SUCCESS_ADD_DELEGATE_LIST,
  payload,
});

export const addDelegateListFailed = error => ({
  type: FAILED_ADD_DELEGATE_LIST,
  payload: error,
});

export const requestRemoveDelegateList = payload => ({
  type: REQUEST_REMOVE_DELEGATE_LIST,
  payload,
});

export const removeDelegateListSuccess = payload => ({
  type: SUCCESS_REMOVE_DELEGATE_LIST,
  payload,
});

export const removeDelegateListFailed = error => ({
  type: FAILED_REMOVE_DELEGATE_LIST,
  payload: error,
});

export const requestRemoveDelegateUser = payload => ({
  type: REQUEST_REMOVE_DELEGATE_USER,
  payload,
});

export const removeDelegateUserSuccess = payload => ({
  type: SUCCESS_REMOVE_DELEGATE_USER,
  payload,
});

export const removeDelegateUserFailed = error => ({
  type: FAILED_REMOVE_DELEGATE_USER,
  payload: error,
});

export const requestGetDelegateList = payload => ({
  type: REQUEST_GET_DELEGATE_LIST,
  payload,
});

export const getDelegateListSuccess = payload => ({
  type: SUCCESS_GET_DELEGATE_LIST,
  payload,
});

export const getDelegateListFailed = error => ({
  type: FAILED_GET_DELEGATE_LIST,
  payload: error,
});

export const requestGetSpinIcon = payload => ({
  type: REQUEST_GET_SPIN_ICON,
  payload,
});

export const getSpinIconSuccess = payload => ({
  type: SUCCESS_GET_SPIN_ICON,
  payload,
});

export const getSpinIconFailed = error => ({
  type: FAILED_GET_SPIN_ICON,
  payload: error,
});

export const requestAddSpinIcon = payload => ({
  type: REQUEST_ADD_SPIN_ICON,
  payload,
});

export const successAddSpinIcon = payload => ({
  type: SUCCESS_ADD_SPIN_ICON,
  payload,
});

export const failedAddSpinIcon = error => ({
  type: FAILED_ADD_SPIN_ICON,
  payload: error,
});

export const requestGetSelectIcon = payload => ({
  type: REQUEST_GET_SELECT_ICON,
  payload,
});

export const successGetSelectIcon = payload => ({
  type: SUCCESS_GET_SELECT_ICON,
  payload,
});

export const failedGetSelectIcon = error => ({
  type: FAILED_GET_SELECT_ICON,
  payload: error,
});

export const requestRemoveSpinIcon = payload => ({
  type: REQUEST_REMOVE_SPIN_ICON,
  payload,
});

export const successRemoveSpinIcon = payload => ({
  type: SUCCESS_REMOVE_SPIN_ICON,
  payload,
});

export const failedRemoveSpinIcon = error => ({
  type: FAILED_REMOVE_SPIN_ICON,
  payload: error,
});

export const requestgetAdminOwner = payload => ({
  type: REQUEST_GET_ADMIN_OWNER,
  payload,
});

export const getAdminOwnerSuccess = payload => ({
  type: SUCCESS_GET_ADMIN_OWNER,
  payload,
});

export const getAdminOwnerFailed = error => ({
  type: FAILED_GET_ADMIN_OWNER,
  payload: error,
});
export const clearAdminOwner = () => ({
  type: CLEAR_ADMIN_OWNER,
});
