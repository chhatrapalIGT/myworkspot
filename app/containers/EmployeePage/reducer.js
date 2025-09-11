import { produce } from 'immer';

import {
  REQUEST_GET_EMPLOYEE_DETAIL,
  SUCCESS_GET_EMPLOYEE_DETAIL,
  FAILED_GET_EMPLOYEE_DETAIL,
  REQUEST_EDIT_EMPLOYEE_DETAIL,
  SUCCESS_EDIT_EMPLOYEE_DETAIL,
  FAILED_EDIT_EMPLOYEE_DETAIL,
  REQUEST_UPDATE_EMPLOYEE_DETAIL,
  SUCCESS_UPDATE_EMPLOYEE_DETAIL,
  FAILED_UPDATE_EMPLOYEE_DETAIL,
  REQUEST_GET_WORKSPACE,
  SUCCESS_GET_WORKSPACE,
  FAILED_GET_WORKSPACE,
  RESET_DATA_EMP,
  CLEAR_EMP,
  REQUEST_GET_USER_ROLE,
  SUCCESS_GET_USER_ROLE,
  FAILED_GET_USER_ROLE,
} from './constants';

// The initial state of the App
const initialState = {
  EmployeeDetail: {
    error: '',
    success: false,
    message: '',
    loading: false,
    employee: [],
  },
  EditEmployeeDetail: {
    error: '',
    success: false,
    message: '',
    loading: false,
    singleEmployee: {},
  },
  UpdateEmployee: {
    error: '',
    success: false,
    message: '',
    loading: '',
  },
  workspotDetail: {
    error: '',
    success: false,
    message: '',
    loading: false,
    workspotData: [],
  },
  userRole: {
    error: '',
    success: false,
    message: '',
    loading: false,
    userRoles: [],
  },
  apiMessage: '',
  apiSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const EmployeeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_GET_EMPLOYEE_DETAIL:
        draft.EmployeeDetail.loading = true;
        draft.EmployeeDetail.error = '';
        // draft.singleLocation = [];
        break;
      case SUCCESS_GET_EMPLOYEE_DETAIL:
        draft.EmployeeDetail.loading = false;
        draft.EmployeeDetail.success = true;
        draft.EmployeeDetail.employee = action.payload;
        draft.EmployeeDetail.error = '';
        break;
      case FAILED_GET_EMPLOYEE_DETAIL:
        draft.EmployeeDetail.loading = false;
        draft.EmployeeDetail.employee = [];
        draft.EmployeeDetail.success = action.payload.success;
        draft.EmployeeDetail.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;

        break;
      case REQUEST_EDIT_EMPLOYEE_DETAIL:
        draft.EditEmployeeDetail.loading = true;
        draft.EditEmployeeDetail.error = '';
        // draft.singleLocation = [];
        break;
      case SUCCESS_EDIT_EMPLOYEE_DETAIL:
        draft.EditEmployeeDetail.loading = false;
        draft.EditEmployeeDetail.success = true;
        draft.EditEmployeeDetail.singleEmployee = action.payload.data;
        draft.EditEmployeeDetail.error = '';
        break;
      case FAILED_EDIT_EMPLOYEE_DETAIL:
        draft.EditEmployeeDetail.loading = false;
        draft.EditEmployeeDetail.singleEmployee = {};
        draft.EditEmployeeDetail.success = action.payload.success;
        draft.EditEmployeeDetail.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;

        break;
      case REQUEST_UPDATE_EMPLOYEE_DETAIL:
        draft.UpdateEmployee.loading = true;
        draft.UpdateEmployee.error = '';
        // draft.singleLocation = [];
        break;
      case SUCCESS_UPDATE_EMPLOYEE_DETAIL:
        draft.UpdateEmployee.loading = false;
        draft.UpdateEmployee.success = true;
        draft.UpdateEmployee.message = action.payload.data;
        draft.apiMessage = action.payload.data;
        draft.apiSuccess = action.payload.success;
        break;
      case FAILED_UPDATE_EMPLOYEE_DETAIL:
        draft.UpdateEmployee.loading = false;
        draft.UpdateEmployee.success = action.payload.success;
        draft.UpdateEmployee.message = action.payload.message;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;

        break;
      case REQUEST_GET_WORKSPACE:
        draft.workspotDetail.loading = true;
        draft.workspotDetail.error = '';
        // draft.singleLocation = [];
        break;
      case SUCCESS_GET_WORKSPACE:
        draft.workspotDetail.loading = false;
        draft.workspotDetail.success = true;
        draft.workspotDetail.workspotData = action.payload;
        draft.workspotDetail.error = '';
        break;
      case FAILED_GET_WORKSPACE:
        draft.workspotDetail.loading = false;
        draft.workspotDetail.workspotData = [];
        draft.workspotDetail.success = action.payload.success;
        draft.workspotDetail.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;

        break;
      case REQUEST_GET_USER_ROLE:
        draft.userRole.loading = true;
        draft.userRole.error = '';
        break;
      case SUCCESS_GET_USER_ROLE:
        draft.userRole.loading = false;
        draft.userRole.success = true;
        draft.userRole.userRoles = action.payload;
        draft.userRole.error = '';
        break;
      case FAILED_GET_USER_ROLE:
        draft.userRole.loading = false;
        draft.userRole.userRoles = [];
        draft.userRole.success = action.payload.success;
        draft.userRole.message = action.payload;
        draft.apiMessage = action.payload.message;
        draft.apiSuccess = action.payload.success;

        break;
      case RESET_DATA_EMP:
        draft.UpdateEmployee.message = '';
        draft.UpdateEmployee.success = false;
        draft.EditEmployeeDetail.message = '';
        draft.EditEmployeeDetail.success = false;
        draft.apiMessage = '';
        draft.apiSuccess = false;
        break;
      case CLEAR_EMP:
        draft.UpdateEmployee.message = '';
        draft.UpdateEmployee.success = false;
    }
  });
export default EmployeeReducer;
