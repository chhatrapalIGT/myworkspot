import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import {
  REQUEST_GET_PROFILE_OFFICE_DATA,
  REQUEST_USERLIST_DATA,
  REQUEST_DELEGATE_DATA,
  REQUEST_BADGE_DATA,
  REQUEST_DELEGATE_PROFILE,
  REQUEST_ADD_DELEGATE_LIST,
  REQUEST_REMOVE_DELEGATE_LIST,
  REQUEST_GET_DELEGATE_LIST,
  REQUEST_GET_SPIN_ICON,
  REQUEST_ADD_SPIN_ICON,
  REQUEST_GET_SELECT_ICON,
  REQUEST_REMOVE_DELEGATE_USER,
  REQUEST_REMOVE_SPIN_ICON,
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
  getSpinIconSuccess,
  getSpinIconFailed,
  successAddSpinIcon,
  failedAddSpinIcon,
  successGetSelectIcon,
  failedGetSelectIcon,
  removeDelegateUserSuccess,
  removeDelegateUserFailed,
  successRemoveSpinIcon,
  failedRemoveSpinIcon,
  requestGetSelectIcon,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getLocationData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/weaklyDefault/getweeklydefault`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = usersList;
    if (usersList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getProfileOfficeDataSuccess(data.data));
    } else {
      yield put(getProfileOfficeDataFailed(data));
    }
  } catch (err) {
    yield put(getProfileOfficeDataFailed(err.message));
  }
}

export function* getUserListData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/User/GetData?dalegateEmployeeid=${payload.empdelegatedata ||
    ''}&employeeid=${sessionStorage.getItem('empid') || ''}`;
  try {
    const usersList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = usersList;
    if (usersList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
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
    if (delegateList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
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
    if (badgeList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
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
  const requestURL = `${API_URL}/Delegate/getDelegateUserProfile?delegateEmployeeid=${
    payload.empId
  }&sub=${payload.subb}`;
  try {
    const delegateProfileList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = delegateProfileList;
    if (delegateProfileList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      sessionStorage.setItem(
        'AccessToken',
        `{"idtoken":"${data.delegateUserToken}"}`,
      );
      yield put(delegateProfileSuccess(data));
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
    if (delegateList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
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
  const requestURL = `${API_URL}/Delegate/removeDelegateUser?delegateid=${
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
    if (delegateList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(removeDelegateListSuccess(data));
    } else {
      yield put(removeDelegateListFailed(data));
    }
  } catch (err) {
    yield put(removeDelegateListFailed(err));
  }
}

export function* removeDelegateUser({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/removeDelegateUserOfUser?delegateid=${
    payload.id
  }`;
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
    if (delegateList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(removeDelegateUserSuccess(data));
    } else {
      yield put(removeDelegateUserFailed(data));
    }
  } catch (err) {
    yield put(removeDelegateUserFailed(err));
  }
}

export function* getUpdateDelegateData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/Delegate/getdelegateData`;
  try {
    const delegateUsersList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = delegateUsersList;
    if (delegateUsersList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getDelegateListSuccess(data.delegateData));
    } else {
      yield put(getDelegateListFailed(data));
    }
  } catch (err) {
    yield put(getDelegateListFailed(err.message));
  }
}

export function* getSpinIcon({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/icon/getAllIcon`;
  try {
    const delegateList = yield request({
      method: 'GET',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = delegateList;
    if (delegateList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getSpinIconSuccess(data));
    } else {
      yield put(getSpinIconFailed(data));
    }
  } catch (err) {
    yield put(getSpinIconFailed(err));
  }
}

export function* addEmployeePin({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/icon/addEmployeePin`;
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
    if (delegateList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(successAddSpinIcon(data));
      yield put(requestGetSelectIcon({}));
    } else {
      yield put(failedAddSpinIcon(data));
    }
  } catch (err) {
    yield put(failedAddSpinIcon(err));
  }
}

export function* selectEmpIcon({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/icon/getSelectedIcon`;
  try {
    const delegateList = yield request({
      method: 'GET',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = delegateList;
    if (delegateList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(successGetSelectIcon(data));
    } else {
      yield put(failedGetSelectIcon(data));
    }
  } catch (err) {
    yield put(failedGetSelectIcon(err));
  }
}

export function* removePinIcon({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/icon/deleteEmployeePin`;
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
    if (delegateList.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(successRemoveSpinIcon(data));
      yield put(requestGetSelectIcon({}));
    } else {
      yield put(failedRemoveSpinIcon(data));
    }
  } catch (err) {
    yield put(failedRemoveSpinIcon(err));
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
  yield takeLatest(REQUEST_REMOVE_DELEGATE_USER, removeDelegateUser);
  yield takeLatest(REQUEST_GET_DELEGATE_LIST, getUpdateDelegateData);
  yield takeLatest(REQUEST_GET_SPIN_ICON, getSpinIcon);
  yield takeLatest(REQUEST_ADD_SPIN_ICON, addEmployeePin);
  yield takeLatest(REQUEST_GET_SELECT_ICON, selectEmpIcon);
  yield takeLatest(REQUEST_REMOVE_SPIN_ICON, removePinIcon);
}
