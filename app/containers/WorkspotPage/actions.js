import {
  REQUEST_GET_LOCATION,
  SUCCESS_GET_LOCATION,
  FAILED_GET_LOCATION,
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
