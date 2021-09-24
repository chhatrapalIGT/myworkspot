import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  REQUEST_GET_PROFILE_OFFICE_DATA,
  REQUEST_USERLIST_DATA,
} from './constants';
import {
  getProfileOfficeDataSuccess,
  getProfileOfficeDataFailed,
  getUserlistFailed,
  getUserlistSuccess,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocationData() {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/weaklyDefault/getweeklydefault?employeeid=239321`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = usersList;
    if (data && data.success) {
      yield put(getProfileOfficeDataSuccess(data.data));
    } else {
      yield put(getProfileOfficeDataFailed(data.message));
    }
  } catch (err) {
    yield put(getProfileOfficeDataFailed(err.message));
  }
}

export function* getUserListData() {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/User/GetData?employeeid=239321`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = usersList;
    console.log('data userlist', data);
    if (data && data.success) {
      yield put(getUserlistSuccess(data));
    } else {
      yield put(getUserlistFailed(data));
    }
  } catch (err) {
    yield put(getUserlistFailed(err));
  }
}

export default function* profileData() {
  yield takeLatest(REQUEST_GET_PROFILE_OFFICE_DATA, getLocationData);
  yield takeLatest(REQUEST_USERLIST_DATA, getUserListData);
}
