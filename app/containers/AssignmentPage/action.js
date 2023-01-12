import {
  FAILED_GET_ASSIGNMENT_DETAIL,
  REQUEST_GET_ASSIGNMENT_DETAIL,
  SUCCESS_GET_ASSIGNMENT_DETAIL,
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
