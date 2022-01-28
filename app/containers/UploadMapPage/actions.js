import {
  REQUEST_GET_OFFICE_UPDATE_DATA,
  SUCCESS_GET_OFFICE_UPDATE_DATA,
  FAILED_GET_OFFICE_UPDATE_DATA,
  CLEAR_OFFICE_DATA,
  REQUEST_FILE_UPLOAD,
  SUCCESS_FILE_UPLOAD,
  FAILED_FILE_UPLOAD,
  CLEAR_UPLOAD_SUCCESS,
  REQUEST_ADD_UPDATE_RESOURCE,
  SUCCESS_ADD__UPDATE_RESOURCE,
  FAILED_ADD__UPDATE_RESOURCE,
  REQUEST_REMOVE_RESOURCE,
  SUCCESS_REMOVE_RESOURCE,
  FAILED_REMOVE_RESOURCE,
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

export const clearOfficeData = () => ({
  type: CLEAR_OFFICE_DATA,
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

export const clearUploadSuccess = () => ({
  type: CLEAR_UPLOAD_SUCCESS,
});

export const requestAddUpdateResource = payload => ({
  type: REQUEST_ADD_UPDATE_RESOURCE,
  payload,
});

export const addUpdateResourceSuccess = payload => ({
  type: SUCCESS_ADD__UPDATE_RESOURCE,
  payload,
});

export const addUpdateResourceFailed = error => ({
  type: FAILED_ADD__UPDATE_RESOURCE,
  payload: error,
});

export const requestRemoveResource = payload => ({
  type: REQUEST_REMOVE_RESOURCE,
  payload,
});

export const removeResourceSuccess = payload => ({
  type: SUCCESS_REMOVE_RESOURCE,
  payload,
});

export const removeResourceFailed = error => ({
  type: FAILED_REMOVE_RESOURCE,
  payload: error,
});
