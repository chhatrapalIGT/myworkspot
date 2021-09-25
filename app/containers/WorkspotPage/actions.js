import {
  REQUEST_GET_LOCATION,
  SUCCESS_GET_LOCATION,
  FAILED_GET_LOCATION,
  REQUEST_GET_WEEKLY_DEFAULT,
  SUCCESS_GET_WEEKLY_DEFAULT,
  FAILED_GET_WEEKLY_DEFAULT,
  REQUEST_UPDATE_WORKSPOT,
  SUCCESS_UPDATE_WORKSPOT,
  FAILED_UPDATE_WORKSPOT,
  RESET_WORKSPOT,
  REQUEST_GET_NEIGHBORHOOD,
  SUCCESS_GET_NEIGHBORHOOD,
  FAILED_GET_NEIGHBORHOOD,
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

export const requestGetWeeklyDefault = payload => ({
  type: REQUEST_GET_WEEKLY_DEFAULT,
  payload,
});

export const getWeeklyDefaultSuccess = payload => ({
  type: SUCCESS_GET_WEEKLY_DEFAULT,
  payload,
});

export const getWeeklyDefaultFailed = error => ({
  type: FAILED_GET_WEEKLY_DEFAULT,
  payload: error,
});

export const requestUpdateWorkspot = payload => ({
  type: REQUEST_UPDATE_WORKSPOT,
  payload,
});

export const updateWorkspotSuccess = payload => ({
  type: SUCCESS_UPDATE_WORKSPOT,
  payload,
});

export const updateWorkspotFailed = error => ({
  type: FAILED_UPDATE_WORKSPOT,
  payload: error,
});

export const resetWorkspot = () => ({
  type: RESET_WORKSPOT,
});

export const requestGetNeighborhood = payload => ({
  type: REQUEST_GET_NEIGHBORHOOD,
  payload,
});

export const getNeighborhoodSuccess = payload => ({
  type: SUCCESS_GET_NEIGHBORHOOD,
  payload,
});

export const getNeighborhoodFailed = error => ({
  type: FAILED_GET_NEIGHBORHOOD,
  payload: error,
});
