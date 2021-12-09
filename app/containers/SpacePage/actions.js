import {
  REQUEST_UPDATE_ACTIVE_STATUS,
  SUCCESS_UPDATE_ACTIVE_STATUS,
  FAILED_UPDATE_ACTIVE_STATUS,
  CLEAR_UPDATE_STATUS,
  CLEAR_MESSAGE,
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
export const clearUpdateStatus = () => ({
  type: CLEAR_UPDATE_STATUS,
});
export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
