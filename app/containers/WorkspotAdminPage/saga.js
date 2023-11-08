import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from '../../utils/request';
import {
  REQUEST_LOCATION_CAPACITY,
  REQUEST_CAPACITY_WARNING,
  REQUEST_EXPORT_LOCATION_CAPACITY,
} from './constants';
import {
  locationCapacitySuccess,
  locationCapacityFailed,
  capacityWarningSuccess,
  capacityWarningFailed,
  successExportLocationCapacity,
  failedExportLocationCapacity,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocationCapacity({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/adminPanel/locationCapacity/LocationCapacity?startdate=${
    payload.startdate
  }&enddate=${payload.enddate}`;

  try {
    const getCapacity = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = getCapacity;
    if (getCapacity.status === 403) {
      sessionStorage.clear();

      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(locationCapacitySuccess(data));
    } else {
      yield put(locationCapacityFailed(data));
    }
  } catch (err) {
    yield put(locationCapacityFailed(err));
  }
}

export function* getExportLocation({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/adminPanel/locationCapacity/LocationCapacity?startdate=${
    payload.startdate
  }&enddate=${payload.enddate}`;

  try {
    const getCapacity = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = getCapacity;
    if (getCapacity.status === 403) {
      sessionStorage.clear();

      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(successExportLocationCapacity(data));
    } else {
      yield put(failedExportLocationCapacity(data));
    }
  } catch (err) {
    yield put(failedExportLocationCapacity(err));
  }
}

export function* getCapacityWarning() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/adminPanel/locationCapacity/capacityWarning`;

  try {
    const getCapacity = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = getCapacity;
    if (getCapacity.status === 403) {
      sessionStorage.clear();

      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(capacityWarningSuccess(data));
    } else {
      yield put(capacityWarningFailed(data));
    }
  } catch (err) {
    yield put(capacityWarningFailed(err));
  }
}

export default function* officeMapData() {
  yield takeLatest(REQUEST_LOCATION_CAPACITY, getLocationCapacity);
  yield takeLatest(REQUEST_EXPORT_LOCATION_CAPACITY, getExportLocation);
  yield takeLatest(REQUEST_CAPACITY_WARNING, getCapacityWarning);
}
