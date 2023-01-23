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
  FAILED_GET_USER_ROLE,
  SUCCESS_GET_USER_ROLE,
} from './constants';

export const requestGetEmployeeDetail = payload => ({
  type: REQUEST_GET_EMPLOYEE_DETAIL,
  payload,
});

export const getEmployeeDetailSuccess = payload => ({
  type: SUCCESS_GET_EMPLOYEE_DETAIL,
  payload,
});

export const getEmployeeDetailFailed = error => ({
  type: FAILED_GET_EMPLOYEE_DETAIL,
  payload: error,
});

export const requestEditEmployeeDetail = payload => ({
  type: REQUEST_EDIT_EMPLOYEE_DETAIL,
  payload,
});

export const editEmployeeDetailSuccess = payload => ({
  type: SUCCESS_EDIT_EMPLOYEE_DETAIL,
  payload,
});

export const editEmployeeDetailFailed = error => ({
  type: FAILED_EDIT_EMPLOYEE_DETAIL,
  payload: error,
});

export const requestUpdateEmployeeDetail = payload => ({
  type: REQUEST_UPDATE_EMPLOYEE_DETAIL,
  payload,
});

export const updateEmployeeDetailSuccess = payload => ({
  type: SUCCESS_UPDATE_EMPLOYEE_DETAIL,
  payload,
});

export const updateEmployeeDetailFailed = error => ({
  type: FAILED_UPDATE_EMPLOYEE_DETAIL,
  payload: error,
});

export const requestGetWorkspace = payload => ({
  type: REQUEST_GET_WORKSPACE,
  payload,
});

export const getWorkspaceSuccess = payload => ({
  type: SUCCESS_GET_WORKSPACE,
  payload,
});

export const getWorkspaceFailed = error => ({
  type: FAILED_GET_WORKSPACE,
  payload: error,
});

export const requestgetUserRole = payload => ({
  type: REQUEST_GET_USER_ROLE,
  payload,
});

export const getUserRoleSuccess = payload => ({
  type: SUCCESS_GET_USER_ROLE,
  payload,
});

export const getUserRoleFailed = error => ({
  type: FAILED_GET_USER_ROLE,
  payload: error,
});

export const resetDataEmp = () => ({
  type: RESET_DATA_EMP,
});

export const clearEmp = () => ({
  type: CLEAR_EMP,
});
