import produce from 'immer';

import {
  FAILED_GET_ASSIGNMENT_DETAIL,
  REQUEST_GET_ASSIGNMENT_DETAIL,
  SUCCESS_GET_ASSIGNMENT_DETAIL,
} from './constants';

// The initial state of the App
const initialState = {
  assignmentDetail: {
    error: '',
    success: false,
    message: '',
    loading: false,
    assignment: [],
  },
  apiMessage: '',
  apiSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const AssignmentReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_GET_ASSIGNMENT_DETAIL:
        draft.assignmentDetail.loading = true;
        draft.assignmentDetail.error = '';
        // draft.singleLocation = [];
        break;
      case SUCCESS_GET_ASSIGNMENT_DETAIL:
        draft.assignmentDetail.loading = false;
        draft.assignmentDetail.success = true;
        draft.assignmentDetail.assignment = action.payload;
        draft.assignmentDetail.error = '';
        break;
      case FAILED_GET_ASSIGNMENT_DETAIL:
        draft.assignmentDetail.loading = false;
        draft.assignmentDetail.assignment = [];
        draft.assignmentDetail.success = action.payload.success;
        draft.assignmentDetail.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
    }
  });
export default AssignmentReducer;
