/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  REQUEST_GET_LOCATION,
  // REQUEST_GET_WEEKLY_DEFAULT,
  REQUEST_UPDATE_WORKSPOT,
} from './constants';

import {
  getLocationSuccess,
  getLocationFailed,
  // getWeeklyDefaultSuccess,
  // getWeeklyDefaultFailed,
  updateWorkspotSuccess,
  updateWorkspotFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocation() {
  const requestURL = `${API_URL}/location/GetData`;
  try {
    const locationList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = locationList;
    if (data && data.success) {
      yield put(getLocationSuccess(data));
    } else {
      yield put(getLocationFailed(data));
    }
  } catch (err) {
    yield put(getLocationFailed(err));
  }
}

// export function* getWeeklyData() {
//   const requestURL = `${API_URL}/weaklyDefault/getData?groupBy=week`;
//   try {
//     const weeklyList = yield request({
//       method: 'GET',
//       url: requestURL,
//     });
//     const { data } = weeklyList;
//     if (data && data.success) {
//       yield put(getWeeklyDefaultSuccess(data));
//     } else {
//       yield put(getWeeklyDefaultFailed(data));
//     }
//   } catch (err) {
//     yield put(getWeeklyDefaultFailed(err));
//   }
// }

export function* updateWorkspot({ payload }) {
  const requestURL = `${API_URL}/workspot/editWorkSpot`;
  try {
    const updateData = yield request({
      method: 'PUT',
      url: requestURL,
      data: payload,
    });
    const { data } = updateData;
    if (data && data.success) {
      yield put(updateWorkspotSuccess(data));
    } else {
      yield put(updateWorkspotFailed(data));
    }
  } catch (err) {
    yield put(updateWorkspotFailed(err));
  }
}

export default function* workSpotSaga() {
  yield takeLatest(REQUEST_GET_LOCATION, getLocation);
  yield takeLatest(REQUEST_UPDATE_WORKSPOT, updateWorkspot);
  // yield takeLatest(REQUEST_GET_WEEKLY_DEFAULT, getWeeklyData);
}
