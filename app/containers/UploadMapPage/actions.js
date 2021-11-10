import {
  REQUEST_GET_OFFICE_UPDATE_DATA,
  SUCCESS_GET_OFFICE_UPDATE_DATA,
  FAILED_GET_OFFICE_UPDATE_DATA,
  CLEAR_OFFICE,
  REQUEST_FILE_UPLOAD,
  SUCCESS_FILE_UPLOAD,
  FAILED_FILE_UPLOAD,
} from './constants';

export const requestGetOfficeUpdateData = payload => ({
  type: REQUEST_GET_OFFICE_UPDATE_DATA,
  payload,
});

export const getOfficeDataUdateSuccess = payload => ({
  type: SUCCESS_GET_OFFICE_UPDATE_DATA,
  payload,
});

export const getOfficeDataUpdateFailed = error => ({
  type: FAILED_GET_OFFICE_UPDATE_DATA,
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
