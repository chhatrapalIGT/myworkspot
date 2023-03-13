import {
  CLEAR_OFFICE,
  FAILED_GET_ASSIGNMENT_DETAIL,
  FAILED_GET_OFFICE_FLOOR,
  FAILED_GET_OFFICE_NEIGHBORHOOD,
  REQUEST_GET_ASSIGNMENT_DETAIL,
  REQUEST_GET_OFFICE_FLOOR,
  REQUEST_GET_OFFICE_NEIGHBORHOOD,
  SUCCESS_GET_ASSIGNMENT_DETAIL,
  SUCCESS_GET_OFFICE_FLOOR,
  SUCCESS_GET_OFFICE_NEIGHBORHOOD,
} from './constants';

export const requestGetAssignmentDetail = payload => ({
  type: REQUEST_GET_ASSIGNMENT_DETAIL,
  payload,
});

export const getAssignmentDetailSuccess = payload => ({
  type: SUCCESS_GET_ASSIGNMENT_DETAIL,
  payload,
});

export const getAssignmentDetailFailed = error => ({
  type: FAILED_GET_ASSIGNMENT_DETAIL,
  payload: error,
});

export const requestGetOfficeFloor = payload => ({
  type: REQUEST_GET_OFFICE_FLOOR,
  payload,
});

export const getOfficeFloorSuccess = payload => ({
  type: SUCCESS_GET_OFFICE_FLOOR,
  payload,
});

export const getOfficeFloorFailed = error => ({
  type: FAILED_GET_OFFICE_FLOOR,
  payload: error,
});

export const requestGetOfficeNeighborhood = payload => ({
  type: REQUEST_GET_OFFICE_NEIGHBORHOOD,
  payload,
});

export const getOfficeNeighborhoodSuccess = payload => ({
  type: SUCCESS_GET_OFFICE_NEIGHBORHOOD,
  payload,
});

export const getOfficeNeighborhoodFailed = error => ({
  type: FAILED_GET_OFFICE_NEIGHBORHOOD,
  payload: error,
});

export const clearOffice = () => ({
  type: CLEAR_OFFICE,
});
