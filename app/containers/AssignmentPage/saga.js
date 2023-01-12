import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { get } from 'lodash';
import { REQUEST_GET_ASSIGNMENT_DETAIL } from './constants';
import {
  getAssignmentDetailSuccess,
  getAssignmentDetailFailed,
} from './action';
import { CONSTANT } from '../../enum';
const { API_URL } = CONSTANT;

export function* getAssignmentData({ payload }) {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  const limit = get(payload, 'limit', 10);
  const page = get(payload, 'page', 1);
  const requestURL = `${API_URL}/adminPanel/assignments/getAssigmentsData?searchKeyword=${payload.searchKeyword ||
    ''}&sortBy=${payload.sortBy || ''}&limit=${limit}&page=${page}`;
  try {
    const assignmentList = yield request({
      method: 'GET',
      url: requestURL,
      headers: {
        Authorization: `Bearer ${token.idtoken}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });
    const { data } = assignmentList;
    if (data.status === 403) {
      sessionStorage.clear();
      yield put(push('/auth'));
    } else if (data && data.success) {
      yield put(getAssignmentDetailSuccess(data || []));
    } else {
      yield put(getAssignmentDetailFailed(data));
    }
  } catch (err) {
    yield put(getAssignmentDetailFailed('Please try again'));
  }
}

export default function* locationData() {
  yield takeLatest(REQUEST_GET_ASSIGNMENT_DETAIL, getAssignmentData);
}
