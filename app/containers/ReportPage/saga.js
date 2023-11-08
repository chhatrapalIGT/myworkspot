/**
 * Gets the repositories of the user from Github
 */

import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from '../../utils/request';
import { REQUEST_GET_TEAM_MEMBER, REQUEST_ADD_TEAM_MEMBER } from './constants';

import {
  getTeamMemberSuccess,
  getTeamMemberFailed,
  addTeamMemberSuccess,
  addTeamMemberFailed,
} from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getTeamMember() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const requestURL = `${API_URL}/invite/getinvitemember`;
  try {
    const locationList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = locationList;
    if (locationList.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getTeamMemberSuccess(data.response));
    } else {
      yield put(getTeamMemberFailed(data));
    }
  } catch (err) {
    yield put(getTeamMemberFailed(err));
  }
}

export function* updateTeamMember({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/invite/saveInviteData`;
  try {
    const badgeList = yield request({
      method: 'POST',
      url: requestURL,
      data: payload,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
      },
    });
    const { data } = badgeList;
    if (badgeList.status === 403) {
      sessionStorage.clear();

      // window.location.push('/auth');
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(addTeamMemberSuccess(data));
    } else {
      yield put(addTeamMemberFailed(data));
    }
  } catch (err) {
    yield put(addTeamMemberFailed(err));
  }
}

export default function* reportSaga() {
  yield takeLatest(REQUEST_GET_TEAM_MEMBER, getTeamMember);
  yield takeLatest(REQUEST_ADD_TEAM_MEMBER, updateTeamMember);
}
