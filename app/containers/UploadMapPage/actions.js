import {
  REQUEST_GET_OFFICE_DATA,
  SUCCESS_GET_OFFICE_DATA,
  FAILED_GET_OFFICE_DATA,
  CLEAR_OFFICE,
  REQUEST_FILE_UPLOAD,
  SUCCESS_FILE_UPLOAD,
  FAILED_FILE_UPLOAD,
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

export const requestFileUpload = payload => ({
  type: REQUEST_FILE_UPLOAD,
  payload,
});

export const fileUploadSuccess = payload => ({
  type: SUCCESS_FILE_UPLOAD,
  payload,
});

export const fileUploadFailed = error => ({
  type: FAILED_FILE_UPLOAD,
  payload: error,
});
