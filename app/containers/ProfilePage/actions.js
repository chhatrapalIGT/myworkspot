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
