import {
  REQUEST_UPDATE_ACTIVE_STATUS,
  SUCCESS_UPDATE_ACTIVE_STATUS,
  FAILED_UPDATE_ACTIVE_STATUS,
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
