import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import {
  REQUEST_GET_OFFICE_UPDATE_DATA,
  REQUEST_FILE_UPLOAD,
  REQUEST_GET_RESOURCE,
} from './constants';
import {
  getOfficeDataUdateSuccess,
  getOfficeDataUpdateFailed,
  fileUploadSuccess,
  fileUploadFailed,
  getResourceSuccess,
  getResourceFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/adminPanel/user/getWorkSpaceData`;

  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = usersList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getOfficeDataUdateSuccess(data.location));
    } else {
      yield put(getOfficeDataUpdateFailed(data.message));
    }
  } catch (err) {
    yield put(getOfficeDataUpdateFailed(err.message));
  }
}

export function* fileUpload({ payload }) {
  const requestURL = `${API_URL}/adminPanel/officeMap/uploadOfficeMap`;
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  try {
    const response = yield request({
      method: 'POST',
      url: requestURL,
      data: payload.formData ? payload.formData : '',
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const { data } = response;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(fileUploadSuccess(data));
    } else {
      yield put(fileUploadFailed(data));
    }
  } catch (error) {
    yield put(fileUploadFailed(error));
  }
}

export function* getResourceData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  // const requestURL = `${API_URL}/Delegate/getdelegateData?employeeid=239323`;
  try {
    const resourceList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = resourceList;
    if (resourceList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getResourceSuccess(data));
    } else {
      yield put(getResourceFailed(data));
    }
  } catch (err) {
    yield put(getResourceFailed(err.message));
  }
}

export default function* officeMapData() {
  yield takeLatest(REQUEST_GET_OFFICE_UPDATE_DATA, getData);
  yield takeLatest(REQUEST_FILE_UPLOAD, fileUpload);
  yield takeLatest(REQUEST_GET_RESOURCE, getResourceData);
}
