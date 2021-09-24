import {
  REQUEST_GET_PROFILE_OFFICE_DATA,
  SUCCESS_GET_PROFILE_OFFICE_DATA,
  FAILED_GET_PROFILE_OFFICE_DATA,
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
