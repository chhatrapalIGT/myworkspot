import {
  REQUEST_GET_OFFICE_LOCATION,
  SUCCESS_GET_OFFICE_LOCATION,
  FAILED_GET_OFFICE_LOCATION,
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
