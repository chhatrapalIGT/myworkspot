import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { REQUEST_GET_OFFICE_DATA, REQUEST_FILE_UPLOAD } from './constants';
import {
  getOfficeDataSuccess,
  getOfficeDataFailed,
  fileUploadSuccess,
  fileUploadFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/user/getWorkSpaceData`;

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
      yield put(getOfficeDataSuccess(data.location));
    } else {
      yield put(getOfficeDataFailed(data.message));
    }
  } catch (err) {
    yield put(getOfficeDataFailed(err.message));
  }
}

export function* fileUpload({ payload }) {
  const requestURL = `${API_URL}/officeMap/uploadOfficeMap`;
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  try {
    const response = yield request({
      method: 'POST',
      url: requestURL,
      data: payload.formData,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const { data } = response;
    yield put(fileUploadSuccess(data));
  } catch (error) {
    yield put(fileUploadFailed(error));
  }
}

export default function* officeMapData() {
  yield takeLatest(REQUEST_GET_OFFICE_DATA, getData);
  yield takeLatest(REQUEST_FILE_UPLOAD, fileUpload);
}
