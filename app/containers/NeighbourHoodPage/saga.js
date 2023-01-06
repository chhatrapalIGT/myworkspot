import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { REQUEST_GET_OFFICE_ASSIGNMENTS } from './constants';
import {
  successGetOfficeAssignments,
  failedGetOfficeAssignments,
} from './action';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;
export function* getAllOfficeLocation({ payload }) {
  // eslint-disable-next-line no-underscore-dangle
  const { locationId, floor, neighborhoodName, todayDate } = payload;

  const fil = `?locationId${locationId ? `=${locationId}` : ''}&floor${
    floor ? `=${floor}` : ''
  }&neighborhoodName${
    neighborhoodName ? `=${neighborhoodName}` : ''
  }&todayDate${todayDate ? `=${todayDate}` : ''}`;

  const requestURL = `${API_URL}/workspot/allAssignmentOfLocation${fil}`;
  try {
    const delegateList = yield request({
      method: 'GET',
      url: requestURL,
      data: payload,
    });
    const { data } = delegateList;
    if (delegateList.status === 403) {
      sessionStorage.clear();
    } else if (data && data.success) {
      yield put(successGetOfficeAssignments(data));
    } else {
      yield put(failedGetOfficeAssignments(data));
    }
  } catch (err) {
    yield put(failedGetOfficeAssignments(err));
  }
}

export default function* neighbourHoodData() {
  yield takeLatest(REQUEST_GET_OFFICE_ASSIGNMENTS, getAllOfficeLocation);
}
