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
  REQUEST_GET_NEIGBOR_NAME,
  SUCCESS_GET_NEIGBOR_NAME,
  FAILED_GET_NEIGBOR_NAME,
  REQUEST_GET_OFFICES_TYPE,
  SUCCESS_GET_OFFICES_TYPE,
  FAILED_GET_OFFICES_TYPE,
  REQUEST_GET_FLOOR_BY_NAME,
  SUCCESS_GET_FLOOR_BY_NAME,
  FAILED_GET_FLOOR_BY_NAME,
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

export const requestGetNeighborName = payload => ({
  type: REQUEST_GET_NEIGBOR_NAME,
  payload,
});

export const getNeighborNameSuccess = payload => ({
  type: SUCCESS_GET_NEIGBOR_NAME,
  payload,
});

export const getNeighborNameFailed = error => ({
  type: FAILED_GET_NEIGBOR_NAME,
  payload: error,
});

export const requestGetFloorByName = payload => ({
  type: REQUEST_GET_FLOOR_BY_NAME,
  payload,
});

export const getFloorByNameSuccess = payload => ({
  type: SUCCESS_GET_FLOOR_BY_NAME,
  payload,
});

export const getFloorByNameFailed = error => ({
  type: FAILED_GET_FLOOR_BY_NAME,
  payload: error,
});

export const requestGetOfficesType = payload => ({
  type: REQUEST_GET_OFFICES_TYPE,
  payload,
});

export const getOfficesTypeSuccess = payload => ({
  type: SUCCESS_GET_OFFICES_TYPE,
  payload,
});

export const getOfficesTypeFailed = error => ({
  type: FAILED_GET_OFFICES_TYPE,
  payload: error,
});

export const clearUpdateStatus = () => ({
  type: CLEAR_UPDATE_STATUS,
});
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
