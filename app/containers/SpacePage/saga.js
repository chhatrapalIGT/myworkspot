import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import { get } from 'lodash';
import { push } from 'react-router-redux';
import {
  REQUEST_UPDATE_ACTIVE_STATUS,
  REQUEST_GET_MANAGE_SPACE,
  REQUEST_GET_MANAGE_EXPORT,
  REQUEST_GET_LOCK_SPACE,
  REQUEST_GET_NEIGBOR_NAME,
} from './constants';
import {
  updateActiveStatusSuccess,
  updateActiveStatusFailed,
  getManageSpaceSuccess,
  getManageSpaceFailed,
  getManageExportSuccess,
  getManageExportFailed,
  getLockSpaceSuccess,
  getLockSpaceFailed,
  getNeighborNameSuccess,
  getNeighborNameFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* statusUpdate({ payload }) {
  const requestURL = `${API_URL}/adminPanel/spaces/activeStatusAction`;
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  try {
    const response = yield request({
      method: 'PUT',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });

    const { data } = response;

    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(updateActiveStatusSuccess(data));
    } else {
      yield put(updateActiveStatusFailed(data));
    }
  } catch (error) {
    yield put(updateActiveStatusFailed(error));
  }
}

export function* getManageSpaceData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/adminPanel/spaces/getManageSpace`;
  try {
    const response = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });

    const { data } = response;

    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getManageSpaceSuccess(data));
    } else {
      yield put(getManageSpaceFailed(data));
    }
  } catch (error) {
    yield put(getManageSpaceFailed(error));
  }
}

export function* getExportManageData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/adminPanel/spaces/getManageSpace`;
  try {
    const response = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });

    const { data } = response;

    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getManageExportSuccess(data));
    } else {
      yield put(getManageExportFailed(data));
    }
  } catch (error) {
    yield put(getManageExportFailed(error));
  }
}

export function* getLockSpaceData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/spaces/getLockSpace`;
  try {
    const response = yield request({
      method: 'GET',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });

    const { data } = response;

    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getLockSpaceSuccess(data));
    } else {
      yield put(getLockSpaceFailed(data));
    }
  } catch (error) {
    yield put(getLockSpaceFailed(error));
  }
}

export function* getNeighborhoodData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/neighborhoods/getNeighborhoodName?floor=2&building&locationId=RIC`;
  try {
    const response = yield request({
      method: 'GET',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });

    const { data } = response;

    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getNeighborNameSuccess(data));
    } else {
      yield put(getNeighborNameFailed(data));
    }
  } catch (error) {
    yield put(getNeighborNameFailed(error));
  }
}

export default function* spaceMapData() {
  yield takeLatest(REQUEST_UPDATE_ACTIVE_STATUS, statusUpdate);
  yield takeLatest(REQUEST_GET_MANAGE_SPACE, getManageSpaceData);
  yield takeLatest(REQUEST_GET_MANAGE_EXPORT, getExportManageData);
  yield takeLatest(REQUEST_GET_LOCK_SPACE, getLockSpaceData);
  yield takeLatest(REQUEST_GET_NEIGBOR_NAME, getNeighborhoodData);
}
