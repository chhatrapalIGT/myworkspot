import {
  REQUEST_UPDATE_ACTIVE_STATUS,
  SUCCESS_UPDATE_ACTIVE_STATUS,
  FAILED_UPDATE_ACTIVE_STATUS,
  REQUEST_GET_MANAGE_SPACE,
  SUCCESS_GET_MANAGE_SPACE,
  FAILED_GET_MANAGE_SPACE,
  REQUEST_GET_MANAGE_EXPORT,
  SUCCESS_GET_MANAGE_EXPORT,
  FAILED_GET_MANAGE_EXPORT,
  CLEAR_UPDATE_STATUS,
  CLEAR_MESSAGE,
  REQUEST_GET_LOCK_SPACE,
  SUCCESS_GET_LOCK_SPACE,
  FAILED_GET_LOCK_SPACE,
} from './constants';

export const requestUpdateActiveStatus = payload => ({
  type: REQUEST_UPDATE_ACTIVE_STATUS,
  payload,
});

export const updateActiveStatusSuccess = payload => ({
  type: SUCCESS_UPDATE_ACTIVE_STATUS,
  payload,
});

export const updateActiveStatusFailed = error => ({
  type: FAILED_UPDATE_ACTIVE_STATUS,
  payload: error,
});
export const requestGetManageSpace = payload => ({
  type: REQUEST_GET_MANAGE_SPACE,
  payload,
});

export const getManageSpaceSuccess = payload => ({
  type: SUCCESS_GET_MANAGE_SPACE,
  payload,
});

export const getManageSpaceFailed = error => ({
  type: FAILED_GET_MANAGE_SPACE,
  payload: error,
});
export const requestGetManageExport = payload => ({
  type: REQUEST_GET_MANAGE_EXPORT,
  payload,
});

export const getManageExportSuccess = payload => ({
  type: SUCCESS_GET_MANAGE_EXPORT,
  payload,
});

export const getManageExportFailed = error => ({
  type: FAILED_GET_MANAGE_EXPORT,
  payload: error,
});
export const requestGetLockSpace = payload => ({
  type: REQUEST_GET_LOCK_SPACE,
  payload,
});

export const getLockSpaceSuccess = payload => ({
  type: SUCCESS_GET_LOCK_SPACE,
  payload,
});

export const getLockSpaceFailed = error => ({
  type: FAILED_GET_LOCK_SPACE,
  payload: error,
});
export const clearUpdateStatus = () => ({
  type: CLEAR_UPDATE_STATUS,
});
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
