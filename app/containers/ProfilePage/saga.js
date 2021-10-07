import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  REQUEST_GET_PROFILE_OFFICE_DATA,
  REQUEST_USERLIST_DATA,
  REQUEST_DELEGATE_DATA,
  REQUEST_BADGE_DATA,
  REQUEST_DELEGATE_PROFILE,
} from './constants';
import {
  getProfileOfficeDataSuccess,
  getProfileOfficeDataFailed,
  getUserlistFailed,
  getUserlistSuccess,
  getDelegateFailed,
  getDelegateSuccess,
  getBadgeSuccess,
  getBadgeFailed,
  delegateProfileSuccess,
  delegateProfileFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocationData() {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/weaklyDefault/getweeklydefault?employeeid=239323`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = usersList;
    if (data && data.success) {
      yield put(getProfileOfficeDataSuccess(data.data));
    } else {
      yield put(getProfileOfficeDataFailed(data));
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
    console.log('data==>>>> userprofile', data);
    if (data && data.success) {
      yield put(getUserlistSuccess(data));
    } else {
      yield put(getUserlistFailed(data));
    }
  } catch (err) {
    yield put(getUserlistFailed(err));
  }
}

export function* getDelegateListData() {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/getDelegateAllUser`;
  try {
    const delegateList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = delegateList;
    if (data && data.success) {
      yield put(getDelegateSuccess(data));
    } else {
      yield put(getDelegateFailed(data));
    }
  } catch (err) {
    yield put(getDelegateFailed(err.message));
  }
}

export function* updateBadgeData({ payload }) {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/badgeMaster/editBadge`;
  try {
    const badgeList = yield request({
      method: 'PUT',
      url: requestURL,
      data: payload,
    });
    const { data } = badgeList;
    if (data && data.success) {
      yield put(getBadgeSuccess(data));
    } else {
      yield put(getBadgeFailed(data));
    }
  } catch (err) {
    yield put(getBadgeFailed(err));
  }
}

export function* delegateProfile() {
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/getDelegateUserProfile?employeeid=239323`;
  try {
    const delegateProfileList = yield request({
      method: 'GET',
      url: requestURL,
    });
    const { data } = delegateProfileList;
    console.log('data ===> delegarte profile', data);
    if (data && data.success) {
      yield put(delegateProfileSuccess(data.response));
    } else {
      yield put(delegateProfileFailed(data));
    }
  } catch (err) {
    yield put(delegateProfileFailed(err.message));
  }
}
export default function* profileData() {
  yield takeLatest(REQUEST_GET_PROFILE_OFFICE_DATA, getLocationData);
  yield takeLatest(REQUEST_USERLIST_DATA, getUserListData);
  yield takeLatest(REQUEST_DELEGATE_DATA, getDelegateListData);
  yield takeLatest(REQUEST_BADGE_DATA, updateBadgeData);
  yield takeLatest(REQUEST_DELEGATE_PROFILE, delegateProfile);
}
