import {
  REQUEST_GET_OFFICE_DATA,
  SUCCESS_GET_OFFICE_DATA,
  FAILED_GET_OFFICE_DATA,
  CLEAR_OFFICE,
} from './constants';

export const requestGetOfficeData = payload => ({
  type: REQUEST_GET_OFFICE_DATA,
  payload,
});

export const getOfficeDataSuccess = payload => ({
  type: SUCCESS_GET_OFFICE_DATA,
  payload,
});

export const getOfficeDataFailed = error => ({
  type: FAILED_GET_OFFICE_DATA,
  payload: error,
});
export const clearOffice = () => ({
  type: CLEAR_OFFICE,
});
