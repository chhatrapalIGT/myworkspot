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
