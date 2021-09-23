import {
  REQUEST_GET_LOCATION,
  SUCCESS_GET_LOCATION,
  FAILED_GET_LOCATION,
  REQUEST_GET_WEEKLY_DEFAULT,
  SUCCESS_GET_WEEKLY_DEFAULT,
  FAILED_GET_WEEKLY_DEFAULT,
} from './constants';

export const requestGetLocation = payload => ({
  type: REQUEST_GET_LOCATION,
  payload,
});

export const getLocationSuccess = payload => ({
  type: SUCCESS_GET_LOCATION,
  payload,
});

export const getLocationFailed = error => ({
  type: FAILED_GET_LOCATION,
  payload: error,
});

export const requestGetWeeklyDefault = payload => ({
  type: REQUEST_GET_WEEKLY_DEFAULT,
  payload,
});

export const getWeeklyDefaultSuccess = payload => ({
  type: SUCCESS_GET_WEEKLY_DEFAULT,
  payload,
});

export const getWeeklyDefaultFailed = error => ({
  type: FAILED_GET_WEEKLY_DEFAULT,
  payload: error,
});
