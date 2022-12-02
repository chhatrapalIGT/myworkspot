import {
  FAILED_GET_OFFICE_ASSIGNMENTS,
  REQUEST_GET_OFFICE_ASSIGNMENTS,
  SUCCESS_GET_OFFICE_ASSIGNMENTS,
} from './constants';

export const requestGetOfficeAssignments = payload => ({
  type: REQUEST_GET_OFFICE_ASSIGNMENTS,
  payload,
});

export const successGetOfficeAssignments = payload => ({
  type: SUCCESS_GET_OFFICE_ASSIGNMENTS,
  payload,
});

export const failedGetOfficeAssignments = error => ({
  type: FAILED_GET_OFFICE_ASSIGNMENTS,
  payload: error,
});
