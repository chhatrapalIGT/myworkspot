import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { get } from 'lodash';
import {
  REQUEST_GET_EMPLOYEE_DETAIL,
  REQUEST_EDIT_EMPLOYEE_DETAIL,
  REQUEST_UPDATE_EMPLOYEE_DETAIL,
  REQUEST_GET_WORKSPACE,
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
} from './action';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;
export function* getEmployeeData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const limit = get(payload, 'limit', 10);
  const page = get(payload, 'page', 1);
  let requestURL;
  if (payload.sortBy) {
    requestURL = `${API_URL}/adminPanel/user/getEmployeeData?searchUser=${payload.search ||
      ''}&role=${payload.value || ''}&primaryOfficeFilter=${payload.space ||
      ''}&sortBy=${payload.sortBy}&limit=${limit}&page=${page}`;
  } else if (!payload.sortBy) {
    requestURL = `${API_URL}/adminPanel/user/getEmployeeData?searchUser=${payload.search ||
      ''}&role=${payload.value || ''}&primaryOfficeFilter=${payload.space ||
      ''}&limit=${limit}&page=${page}`;
  }
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = usersList;
    if (data && data.success) {
      yield put(getEmployeeDetailSuccess(data || []));
    } else {
      yield put(getEmployeeDetailFailed(data.message));
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
    if (data && data.success) {
      yield put(editEmployeeDetailSuccess(data.data));
    } else {
      yield put(editEmployeeDetailFailed(data.message));
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
    if (data && data.success) {
      yield put(updateEmployeeDetailSuccess(data.data));
    } else {
      yield put(updateEmployeeDetailFailed(data.message));
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
    if (data && data.success) {
      yield put(getWorkspaceSuccess(data.location));
    } else {
      yield put(getWorkspaceFailed(data.message));
    }
  } catch (err) {
    yield put(getWorkspaceFailed('Please try again'));
  }
}

export default function* locationData() {
  yield takeLatest(REQUEST_GET_EMPLOYEE_DETAIL, getEmployeeData);
  yield takeLatest(REQUEST_EDIT_EMPLOYEE_DETAIL, getEmployeeDataById);
  yield takeLatest(REQUEST_UPDATE_EMPLOYEE_DETAIL, updateEmployeeData);
  yield takeLatest(REQUEST_GET_WORKSPACE, getWorkspotData);
}
