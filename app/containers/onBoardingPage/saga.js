import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  REQUEST_GET_OFFICE_LOCATION,
  REQUEST_ADD_OFFICE_LOCATION,
  REQUEST_VERIFY_BADGE,
} from './constants';
import {
  getOfficeLocationSuccess,
  getOfficeLocationFailed,
  addOfficeLocationFailed,
  addOfficeLocationSuccess,
  verifyBadgeFailed,
  verifyBadgeSuccess,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocationData() {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/location/GetData`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = usersList;
    console.log(`data`, data);
    if (data && data.success) {
      yield put(getOfficeLocationSuccess(data.data));
    } else {
      yield put(getOfficeLocationFailed(data));
    }
  } catch (err) {
    yield put(getOfficeLocationFailed(err));
  }
}

export function* addOffice({ payload }) {
  const requestURL = `${API_URL}/weaklyDefault/saveData`;
  try {
    const officeList = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });
    const { data } = officeList;
    console.log('officeList', officeList);
    if (data && data.success) {
      yield put(addOfficeLocationSuccess(data));
    } else {
      yield put(addOfficeLocationFailed(data));
    }
  } catch (error) {
    yield put(addOfficeLocationFailed(error));
  }
}
export function* verifyBadge({ payload }) {
  const requestURL = `${API_URL}/Badges/ValidBadgeNumber`;
  try {
    const verifyBadgeData = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
    });
    const { data } = verifyBadgeData;
    console.log('verifyBadgeData', data);
    if (data && data.success) {
      yield put(verifyBadgeSuccess(data));
    } else {
      yield put(verifyBadgeFailed(data));
    }
  } catch (error) {
    yield put(verifyBadgeFailed(error));
  }
}

export default function* locationData() {
  yield takeLatest(REQUEST_GET_OFFICE_LOCATION, getLocationData);
  yield takeLatest(REQUEST_ADD_OFFICE_LOCATION, addOffice);
  yield takeLatest(REQUEST_VERIFY_BADGE, verifyBadge);
}
