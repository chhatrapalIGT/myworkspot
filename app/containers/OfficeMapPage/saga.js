import { put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { push } from 'react-router-redux';
import { REQUEST_GET_OFFICE_DATA } from './constants';
import { getOfficeDataSuccess, getOfficeDataFailed } from './actions';
import { CONSTANT } from '../../enum';

const { API_URL } = CONSTANT;

export function* getData() {
  let token = sessionStorage.getItem('AccessToken');
  token = JSON.parse(token);
  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${API_URL}/building/get`;

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
      yield put(getOfficeDataSuccess(data.response));
    } else {
      yield put(getOfficeDataFailed(data.message));
    }
  } catch (err) {
    yield put(getOfficeDataFailed(err.message));
  }
}

export default function* officeMapData() {
  yield takeLatest(REQUEST_GET_OFFICE_DATA, getData);
}
