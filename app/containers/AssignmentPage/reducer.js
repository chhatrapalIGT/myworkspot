import produce from 'immer';

import {
  CLEAR_OFFICE,
  FAILED_GET_ASSIGNMENT_DETAIL,
  FAILED_GET_EXPORT_DATA,
  FAILED_GET_OFFICE_FLOOR,
  FAILED_GET_OFFICE_NEIGHBORHOOD,
  REQUEST_GET_ASSIGNMENT_DETAIL,
  REQUEST_GET_EXPORT_DATA,
  REQUEST_GET_OFFICE_FLOOR,
  REQUEST_GET_OFFICE_NEIGHBORHOOD,
  SUCCESS_GET_ASSIGNMENT_DETAIL,
  SUCCESS_GET_EXPORT_DATA,
  SUCCESS_GET_OFFICE_FLOOR,
  SUCCESS_GET_OFFICE_NEIGHBORHOOD,
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
  officeFloor: {
    error: '',
    success: false,
    message: '',
    loading: false,
    floors: [],
  },
  officeNeighborhood: {
    error: '',
    success: false,
    message: '',
    loading: false,
    neighborhood: [],
  },
  exportAssignmentDetails: {
    error: '',
    success: false,
    message: '',
    loading: false,
    exportAssignment: [],
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
        break;
      case SUCCESS_GET_ASSIGNMENT_DETAIL:
        draft.assignmentDetail.loading = false;
        draft.assignmentDetail.success = true;
        draft.assignmentDetail.assignment = action.payload;
        draft.assignmentDetail.error = '';
        break;
      case FAILED_GET_ASSIGNMENT_DETAIL:
        draft.assignmentDetail.loading = false;
        draft.assignmentDetail.success = action.payload.success;
        draft.assignmentDetail.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_GET_EXPORT_DATA:
        draft.exportAssignmentDetails.loading = true;
        draft.exportAssignmentDetails.error = '';
        break;
      case SUCCESS_GET_EXPORT_DATA:
        draft.exportAssignmentDetails.loading = false;
        draft.exportAssignmentDetails.success = true;
        draft.exportAssignmentDetails.exportAssignment = action.payload;
        draft.exportAssignmentDetails.error = '';
        break;
      case FAILED_GET_EXPORT_DATA:
        draft.exportAssignmentDetails.loading = false;
        draft.exportAssignmentDetails.exportAssignment = [];
        draft.exportAssignmentDetails.success = action.payload.success;
        draft.exportAssignmentDetails.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_GET_OFFICE_FLOOR:
        draft.officeFloor.loading = true;
        draft.officeFloor.error = '';
        break;
      case SUCCESS_GET_OFFICE_FLOOR:
        draft.officeFloor.loading = false;
        draft.officeFloor.success = true;
        draft.officeFloor.floors = action.payload.data;
        draft.officeFloor.error = '';
        break;
      case FAILED_GET_OFFICE_FLOOR:
        draft.officeFloor.loading = false;
        // draft.officeFloor.floors = [];
        draft.officeFloor.success = action.payload.success;
        draft.officeFloor.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case REQUEST_GET_OFFICE_NEIGHBORHOOD:
        draft.officeNeighborhood.loading = true;
        draft.officeNeighborhood.error = '';
        break;
      case SUCCESS_GET_OFFICE_NEIGHBORHOOD:
        draft.officeNeighborhood.loading = false;
        draft.officeNeighborhood.success = true;
        draft.officeNeighborhood.neighborhood = action.payload.data;
        draft.officeNeighborhood.error = '';
        break;
      case FAILED_GET_OFFICE_NEIGHBORHOOD:
        draft.officeNeighborhood.loading = false;
        draft.officeNeighborhood.success = action.payload.success;
        draft.officeNeighborhood.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;
        break;
      case CLEAR_OFFICE:
        draft.getOfficeData.error = '';
        draft.getOfficeData.success = false;
    }
  });
export default AssignmentReducer;
