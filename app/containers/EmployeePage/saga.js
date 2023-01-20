import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import {
  REQUEST_GET_EMPLOYEE_DETAIL,
  REQUEST_EDIT_EMPLOYEE_DETAIL,
  REQUEST_UPDATE_EMPLOYEE_DETAIL,
  REQUEST_GET_WORKSPACE,
  REQUEST_GET_USER_ROLE,
} from './constants';
import {
  getEmployeeDetailSuccess,
  getEmployeeDetailFailed,
  editEmployeeDetailSuccess,
  editEmployeeDetailFailed,
  updateEmployeeDetailSuccess,
  updateEmployeeDetailFailed,
  getWorkspaceSuccess,
  getWorkspaceFailed,
  getUserRoleSuccess,
  getUserRoleFailed,
} from './action';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;
export function* getEmployeeData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const limit = get(payload, 'limit', 10);
  const page = get(payload, 'page', 1);
  const pay = {
    searchUser: payload.search,
    role: payload.value,
    primaryOfficeFilter: payload.space,
    sortBy: payload.sortBy,
    limit,
    page,
  };
  const requestURL = `${API_URL}/adminPanel/user/getEmployeeData`;

  try {
    const usersList = yield request({
      method: 'POST',
      url: requestURL,
      data: pay,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = usersList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getEmployeeDetailSuccess(data || []));
    } else {
      yield put(getEmployeeDetailFailed(data));
    }
  } catch (err) {
    yield put(getEmployeeDetailFailed('Please try again'));
  }
}
export function* getEmployeeDataById({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/adminPanel/user/getEmployeeDetail?emp_id=${payload}`;
  try {
    const usersEditList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = usersEditList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(editEmployeeDetailSuccess(data));
    } else {
      yield put(editEmployeeDetailFailed(data));
    }
  } catch (err) {
    yield put(editEmployeeDetailFailed('Please try again'));
  }
}
export function* updateEmployeeData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/adminPanel/user/updateEmployeeData`;
  try {
    const usersUpdateList = yield request({
      method: 'PUT',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = usersUpdateList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(updateEmployeeDetailSuccess(data));
    } else {
      yield put(updateEmployeeDetailFailed(data));
    }
  } catch (err) {
    yield put(updateEmployeeDetailFailed('Please try again'));
  }
}
export function* getWorkspotData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/adminPanel/user/getWorkSpaceData`;
  try {
    const workspotData = yield request({
      method: 'GET',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = workspotData;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getWorkspaceSuccess(data.location));
    } else {
      yield put(getWorkspaceFailed(data));
    }
  } catch (err) {
    yield put(getWorkspaceFailed('Please try again'));
  }
}

export function* getUserRoles() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/master/roleGetAllData`;
  try {
    const workspotData = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = workspotData;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getUserRoleSuccess(data.roledata));
    } else {
      yield put(getUserRoleFailed(data));
    }
  } catch (err) {
    yield put(getUserRoleFailed('Please try again'));
  }
}

export default function* locationData() {
  yield takeLatest(REQUEST_GET_EMPLOYEE_DETAIL, getEmployeeData);
  yield takeLatest(REQUEST_EDIT_EMPLOYEE_DETAIL, getEmployeeDataById);
  yield takeLatest(REQUEST_UPDATE_EMPLOYEE_DETAIL, updateEmployeeData);
  yield takeLatest(REQUEST_GET_WORKSPACE, getWorkspotData);
  yield takeLatest(REQUEST_GET_USER_ROLE, getUserRoles);
}
