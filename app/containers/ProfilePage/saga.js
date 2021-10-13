import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  REQUEST_GET_PROFILE_OFFICE_DATA,
  REQUEST_USERLIST_DATA,
  REQUEST_DELEGATE_DATA,
  REQUEST_BADGE_DATA,
  REQUEST_DELEGATE_PROFILE,
  REQUEST_ADD_DELEGATE_LIST,
  REQUEST_REMOVE_DELEGATE_LIST,
  REQUEST_GET_DELEGATE_LIST,
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
  addDelegateListSuccess,
  addDelegateListFailed,
  removeDelegateListSuccess,
  removeDelegateListFailed,
  getDelegateListSuccess,
  getDelegateListFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocationData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/weaklyDefault/getweeklydefault?employeeid=239323`;
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
      yield put(getProfileOfficeDataSuccess(data.data));
    } else {
      yield put(getProfileOfficeDataFailed(data));
    }
  } catch (err) {
    yield put(getProfileOfficeDataFailed(err.message));
  }
}

export function* getUserListData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/User/GetData?employeeid=239323`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
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

export function* getDelegateListData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/getUsersForDelegate?page=${
    payload.page
  }&searchUser=${payload.searchUser || ''}`;
  try {
    const delegateList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
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
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/badgeMaster/editBadge`;
  try {
    const badgeList = yield request({
      method: 'PUT',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
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

export function* delegateProfile({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/getDelegateUserProfile?employeeid=${
    payload.empId
  }`;
  try {
    const delegateProfileList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
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
export function* addDelegateMember({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/saveDelegateUsers`;
  try {
    const delegateList = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = delegateList;
    if (data && data.success) {
      yield put(addDelegateListSuccess(data));
    } else {
      yield put(addDelegateListFailed(data));
    }
  } catch (err) {
    yield put(addDelegateListFailed(err));
  }
}

export function* removeDelegateMember({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/removeDelegateUser?employeeid=239323&delegateid=${
    payload.id
  }`;
  try {
    const delegateList = yield request({
      method: 'DELETE',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = delegateList;
    if (data && data.success) {
      yield put(removeDelegateListSuccess(data));
    } else {
      yield put(removeDelegateListFailed(data));
    }
  } catch (err) {
    yield put(removeDelegateListFailed(err));
  }
}

export function* getUpdateDelegateData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/getdelegateData?employeeid=239323`;
  try {
    const delegateUsersList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = delegateUsersList;
    if (data && data.success) {
      yield put(getDelegateListSuccess(data.delegateData));
    } else {
      yield put(getDelegateListFailed(data));
    }
  } catch (err) {
    yield put(getDelegateListFailed(err.message));
  }
}

export default function* profileData() {
  yield takeLatest(REQUEST_GET_PROFILE_OFFICE_DATA, getLocationData);
  yield takeLatest(REQUEST_USERLIST_DATA, getUserListData);
  yield takeLatest(REQUEST_DELEGATE_DATA, getDelegateListData);
  yield takeLatest(REQUEST_BADGE_DATA, updateBadgeData);
  yield takeLatest(REQUEST_DELEGATE_PROFILE, delegateProfile);
  yield takeLatest(REQUEST_ADD_DELEGATE_LIST, addDelegateMember);
  yield takeLatest(REQUEST_REMOVE_DELEGATE_LIST, removeDelegateMember);
  yield takeLatest(REQUEST_GET_DELEGATE_LIST, getUpdateDelegateData);
}
