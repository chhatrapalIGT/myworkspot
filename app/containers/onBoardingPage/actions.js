import {
  REQUEST_GET_OFFICE_LOCATION,
  SUCCESS_GET_OFFICE_LOCATION,
  FAILED_GET_OFFICE_LOCATION,
  REQUEST_ADD_OFFICE_LOCATION,
  SUCCESS_ADD_OFFICE_LOCATION,
  FAILED_ADD_OFFICE_LOCATION,
  CLEAR_BOARD_DATA,
  REQUEST_VERIFY_BADGE,
  SUCCESS_VERIFY_BADGE,
  FAILED_VERIFY_BADGE,
  CLEAR_BADGE_SUCCESS,
  CLEAR_BADGE_PROFILE_SUCCESS,
} from './constants';

export const requestGetOfficeLocation = payload => ({
  type: REQUEST_GET_OFFICE_LOCATION,
  payload,
});

export const getOfficeLocationSuccess = payload => ({
  type: SUCCESS_GET_OFFICE_LOCATION,
  payload,
});

export const getOfficeLocationFailed = error => ({
  type: FAILED_GET_OFFICE_LOCATION,
  payload: error,
});

export const requestAddOfficeLocation = payload => ({
  type: REQUEST_ADD_OFFICE_LOCATION,
  payload,
});

export const addOfficeLocationSuccess = payload => ({
  type: SUCCESS_ADD_OFFICE_LOCATION,
  payload,
});

export const addOfficeLocationFailed = payload => ({
  type: FAILED_ADD_OFFICE_LOCATION,
  payload,
});

export const clearBoardData = () => ({
  type: CLEAR_BOARD_DATA,
});
export const clearBadgeSuccess = () => ({
  type: CLEAR_BADGE_SUCCESS,
});
export const clearProfileBadgeSuccess = () => ({
  type: CLEAR_BADGE_PROFILE_SUCCESS,
});

export const requestVerifyBadge = payload => ({
  type: REQUEST_VERIFY_BADGE,
  payload,
});

export const verifyBadgeSuccess = payload => ({
  type: SUCCESS_VERIFY_BADGE,
  payload,
});

export const verifyBadgeFailed = payload => ({
  type: FAILED_VERIFY_BADGE,
  payload,
});
